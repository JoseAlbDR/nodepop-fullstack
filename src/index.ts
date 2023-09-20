import express from 'express';
const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello there');
});

app.post('/', (req: { body: { name: string } }, res) => {
  res.json({ message: 'Data received', data: req.body });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
