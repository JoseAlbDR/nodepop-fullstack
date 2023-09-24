import { useParams } from 'react-router-dom';
import { IProductResponse } from '../types/Products';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const loader = async () => {
  try {
    const { data }: IProductResponse = await customFetch('/products');
    return { data };
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
    }
    return error;
  }
};

export const action = async () => {
  return null;
};

const EditJob = () => {
  const param = useParams();
  console.log(param);

  return <h1>Edit Product</h1>;
};
export default EditJob;
