import { JWTPayload } from './authInterfaces';
export {};

declare global {
  namespace Express {
    interface Request {
      user: JWTPayload;
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
