import { Form, useNavigate } from 'react-router-dom';

const CloseAccount = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page close-account-form">
      <Form method="post">
        <input name="form-id" hidden defaultValue="close" />
        <h4>Close Account</h4>
        <p>
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button
          type="submit"
          className="btn danger-btn"
          onClick={() => navigate(`../delete-user`)}
        >
          Delete your account
        </button>
      </Form>
    </div>
  );
};

export default CloseAccount;
