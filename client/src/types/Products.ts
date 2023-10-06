import { AxiosResponse } from 'axios';
import { ITags } from '../../../src/types/productInterfaces';

export interface ICreatedBy {
  email: string;
  name: string;
  _id: string;
}

export interface ILikes {
  product: string;
  user: string;
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
  likes: ILikes[];
}

export interface IProductResponse {
  currentPage: number;
  maxPrice: number;
  minPrice: number;
  numOfPages: number;
  totalProducts: number;
  products: IProduct[];
  limit: number;
}

export interface IAxiosResponse extends AxiosResponse {
  data: IProductResponse;
}

export interface IResultStats {
  onSale: number;
  search: number;
  userTotal: number;
}

export interface IMonthlyProducts {
  date: string;
  count: number;
}

export interface IStatsResponse extends AxiosResponse {
  data: {
    resultStats: IResultStats;
    monthlyProducts: IMonthlyProducts[];
  };
}
