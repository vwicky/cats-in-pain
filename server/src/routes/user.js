import express from 'express';
import User from '../models/User.js';

import requireAuth from '../middleware/auth.js'

const router = express.Router();

// Register
router.get('/', requireAuth, async (req, res) => {
  try {
    const id = req.user.userId;
    
    const user = await User.findOne({ _id: id });

    res.status(201).json( user );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
