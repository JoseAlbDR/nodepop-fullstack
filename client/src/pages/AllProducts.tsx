import { LoaderFunctionArgs } from 'react-router-dom';

import ProductsPage from './ProductsPage';
import { productsLoader } from '../utils/productsLoader';
import { QueryClient } from '@tanstack/react-query';

export const loader =
  (queryClient: QueryClient) => async (data: LoaderFunctionArgs) =>
    productsLoader(queryClient, data);

const AllProducts = () => {
  return <ProductsPage pageType="all" />;
};
export default AllProducts;
