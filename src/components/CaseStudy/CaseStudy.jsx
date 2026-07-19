import React from "react";
import "./CaseStudy.scss";

/**
 * Purpose: Render one concise case-study module.
 * Context: Used in Selected Work; content comes from caseStudies data.
 */
const CaseStudy = ({ study }) => {
  return (
    <article className="case-study">
      <h3 className="case-study__title">{study.title}</h3>
      <dl className="case-study__grid">
        <div>
          <dt>Context</dt>
          <dd>{study.context}</dd>
        </div>
        <div>
          <dt>What I owned</dt>
          <dd>{study.owned}</dd>
        </div>
        <div>
          <dt>Key technical decision</dt>
          <dd>{study.decision}</dd>
        </div>
        <div>
          <dt>Measurable result</dt>
          <dd>{study.result}</dd>
        </div>
      </dl>
      <ul className="case-study__tech" aria-label="Technologies">
        {study.technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </article>
  );
};

export default CaseStudy;
