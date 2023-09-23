import { ActionFunctionArgs, Form, useNavigation } from 'react-router-dom';
import StyledAddProduct from '../assets/wrappers/DashboardFormPage';
// import { useDashboard } from '../context/DashboardContext';
import { FormRow, FormSelect, FormTags } from '../components';
import { TYPE } from '../../../src/utils/constantsUtil';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { AxiosError } from 'axios';

export const action = async (data: ActionFunctionArgs) => {
  const { request } = data;
  const formData = await request.formData();
  const tags = formData.getAll('tags');
  const type = formData.get('type');
  if (tags.length === 0) {
    toast.error('Select at least one tag!');
    return null;
  }
  const addProductData = Object.fromEntries(formData);
  try {
    const {
      data: { msg },
    } = await customFetch.post('/products', {
      ...addProductData,
      onSale: type === 'on sale',
      tags,
    });
    toast.success(msg);
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
    }
    console.log(error);
    return error;
  }
};

const AddProduct = () => {
  // const { user } = useDashboard();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
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
            <FormTags />
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
