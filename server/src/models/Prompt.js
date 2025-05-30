import mongoose from 'mongoose';

const PromptSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  summarization: { type: String, required: true },
  result: {
    healthy: { type: Number, required: true },
    ill: { type: Number, required: true },
    additional: {
      explanation: { type: String }
    }
  },
  createdAt: { type: Date, default: Date.now }
});

const Prompt = mongoose.model('Prompt', PromptSchema);
export default Prompt;
