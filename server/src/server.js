import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/mongodb.js'

import promptRoutes from './routes/prompt.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000

await connectDB()

app.use(express.json());
app.use('/prompts', promptRoutes);

// all wrong links will end up here
app.all('/', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(PORT, () => {
  console.log('>> server started on PORT:', PORT)
})