import { AxiosError } from 'axios';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { IStatsResponse } from '../types/Products';
import { useLoaderData } from 'react-router-dom';

export const loader = async () => {
  try {
    const response: IStatsResponse = await customFetch.get('/products/stats');
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
    }
    return error;
  }
};

const Stats = () => {
  const { data } = useLoaderData() as IStatsResponse;
  const { resultStats, monthlyProducts } = data;
  console.log(resultStats, monthlyProducts);
  return <h1>Stats</h1>;
};
export default Stats;
