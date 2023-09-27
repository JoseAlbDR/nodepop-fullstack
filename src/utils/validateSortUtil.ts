export const validateSort = (sort: string) => {
  const allowedSortValues = [
    'latest',
    'newest',
    'a-z',
    'z-a',
    'lowest',
    'highest',
  ];
  if (!allowedSortValues.includes(sort)) {
    return false;
  }
  return true;
};
