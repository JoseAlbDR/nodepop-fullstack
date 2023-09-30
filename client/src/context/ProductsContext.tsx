import React, { createContext, useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import { IProductResponse } from '../types/Products';

interface ProductsContextValues {
  data: IProductResponse;
  searchValues: { [k: string]: string };
}

const ProductsContext = createContext<ProductsContextValues | undefined>(
  undefined
);

function ProductsProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { data, searchValues } = useLoaderData() as ProductsContextValues;

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
