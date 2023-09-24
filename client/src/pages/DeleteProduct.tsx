import { ActionFunctionArgs, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const action = async (data: ActionFunctionArgs) => {
  const { params } = data;
  try {
    await customFetch.delete(`/products/${params.id}`);
    toast.success(`Product deleted successfully`);
    return redirect('../user-products');
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
    }
    console.log(error);
    return error;
  }
};
