import { LoaderFunctionArgs, redirect, useLoaderData } from 'react-router-dom';

import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { IProduct } from '../types/Products';

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
      return redirect('/dashboard/my-products');
    }
    return error;
  }
};

export const action = async () => {
  return null;
};

const EditJob = () => {
  const { product } = useLoaderData() as IProductResponse;
  console.log(product);

  return <h1>Edit Product</h1>;
};
export default EditJob;
