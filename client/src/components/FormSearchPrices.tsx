import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import { useAllProductsContext } from '../context/AllProductsContext';
import { SubmitFunction } from 'react-router-dom';

const FormSearchPrices = ({ onChange }: { onChange: SubmitFunction }) => {
  const { data } = useAllProductsContext();
  const [value, setValue] = useState<number[]>([0, 100000]);
  const { minPrice, maxPrice } = data;

  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log('new value: ' + newValue);
    setValue(newValue as number[]);
  };

  return (
    <Box
      sx={{
        marginRight: '1rem',
      }}
    >
      <label className="form-label" htmlFor="price">
        price
      </label>
      <Slider
        // defaultValue={minPrice}
        min={minPrice}
        max={maxPrice}
        value={value}
        step={1}
        name="price"
        onChange={handleChange}
        onChangeCommitted={(e, newValue) => {
          const [min, max] = newValue as number[];
          let price = '';
          if (min === minPrice && max === maxPrice) {
            price = `${minPrice}-${maxPrice}`;
          }
          if (min === max) price = `${min}`;
          if (min > minPrice!) price = `${min}-`;
          if (max < maxPrice!) price = `-${max}`;
          if (min > minPrice! && max < maxPrice!) price = `${min}-${max}`;

          onChange({ price });
        }}
        valueLabelDisplay="auto"
        sx={{ marginLeft: 1, color: '#8b5cf6' }}
      />
    </Box>
  );
};

export default FormSearchPrices;
