import 'express-async-errors';
import 'dotenv/config';
import morgan from 'morgan';
import express from 'express';
import { dbConnect } from './db/dbConnect';

import productsRouter from './routes/productRoutes';
const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api/v1/products', productsRouter);

const start = async () => {
  const port = process.env.PORT;
  await dbConnect(process.env.MONGO_URL);
  console.log('Connected to db');
  app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
  });
};

void start();
