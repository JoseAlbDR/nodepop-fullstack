import { Request } from 'express';
import { IProduct } from '../types/productInterfaces';

export interface CreateProductDTO extends Request {
  body: IProduct;
}
