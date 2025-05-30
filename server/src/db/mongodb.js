import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectionURL = process.env.MONGO_URL

const connectDB = async () => {
  try {
    await mongoose.connect(connectionURL)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

export default connectDB