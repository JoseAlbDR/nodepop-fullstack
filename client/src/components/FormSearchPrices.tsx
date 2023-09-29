import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import { SubmitFunction } from 'react-router-dom';
import { useProductsContext } from '../context/ProductsContext';

const FormSearchPrices = ({
  onChange,
  defaultValue,
}: {
  onChange: SubmitFunction;
  defaultValue: [number, number];
}) => {
  const { data } = useProductsContext();
  const { minPrice, maxPrice } = data;
  const [value, setValue] = useState<[number, number]>(defaultValue);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as [number, number]);
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
        onChangeCommitted={() => {
          const form = document.getElementById('search-form');
          onChange(form as HTMLFormElement);
        }}
        valueLabelDisplay="auto"
        sx={{ marginLeft: 1, color: '#8b5cf6' }}
      />
    </Box>
  );
};

export default FormSearchPrices;
