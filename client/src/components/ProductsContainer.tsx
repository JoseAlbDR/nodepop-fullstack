import { useAllProducts } from '../context/AllProductsContext';
import StyledProductsContainer from '../assets/wrappers/ProductsContainer';
import { Product } from '.';
const ProductsContainer = () => {
  const { data } = useAllProducts();
  const { products } = data;

  if (products.length === 0) {
    return (
      <StyledProductsContainer>
        <h2>No products to display...</h2>
      </StyledProductsContainer>
    );
  }
  return (
    <StyledProductsContainer>
      <h5>{products.length} Products Found</h5>
      <div className="products">
        {products.map((product) => {
          return <Product key={product._id} {...product} />;
        })}
      </div>
    </StyledProductsContainer>
  );
};

export default ProductsContainer;
