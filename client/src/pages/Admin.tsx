import { AxiosError, AxiosResponse } from 'axios';
import { redirect, useLoaderData } from 'react-router-dom';
import { FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa';

import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import StyledStats from '../assets/wrappers/StatsContainer';
import { StatItem } from '../components';

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
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="current products"
        count={products}
        color="#647ecb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </StyledStats>
  );
};
export default Admin;
