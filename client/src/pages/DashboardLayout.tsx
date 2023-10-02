import { Outlet, redirect, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import StyledDashboard from '../assets/wrappers/Dashboard';
import { BigSidebar, SmallSideBar, NavBar, Spinner } from '../components';
import { DashboardProvider } from '../context/DashboardContext';
import { QueryClient } from '@tanstack/react-query';
import { userQuery } from '../hooks/useUser';

export const loader = (queryClient: QueryClient) => async () => {
  try {
    await queryClient.ensureQueryData(userQuery);
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect('/');
  }
};

const DashboardLayout = ({ queryClient }: { queryClient: QueryClient }) => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <DashboardProvider queryClient={queryClient}>
      <StyledDashboard>
        <main className="dashboard">
          <SmallSideBar />
          <BigSidebar />
          <div>
            <NavBar />
            <div className="dashboard-page">
              {isLoading ? <Spinner /> : <Outlet />}
            </div>
          </div>
        </main>
      </StyledDashboard>
    </DashboardProvider>
  );
};
export default DashboardLayout;
