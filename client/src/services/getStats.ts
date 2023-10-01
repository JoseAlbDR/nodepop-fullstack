import { IStatsResponse } from '../types/Products';
import customFetch from '../utils/customFetch';

export const getStats = async () => {
  const { data }: IStatsResponse = await customFetch.get('/products/stats');
  return data;
};
