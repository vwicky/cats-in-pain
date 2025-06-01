import mongoose from 'mongoose';

const SavedPromptSchema = new mongoose.Schema({
  promptId: { type: String, required: true },
  userId: { type: String, required: true }
});

const SavedPrompt = mongoose.model('SavedPrompt', SavedPromptSchema);
export default SavedPrompt;
