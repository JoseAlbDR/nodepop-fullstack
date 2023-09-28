import StyledProductsContainer from '../assets/wrappers/ProductsContainer';
import { Product } from '.';
import { useProductsContext } from '../context/ProductsContext';
const UserProductsContainer = () => {
  const { data } = useProductsContext();
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

export default UserProductsContainer;
