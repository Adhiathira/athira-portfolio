// Inject modal structure into #modal overlay
const overlay = document.getElementById('modal');
overlay.innerHTML = `
  <div class="modal">
    <button class="modal__close" id="modal-close" aria-label="Close">✕</button>
    <video
      class="modal__video"
      id="modal-video"
      src=""
      autoplay
      loop
      muted
      playsinline
      controls
    ></video>
    <p class="modal__prompt" id="modal-prompt"></p>
  </div>
`;

const modalVideo = document.getElementById('modal-video');
const modalPrompt = document.getElementById('modal-prompt');

// Expose to dashboard.js card click handlers
window.openVideoModal = function(video) {
  modalVideo.src = video.videoUrl;
  modalVideo.load();
  modalVideo.play().catch(() => {});
  modalPrompt.textContent = video.prompt;
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
};

function closeModal() {
  overlay.hidden = true;
  modalVideo.pause();
  modalVideo.src = '';
  document.body.style.overflow = '';
}

document.getElementById('modal-close').addEventListener('click', closeModal);

// Close on overlay click (outside modal box)
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !overlay.hidden) closeModal();
});
