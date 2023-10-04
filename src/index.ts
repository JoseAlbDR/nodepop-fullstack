// Packages
import 'express-async-errors';
import 'dotenv/config';
import morgan from 'morgan';
import express from 'express';
import path from 'path';
// import cors from 'cors';
import debug from 'debug';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import swaggerUI, { JsonObject } from 'swagger-ui-express';
import YAML from 'yamljs';

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
import { createTestUser } from './utils/createTestUserUtil';

// Swagger
const swaggerDocument = YAML.load('./swagger.yaml') as JsonObject;

const app = express();

// app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, './public')));
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'https://loremflickr.com'],
    },
  })
);
app.use(mongoSanitize());

// Routes
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/v1/products', authenticateUser, productsRouter);
app.use('/api/v1/populate', authenticateUser, populateRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

if (process.env.NODE_ENV === 'production')
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, './public', 'index.html'));
  });

// Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  const port = process.env.PORT;
  try {
    await dbConnect(process.env.MONGO_URL);
    await createTestUser();
    app.listen(port, () => {
      serverDebug(`Server listening on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

void start();
