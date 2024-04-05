import fs from 'fs';
import { RED, RESET } from './colors';

/** 
 * Logs a message to a log file and console.
 *
 * @param {string} logfile - The path to the log file.
 * @param {string} message - The message to be logged.
 * @returns {Promise<void>} - A promise that resolves when the message is logged.
 */
export const log = async (logfile: string, message: string) => {
  const rawMessage = message.replace(/\x1b\[\d{1,2}m/g, '');

  fs.appendFile(logfile, rawMessage + '\n', (err) => {
    if (err) {
      console.error(RED + 'Error writing to log file:' + err + RESET);
    }
  });
  console.log(message);
};
