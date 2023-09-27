export type ProductName = {
  $regex: string;
  $options: string;
};

export type TagsArray = {
  $in: string;
};

export interface IProductQuery {
  name?: string | ProductName;
  tag?: string | string[] | TagsArray;
  price?: number;
  sale?: string;
  sort?: string;
  limit?: number;
  skip?: number;
}
