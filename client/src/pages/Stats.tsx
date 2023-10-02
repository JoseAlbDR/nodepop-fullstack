import { ChartsContainer, StatsContainer } from '../components';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { getStats } from '../services/getStats';

const statsQuery = {
  queryKey: ['stats'],
  queryFn: getStats,
};

export const loader = (queryClient: QueryClient) => async () => {
  await queryClient.ensureQueryData(statsQuery);
  return null;
};

const Stats = () => {
  const { data: stats } = useQuery(statsQuery);

  console.log(stats);

  return (
    <>
      <StatsContainer defaultStats={stats!.resultStats} />
      {stats!.monthlyProducts?.length > 1 && (
        <ChartsContainer data={stats!.monthlyProducts} />
      )}
    </>
  );
};
export default Stats;
