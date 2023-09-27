import { Form, useNavigation } from 'react-router-dom';
import StyledSearchContainer from '../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect } from '.';
import { SORT, TYPE } from '../../../src/utils/constantsUtil';
import FormSearchPrices from './FormSearchPrices';
import { useTags } from '../hooks/useTags';

const SearchContainer = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const { data, isLoading: isLoadingTags } = useTags();

  if (isLoadingTags) return;

  const { tags } = data;

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
            <FormSearchPrices />
            <FormRowSelect name="type" types={TYPE} />
            <FormRowSelect name="category" types={tags} />
            <FormRowSelect name="sort" types={SORT} />
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
