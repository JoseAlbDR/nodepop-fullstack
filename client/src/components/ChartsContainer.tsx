import { IMonthlyProducts } from '../types/Products';

const ChartsContainer = ({ data }: { data: IMonthlyProducts[] }) => {
  console.log(data);
  return <div>ChartsContainer</div>;
};

export default ChartsContainer;
