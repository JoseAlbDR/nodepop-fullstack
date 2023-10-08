// Packages
import 'express-async-errors';
import 'dotenv/config';
import morgan from 'morgan';
import express from 'express';
import path from 'path';
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
import likesRouter from './routes/likesRouter';

// Middlewares
import notFoundMiddleware from './middleware/notFoundMiddleware';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';
import cookieParser from 'cookie-parser';
import { authenticateUser } from './middleware/authMiddleware';
import { createTestUser } from './utils/createTestUserUtil';

// Swagger
const swaggerDocument = YAML.load('./swagger.yaml') as JsonObject;

const app = express();

// Initialize Express application settings and middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser(process.env.JWT_SECRET)); // Parse cookies with JWT secret

// Request logging middleware for development environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serve static files from the 'public' directory
app.use(express.static(path.resolve(__dirname, './public')));

// Enhance security with various HTTP headers
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'https://loremflickr.com', 'data:'],
    },
  })
);

// Prevent MongoDB query injection
app.use(mongoSanitize());

// Routes
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument)); // Serve Swagger documentation
app.use('/api/v1/products', authenticateUser, productsRouter); // Products API route
app.use('/api/v1/populate', authenticateUser, populateRouter); // Populate Database API route
app.use('/api/v1/users', authenticateUser, userRouter); // Users API route
app.use('/api/v1/likes', authenticateUser, likesRouter); // Likes API route
app.use('/api/v1/auth', authRouter); // Authentication API route

// Serve the frontend in production mode
if (process.env.NODE_ENV === 'production') {
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, './public', 'index.html'));
  });
}

// Error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Start the server
const start = async () => {
  const port = process.env.PORT;
  try {
    await dbConnect(process.env.MONGO_URL); // Connect to the MongoDB database
    await createTestUser(); // Create a test user if it doesn't exist
    app.listen(port, () => {
      serverDebug(`Server listening on port: ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start(); // Start the server
