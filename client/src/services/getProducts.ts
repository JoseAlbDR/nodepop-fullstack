import { IAxiosResponse } from '../types/Products';
import customFetch from '../utils/customFetch';

export const getProducts = async (
  params: { [k: string]: string },
  pageName = ''
) => {
  const { data }: IAxiosResponse = await customFetch.get(
    `/products${pageName}`,
    {
      params,
    }
  );
  return data;
};
