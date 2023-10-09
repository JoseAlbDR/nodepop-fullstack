import { QueryClient, useQuery } from '@tanstack/react-query';
import StyledProductsContainer from '../assets/wrappers/ProductsContainer';
import customFetch from '../utils/customFetch';
import { Product } from '../components';
import { IProductResponse } from '../types/Products';

export const favoritesQuery = {
  queryKey: ['favorites'],
  queryFn: async (): Promise<IProductResponse> => {
    const { data } = await customFetch('/products/favorites');
    return data;
  },
};

export const loader = (queryClient: QueryClient) => async () => {
  try {
    await queryClient.ensureQueryData(favoritesQuery);
    return null;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const Favorites = () => {
  const { data } = useQuery(favoritesQuery);

  const totalProducts = data?.totalProducts || 0;
  const products = data?.products || [];

  if (products.length === 0) {
    return (
      <StyledProductsContainer>
        <h2>No products to display...</h2>
      </StyledProductsContainer>
    );
  }
  return (
    <StyledProductsContainer>
      <h5>
        {totalProducts} Product{products.length > 1 && 's'} Found
      </h5>
      <div className="products">
        {products.map((product) => {
          return <Product key={product._id} {...product} />;
        })}
      </div>
    </StyledProductsContainer>
  );
};
// };

export default Favorites;
