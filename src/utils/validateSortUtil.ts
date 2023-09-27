export const validateSort = (sort: string) => {
  const allowedSortValues = [
    'oldest',
    'latest',
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
