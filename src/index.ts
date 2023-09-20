// Packages
import 'express-async-errors';
import 'dotenv/config';
import morgan from 'morgan';
import express from 'express';

// DB
import { dbConnect } from './db/dbConnect';

// Routers
import productsRouter from './routes/productRoutes';

// Middlewares
import notFoundMiddleware from './middleware/notFound';
import errorHandlerMiddleware from './middleware/errorHandler';

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api/v1/products', productsRouter);

// Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  const port = process.env.PORT;
  try {
    await dbConnect(process.env.MONGO_URL);
    console.log('Connected to db');
    app.listen(port, () => {
      console.log(`Server listening on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

void start();
