import { IProduct } from '../types/Products';
import _ from 'lodash';
export const getMinMaxPrices = (products: IProduct[]) => {
  const prices = products.map((product) => product.price);
  const maxPrice = _.max(prices);
  const minPrice = _.min(prices);

  return { minPrice, maxPrice };
};
