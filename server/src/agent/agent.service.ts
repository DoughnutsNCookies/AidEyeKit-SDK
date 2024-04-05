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

  /**
   * Handles the click event on a web page.
   *
   * @param {Object} agentObj - The agent object.
   * @param {string} message - The message containing the click event details.
   * @returns {Promise<void>} - A promise that resolves when the click event is handled.
   * @throws {Error} - If the link cannot be found.
   */
  handleClick = async (agentObj: AgentDTO, message: string): Promise<void> => {
    let parts = message.split('{"click": "');
    parts = parts[1].split('"}');
    const linkText = parts[0].replace(/[^a-zA-Z0-9 ]/g, '');

    this.logger.agent(`Clicking on ${linkText}`);

    try {
      const elements = await agentObj.page.$$('[gpt-link-text]');

      let partial;
      let exact;

      for (const element of elements) {
        const attributeValue = await element.evaluate((el) =>
          el.getAttribute('gpt-link-text'),
        );

        if (attributeValue.includes(linkText)) {
          this.logger.agent(`Partial match found: ${attributeValue}`);
          partial = element;
        }

        if (attributeValue === linkText) {
          this.logger.agent(`Exact match found: ${attributeValue}`);
          exact = element;
        }
      }

      if (exact || partial) {
        const [response] = await Promise.all([
          agentObj.page
            .waitForNavigation({ waitUntil: 'domcontentloaded' })
            .catch((e) =>
              this.logger.fail(`Navigation timeout/error: ${e.message}`),
            ),
          (exact || partial).click(),
        ]);

        // Additional checks can be done here, like validating the response or URL
        await Promise.race([
          waitForEvent(agentObj.page, 'load'),
          sleep(TIMEOUT),
        ]);

        await drawBoundingBox(agentObj.page);

        await agentObj.page.screenshot({
          path: this.imgFilePath,
          quality: 100,
        });

        agentObj.screenshotTaken = true;
        this.logger.success('Screenshot saved!');
      } else {
        throw new Error('Cannot find link');
      }
    } catch (error) {
      this.logger.fail(`Clicking failed: ${error}`);

      agentObj.messages.push({
        role: 'user',
        content: 'ERROR: I was unable to click that element',
      });
    }
  };
}
