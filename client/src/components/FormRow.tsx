import { IFormRowProps } from '../types/FormRow';

const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  disabled,
  onChange = () => {},
}: IFormRowProps) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText}
      </label>
      <input
        className="form-input"
        type={type}
        id={name}
        min={type === 'number' ? 0 : ''}
        name={name}
        defaultValue={defaultValue || ''}
        disabled={disabled}
        onChange={(e) => onChange(e.currentTarget.form)}
        required
      />
    </div>
  );
};

export default FormRow;
