import express from 'express';
import Prompt from '../models/Prompt.js';

const router = express.Router();

// Save a prompt
router.post('/save', async (req, res) => {
  try {
    const prompt = new Prompt(req.body);
    const saved = await prompt.save();
    console.log(saved);
    
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const prompts = await Prompt.find();
    res.json(prompts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get prompts for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const prompts = await Prompt.find({ userId: req.params.userId });
    res.json(prompts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
