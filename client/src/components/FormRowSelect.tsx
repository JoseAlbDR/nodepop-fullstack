import { SubmitFunction } from 'react-router-dom';
import { changePriceUrl } from '../utils/changePriceUrl';

interface IFormSelectProps {
  name: string;
  types: string[];
  selected?: string;
  onChange?: SubmitFunction;
}
const FormRowSelect = ({
  name,
  types,
  selected = '',
  onChange = () => {},
}: IFormSelectProps) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {name === 'onSale' ? 'type' : name}
      </label>
      <select
        name={name === 'category' ? 'tags' : name}
        id={name}
        className="form-input"
        defaultValue={selected}
        onChange={(e) => {
          if (e.currentTarget.form) changePriceUrl(e.currentTarget.form);
          return onChange(e.currentTarget.form);
        }}
      >
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
