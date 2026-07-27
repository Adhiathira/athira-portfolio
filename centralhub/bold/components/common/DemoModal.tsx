import { useCallback, useEffect, useId, useRef, useState } from 'react';
import styles from './DemoModal.module.css';
import {
  validateDemoForm,
  hasErrors,
  type DemoFormValues,
  type DemoFieldErrors,
} from '@/lib/demoValidation';

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

const EMPTY: DemoFormValues = { name: '', phone: '', email: '', need: '' };

type Status = 'editing' | 'submitting' | 'success';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function DemoModal({ open, onClose }: DemoModalProps) {
  const [values, setValues] = useState<DemoFormValues>(EMPTY);
  const [errors, setErrors] = useState<DemoFieldErrors>({});
  const [status, setStatus] = useState<Status>('editing');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const successCloseRef = useRef<HTMLButtonElement>(null);

  const baseId = useId();
  const fieldId = (name: string) => `${baseId}-${name}`;

  // Reset to a clean form whenever the modal is opened.
  useEffect(() => {
    if (open) {
      setValues(EMPTY);
      setErrors({});
      setStatus('editing');
      setSubmitError(null);
    }
  }, [open]);

  // Move focus into the dialog once it is open and rendered.
  useEffect(() => {
    if (!open) return;
    const target = status === 'success' ? successCloseRef.current : firstFieldRef.current;
    // Defer so the element exists after the state-driven render.
    const t = window.setTimeout(() => target?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open, status]);

  // Lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  if (!open) return null;

  const setField = (name: keyof DemoFormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const nextErrors = validateDemoForm(values);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        // Surface server-side field errors if we got them; otherwise a friendly retry.
        const data = await res.json().catch(() => null);
        if (data && data.errors) {
          setErrors(data.errors as DemoFieldErrors);
          setStatus('editing');
          return;
        }
        throw new Error('request failed');
      }

      setStatus('success');
    } catch {
      setStatus('editing');
      setSubmitError('Something went wrong on our side. Please try again in a moment.');
    }
  };

  const contactError = errors.contact;

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={handleKeyDown}
    >
      <div
        className={styles.panel}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={status === 'success' ? undefined : fieldId('title')}
        aria-label={status === 'success' ? 'Request received' : undefined}
      >
        <button type="button" className={styles.close} aria-label="Close" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {status === 'success' ? (
          <div className={styles.success}>
            <span className={styles.checkWrap} aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path
                  d="M6 13.5l4.5 4.5L20 7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h2 className={styles.successTitle}>Thanks, we have your request.</h2>
            <p className={styles.successBody}>
              A member of our team will reach out shortly to set up a demo built around your
              business.
            </p>
            <button
              type="button"
              className={styles.successClose}
              ref={successCloseRef}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <h2 className={styles.title} id={fieldId('title')}>
                Get a demo
              </h2>
              <p className={styles.subtitle}>
                Tell us a little about what you need and we will be in touch.
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label className={styles.label} htmlFor={fieldId('name')}>
                  Name
                </label>
                <input
                  id={fieldId('name')}
                  ref={firstFieldRef}
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  type="text"
                  value={values.name}
                  onChange={setField('name')}
                  autoComplete="name"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? fieldId('name-error') : undefined}
                />
                {errors.name && (
                  <span className={styles.error} id={fieldId('name-error')}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div className={styles.pair}>
                <span className={styles.label}>
                  Phone or email <span className={styles.hint}>(at least one)</span>
                </span>
                <div className={styles.pairGrid}>
                  <div className={styles.field}>
                    <input
                      id={fieldId('phone')}
                      className={`${styles.input} ${
                        errors.phone || contactError ? styles.inputError : ''
                      }`}
                      type="tel"
                      placeholder="Phone"
                      value={values.phone}
                      onChange={setField('phone')}
                      autoComplete="tel"
                      aria-label="Phone number"
                      aria-invalid={errors.phone ? true : undefined}
                      aria-describedby={errors.phone ? fieldId('phone-error') : undefined}
                    />
                    {errors.phone && (
                      <span className={styles.error} id={fieldId('phone-error')}>
                        {errors.phone}
                      </span>
                    )}
                  </div>
                  <div className={styles.field}>
                    <input
                      id={fieldId('email')}
                      className={`${styles.input} ${
                        errors.email || contactError ? styles.inputError : ''
                      }`}
                      type="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={setField('email')}
                      autoComplete="email"
                      aria-label="Email address"
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? fieldId('email-error') : undefined}
                    />
                    {errors.email && (
                      <span className={styles.error} id={fieldId('email-error')}>
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>
                {contactError && <span className={styles.error}>{contactError}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor={fieldId('need')}>
                  What do you need?
                </label>
                <textarea
                  id={fieldId('need')}
                  className={`${styles.textarea} ${errors.need ? styles.inputError : ''}`}
                  rows={3}
                  value={values.need}
                  onChange={setField('need')}
                  placeholder="A sentence or two about what you are hoping to solve."
                  aria-invalid={errors.need ? true : undefined}
                  aria-describedby={errors.need ? fieldId('need-error') : undefined}
                />
                {errors.need && (
                  <span className={styles.error} id={fieldId('need-error')}>
                    {errors.need}
                  </span>
                )}
              </div>

              {submitError && (
                <p className={styles.formError} role="alert">
                  {submitError}
                </p>
              )}

              <button type="submit" className={styles.submit} disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending...' : 'Request a demo'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
