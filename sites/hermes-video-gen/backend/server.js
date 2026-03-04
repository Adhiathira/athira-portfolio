import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './routes/auth.js';
import videosRouter from './routes/videos.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Static file serving
app.use('/', express.static(path.join(__dirname, '../frontend')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Body parsing
app.use(express.json());

// API routes
app.use('/api/auth', authRouter);
app.use('/api/videos', videosRouter);

app.listen(3333, () => {
  console.log('Server running at http://localhost:3333');
});
