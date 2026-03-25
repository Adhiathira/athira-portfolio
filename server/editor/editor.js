// editor.js — Design System Editor UI
// EDITOR_SITE is injected by the server before this module loads
const SITE = EDITOR_SITE;
let tokenData = null;
const overrides = {}; // { cssVarName: newValue } — for Task 7

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
    document.getElementById('editor-iframe').src = tokenData.pages[0].url;
  }

  renderSidebar(tokenData);
}

init().catch(err => {
  const sidebar = document.getElementById('editor-sidebar');
  if (sidebar) sidebar.textContent = 'Failed to load tokens: ' + err.message;
});

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
      const iframe = document.getElementById('editor-iframe');
      if (iframe) iframe.src = page.url;
    });

    container.appendChild(btn);
  });
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
