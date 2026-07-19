import React from "react";
import "./ExperienceItem.scss";

/**
 * Purpose: One experience role in the compact timeline.
 */
const ExperienceItem = ({ role }) => {
  return (
    <article className="experience-item">
      <div className="experience-item__meta">
        <h3 className="experience-item__company">{role.company}</h3>
        <p className="experience-item__dates">{role.dates}</p>
      </div>
      <p className="experience-item__title">{role.title}</p>
      <ul className="experience-item__points">
        {role.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </article>
  );
};

export default ExperienceItem;
