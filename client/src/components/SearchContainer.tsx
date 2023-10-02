/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, Form, useNavigation, useSubmit } from 'react-router-dom';

import StyledSearchContainer from '../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect, FormSearchPrices } from '.';
import { SORT, TYPE } from '../../../src/utils/constantsUtil';
import { useTags } from '../hooks/useTags';
import { useProductsContext } from '../context/ProductsContext';

const SearchContainer = ({ page }: { page: string }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const { data, isLoading: isLoadingTags } = useTags();
  const {
    searchValues,
    data: { maxPrice, minPrice, limit: defaultLimit },
  } = useProductsContext();

  const { name, price, onSale, tags: searchTags, sort, limit } = searchValues;

  const [max, min] = price
    ? (price.split('-') as [string, string])
    : [maxPrice, minPrice];

  const submit = useSubmit();

  if (isLoadingTags) return;
  const { tags } = data;

  const debounce = (onChange: (e: any) => void) => {
    let timeout: NodeJS.Timeout | undefined;
    return (e: { currentTarget: { form: any } }) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1000);
    };
  };

  return (
    <StyledSearchContainer>
      <div className="dashboard-page">
        <Form id="search-form">
          <h4>Search</h4>
          <div className="form-center">
            <FormRow
              onChange={debounce((form) => {
                submit(form);
              })}
              type="search"
              name="name"
              labelText="name"
              defaultValue={name}
              disabled={isSubmitting}
            />
            <FormSearchPrices onChange={submit} defaultValue={[+min, +max]} />
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
            <FormRowSelect
              name="limit"
              types={['5', '10', '20', '50']}
              selected={limit || String(defaultLimit)}
              onChange={submit}
            />
            <Link className="btn btn-block form-btn" to={`/dashboard/${page}`}>
              Reset Search Values
            </Link>
          </div>
        </Form>
      </div>
    </StyledSearchContainer>
  );
};

export default SearchContainer;
