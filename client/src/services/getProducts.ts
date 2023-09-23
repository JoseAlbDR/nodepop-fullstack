import customFetch from '../utils/customFetch';

export const getProducts = async () => {
  try {
    const products = await customFetch('products/');
    return products.data;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};
