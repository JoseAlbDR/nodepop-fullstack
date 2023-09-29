import StyledProductsContainer from '../assets/wrappers/ProductsContainer';
import { Product } from '.';
import { useProductsContext } from '../context/ProductsContext';
import PageBtnContainer from './PageBtnContainer';
const ProductsContainer = () => {
  const { data } = useProductsContext();
  const { products, totalProducts, numOfPages } = data;

  if (products.length === 0) {
    return (
      <StyledProductsContainer>
        <h2>No products to display...</h2>
      </StyledProductsContainer>
    );
  }
  return (
    <StyledProductsContainer>
      {numOfPages > 1 && <PageBtnContainer />}
      <h5>
        {totalProducts} Product{products.length > 1 && 's'} Found
      </h5>
      <div className="products">
        {products.map((product) => {
          return <Product key={product._id} {...product} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </StyledProductsContainer>
  );
};

export default ProductsContainer;
