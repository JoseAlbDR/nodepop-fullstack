export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGO_URL: string;
    }
  }
}
