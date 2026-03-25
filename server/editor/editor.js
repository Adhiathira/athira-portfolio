// editor.js — Design System Editor UI
// EDITOR_SITE is injected by the server before this module loads
const SITE = EDITOR_SITE;
let tokenData = null;
const overrides = {}; // { cssVarName: newValue }
const iframe = document.getElementById('editor-iframe');

const SECTION_ORDER = ['colors', 'typography', 'spacing', 'grid', 'motion', 'interactions', 'assets'];

const SECTION_LABELS = {
  colors: 'Colors',
  typography: 'Typography',
  spacing: 'Spacing',
  grid: 'Grid',
  motion: 'Motion',
  interactions: 'Interactions',
  assets: 'Assets',
};

// ─── Init ────────────────────────────────────────────────────────────────────

async function init() {
  const res = await fetch(`/api/editor-tokens/${encodeURIComponent(SITE)}`);
  tokenData = await res.json();

  document.querySelector('.editor-site-name').textContent = SITE;
  renderPageTabs(tokenData.pages);

  if (tokenData.pages && tokenData.pages.length > 0) {
    iframe.src = tokenData.pages[0].url;
  }

  renderSidebar(tokenData);

  // Wire all controls and page tab switching
  wireControls();
  initPageTabs();

  // Load fonts then init font pickers
  await loadFonts();
  initFontPickers();

  // Re-apply overrides when iframe first loads
  iframe.addEventListener('load', reapplyAllOverrides, { once: true });

  // Wire save variant modal and POST flow
  initSaveFlow();

  // Wire agent chat panel
  initAgentPanel();
}

init().catch(err => {
  const sidebar = document.getElementById('editor-sidebar');
  if (sidebar) sidebar.textContent = 'Failed to load tokens: ' + err.message;
});

// ─── Override Engine ─────────────────────────────────────────────────────────

function applyOverride(varName, value) {
  overrides[varName] = value;
  if (!iframe || !iframe.contentDocument) return;
  iframe.contentDocument.documentElement.style.setProperty(varName, value);
  updateUnsavedIndicator();
}

// ─── Unsaved Indicator ────────────────────────────────────────────────────────

function updateUnsavedIndicator() {
  const saveBtn = document.getElementById('editor-save-btn');
  if (!saveBtn) return;
  const hasDirty = Object.keys(overrides).length > 0;
  saveBtn.classList.toggle('editor-save-btn--dirty', hasDirty);
}

function reapplyAllOverrides() {
  if (!iframe || !iframe.contentDocument) return;
  const root = iframe.contentDocument.documentElement;
  for (const [varName, value] of Object.entries(overrides)) {
    root.style.setProperty(varName, value);
  }
  reapplyFontLinks();
}

// ─── Page Tabs ───────────────────────────────────────────────────────────────

function renderPageTabs(pages) {
  const container = document.getElementById('editor-page-tabs');
  if (!container) return;
  container.innerHTML = '';

  if (!pages || pages.length === 0) return;

  pages.forEach((page, index) => {
    const btn = document.createElement('button');
    btn.className = 'editor-tab' + (index === 0 ? ' active' : '');
    btn.dataset.url = page.url;
    btn.textContent = page.label || page.url;

    btn.addEventListener('click', () => {
      container.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
    });

    container.appendChild(btn);
  });
}

// ─── Control Wiring ──────────────────────────────────────────────────────────

