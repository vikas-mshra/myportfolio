import React from "react";
import ExperienceItem from "../../components/ExperienceItem/ExperienceItem";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { EXPERIENCE } from "../../data/experience";
import "./Experience.scss";

/**
 * Purpose: Compact experience timeline.
 */
const Experience = () => {
  return (
    <section
      className="section experience"
      id="experience"
      aria-labelledby="experience-heading"
    >
      <div className="container">
        <SectionHeading
          id="experience-heading"
          eyebrow="Experience"
          title="Recent roles"
          description="Customer-facing delivery, full-stack product work, and enterprise backend systems."
        />
        <div className="experience__list">
          {EXPERIENCE.map((role) => (
            <ExperienceItem key={role.id} role={role} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
