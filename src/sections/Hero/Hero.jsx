import React from "react";
import IntroVideo from "../../components/IntroVideo/IntroVideo";
import { SITE } from "../../data/site";
import "./Hero.scss";

/**
 * Purpose: Compact landing hero with positioning, CTAs, links, and intro video.
 */
const Hero = () => {
  return (
    <section className="hero section" id="top" aria-labelledby="hero-name">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="hero__eyebrow">{SITE.role}</p>
          <h1 className="hero__name" id="hero-name">
            {SITE.name}
          </h1>
          <p className="hero__title">{SITE.title}</p>
          <p className="hero__support">{SITE.support}</p>

          <div className="hero__ctas">
            <a className="btn btn--primary" href="#work">
              View selected work
            </a>
            <a
              className="btn btn--secondary"
              href={SITE.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a 15-minute call
            </a>
          </div>

          <ul className="hero__links">
            <li>
              <a
                className="text-link"
                href={SITE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                className="text-link"
                href={SITE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a className="text-link" href={`mailto:${SITE.email}`}>
                Email
              </a>
            </li>
            <li>
              <a
                className="text-link"
                href={SITE.resume.href}
                download={SITE.resume.downloadName}
              >
                Résumé
              </a>
            </li>
          </ul>
        </div>

        <div className="hero__media">
          <IntroVideo />
        </div>
      </div>
    </section>
  );
};

export default Hero;
