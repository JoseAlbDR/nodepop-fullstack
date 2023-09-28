import React from 'react';

import StyledProductsPage from '../assets/wrappers/AllProductsPage';
import {
  SearchContainer,
  ProductsContainer,
  UserProductsContainer,
} from '../components';

import { ProductsProvider } from '../context/ProductsContext';

interface ProductsPageProps {
  pageType: 'user' | 'all';
}

const ProductsPage: React.FC<ProductsPageProps> = ({ pageType }) => {
  return (
    <StyledProductsPage>
      <ProductsProvider>
        {pageType === 'all' ? (
          <>
            <SearchContainer page="all-products" />
            <ProductsContainer />
          </>
        ) : (
          <>
            <SearchContainer page="user-products" />
            <UserProductsContainer />
          </>
        )}
      </ProductsProvider>
    </StyledProductsPage>
  );
};

export default ProductsPage;
