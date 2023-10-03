import { useNavigation } from 'react-router-dom';

import StyledProfile from '../assets/wrappers/DashboardFormPage';

import ChangePassword from '../components/ChangePassword';
import UpdateProfile from '../components/UpdateProfile';

const Profile = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <StyledProfile>
      <UpdateProfile isSubmitting={isSubmitting} />
      <ChangePassword isSubmitting={isSubmitting} />
    </StyledProfile>
  );
};
export default Profile;
