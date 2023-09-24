import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useProducts } from '../hooks/useProducts';
import { getMinMaxPrices } from '../utils/getMinMaxPrice';
import { useState } from 'react';
const FormSearchPrices = () => {
  const { data, isLoading } = useProducts();
  const [value, setValue] = useState<number[]>([0, 100000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  if (isLoading) return;
  if (!data) return;

  const { products } = data;
  const { minPrice, maxPrice } = getMinMaxPrices(products);

  return (
    <Box
      sx={{
        marginRight: '1rem',
      }}
    >
      <Typography gutterBottom>Price</Typography>
      <Slider
        // defaultValue={minPrice}
        min={minPrice}
        max={maxPrice}
        value={value}
        step={1}
        onChange={handleChange}
        valueLabelDisplay="auto"
        sx={{ marginLeft: 1 }}
      />
    </Box>
  );
};

export default FormSearchPrices;
