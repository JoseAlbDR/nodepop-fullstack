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

  const [minPrice, maxPrice] = request.url
    .split('&')
    .filter((item) => item.startsWith('price='))
    .map((item) => item.split('=')[1]);

  if (params.price) params.price = `${minPrice}-${maxPrice}`;

  await queryClient.ensureQueryData(
    productsQuery(params, pageName, minPrice, maxPrice)
  );
  return { searchValues: { ...params } };
};
