import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/getCurrentUser';

export const userQuery = {
  queryKey: ['user'],
  queryFn: getCurrentUser,
};

export const useUser = () => {
  const { data, isLoading, isError } = useQuery(userQuery);
  return { data, isLoading, isError };
};
