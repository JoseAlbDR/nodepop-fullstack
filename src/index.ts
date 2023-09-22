// Packages
import 'express-async-errors';
import 'dotenv/config';
import morgan from 'morgan';
import express from 'express';
import fileUpload from 'express-fileupload';
import debug from 'debug';
const serverDebug = debug('nodepop-ts:server');

// DB
import { dbConnect } from './db/dbConnect';

// Routers
import productsRouter from './routes/productRouter';
import populateRouter from './routes/populateDatabaseRouter';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';

// Middlewares
import notFoundMiddleware from './middleware/notFoundMiddleware';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';
import cookieParser from 'cookie-parser';
import { authenticateUser } from './middleware/authMiddleware';

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(fileUpload());

// Routes
app.use('/api/v1/products', authenticateUser, productsRouter);
app.use('/api/v1/populate', authenticateUser, populateRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

// Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  const port = process.env.PORT;
  try {
    await dbConnect(process.env.MONGO_URL);
    console.log('Connected to db');
    app.listen(port, () => {
      serverDebug(`Server listening on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

void start();
