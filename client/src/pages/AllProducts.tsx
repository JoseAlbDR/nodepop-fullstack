import { AxiosError } from 'axios';
import StyledAllProducts from '../assets/wrappers/AllProductsPage';
import { ProductsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

export const loader = async () => {
  try {
    const { data } = await customFetch('/products');
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect('/');
  }
};

const AllProducts = () => {
  return (
    <StyledAllProducts>
      <SearchContainer />
      <ProductsContainer />
    </StyledAllProducts>
  );
};
export default AllProducts;
