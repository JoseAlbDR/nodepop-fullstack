import { LoaderFunctionArgs } from 'react-router-dom';
import ProductsPage from './ProductsPage';
import { productsLoader } from '../utils/productsLoader';
('react-router-dom');

export const loader = async (data: LoaderFunctionArgs) => productsLoader(data);

const AllProducts = () => {
  return <ProductsPage pageType="all" />;
};
export default AllProducts;
