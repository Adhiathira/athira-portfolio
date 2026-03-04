const MOCK_TOKEN = 'mock-jwt-hermes-xyz';

export function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.slice(7);
  if (token !== MOCK_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}
