import { FaCubes, FaMagnifyingGlass, FaMoneyBill } from 'react-icons/fa6';

import { IResultStats } from '../types/Products';
import StyledStats from '../assets/wrappers/StatsContainer';
import { StatItem } from '.';

const StatsContainer = ({ defaultStats }: { defaultStats: IResultStats }) => {
  return (
    <StyledStats>
      <StatItem
        title="search products"
        count={defaultStats.search}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaMagnifyingGlass />}
      />
      <StatItem
        title="products on sale"
        count={defaultStats.onSale}
        color="#647ecb"
        bcg="#e0e8f9"
        icon={<FaMoneyBill />}
      />
      <StatItem
        title="total products"
        count={defaultStats.userTotal}
        color="#10b981"
        bcg="#a7f3d0"
        icon={<FaCubes />}
      />
    </StyledStats>
  );
};

export default StatsContainer;
