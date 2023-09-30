import { useState } from 'react';

import { IMonthlyProducts } from '../types/Products';
import { AreaChart, BarChart } from '.';
import StyledChartsContainer from '../assets/wrappers/ChartsContainer';

const ChartsContainer = ({ data }: { data: IMonthlyProducts[] }) => {
  const [barChart, setBarchart] = useState(true);
  return (
    <StyledChartsContainer>
      <h4>Monthly Products</h4>
      <button
        className="btn"
        type="button"
        onClick={() => setBarchart(!barChart)}
      >
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </StyledChartsContainer>
  );
};

export default ChartsContainer;
