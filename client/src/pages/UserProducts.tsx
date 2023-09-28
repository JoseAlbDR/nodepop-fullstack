import { AxiosError } from 'axios';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { IAxiosResponse } from '../types/Products';
import ProductsPage from './ProductsPage';
('react-router-dom');

export const loader = async () => {
  try {
    const { data }: IAxiosResponse = await customFetch(
      '/products/userProducts'
    );
    return { data };
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
    }
    return error;
  }
};

const UserProducts = () => {
  return <ProductsPage pageType="user" />;
};

export default UserProducts;
