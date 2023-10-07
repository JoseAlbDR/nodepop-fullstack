/**
 * Validate the sorting parameter for product queries.
 *
 * @param {string} sort - The sorting parameter to validate.
 * @returns {boolean} `true` if the sorting parameter is valid, `false` otherwise.
 */
export const validateSort = (sort: string) => {
  const allowedSortValues = [
    'oldest',
    'newest',
    'a-z',
    'z-a',
    'lowest',
    'highest',
  ];

  // Check if the provided sorting parameter is in the list of allowed values
  if (!allowedSortValues.includes(sort)) {
    return false;
  }

  return true;
};
