import React from "react";
import { SITE } from "../../data/site";
import "./Footer.scss";

/**
 * Purpose: Minimal site footer with identity and key links.
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p className="site-footer__identity" suppressHydrationWarning>
          {SITE.name} · {year}
        </p>
        <nav aria-label="Footer">
          <ul className="site-footer__links">
            <li>
              <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a
                href={SITE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`}>Email</a>
            </li>
            <li>
              <a
                href={SITE.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Calendar
              </a>
            </li>
          </ul>
        </nav>
        <p className="site-footer__built">Built with React</p>
      </div>
    </footer>
  );
};

export default Footer;
