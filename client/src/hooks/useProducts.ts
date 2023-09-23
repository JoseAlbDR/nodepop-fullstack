import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/getProducts';

export const useProducts = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return { isLoading, data, isError };
};
