export const getRandomTags = (n: number) => {
  const tags = ['work', 'lifestyle', 'motor', 'mobile'];
  const randomTags: string[] = [];
  while (randomTags.length < n) {
    const randomPos = Math.floor(Math.random() * tags.length);
    if (!randomTags.includes(tags[randomPos])) {
      randomTags.push(tags[randomPos]);
    }
  }
  return randomTags;
};
