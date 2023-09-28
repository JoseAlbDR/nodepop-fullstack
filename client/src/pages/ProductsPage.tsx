import React from 'react';

import StyledAllProducts from '../assets/wrappers/AllProductsPage';
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
    <StyledAllProducts>
      {pageType === 'all' ? (
        <ProductsProvider>
          <SearchContainer page="all-products" />
          <ProductsContainer />
        </ProductsProvider>
      ) : (
        <ProductsProvider>
          <SearchContainer page="user-products" />
          <UserProductsContainer />
        </ProductsProvider>
      )}
    </StyledAllProducts>
  );
};

export default ProductsPage;
