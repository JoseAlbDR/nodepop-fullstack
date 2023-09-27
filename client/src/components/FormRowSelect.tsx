interface IFormSelectProps {
  name: string;
  types: string[];
  selected?: string;
}
const FormRowSelect = ({ name, types, selected = '' }: IFormSelectProps) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {name === 'onSale' ? 'type' : name}
      </label>
      <select
        name={name}
        id={name}
        className="form-input"
        defaultValue={selected}
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
