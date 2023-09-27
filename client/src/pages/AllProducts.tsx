import { AxiosError } from 'axios';
import StyledAllProducts from '../assets/wrappers/AllProductsPage';
import { ProductsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { IProductResponse } from '../types/Products';
import { AllProductsProvider } from '../context/AllProductsContext';
('react-router-dom');

export const loader = async () => {
  try {
    const { data }: IProductResponse = await customFetch('/products');
    return { data };
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
    }
    return error;
  }
};

const AllProducts = () => {
  return (
    <StyledAllProducts>
      <AllProductsProvider>
        <SearchContainer page="all-products" />
        <ProductsContainer />
      </AllProductsProvider>
    </StyledAllProducts>
  );
};
export default AllProducts;
