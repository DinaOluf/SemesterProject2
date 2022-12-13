/**
 * @param {string | Date} date a date encoded string or date object
 * @returns {string} a formatted date string
 */
export const formatDate = (date) =>
  new Date(date).toLocaleString("en-ZA", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  }) +
  " at " +
  new Date(date).toLocaleTimeString("en-ZA", {
    hour: "numeric",
    minute: "numeric",
  });
