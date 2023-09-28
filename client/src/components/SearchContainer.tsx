import { Form, useNavigation, useSubmit } from 'react-router-dom';
import StyledSearchContainer from '../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect, SubmitBtn } from '.';
import { SORT, TYPE } from '../../../src/utils/constantsUtil';
import FormSearchPrices from './FormSearchPrices';
import { useTags } from '../hooks/useTags';
import { Link } from 'react-router-dom';
import { useProductsContext } from '../context/ProductsContext';
const SearchContainer = ({ page }: { page: string }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const { data, isLoading: isLoadingTags } = useTags();
  const {
    searchValues,
    data: { maxPrice, minPrice },
  } = useProductsContext();

  const { name, price, onSale, tags: searchTags, sort } = searchValues;

  const [max, min] = price
    ? (price.split('-') as [string, string])
    : [maxPrice, minPrice];

  const submit = useSubmit();

  if (isLoadingTags) return;
  const { tags } = data;

  return (
    <StyledSearchContainer>
      <div className="dashboard-page">
        <Form id="search-form">
          <h4>Search</h4>
          <div className="form-center">
            <FormRow
              onChange={submit}
              type="text"
              name="name"
              labelText="name"
              defaultValue={name}
              disabled={isSubmitting}
            />
            <FormSearchPrices onChange={submit} defaultValue={[+max, +min]} />
            <FormRowSelect
              name="onSale"
              types={['all', ...TYPE]}
              selected={onSale}
              onChange={submit}
            />
            <FormRowSelect
              name="category"
              types={['all', ...tags]}
              selected={searchTags}
              onChange={submit}
            />
            <FormRowSelect
              name="sort"
              types={SORT}
              selected={sort}
              onChange={submit}
            />
            <Link className="btn btn-block form-btn" to={`/dashboard/${page}`}>
              Reset Search Values
            </Link>
            <SubmitBtn formBtn />
          </div>
        </Form>
      </div>
    </StyledSearchContainer>
  );
};

export default SearchContainer;
