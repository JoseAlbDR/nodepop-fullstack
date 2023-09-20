import 'express-async-errors';
import 'dotenv/config';
import morgan from 'morgan';
import express from 'express';
import { dbConnect } from './db/dbConnect';
const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.get('/', (_req, res) => {
  res.send('Hello there');
});

app.post('/', (req: { body: { name: string } }, res) => {
  res.json({ message: 'Data received', data: req.body });
});

const start = async () => {
  const port = process.env.PORT;
  await dbConnect(process.env.MONGO_URL);
  console.log('Connected to db');
  app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
  });
};

void start();
