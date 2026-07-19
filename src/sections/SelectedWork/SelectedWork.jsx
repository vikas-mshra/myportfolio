import React from "react";
import CaseStudy from "../../components/CaseStudy/CaseStudy";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { CASE_STUDIES } from "../../data/caseStudies";
import "./SelectedWork.scss";

/**
 * Purpose: Selected impact / work case studies.
 */
const SelectedWork = () => {
  return (
    <section className="section selected-work" id="work" aria-labelledby="work-heading">
      <div className="container">
        <SectionHeading
          id="work-heading"
          eyebrow="Selected work"
          title="Impact from production systems"
          description="Concise case studies from integrations, analytics platforms, data performance, and enterprise backends."
        />
        <div className="selected-work__list">
          {CASE_STUDIES.map((study) => (
            <CaseStudy key={study.id} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