function wireControls() {
  const sidebar = document.getElementById('editor-sidebar');

  // Color inputs — fire on every input event for instant feedback
  sidebar.querySelectorAll('.editor-ctrl--color').forEach(input => {
    input.addEventListener('input', e => {
      applyOverride(e.target.dataset.var, e.target.value);
    });
  });

  // Range inputs (weight, duration, opacity) — fire on input, reconstruct unit
  sidebar.querySelectorAll('.editor-ctrl--range').forEach(input => {
    input.addEventListener('input', e => {
      const varName = e.target.dataset.var;
      const rawValue = parseFloat(e.target.value);
      let value;
      if (varName.includes('duration')) {
        value = (rawValue / 1000).toFixed(3) + 's';
      } else {
        value = String(rawValue);
      }
      const label = e.target.nextElementSibling;
      if (label && label.classList.contains('editor-ctrl-value')) label.textContent = value;
      applyOverride(varName, value);
    });
  });

  // Select inputs (easing) — fire on change
  sidebar.querySelectorAll('.editor-ctrl--select').forEach(select => {
    select.addEventListener('change', e => {
      applyOverride(e.target.dataset.var, e.target.value);
    });
  });

  // Text inputs — fire on change (not input) to avoid partial values
  sidebar.querySelectorAll('.editor-ctrl--text').forEach(input => {
    input.addEventListener('change', e => {
      applyOverride(e.target.dataset.var, e.target.value);
    });
  });

  // Clamp inputs — reconstruct clamp() when any part changes
  sidebar.querySelectorAll('.editor-clamp').forEach(clampContainer => {
    clampContainer.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', () => {
        const min  = clampContainer.querySelector('[data-part="min"]').value;
        const pref = clampContainer.querySelector('[data-part="pref"]').value;
        const max  = clampContainer.querySelector('[data-part="max"]').value;
        applyOverride(clampContainer.dataset.var, 'clamp(' + min + ', ' + pref + ', ' + max + ')');
      });
    });
  });
}

function initPageTabs() {
  const nav = document.getElementById('editor-page-tabs');
  if (!nav) return;
  nav.addEventListener('click', e => {
    const tab = e.target.closest('.editor-tab');
    if (!tab) return;
    nav.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    iframe.src = tab.dataset.url;
    iframe.addEventListener('load', reapplyAllOverrides, { once: true });
  });
}

// ─── Google Fonts Picker ─────────────────────────────────────────────────────

let allFonts = [];

async function loadFonts() {
  try {
    const res = await fetch('/api/google-fonts');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    allFonts = Array.isArray(data) ? data : [];
  } catch (e) {
    // Network failure or non-2xx response — font picker will show empty results
    allFonts = [];
  }
}

function initFontPickers() {
  const sidebar = document.getElementById('editor-sidebar');
  sidebar.querySelectorAll('.editor-font-picker').forEach(picker => {
    const input = picker.querySelector('.editor-ctrl--font-search');
    const dropdown = picker.querySelector('.editor-font-dropdown');
    const varName = picker.dataset.var;

    input.addEventListener('focus', () => showFontDropdown(input, dropdown, varName));
    input.addEventListener('input', () => filterFontDropdown(input, dropdown, varName));

    document.addEventListener('click', e => {
      if (!picker.contains(e.target)) dropdown.hidden = true;
    });
  });
}

function showFontDropdown(input, dropdown, varName) {
  filterFontDropdown(input, dropdown, varName);
  dropdown.hidden = false;
}

function filterFontDropdown(input, dropdown, varName) {
  const query = input.value.toLowerCase();
  const matches = allFonts
    .filter(f => f.family.toLowerCase().includes(query))
    .slice(0, 20);

  if (matches.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'editor-font-empty';
    empty.textContent = 'No fonts found';
    dropdown.textContent = '';
    dropdown.appendChild(empty);
    return;
  }

  dropdown.textContent = '';
  matches.forEach(f => {
    const btn = document.createElement('button');
    btn.className = 'editor-font-option';
    btn.dataset.family = f.family;
    btn.dataset.category = f.category;
    btn.textContent = f.family;
    btn.addEventListener('click', () => selectFont(f.family, f.category, input, dropdown, varName));
    dropdown.appendChild(btn);
  });
}

function selectFont(family, category, input, dropdown, varName) {
  input.value = family;
  dropdown.hidden = true;
  loadFontIntoIframe(family);
  const cssValue = "'" + family + "', " + category;
  applyOverride(varName, cssValue);
}

// ─── Font Link Tracking ───────────────────────────────────────────────────────

const loadedFonts = new Set();
const fontLinks = {}; // family -> Google Fonts URL

function loadFontIntoIframe(family) {
  if (loadedFonts.has(family)) return;
  if (!iframe || !iframe.contentDocument) return;
  loadedFonts.add(family);

  const url = 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(family) + ':wght@100;200;300;400;500;600;700;800;900&display=swap';
  const link = iframe.contentDocument.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.dataset.googleFont = family;
  iframe.contentDocument.head.appendChild(link);
  fontLinks[family] = url;
}

