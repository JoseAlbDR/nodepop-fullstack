import { ITags } from '../../../src/types/productInterfaces';
import { useTags } from '../hooks/useTags';

interface FormRowTagsProps {
  tags?: ITags[] | null;
}

const FormRowTags = ({ tags = null }: FormRowTagsProps) => {
  const { data, isLoading: isLoadingTags } = useTags();

  console.log(tags);

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
              defaultChecked={tags ? tags.includes(tag) : index === 0}
            />
            {tag}
          </label>
        ))}
      </fieldset>
    </div>
  );
};

export default FormRowTags;
