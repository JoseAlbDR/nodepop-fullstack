import { Form, useNavigation } from 'react-router-dom';
import StyledAddProduct from '../assets/wrappers/DashboardFormPage';
import { useDashboard } from '../context/DashboardContext';
import { FormRow } from '../components';
import { TYPE } from '../../../src/utils/constantsUtil';
import FormSelect from '../components/FormSelect';

const AddProduct = () => {
  const { user } = useDashboard();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  console.log(user);
  return (
    <StyledAddProduct>
      <div className="dashboard-page">
        <Form method="post">
          <h4>Add Product</h4>
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
            <FormSelect name="type" types={TYPE} />
            <FormRow
              type="email"
              name="email"
              labelText="email"
              defaultValue="jaderodev@gmail.com"
              disabled={isSubmitting}
            />
            <FormRow
              type="text"
              name="image"
              labelText="image"
              defaultValue="play5.jpg"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="btn btn-block form-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'submitting...' : 'submit'}
            </button>
          </div>
        </Form>
      </div>
    </StyledAddProduct>
  );
};
export default AddProduct;
