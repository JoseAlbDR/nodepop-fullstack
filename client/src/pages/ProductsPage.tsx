import React from 'react';

import StyledProductsPage from '../assets/wrappers/AllProductsPage';
import { SearchContainer, ProductsContainer } from '../components';

import { ProductsProvider } from '../context/ProductsContext';

interface ProductsPageProps {
  pageType: 'user' | 'all';
}

const ProductsPage: React.FC<ProductsPageProps> = ({ pageType }) => {
  return (
    <StyledProductsPage>
      <ProductsProvider>
        <SearchContainer
          page={pageType === 'all' ? 'all-products' : 'user-products'}
        />
        <ProductsContainer />
      </ProductsProvider>
    </StyledProductsPage>
  );
};

export default ProductsPage;
