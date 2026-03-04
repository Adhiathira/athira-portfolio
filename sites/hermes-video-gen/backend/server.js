import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { requireAuth } from './middleware/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// TODO: replace with import from ./routes/auth.js (Task 2)
const authRouter = express.Router();
authRouter.all('*', (req, res) => res.status(501).json({ error: 'Not implemented' }));

// TODO: replace with import from ./routes/videos.js (Task 2)
const videosRouter = express.Router();
videosRouter.all('*', (req, res) => res.status(501).json({ error: 'Not implemented' }));

// Static file serving
app.use('/', express.static(path.join(__dirname, '../frontend')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Body parsing
app.use(express.json());

// API routes
app.use('/api/auth', authRouter);
app.use('/api/videos', requireAuth, videosRouter);

app.listen(3333, () => {
  console.log('Server running at http://localhost:3333');
});