function reapplyFontLinks() {
  if (!iframe || !iframe.contentDocument) return;
  for (const [family, url] of Object.entries(fontLinks)) {
    if (!iframe.contentDocument.querySelector('link[data-google-font="' + family + '"]')) {
      const link = iframe.contentDocument.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.dataset.googleFont = family;
      iframe.contentDocument.head.appendChild(link);
    }
  }
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function renderSidebar(data) {
  const sidebar = document.getElementById('editor-sidebar');
  if (!sidebar) return;
  sidebar.innerHTML = '';

  SECTION_ORDER.forEach(key => {
    const section = buildSection(key, data[key] || {}, data.assets);
    if (section) sidebar.appendChild(section);
  });
}

// ─── Section Builder ─────────────────────────────────────────────────────────

function buildSection(key, tokens, assets) {
  if (key === 'assets') {
    return buildAssetsSection(assets || []);
  }

  if (!tokens || Object.keys(tokens).length === 0) return null;

  const label = SECTION_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1);

  const section = document.createElement('div');
  section.className = 'editor-section';

  // Build rows HTML
  const rowsHtml = Object.entries(tokens)
    .map(([varName, token]) => buildControl(varName, token))
    .join('');

  section.innerHTML = `
    <button class="editor-section-header open">
      <span>${label}</span>
      <span class="editor-section-chevron">&#9662;</span>
    </button>
    <div class="editor-section-body open">
      <div class="editor-section-content">
        ${rowsHtml}
      </div>
    </div>
  `;

  section.querySelector('.editor-section-header').addEventListener('click', toggleSection);

  // Wire range slider live-value labels
  section.querySelectorAll('.editor-ctrl--range').forEach(rangeInput => {
    const valueLabel = rangeInput.parentElement.querySelector('.editor-ctrl-value');
    if (valueLabel) {
      rangeInput.addEventListener('input', () => { valueLabel.textContent = rangeInput.value; });
    }
  });

  return section;
}

// ─── Toggle Section Accordion ────────────────────────────────────────────────

function toggleSection(e) {
  const header = e.currentTarget;
  const body = header.nextElementSibling;
  header.classList.toggle('open');
  body.classList.toggle('open');
}

// ─── Control Builder ─────────────────────────────────────────────────────────

