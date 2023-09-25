import { Form, useNavigation } from 'react-router-dom';
import StyledProfile from '../assets/wrappers/DashboardFormPage';
import { FormRow } from '../components';
import { useDashboardContext } from '../context/DashboardContext';
import FormRowInput from '../components/FormRowInput';

const Profile = () => {
  const { user } = useDashboardContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <StyledProfile>
      <div className="dashboard-page">
        <Form method="post">
          <h4>Edit {user.name} Profile</h4>
          <div className="form-center">
            <FormRowInput
              labelText="select an image file (max 0.5MB)"
              type="file"
              id="avatar"
              name="avatar"
            />
            <FormRow
              type="text"
              name="name"
              labelText="name"
              defaultValue={user.name}
              disabled={isSubmitting}
            />
            <FormRow
              type="text"
              name="lastName"
              labelText="last name"
              defaultValue={user.lastName || 'demo user'}
              disabled={isSubmitting}
            />
            <FormRow
              type="email"
              name="email"
              labelText="email"
              defaultValue={user.email}
              disabled={isSubmitting}
            />
            <FormRow
              type="text"
              name="location"
              labelText="location"
              defaultValue={user.location || 'hot dog food truck'}
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="btn btn-block form-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'saving changes...' : 'save changes'}
            </button>
          </div>
        </Form>
      </div>
    </StyledProfile>
  );
};
export default Profile;
