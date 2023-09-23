import { ITags } from '../../../src/types/productInterfaces';
import { useTags } from '../hooks/useTags';

const FormRowTags = () => {
  const { data, isLoading: isLoadingTags } = useTags();
  if (isLoadingTags) return;
  return (
    <div className="form-row">
      <label className="form-label">tags</label>
      <fieldset className="form-tags">
        {data.tags.map((tag: ITags, index: number) => (
          <label key={tag}>
            <input
              type="checkbox"
              name="tags"
              value={tag}
              className="input-check"
              defaultChecked={index === 0}
            />
            {tag}
          </label>
        ))}
      </fieldset>
    </div>
  );
};

export default FormRowTags;
