import { Form, useNavigation } from 'react-router-dom';
import StyledSearchContainer from '../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect, FormRowTags } from '.';
import { TYPE } from '../../../src/utils/constantsUtil';
import { useProducts } from '../hooks/useProducts';
import { getMinMaxPrices } from '../utils/getMinMaxPrice';

const SearchContainer = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const { data, isLoading } = useProducts();

  if (isLoading) return;
  if (!data) return;

  const { products } = data;

  const { minPrice, maxPrice } = getMinMaxPrices(products);

  if (minPrice && maxPrice) console.log({ minPrice, maxPrice });

  return (
    <StyledSearchContainer>
      <div className="dashboard-page">
        <Form method="post">
          <h4>Search</h4>
          <div className="form-center">
            <FormRow
              type="text"
              name="name"
              labelText="name"
              defaultValue="Play 5"
              disabled={isSubmitting}
            />
            <FormRow
              type="number"
              name="price"
              labelText="price"
              defaultValue="300"
              disabled={isSubmitting}
            />
            <FormRowSelect name="type" types={TYPE} />
            <FormRowTags />
            <button type="reset" className="btn btn-block form-btn">
              reset search values
            </button>
          </div>
        </Form>
      </div>
    </StyledSearchContainer>
  );
};

export default SearchContainer;
