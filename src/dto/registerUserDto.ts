import { Request } from 'express';
import { IUser } from '../types/authInterfaces';

export interface RegisterUserDTO extends Request {
  body: IUser;
}
