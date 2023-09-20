import { ITags } from '../types/productInterfaces';

export const getRandomTags = (n: number): ITags[] => {
  const tags: ITags[] = ['work', 'lifestyle', 'motor', 'mobile'];
  const randomTags: ITags[] = [];
  while (randomTags.length < n) {
    const randomPos = Math.floor(Math.random() * tags.length);
    if (!randomTags.includes(tags[randomPos])) {
      randomTags.push(tags[randomPos]);
    }
  }
  return randomTags;
};
