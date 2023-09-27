import { Form, useNavigation } from 'react-router-dom';
import StyledSearchContainer from '../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect, SubmitBtn } from '.';
import { SORT, TYPE } from '../../../src/utils/constantsUtil';
import FormSearchPrices from './FormSearchPrices';
import { useTags } from '../hooks/useTags';
import { Link } from 'react-router-dom';

const SearchContainer = ({ page }: { page: string }) => {
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
            <FormRowSelect
              name="type"
              types={['all', ...TYPE]}
              selected="all"
            />
            <FormRowSelect
              name="category"
              types={['all', ...tags]}
              selected="all"
            />
            <FormRowSelect name="sort" types={SORT} selected="newest" />
            <Link to={`/dashboard/${page}`}>Reset Search Values</Link>
            <SubmitBtn formBtn />
          </div>
        </Form>
      </div>
    </StyledSearchContainer>
  );
};

export default SearchContainer;
