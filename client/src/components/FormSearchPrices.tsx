import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { getMinMaxPrices } from '../utils/getMinMaxPrice';
import { useState } from 'react';
import { useAllProductsContext } from '../context/AllProductsContext';
const FormSearchPrices = () => {
  const { data } = useAllProductsContext();
  const [value, setValue] = useState<number[]>([0, 100000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const { products } = data;
  const { minPrice, maxPrice } = getMinMaxPrices(products);

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
        onChange={handleChange}
        valueLabelDisplay="auto"
        sx={{ marginLeft: 1, color: '#8b5cf6' }}
      />
    </Box>
  );
};

export default FormSearchPrices;
