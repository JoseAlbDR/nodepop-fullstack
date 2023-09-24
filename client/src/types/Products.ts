import { AxiosResponse } from 'axios';
import { ITags } from '../../../src/types/productInterfaces';

export interface ICreatedBy {
  email: string;
  name: string;
  _id: string;
}

export interface IProduct {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: ICreatedBy;
  image: string;
  name: string;
  onSale: boolean;
  price: number;
  tags: ITags[];
}

export interface IProductResponse extends AxiosResponse {
  data: { products: IProduct[] };
}
