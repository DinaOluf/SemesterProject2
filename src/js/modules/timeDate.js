/**
 * @param {string | Date} date a date encoded string or date object
 * @returns {string} a formatted date string
 */
 export const formatDate = (date) => new Date(date).toLocaleString(("no-NO"), {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }) + ' at ' + new Date(date).toLocaleTimeString(("no-NO"), {
    hour: 'numeric',
    minute: 'numeric',
  })

  
  export const todaysDate = () => new Date().toLocaleString(("no-NO"), {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }) + ' at ' + new Date().toLocaleTimeString(("no-NO"), {
    hour: 'numeric',
    minute: 'numeric',
  })