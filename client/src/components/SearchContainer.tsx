import { Form, useNavigation } from 'react-router-dom';
import StyledSearchContainer from '../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect, FormRowTags } from '.';
import { SORT, TYPE } from '../../../src/utils/constantsUtil';
import FormSearchPrices from './FormSearchPrices';

const SearchContainer = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

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
            <FormRowSelect name="sort" types={SORT} />
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
