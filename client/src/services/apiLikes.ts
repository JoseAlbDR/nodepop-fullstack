import customFetch from '../utils/customFetch';

export const addLike = async (productId: string) => {
  await customFetch.post('/likes', { productId });
};

export const removeLike = async (productId: string) => {
  await customFetch.delete(`/likes/${productId}`);
};