function buildControl(varName, token) {
  const id = `ctrl-${varName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`;
  let input = '';

  switch (token.type) {
    case 'color': {
      const v = (token.value || '').trim();
      const canPickColor = /^#[0-9a-f]{3,6}$/i.test(v) || /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(v);
      if (canPickColor) {
        input = `<input type="color" id="${id}" class="editor-ctrl editor-ctrl--color"
                 data-var="${varName}" value="${toHexColor(v)}">`;
      } else {
        input = `<input type="text" id="${id}" class="editor-ctrl editor-ctrl--text"
                 data-var="${varName}" value="${escapeAttr(v)}">`;
      }
      break;
    }

    case 'font': {
      const fontName = extractFontName(token.value);
      input = `<div class="editor-font-picker" data-var="${varName}">
        <input type="text" class="editor-ctrl editor-ctrl--font-search"
               value="${escapeAttr(fontName)}" placeholder="Search fonts&#8230;" autocomplete="off">
        <div class="editor-font-dropdown" hidden></div>
      </div>`;
      break;
    }

    case 'clamp': {
      const parts = parseClamp(token.value);
      if (parts) {
        input = `<div class="editor-clamp" data-var="${varName}">
          <input type="text" class="editor-ctrl editor-clamp-part" data-part="min" value="${escapeAttr(parts.min)}" title="Min">
          <input type="text" class="editor-ctrl editor-clamp-part" data-part="pref" value="${escapeAttr(parts.preferred)}" title="Preferred (vw)">
          <input type="text" class="editor-ctrl editor-clamp-part" data-part="max" value="${escapeAttr(parts.max)}" title="Max">
        </div>`;
      } else {
        input = `<input type="text" id="${id}" class="editor-ctrl editor-ctrl--text"
                 data-var="${varName}" value="${escapeAttr(token.value)}">`;
      }
      break;
    }

    case 'weight': {
      const wVal = parseInt(token.value, 10) || 400;
      input = `<div class="editor-range-wrap">
        <input type="range" id="${id}" class="editor-ctrl editor-ctrl--range"
               data-var="${varName}" min="100" max="900" step="100" value="${wVal}">
        <span class="editor-ctrl-value">${escapeAttr(String(token.value))}</span>
      </div>`;
      break;
    }

    case 'duration': {
      const durMs = parseDuration(token.value);
      input = `<div class="editor-range-wrap">
        <input type="range" id="${id}" class="editor-ctrl editor-ctrl--range"
               data-var="${varName}" min="0" max="2000" step="10" value="${durMs}">
        <span class="editor-ctrl-value">${escapeAttr(String(token.value))}</span>
      </div>`;
      break;
    }

    case 'easing': {
      const easings = [
        'linear',
        'ease',
        'ease-in',
        'ease-out',
        'ease-in-out',
        'cubic-bezier(0.4,0,0.2,1)',
        'cubic-bezier(0.0,0,0.2,1)',
        'cubic-bezier(0.4,0,1,1)',
      ];
      const opts = easings.map(e =>
        `<option value="${e}"${e === token.value ? ' selected' : ''}>${e}</option>`
      ).join('');
      input = `<select id="${id}" class="editor-ctrl editor-ctrl--select" data-var="${varName}">${opts}</select>`;
      break;
    }

    case 'opacity': {
      const opVal = parseFloat(token.value) || 0;
      input = `<div class="editor-range-wrap">
        <input type="range" id="${id}" class="editor-ctrl editor-ctrl--range"
               data-var="${varName}" min="0" max="1" step="0.05" value="${opVal}">
        <span class="editor-ctrl-value">${escapeAttr(String(token.value))}</span>
      </div>`;
      break;
    }

    case 'px':
    case 'em':
    default:
      input = `<input type="text" id="${id}" class="editor-ctrl editor-ctrl--text"
               data-var="${varName}" value="${escapeAttr(token.value)}">`;
  }

  return `<div class="editor-token-row">
    <label class="editor-token-label" for="${id}">${token.label || varName}</label>
    <div class="editor-token-control">${input}</div>
  </div>`;
}

// ─── Assets Section ──────────────────────────────────────────────────────────

