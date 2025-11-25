import express from 'express';
import { handleChatMessage } from '../services/chatAgent.js';

const router = express.Router();

router.post('/message', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await handleChatMessage(message, conversationHistory);
    res.json(response);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to process chat message',
      message: 'Please try again later'
    });
  }
});

export { router as chatRouter };

