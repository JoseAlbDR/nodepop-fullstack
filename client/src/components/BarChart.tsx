import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';

import { IMonthlyProducts } from '../types/Products';
import { useDarkThemeContext } from '../context/ToggleDarkThemeContext';

const BarChartComponent = ({ data }: { data: IMonthlyProducts[] }) => {
  const { isDarkTheme } = useDarkThemeContext();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
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

        <Bar dataKey="count" fill="#8b5cf6" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
