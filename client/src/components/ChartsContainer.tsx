import { IMonthlyProducts } from '../types/Products';
import StyledChartsContainer from '../assets/wrappers/ChartsContainer';
import { useState } from 'react';
import BarChart from './BarChart';
import { AreaChart } from '.';

const ChartsContainer = ({ data }: { data: IMonthlyProducts[] }) => {
  const [barChart, setBarchart] = useState(true);
  return (
    <StyledChartsContainer>
      <h4>Monthly Products</h4>
      <button type="button" onClick={() => setBarchart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </StyledChartsContainer>
  );
};

export default ChartsContainer;
