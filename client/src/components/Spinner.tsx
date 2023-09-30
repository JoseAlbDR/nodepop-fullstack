import { CSSProperties } from 'react';
import { CircleLoader } from 'react-spinners';

const override: CSSProperties = {
  display: 'flex',
  margin: '0 auto',
  borderColor: 'red',
};

const Spinner = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
      }}
    >
      <CircleLoader
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        loading={true}
        color="#fff"
      />
    </div>
  );
};

export default Spinner;
