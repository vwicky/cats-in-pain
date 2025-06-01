import express from 'express';
import SavedPrompt from '../models/SavedPrompt.js';
import Prompt from '../models/Prompt.js';

const router = express.Router();

// Save a prompt
router.post('/save', async (req, res) => {
  
  try {
    const prompt = new SavedPrompt(req.body);
    const saved = await prompt.save();
    console.log(saved);
    
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const prompts = await SavedPrompt.find();
    res.json(prompts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const prompts = await SavedPrompt.find({ userId: req.params.userId });

    const answer = [];

    for (const savedPrompt of prompts) {
      const fullPrompt = await Prompt.findById(savedPrompt.promptId);
      if (fullPrompt) {
        answer.push(fullPrompt);
      }
    }

    res.json(answer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
