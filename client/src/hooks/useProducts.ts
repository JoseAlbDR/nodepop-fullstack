import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/getProducts';

export const productsQuery = (
  params: { [k: string]: string },
  pageName = '',
  minPrice = '',
  maxPrice = ''
) => {
  const { limit, name, onSale, price, sort, tags, page } = params;
  console.log(params);
  return {
    queryKey: [
      `${!pageName ? 'products' : 'userProducts'}`,
      name ?? '',
      onSale ?? 'all',
      tags ?? 'all',
      sort ?? 'newest',
      limit ?? '10',
      page ?? 1,
      price ?? `${minPrice}-${maxPrice}`,
    ],
    queryFn: async () => getProducts(params, page),
  };
};

export const useProducts = (params: { [k: string]: string }, page = '') => {
  const { data, isLoading, isError } = useQuery(productsQuery(params, page));
  return { data, isLoading, isError };
};
