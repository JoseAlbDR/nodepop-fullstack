import { AxiosResponse } from 'axios';
import { IProduct } from '../types/Products';

import customFetch from '../utils/customFetch';
export interface IProductResponse extends AxiosResponse {
  product: IProduct;
}
export const getOneProduct = async (id: string) => {
  const { data }: IProductResponse = await customFetch(`/products/${id}`);
  return data;
};
