import React from "react";
import "./ContactAction.scss";

/**
 * Purpose: One clear contact action link or download.
 */
const ContactAction = ({ label, href, description, download, external }) => {
  return (
    <a
      className="contact-action"
      href={href}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span className="contact-action__label">{label}</span>
      {description ? (
        <span className="contact-action__description">{description}</span>
      ) : null}
    </a>
  );
};

export default ContactAction;
