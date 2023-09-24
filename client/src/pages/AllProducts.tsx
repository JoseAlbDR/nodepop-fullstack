import StyledAllProducts from '../assets/wrappers/AllProductsPage';
import SearchContainer from '../components/SearchContainer';
import ProductsContainer from '../components/ProductsContainer';

const AllProducts = () => {
  return (
    <StyledAllProducts>
      <SearchContainer />
      <ProductsContainer />
    </StyledAllProducts>
  );
};
export default AllProducts;
