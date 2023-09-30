import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import StyledAddProduct from '../assets/wrappers/DashboardFormPage';
import customFetch from '../utils/customFetch';
import { TYPE } from '../../../src/utils/constantsUtil';
import { IProduct } from '../types/Products';
import {
  FormRow,
  FormRowSelect,
  FormRowTags,
  SubmitBtn,
  FormRowInput,
} from '../components';

export interface IProductResponse extends AxiosResponse {
  product: IProduct;
}
export const loader = async (data: LoaderFunctionArgs) => {
  const { params } = data;
  try {
    const { data }: IProductResponse = await customFetch(
      `/products/${params.id}`
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
      return redirect('/dashboard/user-products');
    }
    return error;
  }
};

export const action = async (data: ActionFunctionArgs) => {
  const { request, params } = data;
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
    } = await customFetch.patch(`/products/${params.id}`, formData);
    toast.success(msg);
    return redirect('../all-products');
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
    }
    console.log(error);
    return error;
  }
};

const EditJob = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const { product } = useLoaderData() as IProductResponse;

  return (
    <StyledAddProduct>
      <div className="dashboard-page">
        <Form method="post" encType="multipart/form-data">
          <h4>edit product</h4>
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
              defaultValue={product.name}
              disabled={isSubmitting}
            />
            <FormRow
              type="number"
              name="price"
              labelText="price"
              defaultValue={String(product.price)}
              disabled={isSubmitting}
            />
            <FormRowSelect
              name="onSale"
              types={TYPE}
              selected={product.onSale ? 'on sale' : 'search'}
            />
            <FormRowTags tags={product.tags} page="all" />
            <SubmitBtn formBtn />
          </div>
        </Form>
      </div>
    </StyledAddProduct>
  );
};
export default EditJob;
