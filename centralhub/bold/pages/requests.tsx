import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './requests.module.css';
import type { DemoRequestRecord } from './api/demo-request';

type LoadState = 'loading' | 'ready' | 'error';

function formatWhen(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<DemoRequestRecord[]>([]);
  const [state, setState] = useState<LoadState>('loading');

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch('/api/demo-request');
        if (!res.ok) throw new Error('failed');
        const data = await res.json();
        if (!active) return;
        setRequests(Array.isArray(data.requests) ? data.requests : []);
        setState('ready');
      } catch {
        if (active) setState('error');
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Head>
        <title>Demo requests | CentralHub (internal)</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.page}>
        <div className={styles.inner}>
          <p className={styles.wordmark}>
            CentralHu<span className={styles.wordmarkB}>b</span>
          </p>

          <div className={styles.header}>
            <h1 className={styles.title}>Demo requests</h1>
            <p className={styles.note}>
              Internal view of submitted demo requests. This page is not linked from the site.
            </p>
          </div>

          {state === 'ready' && requests.length > 0 && (
            <p className={styles.count}>
              {requests.length} {requests.length === 1 ? 'request' : 'requests'}
            </p>
          )}

          <div className={styles.card}>
            {state === 'loading' && <p className={styles.loading}>Loading requests...</p>}

            {state === 'error' && (
              <p className={styles.empty}>Could not load requests. Refresh to try again.</p>
            )}

            {state === 'ready' && requests.length === 0 && (
              <p className={styles.empty}>No requests yet.</p>
            )}

            {state === 'ready' && requests.length > 0 && (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Need</th>
                      <th>When</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((r) => (
                      <tr key={r.id}>
                        <td className={styles.name}>{r.name}</td>
                        <td>
                          <span className={styles.contact}>
                            {r.phone && <a href={`tel:${r.phone}`}>{r.phone}</a>}
                            {r.email && <a href={`mailto:${r.email}`}>{r.email}</a>}
                          </span>
                        </td>
                        <td className={styles.need}>{r.need}</td>
                        <td className={styles.when}>{formatWhen(r.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
