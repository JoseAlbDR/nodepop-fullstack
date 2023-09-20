import mongoose from 'mongoose';

export type ITags = 'motor' | 'work' | 'mobile' | 'lifestyle';

export interface IProduct {
  name: string;
  onSale: boolean;
  price: number;
  image: string;
  tags: ITags[];
}

export interface IUpdateProduct extends Partial<IProduct> {}

export interface IID {
  id: mongoose.Types.ObjectId;
}

export interface ProductIDParam {
  params: IID;
}
