import mongoose from 'mongoose';

export interface IID {
  id: mongoose.Types.ObjectId;
}

export interface GetOneProductDTO {
  params: IID;
}
