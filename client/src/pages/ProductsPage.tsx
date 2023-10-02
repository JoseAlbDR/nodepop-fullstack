import React from 'react';

import StyledProductsPage from '../assets/wrappers/AllProductsPage';
import { SearchContainer, ProductsContainer } from '../components';

import { ProductsProvider } from '../context/ProductsContext';

interface ProductsPageProps {
  pageType: 'user' | 'all';
}

const ProductsPage: React.FC<ProductsPageProps> = ({ pageType }) => {
  const page = pageType === 'all' ? 'all-products' : 'user-products';
  return (
    <StyledProductsPage>
      <ProductsProvider page={pageType === 'all' ? '' : `/${page}`}>
        <SearchContainer page={page} />
        <ProductsContainer />
      </ProductsProvider>
    </StyledProductsPage>
  );
};

export default ProductsPage;
