import { Page } from 'puppeteer';

/**
 * Draws bounding boxes around visible elements on a web page.
 *
 * @param {Page} page - The page object representing the web page.
 * @returns {Promise<void>} - A promise that resolves when the bounding boxes are drawn.
 */
const drawBoundingBox = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    document.querySelectorAll('[gpt-link-text]').forEach((e) => {
      e.removeAttribute('gpt-link-text');
    });
  });

  const elements = await page.$$(
    'a, button, input, textarea, select, details, [role=button], [role=link], [role=treeitem], [contenteditable], [tabindex]',
  );

  for (const e of elements) {
    await page.evaluate((e: Element) => {
      /**
       * Checks if an element is visible on the web page.
       *
       * @param {HTMLElement} el - The element to check for visibility.
       * @returns {boolean} - Returns true if the element is visible, false otherwise.
       */
      const isElementVisible = (el: HTMLElement): boolean => {
        if (!el) return false;

        /**
         * Checks if an element's style properties indicate visibility.
         *
         * @param {HTMLElement} el - The element to check.
         * @returns {boolean} Returns true if the element's style properties indicate visibility, false otherwise.
         */
        const isStyleVisible = (el: HTMLElement): boolean => {
          const style = window.getComputedStyle(el);
          return (
            style.width !== '0' &&
            style.height !== '0' &&
            style.opacity !== '0' &&
            style.display !== 'none' &&
            style.visibility !== 'hidden'
          );
        };

        /**
         * Checks if an element is within the viewport.
         *
         * @param {Element} el - The element to check.
         * @returns {boolean} Returns true if the element is within the viewport, false otherwise.
         */
        const isElementInViewport = (el: HTMLElement): boolean => {
          const rect = el.getBoundingClientRect();
          return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
              (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <=
              (window.innerWidth || document.documentElement.clientWidth)
          );
        };

        if (!isStyleVisible(el)) {
          return false;
        }

        // Traverse up the DOM and check if any ancestor element is hidden
        let parent = el;
        while (parent) {
          if (!isStyleVisible(parent)) {
            return false;
          }
          parent = parent.parentElement;
        }

        return isElementInViewport(el);
      };

      const element = e as HTMLElement;
      element.style.border = '2px solid red';
      element.style.borderRadius = '0px';

      const position = e.getBoundingClientRect();

      if (
        position.width > 5 &&
        position.height > 5 &&
        isElementVisible(e as HTMLElement)
      ) {
        const linkText = e.textContent.replace(/[^a-zA-Z0-9 ]/g, '');
        e.setAttribute('gpt-link-text', linkText);
      }
    }, e);
  }
};

export default drawBoundingBox;
