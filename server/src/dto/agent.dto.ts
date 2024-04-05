import { Browser, Page } from 'puppeteer';

export class AgentDTO {
  page: Page;
  browser: Browser;
  messages: any;
  url: string;
  screenshotTaken: boolean;

  constructor(
    page: Page,
    browser: Browser,
    messages: any,
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
