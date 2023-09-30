import { Outlet, redirect, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import StyledDashboard from '../assets/wrappers/Dashboard';
import { BigSidebar, SmallSideBar, NavBar } from '../components';
import { DashboardProvider } from '../context/DashboardContext';
import customFetch from '../utils/customFetch';

export const loader = async () => {
  try {
    const { data } = await customFetch('/users/current-user');
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect('/');
  }
};

const DashboardLayout = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';

  return (
    <DashboardProvider>
      <StyledDashboard>
        <main className="dashboard">
          <SmallSideBar />
          <BigSidebar />
          <div>
            <NavBar />
            <div className="dashboard-page">
              <Outlet context={isLoading} />
            </div>
          </div>
        </main>
      </StyledDashboard>
    </DashboardProvider>
  );
};
export default DashboardLayout;
