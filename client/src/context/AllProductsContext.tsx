import React, { createContext, useContext } from 'react';
import { IProduct } from '../types/Products';
import { useLoaderData } from 'react-router-dom';

interface AllProductsContextValues {
  data: {
    currentPage: number;
    maxPrice: number;
    minPrice: number;
    numOfPages: number;
    totalProducts: number;
    products: IProduct[];
  };
  searchValues: { [k: string]: string };
}

const AllProductsContext = createContext<AllProductsContextValues | undefined>(
  undefined
);

function AllProductsProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { data, searchValues } = useLoaderData() as {
    data: {
      currentPage: number;
      maxPrice: number;
      minPrice: number;
      numOfPages: number;
      totalProducts: number;
      products: IProduct[];
    };
    searchValues: { [k: string]: string };
  };

  return (
    <AllProductsContext.Provider value={{ data, searchValues }}>
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
