/**
 * auth.js — caspers-vid
 * Session state module using sessionStorage.
 * sessionStorage: clears on browser close — appropriate for auth simulation.
 *
 * Exports: getAuth, setAuth, isLoggedIn, login, logout,
 *          setIntendedAction, getIntendedAction, clearIntendedAction,
 *          setSelectedPlan, getSelectedPlan, interceptIfNeeded,
 *          setFirstSession, isFirstSession, clearFirstSession,
 *          getUser
 */

const AUTH_KEY = 'caspers_vid_auth';

export function getAuth() {
  return JSON.parse(sessionStorage.getItem(AUTH_KEY) || '{}');
}

export function setAuth(state) {
  sessionStorage.setItem(AUTH_KEY, JSON.stringify(state));
}

export function isLoggedIn() {
  return !!getAuth().isLoggedIn;
}

export function login(user) {
  const prev = getAuth();
  setAuth({ ...prev, isLoggedIn: true, user });
}

export function logout() {
  sessionStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem('caspers_first_session');
}

export function setIntendedAction(type, returnUrl, payload = null) {
  const auth = getAuth();
  setAuth({ ...auth, intendedAction: { type, returnUrl, payload } });
}

export function getIntendedAction() {
  return getAuth().intendedAction || null;
}

export function clearIntendedAction() {
  const auth = getAuth();
  setAuth({ ...auth, intendedAction: null });
}

export function setSelectedPlan(plan) {
  const auth = getAuth();
  setAuth({ ...auth, selectedPlan: plan });
}

export function getSelectedPlan() {
  return getAuth().selectedPlan || null;
}

/**
 * interceptIfNeeded — redirect to signup if not logged in.
 * Saves intended action so it can be resumed after auth completes.
 * Returns true if intercepted, false if user is already logged in.
 */
export function interceptIfNeeded(actionType, returnUrl, payload) {
  if (!isLoggedIn()) {
    setIntendedAction(actionType, returnUrl, payload);
    window.location.href = '/signup.html';
    return true;
  }
  return false;
}

// First-session flag — checked by studio.html to show tutorial on first visit.
// Uses sessionStorage so it only survives the current browser session.

export function setFirstSession() {
  sessionStorage.setItem('caspers_first_session', '1');
}

export function isFirstSession() {
  return sessionStorage.getItem('caspers_first_session') === '1';
}

export function clearFirstSession() {
  sessionStorage.removeItem('caspers_first_session');
}

export function getUser() {
  return getAuth().user || null;
}
