import customFetch from '../utils/customFetch';

export const getTags = async () => {
  try {
    const tags = await customFetch('products/tags');
    return tags.data;
  } catch (error) {
    throw new Error('Error fetching tags');
  }
};
