import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import { SubmitFunction } from 'react-router-dom';
import { useProductsContext } from '../context/ProductsContext';

const FormSearchPrices = ({ onChange }: { onChange: SubmitFunction }) => {
  const { data } = useProductsContext();
  const { minPrice, maxPrice } = data;
  const [value, setValue] = useState<number[]>([minPrice, maxPrice]);

  const handleChange = (event: Event, newValue: number | number[]) => {
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
          if (min > minPrice!) price = `${min}-`;
          if (max < maxPrice!) price = `-${max}`;
          if (min > minPrice! && max < maxPrice!) price = `${min}-${max}`;
          if (min === max) price = `${min}`;

          onChange({ price });
        }}
        valueLabelDisplay="auto"
        sx={{ marginLeft: 1, color: '#8b5cf6' }}
      />
    </Box>
  );
};

export default FormSearchPrices;
