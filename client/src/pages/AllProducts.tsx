import { AxiosError } from 'axios';
import StyledAllProducts from '../assets/wrappers/AllProductsPage';
import { ProductsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { IProductResponse } from '../types/Products';
import { AllProductsProvider } from '../context/AllProductsContext';
import { LoaderFunctionArgs } from 'react-router-dom';
('react-router-dom');

export const loader = async (data: LoaderFunctionArgs) => {
  const { request } = data;

  console.log(request.url);

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  console.log(params);

  try {
    const { data }: IProductResponse = await customFetch('/products', {
      params,
    });
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
