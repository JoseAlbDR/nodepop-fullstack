import { IAxiosResponse } from '../types/Products';
import customFetch from '../utils/customFetch';

export const getProducts = async (
  params: { [k: string]: string },
  page = ''
) => {
  console.log(params);
  const { data }: IAxiosResponse = await customFetch.get(`/products${page}`, {
    params,
  });
  console.log(data);
  return data;
};
