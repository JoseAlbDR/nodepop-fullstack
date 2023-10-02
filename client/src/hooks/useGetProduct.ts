import { useQuery } from '@tanstack/react-query';
import { getOneProduct } from '../services/getOneProduct';

export const getProductQuery = (id: string) => {
  return {
    queryKey: ['product', id],
    queryFn: async () => getOneProduct(id),
  };
};

export const useGetProduct = async (id: string) => {
  const { data, isLoading, isError } = useQuery(getProductQuery(id));
  return { data, isLoading, isError };
};
