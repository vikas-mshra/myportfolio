import emailjs from "@emailjs/browser";

/**
 * Purpose: Submit contact form messages through EmailJS.
 * Special Conditions:
 *   - Returns a clear error if EmailJS env vars are missing.
 *   - Supports mailto fallback only when explicitly requested by the caller.
 *   - Never reports fake success.
 * Context: Used by ContactForm. Configure REACT_APP_EMAIL_* in .env / Netlify.
 */

const SERVICE_ID = process.env.REACT_APP_EMAIL_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAIL_TEMPLATE_ID;
const PUBLIC_ID = process.env.REACT_APP_EMAIL_PUBLIC_ID;

export function isContactBackendConfigured() {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_ID);
}

/**
 * Purpose: Send a contact message via EmailJS.
 * @param {{ name: string, email: string, message: string }} payload
 * @returns {Promise<{ ok: true } | { ok: false, error: string, mailtoSuggested?: boolean }>}
 */
export async function submitContactMessage(payload) {
  const maxTries = 2;
  let lastError = null;

  if (!isContactBackendConfigured()) {
    return {
      ok: false,
      error:
        "Contact form is not configured. Use email or schedule a call instead.",
      mailtoSuggested: true,
    };
  }

  for (let attempt = 0; attempt <= maxTries; attempt += 1) {
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: payload.name,
          from_email: payload.email,
          message: payload.message,
          reply_to: payload.email,
        },
        PUBLIC_ID
      );
      return { ok: true };
    } catch (error) {
      lastError = error;
      if (attempt < maxTries) {
        const delayMs = 300 + Math.floor(Math.random() * 500);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  const rawError =
    (lastError && (lastError.text || lastError.message)) ||
    "Message could not be sent. Please try again or email directly.";

  // EmailJS Gmail OAuth tokens expire; the site owner must reconnect in EmailJS.
  if (/invalid grant|reconnect your gmail/i.test(String(rawError))) {
    return {
      ok: false,
      error:
        "Email delivery is temporarily unavailable. Please email me directly or schedule a call.",
      mailtoSuggested: true,
    };
  }

  return {
    ok: false,
    error: rawError,
  };
}

/**
 * Purpose: Build a mailto URL when EmailJS is unavailable.
 */
export function buildMailtoFallback({ name, email, message, to }) {
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(
    `${message}\n\n— ${name}\n${email}`
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
