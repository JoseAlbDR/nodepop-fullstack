import { ITags } from '../../../src/types/productInterfaces';
import { TAGS } from '../../../src/utils/constantsUtil';
import { useTags } from '../hooks/useTags';

interface FormRowTagsProps {
  tags?: ITags[] | null;
  page?: string;
}

const FormRowTags = ({ tags = null, page = '' }: FormRowTagsProps) => {
  const { data, isLoading: isLoadingTags } = useTags();

  const renderTags = page === 'add-product' ? TAGS : data?.tags;

  if (isLoadingTags) return;
  return (
    <div className="form-row">
      <label className="form-label">tags</label>
      <fieldset className="form-tags">
        {renderTags.map((tag: ITags, index: number) => (
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
