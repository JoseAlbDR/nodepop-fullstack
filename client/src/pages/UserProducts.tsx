import { LoaderFunctionArgs } from 'react-router-dom';

import ProductsPage from './ProductsPage';
import { productsLoader } from '../utils/productsLoader';
import { QueryClient } from '@tanstack/react-query';

export const loader =
  (queryClient: QueryClient) => async (data: LoaderFunctionArgs) =>
    productsLoader(queryClient, data, '/user-products');

const UserProducts = () => {
  return <ProductsPage pageType="user" />;
};

export default UserProducts;
