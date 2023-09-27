export type ProductName = {
  $regex: string;
  $options: string;
};

export type TagsArray = {
  $in: string[];
};

export interface IProductQuery {
  name?: string | ProductName;
  tags?: string | string[] | TagsArray;
  price?: string | { [x: string]: string };
  onSale?: string | boolean;
  sort?: string;
  limit?: number;
  skip?: number;
}
