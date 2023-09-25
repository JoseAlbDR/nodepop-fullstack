import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';
import StyledAddProduct from '../assets/wrappers/DashboardFormPage';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { IProduct } from '../types/Products';
import { FormRow, FormRowSelect, FormRowTags } from '../components';
import { TYPE } from '../../../src/utils/constantsUtil';

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
  const type = formData.get('type');
  if (tags.length === 0) {
    toast.error('Select at least one tag!');
    return null;
  }
  const addProductData = Object.fromEntries(formData);
  try {
    const {
      data: { msg },
    } = await customFetch.patch(`/products/${params.id}`, {
      ...addProductData,
      onSale: type === 'on sale',
      tags,
    });
    toast.success(msg);
    return redirect('../user-products');
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
        <Form method="post">
          <h4>edit product</h4>
          <div className="form-center">
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
              name="type"
              types={TYPE}
              selected={product.onSale ? 'on sale' : 'search'}
            />
            <FormRowTags tags={product.tags} page="all" />
            <FormRow
              type="text"
              name="image"
              labelText="image"
              defaultValue={product.image}
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
export default EditJob;
