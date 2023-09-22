import { Request } from 'express';
import { ILoginUser } from '../types/authInterfaces';

export interface LoginUserDTO extends Request {
  body: ILoginUser;
}
