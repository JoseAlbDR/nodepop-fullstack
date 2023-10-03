import { Request } from 'express';

export interface UpdatePasswordDTO extends Request {
  body: {
    oldPassword: string;
    newPassword: string;
    repeatNewPassword: string;
  };
}
