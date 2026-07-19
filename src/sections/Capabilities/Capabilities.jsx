import React from "react";
import CapabilityGroup from "../../components/CapabilityGroup/CapabilityGroup";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { CAPABILITY_GROUPS } from "../../data/capabilities";
import "./Capabilities.scss";

/**
 * Purpose: Compact capabilities grid — no skill bars or logo clouds.
 */
const Capabilities = () => {
  return (
    <section
      className="section capabilities"
      id="capabilities"
      aria-labelledby="capabilities-heading"
    >
      <div className="container">
        <SectionHeading
          id="capabilities-heading"
          eyebrow="Capabilities"
          title="Tools I use in production"
          description="Grouped by the work they support — product, integrations, data, and delivery."
        />
        <div className="capabilities__grid">
          {CAPABILITY_GROUPS.map((group) => (
            <CapabilityGroup key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
