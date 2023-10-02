import { IAxiosResponse } from '../types/Products';
import customFetch from '../utils/customFetch';

export const getProducts = async (
  params: { [k: string]: string },
  page: string
) => {
  const { data }: IAxiosResponse = await customFetch(
    `/products${page}`,
    params
  );
  console.log(data);
  return data;
};
