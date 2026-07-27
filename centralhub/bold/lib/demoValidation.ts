// Shared validation for the "Get a Demo" request form. Imported by both the
// modal (client) and the API route (server) so the rules stay identical on
// both sides. The core rule: name and need are required, and at least one of
// phone or email must be provided (and well formed when present).

export interface DemoFormValues {
  name: string;
  phone: string;
  email: string;
  need: string;
}

export interface DemoFieldErrors {
  name?: string;
  phone?: string;
  email?: string;
  need?: string;
  // Applies to the phone/email pair when neither is filled in.
  contact?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Accepts common phone punctuation; requires at least 7 actual digits.
export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!/^[+()\-.\s0-9]+$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 20;
}

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function validateDemoForm(values: DemoFormValues): DemoFieldErrors {
  const errors: DemoFieldErrors = {};

  const name = values.name.trim();
  const phone = values.phone.trim();
  const email = values.email.trim();
  const need = values.need.trim();

  if (!name) {
    errors.name = 'Please tell us your name.';
  }

  if (!phone && !email) {
    errors.contact = 'Add a phone number or an email so we can reach you.';
  } else {
    if (phone && !isValidPhone(phone)) {
      errors.phone = 'That phone number does not look quite right.';
    }
    if (email && !isValidEmail(email)) {
      errors.email = 'That email does not look quite right.';
    }
  }

  if (!need) {
    errors.need = 'Let us know what you are looking for.';
  }

  return errors;
}

export function hasErrors(errors: DemoFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
