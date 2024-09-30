import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";

import "./Skills.scss";
const parseYear = (year) => {
  const parts = year.split("-");
  const endYear = parseInt(parts[1] || new Date().getFullYear()); // Default to current year if end year is not provided
  return endYear;
};
const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const query = '*[_type=="experiences"]';
    const skillsQUery = '*[_type=="skills"]';
    client.fetch(query).then((data) => {
      data.sort((a, b) => {
        const yearA = parseYear(a.year);
        const yearB = parseYear(b.year);

        if (yearA < yearB) return -1;
        if (yearA > yearB) return 1;
        return 0;
      });
      setExperiences(data);
    });

    client.fetch(skillsQUery).then((data) => {
      setSkills(data);
    });
  }, []);
  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills?.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="app__skills-exp">
          {experiences.map((experience) => (
            <motion.div className="app__skills-exp-item" key={experience.year}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div
                className="app__skills-exp-works"
                style={{ width: "fit-content" }}
              >
                {experience.works.map((work) => (
                  <React.Fragment key={work.desc}>
                    <div
                      data-tooltip-id={work.name}
                      data-tooltip-content={work.desc}
                      data-tooltip-place="top"
                      aria-label={`${work.name} in ${work.company}`}
                    >
                      <motion.div
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5 }}
                        className="app__skills-exp-work"
                        data-tip
                        data-for={work.name}
                        key={work.name}
                      >
                        <h4 className="bold-text">{work.name}</h4>
                        <p className="p-text">{work.company}</p>
                      </motion.div>
                    </div>
                    <Tooltip
                      id={work.name}
                      arrowColor="#fff"
                      className="skills-tooltip"
                    />
                  </React.Fragment>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
