// import { AxiosError } from 'axios';
// import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router-dom';

import customFetch from '../utils/customFetch';
import { IStatsResponse } from '../types/Products';
import { ChartsContainer, StatsContainer } from '../components';

export const loader = async () => {
  const response: IStatsResponse = await customFetch.get('/products/stats');
  return response;
};

const Stats = () => {
  const { data } = useLoaderData() as IStatsResponse;
  const { resultStats, monthlyProducts } = data;
  return (
    <>
      <StatsContainer defaultStats={resultStats} />
      {monthlyProducts?.length > 1 && (
        <ChartsContainer data={monthlyProducts} />
      )}
    </>
  );
};
export default Stats;
