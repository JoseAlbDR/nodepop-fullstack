import { useQuery } from '@tanstack/react-query';
import { getTags } from '../services/getTags';

export const useTags = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  });

  return { isLoading, data, isError };
};
