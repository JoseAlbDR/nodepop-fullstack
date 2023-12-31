import {
  ActionFunctionArgs,
  Form,
  redirect,
  useNavigation,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import StyledAddProduct from '../assets/wrappers/DashboardFormPage';
import {
  FormRow,
  FormRowSelect,
  FormRowTags,
  SubmitBtn,
  FormRowInput,
} from '../components';
import { TYPE } from '../../../src/utils/constantsUtil';
import customFetch from '../utils/customFetch';
import { QueryClient } from '@tanstack/react-query';

export const action =
  (queryClient: QueryClient) => async (data: ActionFunctionArgs) => {
    const { request } = data;
    const formData = await request.formData();
    const tags = formData.getAll('tags');
    const type = formData.get('onSale');

    formData.set('onSale', String(String(type) === 'on sale'));

    if (tags.length === 0) {
      toast.error('Select at least one tag!');
      return null;
    }

    try {
      const {
        data: { msg },
      } = await customFetch.post('/products', formData);
      queryClient.invalidateQueries(['userProducts']);
      queryClient.invalidateQueries(['products']);
      queryClient.invalidateQueries(['tags']);
      toast.success(msg);
      return redirect('all-products');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.status === 413)
          toast.error('File has to be smaller than 0.5MB');
        toast.error(error?.response?.data?.msg);
      }
      console.log(error);
      return error;
    }
  };

const AddProduct = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <StyledAddProduct>
      <div className="dashboard-page">
        <Form method="post" encType="multipart/form-data">
          <h4>Add Product</h4>
          <div className="form-center">
            <FormRowInput
              labelText="select an image file (max 0.5MB)"
              type="file"
              id="image"
              name="image"
            />
            <FormRow
              type="text"
              name="name"
              labelText="name"
              defaultValue=""
              disabled={isSubmitting}
            />
            <FormRow
              type="number"
              name="price"
              labelText="price"
              defaultValue=""
              disabled={isSubmitting}
            />
            <FormRowSelect name="onSale" types={TYPE} />
            <FormRowTags page="all" />
            <SubmitBtn formBtn />
          </div>
        </Form>
      </div>
    </StyledAddProduct>
  );
};
export default AddProduct;
