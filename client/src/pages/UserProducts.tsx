import { AxiosError } from 'axios';
import StyledAllProducts from '../assets/wrappers/AllProductsPage';
import { UserProductsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { IProductResponse } from '../types/Products';
('react-router-dom');
import { UserProductsProvider } from '../context/UserProductsContext';

export const loader = async () => {
  try {
    const { data }: IProductResponse = await customFetch(
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
  return (
    <UserProductsProvider>
      <StyledAllProducts>
        <SearchContainer />
        <UserProductsContainer />
      </StyledAllProducts>
    </UserProductsProvider>
  );
};

export default UserProducts;
