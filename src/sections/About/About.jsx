import React from "react";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { ABOUT } from "../../data/about";
import "./About.scss";

/**
 * Purpose: Brief about section — location, education, professional arc.
 */
const About = () => {
  return (
    <section className="section about" id="about" aria-labelledby="about-heading">
      <div className="container about__layout">
        <SectionHeading id="about-heading" eyebrow="About" title={ABOUT.heading} />
        <div className="about__copy">
          {ABOUT.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
