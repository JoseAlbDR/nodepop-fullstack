import { LoaderFunctionArgs } from 'react-router-dom';

import ProductsPage from './ProductsPage';
import { productsLoader } from '../utils/productsLoader';

export const loader = async (data: LoaderFunctionArgs) =>
  productsLoader(data, '/user-products');

const UserProducts = () => {
  return <ProductsPage pageType="user" />;
};

export default UserProducts;
