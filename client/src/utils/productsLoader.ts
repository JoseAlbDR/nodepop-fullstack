import { LoaderFunctionArgs } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { productsQuery } from '../hooks/useProducts';

export const productsLoader = async (
  queryClient: QueryClient,
  data: LoaderFunctionArgs,
  pageName = ''
) => {
  const { request } = data;

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const minPrice = params['min-price'];
  const maxPrice = params['max-price'];

  if (minPrice && maxPrice) params.price = `${minPrice}-${maxPrice}`;

  if (params['min-price']) delete params['min-price'];
  if (params['max-price']) delete params['max-price'];

  await queryClient.ensureQueryData(
    productsQuery(params, pageName, minPrice, maxPrice)
  );
  return { searchValues: { ...params } };
};
