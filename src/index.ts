// Packages
import 'express-async-errors';
import 'dotenv/config';
import morgan from 'morgan';
import express from 'express';
import fileUpload from 'express-fileupload';

// DB
import { dbConnect } from './db/dbConnect';

// Routers
import productsRouter from './routes/productRoutes';
import populateRouter from './routes/populateDatabaseRouter';

// Middlewares
import notFoundMiddleware from './middleware/notFoundMIddleware';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(fileUpload());

app.use('/api/v1/products', productsRouter);
app.use('/api/v1/populate', populateRouter);

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
