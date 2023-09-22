import mongoose from 'mongoose';
import { Role } from './authInterfaces';
export {};

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: mongoose.Types.ObjectId;
        name: string;
        role: Role;
      };
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGO_URL: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
    }
  }
}
