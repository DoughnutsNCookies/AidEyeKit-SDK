import { Injectable } from '@nestjs/common';
import { log } from '../utils/logging';
import { RED, BLUE, GREEN, RESET } from '../utils/colors';
import fs from 'fs';

@Injectable()
export class AgentService {
  currentTime: string;
  imgFilePath: string;
  logFilePath: string;

  constructor() {
    log(this.logFilePath, BLUE + 'Creating logs...' + RESET);

    this.currentTime = new Date().toISOString();

    // Directory to save screenshots
    const imgDir = 'images/';
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir);
    }
    this.imgFilePath = `${imgDir}screenshot.jpg`;

    // Using date and time in the log file name
    const logDir = 'logs/';
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
    this.logFilePath = `${logDir}log-${this.currentTime}.txt`;
    fs.writeFileSync(this.logFilePath, '');

    log(this.logFilePath, GREEN + 'Logs ready!' + RESET);
  }
}
