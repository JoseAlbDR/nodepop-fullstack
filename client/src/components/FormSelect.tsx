interface IFormSelectProps {
  name: string;
  types: string[];
}
const FormSelect = ({ name, types }: IFormSelectProps) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {name}
      </label>
      <select name={name} id={name} className="form-input">
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
