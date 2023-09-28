import { AxiosError } from 'axios';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { IAxiosResponse } from '../types/Products';
import { LoaderFunctionArgs } from 'react-router-dom';
('react-router-dom');

export const productsLoader = async (data: LoaderFunctionArgs, page = '') => {
  const { request } = data;

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const [minPrice, maxPrice] = request.url
    .split('&')
    .filter((item) => item.startsWith('price='))
    .map((item) => item.split('=')[1]);

  if (params.price) params.price = `${minPrice}-${maxPrice}`;

  try {
    const { data }: IAxiosResponse = await customFetch(`/products${page}`, {
      params,
    });

    return { data, searchValues: { ...params } };
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
    }
    return error;
  }
};