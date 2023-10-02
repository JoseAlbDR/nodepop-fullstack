import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  Tooltip,
} from 'recharts';

import { IMonthlyProducts } from '../types/Products';
import { useDarkThemeContext } from '../context/ToggleDarkThemeContext';

const AreaChartComponent = ({ data }: { data: IMonthlyProducts[] }) => {
  const { isDarkTheme } = useDarkThemeContext();
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        {isDarkTheme ? (
          <Tooltip
            contentStyle={{
              backgroundColor: '#5b21b6',
              color: '#fff',
              accentColor: '#fff',
            }}
            itemStyle={{ color: '#fff' }}
          />
        ) : (
          <Tooltip />
        )}
        <Area type="monotone" dataKey="count" stroke="#8b5cf6" fill="#c4b5fd" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
