import { Router } from 'express';
import multer from 'multer';
import { randomUUID } from 'crypto';
import { requireAuth } from '../middleware/auth.js';
import { videos } from '../store.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// All video routes require authentication
router.use(requireAuth);

// GET /api/videos — return all videos, most recent first
router.get('/', (req, res) => {
  res.json([...videos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// GET /api/videos/:id
router.get('/:id', (req, res) => {
  const video = videos.find(v => v.id === req.params.id);
  if (!video) return res.status(404).json({ error: 'Not found' });
  res.json(video);
});

// POST /api/videos/generate — multipart/form-data: prompt (required), image (optional)
router.post('/generate', upload.single('image'), (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'prompt is required' });

  const video = {
    id: randomUUID(),
    prompt,
    status: 'generating',
    imageUsed: !!req.file,
    thumbnailUrl: null,
    videoUrl: null,
    createdAt: new Date().toISOString(),
  };

  videos.push(video);
  res.status(202).json(video);

  // Async flip after 4 seconds
  setTimeout(() => {
    const record = videos.find(v => v.id === video.id);
    if (record) {
      record.status = 'done';
      record.videoUrl = '/assets/placeholder.mp4';
    }
  }, 4000);
});

export default router;
