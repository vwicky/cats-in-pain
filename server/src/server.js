import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/mongodb.js'

import promptRoutes from './routes/prompt.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000

await connectDB()

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',  // або '*' для всіх (небажано у продакшені)
  credentials: true
}));
app.use('/prompts', promptRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes)

// all wrong links will end up here
app.all('/', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(PORT, () => {
  console.log('>> server started on PORT:', PORT)
})