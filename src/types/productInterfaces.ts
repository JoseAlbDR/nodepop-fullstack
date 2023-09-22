import mongoose from 'mongoose';

export type ITags = 'motor' | 'work' | 'mobile' | 'lifestyle';

export interface IProduct {
  name: string;
  onSale: boolean;
  price: number;
  image: string;
  tags: ITags[];
  createdBy: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>;
}

export interface IUpdateProduct extends Partial<IProduct> {}