function buildAssetsSection(assets) {
  if (!assets || assets.length === 0) return null;

  const section = document.createElement('div');
  section.className = 'editor-section';

  const gridItems = assets.map(a => `
    <div class="editor-asset${a.isCurrent ? ' editor-asset--current' : ''}">
      <img src="${escapeAttr(a.path)}" alt="${escapeAttr(a.name)}" class="editor-asset-thumb" loading="lazy">
      <span class="editor-asset-name">${escapeAttr(a.name || '')}</span>
    </div>
  `).join('');

  section.innerHTML = `
    <button class="editor-section-header">
      <span>Assets</span>
      <span class="editor-section-chevron">&#9662;</span>
    </button>
    <div class="editor-section-body">
      <div class="editor-section-content">
        <div class="editor-assets-grid">
          ${gridItems}
        </div>
      </div>
    </div>
  `;

  section.querySelector('.editor-section-header').addEventListener('click', toggleSection);
  return section;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toHexColor(value) {
  if (!value) return '#000000';
  const v = value.trim();
  // Already 6-digit hex
  if (/^#[0-9a-f]{6}$/i.test(v)) return v.toLowerCase();
  // 3-digit hex → 6-digit
  if (/^#[0-9a-f]{3}$/i.test(v)) {
    const [, r, g, b] = v;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  // rgb(r, g, b)
  const rgbMatch = v.match(/^rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)$/i);
  if (rgbMatch) {
    return '#' + [rgbMatch[1], rgbMatch[2], rgbMatch[3]]
      .map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('');
  }
  return '#000000';
}

function extractFontName(fontFamily) {
  if (!fontFamily) return '';
  // Take first font name, strip quotes
  const first = fontFamily.split(',')[0].trim().replace(/['"]/g, '');
  // Add spaces before capital letters (e.g. EBGaramond → EB Garamond)
  return first
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .trim();
}

function parseClamp(value) {
  if (!value) return null;
  const m = value.trim().match(/^clamp\(\s*([^,]+),\s*([^,]+),\s*([^)]+)\s*\)$/i);
  if (!m) return null;
  return { min: m[1].trim(), preferred: m[2].trim(), max: m[3].trim() };
}

function parseDuration(value) {
  if (!value) return 0;
  const v = value.trim();
  if (v.endsWith('ms')) return parseFloat(v) || 0;
  if (v.endsWith('s')) return Math.round((parseFloat(v) || 0) * 1000);
  return parseInt(v, 10) || 0;
}

function escapeAttr(str) {
  if (!str) return '';
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ─── Save Variant Flow ────────────────────────────────────────────────────────

const NAME_REGEX = /^[a-z0-9][a-z0-9\-_]{1,63}$/;

function initSaveFlow() {
  const saveBtn     = document.getElementById('editor-save-btn');
  const modal       = document.getElementById('editor-modal');
  const cancelBtn   = document.getElementById('modal-cancel');
  const confirmBtn  = document.getElementById('modal-confirm');
  const nameInput   = document.getElementById('variant-name-input');
  const errorEl     = document.getElementById('modal-error');

  if (!saveBtn || !modal || !cancelBtn || !confirmBtn || !nameInput || !errorEl) return;

  function openModal() {
    nameInput.value = '';
    nameInput.classList.remove('editor-modal-input--invalid');
    errorEl.textContent = '';
    errorEl.hidden = true;
    modal.removeAttribute('hidden');
    nameInput.focus();
  }

  function closeModal() {
    modal.setAttribute('hidden', '');
  }

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = false;
  }

  async function doSave() {
    if (confirmBtn.disabled) return;
    const name = nameInput.value.trim();

    if (!NAME_REGEX.test(name)) {
      nameInput.classList.add('editor-modal-input--invalid');
      showError('Name must be lowercase letters, numbers, hyphens, or underscores (2–64 chars, starting with a letter or number).');
      return;
    }

    // Disable confirm button for the duration of the POST
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Saving…';

    try {
      const res = await fetch('/api/save-variant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceSite: SITE,
          variantName: name,
          overrides: { ...overrides },
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        // Redirect to the newly-saved design system
        window.location.href = '/site/' + encodeURIComponent(name);
        return;
      }

      // Non-2xx response — surface server error inline
      const msg = data && data.error
        ? data.error
        : 'Save failed (HTTP ' + res.status + '). Please try again.';

      if (res.status === 409) {
        showError('That name is already taken. Choose a different name.');
      } else {
        showError(msg);
      }
    } catch (err) {
      showError('Network error. Check your connection and try again.');
    } finally {
      confirmBtn.disabled = false;
      confirmBtn.textContent = 'Save';
    }
  }

  // Open modal when Save Variant button is clicked
  saveBtn.addEventListener('click', openModal);

  // Cancel button closes modal
  cancelBtn.addEventListener('click', closeModal);

  // Click outside modal dialog closes it
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (modal.hasAttribute('hidden')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Enter' && document.activeElement !== cancelBtn) doSave();
  });

  // Confirm button triggers save
  confirmBtn.addEventListener('click', doSave);

  // Real-time name input validation
  nameInput.addEventListener('input', () => {
    const val = nameInput.value.trim();
    if (val === '') {
      nameInput.classList.remove('editor-modal-input--invalid');
      return;
    }
    if (NAME_REGEX.test(val)) {
      nameInput.classList.remove('editor-modal-input--invalid');
    } else {
      nameInput.classList.add('editor-modal-input--invalid');
    }
  });
}

// ─── Agent Panel ────────────────────────────────────────────────────────────

function initAgentPanel() {
  const tabTokens   = document.getElementById('tab-tokens');
  const tabAgent    = document.getElementById('tab-agent');
  const tokenPanel  = document.getElementById('editor-sidebar');
  const agentPanel  = document.getElementById('editor-agent-panel');
  const statusDot   = agentPanel.querySelector('.editor-agent-status-dot');
  const statusText  = document.getElementById('editor-agent-status-text');
  const messages    = document.getElementById('editor-agent-messages');
  const input       = document.getElementById('editor-agent-input');
  const sendBtn     = document.getElementById('editor-agent-send');

  let agentStarted  = false;
  let agentBusy     = false;

  // ── Tab switching ────────────────────────────────────────────────────────

  tabTokens.addEventListener('click', () => {
    tabTokens.classList.add('active');
    tabAgent.classList.remove('active');
    tokenPanel.removeAttribute('hidden');
    agentPanel.setAttribute('hidden', '');
    // Restore iframe to source URL and reapply any in-memory overrides
    iframe.src = iframe.dataset.sourceUrl || iframe.src;
    iframe.addEventListener('load', reapplyAllOverrides, { once: true });
  });

  tabAgent.addEventListener('click', async () => {
    tabTokens.classList.remove('active');
    tabAgent.classList.add('active');
    tokenPanel.setAttribute('hidden', '');
    agentPanel.removeAttribute('hidden');

    if (!agentStarted) {
      await startAgent();
    }
  });

  // ── Agent start ──────────────────────────────────────────────────────────

  async function startAgent() {
    setStatus('starting', 'Starting agent…');
    try {
      const res = await fetch(`/api/agent/${encodeURIComponent(SITE)}/start`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);

      // User may have switched away while fetch was in-flight; bail without mutating DOM
      if (!tabAgent.classList.contains('active')) return;

      // Store original iframe src before swapping
      if (!iframe.dataset.sourceUrl) {
        iframe.dataset.sourceUrl = iframe.src;
      }
      iframe.src = data.iframeUrl;

      agentStarted = true;
      setStatus('ready', 'Agent ready');
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    } catch (err) {
      setStatus('error', 'Failed to start: ' + err.message);
    }
  }

  // ── Send prompt ──────────────────────────────────────────────────────────

  sendBtn.addEventListener('click', sendPrompt);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendPrompt(); }
  });

  async function sendPrompt() {
    const content = input.value.trim();
    if (!content || agentBusy) return;

    input.value = '';
    agentBusy = true;
    sendBtn.disabled = true;
    input.disabled = true;

    appendMessage('user', content);

    // Placeholder for agent response (filled as SSE streams in)
    const agentMsgEl = appendMessage('agent', '');

    try {
      const res = await fetch(`/api/agent/${encodeURIComponent(SITE)}/prompt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        agentMsgEl.textContent = 'Error: ' + (err.error || 'Unknown error');
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop(); // keep incomplete last line

        for (const line of lines) {
          if (!line.startsWith('data:')) continue;
          let evt;
          try { evt = JSON.parse(line.slice(5).trim()); } catch { continue; }

          if (evt.type === 'output') {
            appendStatusLine(evt.content);
          } else if (evt.type === 'done') {
            agentMsgEl.textContent = evt.content;
            scrollMessages();
            // Only reload iframe if Agent tab is still active (user may have switched to Tokens)
            if (tabAgent.classList.contains('active')) {
              iframe.src = iframe.src;
            }
            setStatus('ready', 'Agent ready');
          } else if (evt.type === 'error') {
            agentMsgEl.textContent = 'Error: ' + evt.content;
            setStatus('error', evt.content);
          }
        }
      }
    } catch (err) {
      agentMsgEl.textContent = 'Network error: ' + err.message;
      setStatus('error', err.message);
    } finally {
      agentBusy = false;
      sendBtn.disabled = false;
      input.disabled = false;
      input.focus();
    }
  }

  // ── Helpers ──────────────────────────────────────────────────────────────

  function appendMessage(role, text) {
    const el = document.createElement('div');
    el.className = `editor-agent-msg editor-agent-msg--${role}`;
    el.textContent = text;
    messages.appendChild(el);
    scrollMessages();
    return el;
  }

  function appendStatusLine(text) {
    const el = document.createElement('div');
    el.className = 'editor-agent-msg editor-agent-msg--status';
    el.textContent = text;
    messages.appendChild(el);
    scrollMessages();
  }

  function scrollMessages() {
    messages.scrollTop = messages.scrollHeight;
  }

  function setStatus(state, text) {
    statusDot.className = 'editor-agent-status-dot' + (state ? ' ' + state : '');
    statusText.textContent = text;
  }
}
