import { ConsoleLogger, Injectable } from '@nestjs/common';
import { RED, BLUE, GREEN, PURPLE, RESET } from './colors';
import * as fs from 'fs';
import { logFilePath } from 'src/dto/logging.dto';

@Injectable()
export class MyLogger extends ConsoleLogger {
  private logFilePath: string;

  constructor(context?: string) {
    super(context);
    // Using date and time in the log file name
    const logDir = 'logs/';
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    this.logFilePath = logFilePath;
    fs.writeFileSync(this.logFilePath, '');

    this.success('Logs ready!');
  }

  begin(message: string) {
    fs.appendFile(this.logFilePath, message + '\n', (err) => {
      if (err) {
        console.error(RED + 'Error writing to log file:' + err + RESET);
      }
    });
    super.debug(BLUE + message + RESET);
  }

  success(message: string) {
    fs.appendFile(this.logFilePath, message + '\n', (err) => {
      if (err) {
        console.error(RED + 'Error writing to log file:' + err + RESET);
      }
    });
    super.debug(GREEN + message + RESET);
  }

  fail(message: string) {
    fs.appendFile(this.logFilePath, message + '\n', (err) => {
      if (err) {
        console.error(RED + 'Error writing to log file:' + err + RESET);
      }
    });
    super.debug(RED + message + RESET);
  }

  agent(message: string) {
    fs.appendFile(this.logFilePath, message + '\n', (err) => {
      if (err) {
        console.error(RED + 'Error writing to log file:' + err + RESET);
      }
    });
    super.debug(PURPLE + message + RESET);
  }

  normal(message: string) {
    fs.appendFile(this.logFilePath, message + '\n', (err) => {
      if (err) {
        console.error(RED + 'Error writing to log file:' + err + RESET);
      }
    });
  }
}
