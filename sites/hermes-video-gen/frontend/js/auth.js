import { api } from './api.js';

// Tab switching
const tabs = document.querySelectorAll('.auth-tab');
const forms = document.querySelectorAll('.auth-form');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('auth-tab--active'));
    tab.classList.add('auth-tab--active');
    const target = tab.dataset.tab;
    forms.forEach(f => {
      f.classList.toggle('auth-form--hidden', f.dataset.panel !== target);
    });
  });
});

// Form submission
document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  await login(api.post('/api/auth/login', { email, password }), e.currentTarget);
});

document.getElementById('form-signup').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  await login(api.post('/api/auth/signup', { email, password, name }), e.currentTarget);
});

async function login(request, form) {
  const submitBtn = form.querySelector('.auth-submit');
  if (submitBtn) submitBtn.disabled = true;
  try {
    const { token, user } = await request;
    sessionStorage.setItem('auth_token', token);
    sessionStorage.setItem('auth_user', JSON.stringify(user));
    window.location.href = '/dashboard.html';
  } catch (err) {
    // Even errors redirect — this is a mock
    window.location.href = '/dashboard.html';
  }
}
