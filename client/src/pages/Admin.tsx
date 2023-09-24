import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { AxiosError, AxiosResponse } from 'axios';
import { redirect, useLoaderData } from 'react-router-dom';
import StyledStats from '../assets/wrappers/StatsContainer';
interface StatsResponse extends AxiosResponse {
  users: number;
  products: number;
}

export const loader = async () => {
  try {
    const response = await customFetch.get('/users/admin/app-stats');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect('/dashboard');
  }
};

const Admin = () => {
  const { users, products } = useLoaderData() as StatsResponse;

  console.log(users, products);

  return (
    <StyledStats>
      <h1>admin page</h1>
    </StyledStats>
  );
};
export default Admin;
