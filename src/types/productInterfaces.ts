import mongoose from 'mongoose';

export type ITags = 'motor' | 'work' | 'mobile' | 'lifestyle';

export interface IProduct {
  name: string;
  onSale: boolean;
  price: number;
  image: string | null;
  tags: ITags[];
  createdBy: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>;
  numOfLikes: number;
}

export interface IUpdateProduct extends Partial<IProduct> {}
