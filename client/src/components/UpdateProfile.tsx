import { FormRow, FormRowInput, SubmitBtn } from '.';
import { Form } from 'react-router-dom';
import { useDashboardContext } from '../context/DashboardContext';

const UpdateProfile = ({ isSubmitting }: { isSubmitting: boolean }) => {
  const { user } = useDashboardContext();
  return (
    <div className="dashboard-page">
      <Form method="post" encType="multipart/form-data">
        <input name="form-id" hidden defaultValue="profile" />
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
          <SubmitBtn formBtn />
        </div>
      </Form>
    </div>
  );
};

export default UpdateProfile;
