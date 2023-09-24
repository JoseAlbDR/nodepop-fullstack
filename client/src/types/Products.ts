import { AxiosResponse } from 'axios';

export interface ICreatedBy {
  email: string;
  name: string;
  _id: string;
}

export interface IProduct {
  createdAt: string;
  updatedAt: string;
  createdBy: ICreatedBy;
  image: string;
  name: string;
  onSale: boolean;
  price: number;
}

export interface IProductResponse extends AxiosResponse {
  data: { products: IProduct[] };
}
