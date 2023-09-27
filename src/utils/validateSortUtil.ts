export const validateSort = (sort: string) => {
  const allowedSortValues = [
    'oldest',
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
