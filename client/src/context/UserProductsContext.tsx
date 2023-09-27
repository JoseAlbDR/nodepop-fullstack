import React, { createContext, useContext } from 'react';
import { IProduct } from '../types/Products';
import { useLoaderData } from 'react-router-dom';

interface UserProductsContextValues {
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

const UserProductsContext = createContext<
  UserProductsContextValues | undefined
>(undefined);

function UserProductsProvider({
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
    <UserProductsContext.Provider value={{ data, searchValues }}>
      {children}
    </UserProductsContext.Provider>
  );
}

function useUserProductsContext() {
  const context = useContext(UserProductsContext);

  if (context === undefined)
    throw new Error(
      'User Products context was used outside of UserProductsProvider'
    );
  return context;
}

export { UserProductsProvider, useUserProductsContext };
