import { TAGS } from './constantsUtil';

/**
 * Validate an array of tags for product queries.
 *
 * @param {string[] | string} tags - The tags to validate, which can be an array of strings or a single string.
 * @returns {boolean} `true` if the tags are valid, `false` otherwise.
 */
export const validateTags = (tags: string[] | string) => {
  // Convert a single string to an array if necessary
  if (typeof tags === 'string') tags = [tags];

  // Return false if the tags array is empty or not an array
  if (tags.length === 0 || !Array.isArray(tags)) return false;

  // Validate tags in the array by checking if they are included in the allowed tags
  const allTagsValid = tags.every((tag: string) =>
    [...TAGS, 'all'].includes(tag)
  );

  return allTagsValid;
};

/**
 * Generate a validation message for invalid tags.
 *
 * @param {string[] | string} value - The invalid tags to include in the message.
 * @returns {string} The validation message.
 */
export const tagsValidationMessage = (value: string[] | string) => {
  return `Invalid tags: ${value}, tags must be an array of strings with any combination of: ${TAGS.join(
    ', '
  )}`;
};
