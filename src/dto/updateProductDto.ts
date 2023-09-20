import { IID, IUpdateProduct } from '../types/productInterfaces';

export interface UpdateProductDTO {
  body: IUpdateProduct;
  params: IID;
}
