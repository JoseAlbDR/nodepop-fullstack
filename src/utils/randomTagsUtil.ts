import { ITags } from '../types/productInterfaces';

/**
 * Generate an array of random unique tags from a predefined set.
 *
 * @param {number} n - The number of random tags to generate.
 * @returns {ITags[]} An array of randomly generated unique tags.
 */
export const getRandomTags = (n: number): ITags[] => {
  // Predefined set of tags
  const tags: ITags[] = ['work', 'lifestyle', 'motor', 'mobile'];

  // Array to store randomly generated unique tags
  const randomTags: ITags[] = [];

  while (randomTags.length < n) {
    // Generate a random position within the predefined set of tags
    const randomPos = Math.floor(Math.random() * tags.length);

    // Check if the generated tag is not already in the result array
    if (!randomTags.includes(tags[randomPos])) {
      // Add the random tag to the result array
      randomTags.push(tags[randomPos]);
    }
  }

  return randomTags;
};
