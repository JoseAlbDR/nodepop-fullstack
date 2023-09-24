import { ITags } from '../../../src/types/productInterfaces';
import tag from '../assets/images/tag-solid.svg';
const ProductCategories = ({ tags }: { tags: ITags[] }) => {
  return (
    <div className="categories">
      <h3 className="title">
        Categories
        <img src={tag} alt="tag" />
      </h3>
      <div className="tags">
        {tags.map((tag) => (
          <div key={tag} className="tag">
            <span>{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
