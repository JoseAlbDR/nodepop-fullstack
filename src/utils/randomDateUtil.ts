/**
 * Generate a random date within the last 6 months from the current date.
 *
 * @returns {Date} A randomly generated date within the last 6 months.
 */
export const getRandomDateLast6Months = (): Date => {
  const currentDate: Date = new Date();

  // Set the current date to 6 months ago
  currentDate.setMonth(currentDate.getMonth() - 6);

  // Generate a random number of days within the range of 0 to 180 (inclusive)
  const randomDays: number = Math.floor(Math.random() * 181);

  // Add the random number of days to the current date
  currentDate.setDate(currentDate.getDate() + randomDays);

  return currentDate;
};
