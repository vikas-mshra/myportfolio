import React, { useState } from "react";
import { SITE } from "../../data/site";
import {
  buildMailtoFallback,
  submitContactMessage,
} from "../../services/contactService";
import "./ContactForm.scss";

/**
 * Purpose: Accessible contact form with validation and submission states.
 * Special Conditions:
 *   - Honeypot field silently rejects bots.
 *   - Blocks duplicate submits while loading.
 *   - Uses mailto only when EmailJS is not configured (and says so clearly).
 */
const INITIAL = { name: "", email: "", message: "", company: "" };

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) {
    errors.name = "Name is required.";
  }
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!fields.message.trim()) {
    errors.message = "Message is required.";
  }
  return errors;
}

const ContactForm = () => {
  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const onChange = (event) => {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === "loading") return;

    // Honeypot filled => pretend success without sending.
    if (fields.company.trim()) {
      setStatus("success");
      setStatusMessage("Thanks — your message was received.");
      setFields(INITIAL);
      return;
    }

    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      setStatusMessage("");
      return;
    }

    setStatus("loading");
    setStatusMessage("Sending…");

    const result = await submitContactMessage({
      name: fields.name.trim(),
      email: fields.email.trim(),
      message: fields.message.trim(),
    });

    if (result.ok) {
      setStatus("success");
      setStatusMessage("Message sent. I’ll get back to you soon.");
      setFields(INITIAL);
      return;
    }

    if (result.mailtoSuggested) {
      const mailto = buildMailtoFallback({
        name: fields.name.trim(),
        email: fields.email.trim(),
        message: fields.message.trim(),
        to: SITE.email,
      });
      setStatus("error");
      setStatusMessage(
        `${result.error} You can also email directly: ${SITE.email}`
      );
      window.location.href = mailto;
      return;
    }

    setStatus("error");
    setStatusMessage(result.error);
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-form__honeypot" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.company}
          onChange={onChange}
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          value={fields.name}
          onChange={onChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          required
        />
        {errors.name ? (
          <p id="name-error" className="contact-form__error" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="contact-form__field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={fields.email}
          onChange={onChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          required
        />
        {errors.email ? (
          <p id="email-error" className="contact-form__error" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="contact-form__field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="What are you working on?"
          value={fields.message}
          onChange={onChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          required
        />
        {errors.message ? (
          <p id="message-error" className="contact-form__error" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="btn btn--primary contact-form__submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>

      {statusMessage ? (
        <p
          className={`contact-form__status contact-form__status--${status}`}
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
};

export default ContactForm;
