import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addLike as addLikeApi,
  removeLike as removeLikeApi,
} from '../services/apiAuth';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const useAddLike = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate: addLike } = useMutation({
    mutationFn: addLikeApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']),
        queryClient.invalidateQueries(['user-products']);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.msg);
      }
    },
  });
  return { isLoading, addLike };
};

export const useRemoveLike = () => {
  const queryClient = useQueryClient();
  const { isLoading, mutate: removeLike } = useMutation({
    mutationFn: removeLikeApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      queryClient.invalidateQueries(['user-products']);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.msg);
      }
    },
  });

  return { isLoading, removeLike };
};
