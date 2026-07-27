import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { validateDemoForm, hasErrors, type DemoFormValues } from '@/lib/demoValidation';

// Submissions persist to a JSON file. This works because the site is served via
// `next start` (a long-lived Node process), not a serverless/read-only target.
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'demo-requests.json');

export interface DemoRequestRecord extends DemoFormValues {
  id: string;
  createdAt: string;
  userAgent: string;
}

async function readAll(): Promise<DemoRequestRecord[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Missing file or unreadable/corrupt JSON: start from an empty list.
    return [];
  }
}

async function append(record: DemoRequestRecord): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const existing = await readAll();
  existing.push(record);
  await fs.writeFile(DATA_FILE, JSON.stringify(existing, null, 2), 'utf8');
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const all = await readAll();
      // Newest first.
      const sorted = [...all].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      return res.status(200).json({ requests: sorted });
    } catch {
      return res.status(500).json({ error: 'Could not read requests.' });
    }
  }

  if (req.method === 'POST') {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const values: DemoFormValues = {
      name: asString(body.name).trim(),
      phone: asString(body.phone).trim(),
      email: asString(body.email).trim(),
      need: asString(body.need).trim(),
    };

    const errors = validateDemoForm(values);
    if (hasErrors(errors)) {
      return res.status(400).json({ errors });
    }

    const record: DemoRequestRecord = {
      id: randomUUID(),
      ...values,
      createdAt: new Date().toISOString(),
      userAgent: asString(req.headers['user-agent']),
    };

    try {
      await append(record);
    } catch {
      return res.status(500).json({ error: 'Could not save your request. Please try again.' });
    }

    return res.status(201).json({ ok: true, id: record.id });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed.' });
}
