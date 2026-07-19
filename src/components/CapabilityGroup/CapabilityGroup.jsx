import React from "react";
import "./CapabilityGroup.scss";

/**
 * Purpose: Compact capability group (title + item list).
 */
const CapabilityGroup = ({ group }) => {
  return (
    <div className="capability-group">
      <h3 className="capability-group__title">{group.title}</h3>
      <ul className="capability-group__list">
        {group.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default CapabilityGroup;
