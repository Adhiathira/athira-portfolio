import { Router } from 'express';
const router = Router();

const MOCK_TOKEN = 'mock-jwt-hermes-xyz';

router.post('/login', (req, res) => {
  const { email = 'user@example.com' } = req.body ?? {};
  res.json({
    token: MOCK_TOKEN,
    user: { id: 1, email, name: 'Studio User' },
  });
});

router.post('/signup', (req, res) => {
  const { email = 'user@example.com', name = 'Studio User' } = req.body ?? {};
  res.json({
    token: MOCK_TOKEN,
    user: { id: 1, email, name },
  });
});

export default router;
