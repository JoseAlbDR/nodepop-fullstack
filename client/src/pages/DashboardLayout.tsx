import { Outlet, redirect } from 'react-router-dom';
import StyledDashboard from '../assets/wrappers/Dashboard';
import { BigSidebar, SmallSideBar } from '../components';
import NavBar from '../components/NavBar';
import { DashboardProvider } from '../context/DashboardContext';
import customFetch from '../utils/customFetch';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

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
  return (
    <DashboardProvider>
      <StyledDashboard>
        <main className="dashboard">
          <SmallSideBar />
          <BigSidebar />
          <div>
            <NavBar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </StyledDashboard>
    </DashboardProvider>
  );
};
export default DashboardLayout;
