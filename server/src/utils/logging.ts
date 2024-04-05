import { ConsoleLogger, Injectable } from '@nestjs/common';
import { RED, BLUE, GREEN, PURPLE, RESET } from './colors';
import { getCurrentTime } from './time';
import * as fs from 'fs';

@Injectable()
export class MyLogger extends ConsoleLogger {
  private currentTime: string;
  private logFilePath: string;

  constructor(context?: string) {
    super(context);
    this.currentTime = getCurrentTime();

    // Using date and time in the log file name
    const logDir = 'logs/';
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    this.logFilePath = `${logDir}log-${this.currentTime}.txt`;
    fs.writeFileSync(this.logFilePath, '');

    this.success('Logs ready!');
  }

  begin(message: string) {
    fs.appendFile(this.logFilePath, message + '\n', (err) => {
      if (err) {
        console.error(RED + 'Error writing to log file:' + err + RESET);
      }
    });
    super.log(BLUE + message + RESET);
  }

  success(message: string) {
    fs.appendFile(this.logFilePath, message + '\n', (err) => {
      if (err) {
        console.error(RED + 'Error writing to log file:' + err + RESET);
      }
    });
    super.log(GREEN + message + RESET);
  }

  fail(message: string) {
    fs.appendFile(this.logFilePath, message + '\n', (err) => {
      if (err) {
        console.error(RED + 'Error writing to log file:' + err + RESET);
      }
    });
    super.error(RED + message + RESET);
  }

  agent(message: string) {
    fs.appendFile(this.logFilePath, message + '\n', (err) => {
      if (err) {
        console.error(RED + 'Error writing to log file:' + err + RESET);
      }
    });
    super.error(PURPLE + message + RESET);
  }

  normal(message: string) {
    fs.appendFile(this.logFilePath, message + '\n', (err) => {
      if (err) {
        console.error(RED + 'Error writing to log file:' + err + RESET);
      }
    });
  }
}
