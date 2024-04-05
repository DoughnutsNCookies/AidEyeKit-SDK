import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { AgentDTO } from 'src/dto/agent.dto';
import { agentSystem } from 'src/dto/openai.dto';
import { MyLogger } from 'src/utils/logging';

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
}
