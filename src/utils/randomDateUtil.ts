export const getRandomDateLast6Months = (): Date => {
  const currentDate: Date = new Date();
  currentDate.setMonth(currentDate.getMonth() - 6);
  const randomDays: number = Math.floor(Math.random() * 181);
  currentDate.setDate(currentDate.getDate() + randomDays);

  return currentDate;
};
