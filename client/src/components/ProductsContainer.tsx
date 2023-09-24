import { useAllProducts } from '../context/AllJobsContext';

const ProductsContainer = () => {
  const { data } = useAllProducts();
  console.log(data);
  return <h2>ProductsContainer</h2>;
};

export default ProductsContainer;
