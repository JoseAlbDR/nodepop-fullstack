import { useProducts } from '../hooks/useProducts';
import StyledAllProducts from '../assets/wrappers/AllProductsPage';
const AllProducts = () => {
  const { data, isLoading } = useProducts();

  if (isLoading) return;

  console.log(data);

  return <StyledAllProducts></StyledAllProducts>;
};
export default AllProducts;
