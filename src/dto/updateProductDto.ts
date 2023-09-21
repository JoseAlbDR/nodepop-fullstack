import { Request } from 'express';
import { IUpdateProduct } from '../types/productInterfaces';

export interface UpdateProductDTO extends Request {
  body: IUpdateProduct;
  params: { id: string };
}
