import { Browser, Page } from 'puppeteer';
import { OpenAIMessage } from './openai.dto';

export class AgentDTO {
  page: Page;
  browser: Browser;
  messages: OpenAIMessage[];
  url: string;
  screenshotTaken: boolean;

  constructor(
    page: Page,
    browser: Browser,
    messages: OpenAIMessage[],
    url: string,
    screenshotTaken: boolean,
  ) {
    this.page = page;
    this.browser = browser;
    this.messages = messages;
    this.url = url;
    this.screenshotTaken = screenshotTaken;
  }
}
