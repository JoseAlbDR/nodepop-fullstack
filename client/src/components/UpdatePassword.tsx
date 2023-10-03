import { Form } from 'react-router-dom';
import { FormRow, SubmitBtn } from '.';

const ChangePassword = ({ isSubmitting }: { isSubmitting: boolean }) => {
  return (
    <div className="dashboard-page update-password-form">
      <Form method="post" encType="application/json">
        <input name="form-id" hidden defaultValue="password" />
        <h4>Change password</h4>
        <div className="form-center password-rows">
          <div className="old-password">
            <FormRow
              type="password"
              name="oldPassword"
              labelText="old password"
              defaultValue=""
              disabled={isSubmitting}
            />
          </div>
          <div className="new-password">
            <FormRow
              type="password"
              name="newPassword"
              labelText="new password"
              defaultValue=""
              disabled={isSubmitting}
            />
          </div>
          <div className="repeat-password">
            <FormRow
              type="password"
              name="repeatNewPassword"
              labelText="repeat new password"
              defaultValue=""
              disabled={isSubmitting}
            />
          </div>
          <div className="password-button">
            <SubmitBtn formBtn />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ChangePassword;
