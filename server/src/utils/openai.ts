import fs from 'fs';
import { RED, RESET } from './colors';
import readline from 'readline';

/**
 * Converts an image file to a base64 data URI.
 *
 * @param {string} imageFile - The path to the image file.
 * @returns {Promise<string>} A promise that resolves with the base64 data URI of the image.
 */
export const imageToBase64 = async (imageFile: string): Promise<string> => {
  return await new Promise((resolve, reject) => {
    fs.readFile(imageFile, (err, data) => {
      if (err) {
        console.error(RED + 'Error reading file:' + err + RESET);
        reject(err);
        return;
      }
      const base64Data = data.toString('base64');
      const dataURI = `data:image/jpeg;base64,${base64Data}`;
      resolve(dataURI);
    });
  });
};

/**
 * Prompts the user for input and returns the entered value.
 *
 * @param {string} text - The text to display as the prompt.
 * @returns {Promise<string>} A promise that resolves with the user's input.
 */
export const promptInput = async (text: string): Promise<string> => {
  let returningPrompt: string;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  await (async () => {
    return new Promise<void>((resolve) => {
      rl.question(text, (prompt) => {
        returningPrompt = prompt;
        rl.close();
        resolve();
      });
    });
  })();

  return returningPrompt;
};
