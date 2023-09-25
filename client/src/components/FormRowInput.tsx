interface IFormRowInputProps {
  type: string;
  name: string;
  labelText: string;
  id: string;
  disabled?: boolean;
}

const FormRowInput = ({
  type,
  name,
  labelText,
  disabled,
  id,
}: IFormRowInputProps) => {
  return (
    <div className="for-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        disabled={disabled}
        className="form-input"
        accept="image/*"
      />
    </div>
  );
};

export default FormRowInput;
