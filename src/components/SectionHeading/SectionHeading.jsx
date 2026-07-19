import React from "react";
import "./SectionHeading.scss";

/**
 * Purpose: Consistent section title + optional supporting line.
 */
const SectionHeading = ({ eyebrow, title, description, id }) => {
  return (
    <header className="section-heading">
      {eyebrow ? <p className="section-heading__eyebrow">{eyebrow}</p> : null}
      <h2 className="section-heading__title" id={id}>
        {title}
      </h2>
      {description ? (
        <p className="section-heading__description">{description}</p>
      ) : null}
    </header>
  );
};

export default SectionHeading;
