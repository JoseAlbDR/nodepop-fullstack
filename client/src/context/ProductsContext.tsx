import React, { createContext, useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import { IProductResponse } from '../types/Products';
import { useQuery } from '@tanstack/react-query';
import { productsQuery } from '../hooks/useProducts';
import { ErrorComponent } from '../components';

interface ProductsContextValues {
  data: IProductResponse;
  searchValues: { [k: string]: string };
}

const ProductsContext = createContext<ProductsContextValues | undefined>(
  undefined
);

function ProductsProvider({
  children,
  page,
}: {
  children: React.ReactNode;
  page: string;
}): JSX.Element {
  const { searchValues } = useLoaderData() as ProductsContextValues;
  const { data } = useQuery(productsQuery(searchValues, page));

  if (!data) return <ErrorComponent />;

  return (
    <ProductsContext.Provider value={{ data, searchValues }}>
      {children}
    </ProductsContext.Provider>
  );
}

function useProductsContext() {
  const context = useContext(ProductsContext);

  if (context === undefined)
    throw new Error(
      'All Products context was used outside of ProductsProvider'
    );
  return context;
}

export { ProductsProvider, useProductsContext };
