import { Request } from 'express';
import { IUpdateUser } from '../types/userInterfaces';

export interface UpdateUserDTO extends Request {
  body: IUpdateUser;
  params: { id: string };
}
