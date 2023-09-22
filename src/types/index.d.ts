import mongoose from 'mongoose';
import { Role } from './authInterfaces';
export {};

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>;
        role: Role;
        email: string;
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
