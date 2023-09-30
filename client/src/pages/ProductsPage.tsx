import React from 'react';

import StyledProductsPage from '../assets/wrappers/AllProductsPage';
import { SearchContainer, ProductsContainer, Spinner } from '../components';

import { ProductsProvider } from '../context/ProductsContext';
import { useOutletContext } from 'react-router-dom';

interface ProductsPageProps {
  pageType: 'user' | 'all';
}

const ProductsPage: React.FC<ProductsPageProps> = ({ pageType }) => {
  const isLoading = useOutletContext();

  return (
    <StyledProductsPage>
      <ProductsProvider>
        <SearchContainer page={`all-${pageType}`} />
        {isLoading ? <Spinner /> : <ProductsContainer />}
      </ProductsProvider>
    </StyledProductsPage>
  );
};

export default ProductsPage;
