import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { AgentDTO } from 'src/dto/agent.dto';
import { agentScreenshotPrompt, agentSystem } from 'src/dto/openai.dto';
import drawBoundingBox from 'src/utils/drawBoundingBox';
import { MyLogger } from 'src/utils/logging';
import { imageToBase64 } from 'src/utils/openai';
import { sleep, waitForEvent } from 'src/utils/puppeteer';

const TIMEOUT = 4000;
const DEBUG = false; // Sets puppeteer to show browser window

@Injectable()
export class AgentService {
  private readonly logger = new MyLogger(AgentService.name);
  imgFilePath: string;

  /**
   * Creates an instance of the AgentService class.
   * The constructor initializes the current time, sets up directories for saving screenshots and logs,
   * and creates an empty log file.
   */
  constructor() {
    // Directory to save screenshots
    const imgDir = 'images/';
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir);
    }
    this.imgFilePath = `${imgDir}screenshot.jpg`;

    this.logger.success('Images folder ready!');
  }

  /**
   * Initializes the agent.
   *
   * @returns {Promise<Object>} An object containing the initialized page, browser, messages, url, and screenshotTaken properties.
   */
  agentInit = async (): Promise<AgentDTO> => {
    this.logger.begin('Initializing agent...');

    puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({
      headless: !DEBUG,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1200, deviceScaleFactor: 1 });

    this.logger.success('Agent initialized successfully!');
    return new AgentDTO(page, browser, [agentSystem], null, false);
  };

  /**
   * Browse the specified URL and take a screenshot of the page.
   *
   * @param {Object} agentObj - The agent object containing the URL and other properties.
   * @returns {Promise<void>} - A promise that resolves when the screenshot is saved.
   */
  browseURL = async (agentObj: AgentDTO): Promise<void> => {
    this.logger.agent(`Browsing url: ${agentObj.url}`);

    await agentObj.page.goto(agentObj.url, {
      waitUntil: 'domcontentloaded',
      timeout: TIMEOUT,
    });

    await Promise.race([waitForEvent(agentObj.page, 'load'), sleep(TIMEOUT)]);

    await drawBoundingBox(agentObj.page);

    await agentObj.page.screenshot({
      path: this.imgFilePath,
      quality: 100,
    });

    agentObj.screenshotTaken = true;
    agentObj.url = null;

    this.logger.success('Screenshot saved!');
  };

  /**
   * Processes the screenshot and adds it to the agent's messages.
   *
   * @param {object} agentObj - The agent object.
   * @returns {Promise<void>} - A promise that resolves when the screenshot is processed.
   */
  processScreenshot = async (agentObj: AgentDTO): Promise<void> => {
    this.logger.agent('Processing screenshot...');

    const base64 = await imageToBase64(this.imgFilePath + 'screenshot.jpg');
    agentObj.messages.push({
      role: 'user',
      content: [
        {
          type: 'image_url',
          image_url: base64,
        },
        {
          type: 'text',
          text: agentScreenshotPrompt,
        },
      ],
    });
    agentObj.screenshotTaken = false;
  };
}
