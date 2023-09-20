import { IUpdateProduct } from '../types/product-interfaces';
import { IID } from './get-one-product.dto';

export interface UpdateProductDTO {
  body: IUpdateProduct;
  params: IID;
}
