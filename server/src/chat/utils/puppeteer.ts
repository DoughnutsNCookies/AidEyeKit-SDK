/**
 * This function waits for a specific event to occur on the page.
 *
 * @param {Page} page - The Puppeteer page object.
 * @param {string} event - The name of the event to wait for.
 * @returns {Promise<void>} - A promise that resolves when the event occurs.
 */
export const waitForEvent = async (page: any, event: string): Promise<void> => {
  return page.evaluate((event: string) => {
    return new Promise<void>((resolve, _) => {
      document.addEventListener(event, function () {
        resolve();
      });
    });
  }, event);
};

/**
 * Asynchronously pauses the execution for the specified number of milliseconds.
 *
 * @param {number} milliseconds - The number of milliseconds to pause the execution.
 * @returns {Promise<void>} - A promise that resolves after the specified number of milliseconds.
 */
export const sleep = async (milliseconds: number): Promise<void> => {
  return await new Promise((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};
