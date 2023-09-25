import React, { createContext, useContext } from 'react';
import { IProduct, IProductResponse } from '../types/Products';
import { useLoaderData } from 'react-router-dom';

interface UserProductsContextValues {
  data: { products: IProduct[] };
}

const UserProductsContext = createContext<
  UserProductsContextValues | undefined
>(undefined);

function UserProductsProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { data } = useLoaderData() as IProductResponse;

  return (
    <UserProductsContext.Provider value={{ data }}>
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
