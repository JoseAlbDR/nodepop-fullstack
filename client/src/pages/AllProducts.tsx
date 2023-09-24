import StyledAllProducts from '../assets/wrappers/AllProductsPage';
import { ProductsContainer, SearchContainer } from '../components';

const AllProducts = () => {
  return (
    <StyledAllProducts>
      <SearchContainer />
      <ProductsContainer />
    </StyledAllProducts>
  );
};
export default AllProducts;
