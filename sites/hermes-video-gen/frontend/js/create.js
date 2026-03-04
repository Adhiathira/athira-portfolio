import { api } from './api.js';

// Inject Create panel HTML into the existing #view-create section
document.getElementById('view-create').innerHTML = `
  <div class="dash-view__header">
    <h2 class="dash-view__title">Create</h2>
  </div>
  <form class="create-form" id="create-form" novalidate>
    <div class="create-prompt-field">
      <label class="field__label" for="prompt-input">Prompt</label>
      <textarea class="create-textarea" id="prompt-input"
        placeholder="Describe the video you want to create…"
        rows="5"></textarea>
    </div>

    <div class="create-upload-field">
      <label class="field__label">Reference Image (optional)</label>
      <div class="upload-zone" id="upload-zone">
        <input type="file" id="image-input" accept="image/*" class="sr-only">
        <div class="upload-zone__inner" id="upload-placeholder">
          <span class="upload-zone__icon">↑</span>
          <span class="upload-zone__text">Drop an image or click to upload</span>
        </div>
        <img id="image-preview" class="upload-zone__preview" src="" alt="" hidden>
        <button type="button" class="upload-zone__remove" id="remove-image" hidden>Remove</button>
      </div>
    </div>

    <div class="create-actions">
      <button type="submit" class="btn-primary" id="generate-btn">Generate</button>
    </div>
  </form>
`;

// Image upload
let selectedFile = null;
const uploadZone = document.getElementById('upload-zone');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('image-preview');
const placeholder = document.getElementById('upload-placeholder');
const removeBtn = document.getElementById('remove-image');

uploadZone.addEventListener('click', (e) => {
  if (e.target !== removeBtn) imageInput.click();
});

uploadZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadZone.classList.add('upload-zone--drag');
});
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('upload-zone--drag'));
uploadZone.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadZone.classList.remove('upload-zone--drag');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) setImage(file);
});

imageInput.addEventListener('change', () => {
  if (imageInput.files[0]) setImage(imageInput.files[0]);
});

function setImage(file) {
  selectedFile = file;
  const url = URL.createObjectURL(file);
  preview.src = url;
  preview.hidden = false;
  placeholder.hidden = true;
  removeBtn.hidden = false;
}

removeBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  selectedFile = null;
  preview.src = '';
  preview.hidden = true;
  placeholder.hidden = false;
  removeBtn.hidden = true;
  imageInput.value = '';
});

// Form submit
document.getElementById('create-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const prompt = document.getElementById('prompt-input').value.trim();
  if (!prompt) return;

  const btn = document.getElementById('generate-btn');
  btn.disabled = true;
  btn.textContent = 'Generating…';

  const form = new FormData();
  form.append('prompt', prompt);
  if (selectedFile) form.append('image', selectedFile);

  try {
    const video = await api.postForm('/api/videos/generate', form);

    // Switch to My Videos view
    document.querySelector('[data-view="videos"]').click();

    // Refresh grid (will show new generating card)
    await window.refreshGrid?.();

    // Start polling
    pollUntilDone(video.id);

    // Reset form
    document.getElementById('prompt-input').value = '';
    removeBtn.click();
  } finally {
    btn.disabled = false;
    btn.textContent = 'Generate';
  }
});

// Polling loop
function pollUntilDone(id) {
  const interval = setInterval(async () => {
    try {
      const video = await api.get(`/api/videos/${id}`);
      if (video.status === 'done') {
        clearInterval(interval);
        await window.refreshGrid?.();
      }
    } catch {
      clearInterval(interval);
    }
  }, 2000);
}
