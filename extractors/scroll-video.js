import { createLogger } from '../lib/logger.js';

export const metadata = { tag: 'scroll-video' };

const log = createLogger('scroll-video');

const EXEC_URL = 'http://localhost:9123/exec_claude_code_skills';
const POLL_URL = 'http://localhost:9123/poll_claude_code_skills';
const WORKSPACE = '/Users/delusionalmakubex/Desktop/scratchpad/website-flow-video-cli';
const TIMEOUT_SECONDS = 1200; // 20 minutes
const POLL_INTERVAL_MS = 5000;

export async function extract(page) {
  const siteUrl = page.url();
  log.info(`Requesting video recording for ${siteUrl}`);

  let postRes;
  try {
    postRes = await fetch(EXEC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        skill: 'website-flow-video-cli',
        workspace: WORKSPACE,
        args: siteUrl,
        timeout: TIMEOUT_SECONDS,
      }),
    });
  } catch (err) {
    throw new Error(`Cannot reach theDeluluAgency at ${EXEC_URL}: ${err.message}`);
  }

  if (!postRes.ok) {
    const body = await postRes.text().catch(() => '');
    throw new Error(`POST ${EXEC_URL} returned HTTP ${postRes.status}: ${body}`);
  }

  const { session_id } = await postRes.json();
  log.debug(`Session started: ${session_id}`);

  while (true) {
    await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS));

    let pollRes;
    try {
      pollRes = await fetch(`${POLL_URL}/${session_id}`);
    } catch (err) {
      throw new Error(`Poll request failed: ${err.message}`);
    }

    if (!pollRes.ok) {
      throw new Error(`GET ${POLL_URL}/${session_id} returned HTTP ${pollRes.status}`);
    }

    const { status, message } = await pollRes.json();
    log.debug(`Poll status: ${status}`);

    if (status === 'complete') {
      log.info('Video recording complete');
      return { recorded: true, recordedAt: new Date().toISOString() };
    }

    if (status === 'failed') {
      throw new Error(`Skill execution failed: ${message}`);
    }

    // pending or running — keep polling
  }
}
