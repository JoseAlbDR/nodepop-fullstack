import { TAGS } from './constantsUtil';

export const validateTags = (tags: string[]) => {
  if (typeof tags === 'string') tags = [tags];
  if (tags.length === 0) return false;
  if (!Array.isArray(tags)) return false;
  // Validate tags in array
  const allTagsValid = tags.every((tag: string) => TAGS.includes(tag));
  if (!allTagsValid) return false;
  return true;
};

export const tagsValidationMessage = (value: string[] | string) => {
  return `Invalid tags: ${value}, tags must be an array of strings with any combination of: ${TAGS.join(
    ', '
  )}`;
};
