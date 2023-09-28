import ProductsPage from './ProductsPage';
import { LoaderFunctionArgs } from 'react-router-dom';
import { productsLoader } from '../utils/productsLoader';
('react-router-dom');

export const loader = async (data: LoaderFunctionArgs) =>
  productsLoader(data, '/user-products');

const UserProducts = () => {
  return <ProductsPage pageType="user" />;
};

export default UserProducts;
