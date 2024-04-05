/**
 * Returns the current time in the format: YYYYMMDD-HHmmss.
 *
 * @returns {string} The current time in the format: YYYYMMDD-HHmmss.
 */
export const getCurrentTime = (): string => {
  var now = new Date();
  var year = now.getFullYear().toString();
  var month = (now.getMonth() + 1).toString().padStart(2, '0');
  var day = now.getDate().toString().padStart(2, '0');
  var hours = now.getHours().toString().padStart(2, '0');
  var minutes = now.getMinutes().toString().padStart(2, '0');
  var seconds = now.getSeconds().toString().padStart(2, '0');

  return `${year}${month}${day}-${hours}h${minutes}m${seconds}s`;
};
