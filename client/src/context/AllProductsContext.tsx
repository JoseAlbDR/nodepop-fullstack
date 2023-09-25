import React, { createContext, useContext } from 'react';
import { IProduct, IProductResponse } from '../types/Products';
import { useLoaderData } from 'react-router-dom';

interface AllProductsContextValues {
  data: { products: IProduct[] };
}

const AllProductsContext = createContext<AllProductsContextValues | undefined>(
  undefined
);

function AllProductsProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { data } = useLoaderData() as IProductResponse;

  return (
    <AllProductsContext.Provider value={{ data }}>
      {children}
    </AllProductsContext.Provider>
  );
}

function useAllProductsContext() {
  const context = useContext(AllProductsContext);

  if (context === undefined)
    throw new Error(
      'All Products context was used outside of AllProductsProvider'
    );
  return context;
}

export { AllProductsProvider, useAllProductsContext };
