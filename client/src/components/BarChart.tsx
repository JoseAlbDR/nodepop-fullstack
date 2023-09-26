import { IMonthlyProducts } from '../types/Products';

const BarChart = ({ data }: { data: IMonthlyProducts[] }) => {
  console.log(data);
  return <div>BarChart</div>;
};

export default BarChart;
