import React from "react";
import ContactAction from "../../components/ContactAction/ContactAction";
import ContactForm from "../../components/ContactForm/ContactForm";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { SITE } from "../../data/site";
import "./Contact.scss";

/**
 * Purpose: Professional contact area with actions and form.
 */
const Contact = () => {
  return (
    <section
      className="section contact"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <SectionHeading
          id="contact-heading"
          eyebrow="Contact"
          title="Let’s build something useful."
          description="For product engineering, integrations, or technical collaboration, send a message or schedule a short call."
        />

        <div className="contact__actions">
          <ContactAction
            label="Email"
            description={SITE.email}
            href={`mailto:${SITE.email}`}
          />
          <ContactAction
            label="Schedule a 15-minute call"
            description="cal.com/vikas-mshra/15min"
            href={SITE.calendarUrl}
            external
          />
          <ContactAction
            label="LinkedIn"
            description="linkedin.com/in/vikas-mshra"
            href={SITE.linkedinUrl}
            external
          />
          <ContactAction
            label={SITE.resume.label}
            description="PDF download"
            href={SITE.resume.href}
            download={SITE.resume.downloadName}
          />
        </div>

        <div className="contact__form-wrap">
          <h3 className="contact__form-title">Send a message</h3>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
