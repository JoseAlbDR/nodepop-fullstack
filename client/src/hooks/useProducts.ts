import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/getProducts';

export const productsQuery = (params: { [k: string]: string }, page = '') => {
  console.log(page);
  return {
    queryKey: [`${!page ? 'products' : 'userProducts'}`],
    queryFn: async () => getProducts(params, page),
  };
};

export const useProducts = (params: { [k: string]: string }, page = '') => {
  const { data, isLoading, isError } = useQuery(productsQuery(params, page));
  return { data, isLoading, isError };
};
