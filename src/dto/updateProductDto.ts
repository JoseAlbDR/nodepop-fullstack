import { IUpdateProduct } from '../types/productInterfaces';

export interface UpdateProductDTO {
  body: IUpdateProduct;
  params: { id: string };
}
