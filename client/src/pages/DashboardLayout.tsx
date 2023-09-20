import { Outlet } from 'react-router-dom';
import StyledDashboard from '../assets/wrappers/Dashboard';
import { BigSidebar, SmallSideBar } from '../components';
import NavBar from '../components/NavBar';
import { DashboardProvider } from '../context/DashboardContext';

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
