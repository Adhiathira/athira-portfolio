// server/db.js — Postgres client and workspaces schema
import postgres from 'postgres';
import * as dotenv from 'dotenv';
dotenv.config();

const sql = postgres({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT || '5701', 10),
  database: process.env.DB_NAME     || 'design_system',
  username: process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: 5,
});

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS workspaces (
      id          SERIAL PRIMARY KEY,
      name        TEXT UNIQUE NOT NULL,
      source_site TEXT NOT NULL,
      created_at  TIMESTAMPTZ DEFAULT now()
    )
  `;
}

export async function listWorkspaces(sourceSite) {
  return sql`
    SELECT name, created_at
    FROM workspaces
    WHERE source_site = ${sourceSite}
    ORDER BY created_at DESC
  `;
}

export async function insertWorkspace(name, sourceSite) {
  await sql`
    INSERT INTO workspaces (name, source_site) VALUES (${name}, ${sourceSite})
  `;
}

export async function workspaceExists(name) {
  const rows = await sql`SELECT 1 FROM workspaces WHERE name = ${name} LIMIT 1`;
  return rows.length > 0;
}

export { sql };
