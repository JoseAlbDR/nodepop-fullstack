import { QueryClient } from '@tanstack/react-query';
import ProductsPage from './ProductsPage';
import { LoaderFunctionArgs } from 'react-router-dom';
import { productsLoader } from '../utils/productsLoader';

export const loader =
  (queryClient: QueryClient) => async (data: LoaderFunctionArgs) =>
    productsLoader(queryClient, data, '/favorites');

const Favorites = () => {
  return <ProductsPage pageType="favorites" />;
};

export default Favorites;
