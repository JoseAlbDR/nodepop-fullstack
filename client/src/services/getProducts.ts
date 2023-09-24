import { IProductResponse } from '../types/Products';
import customFetch from '../utils/customFetch';

export const getProducts = async () => {
  try {
    const { data }: IProductResponse = await customFetch('products/');
    return data;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};
