import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../client";
import { AppWrap, MotionWrap } from "../../wrapper";

import "./Skills.scss";
const parseYear = (year) => {
  const parts = year.split("-");
  const startYear = parseInt(parts[0]);
  const endYear = parseInt(
    parts[1] === "Present" ? new Date().getFullYear() : parts[1]
  );
  return { startYear, endYear };
};
const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const query = '*[_type=="experiences"]';
    const skillsQUery = '*[_type=="skills"]';
    client.fetch(query).then((data) => {
      data.sort((a, b) => {
        const { startYear: yearAStart, endYear: yearAEnd } = parseYear(a.year);
        const { startYear: yearBStart, endYear: yearBEnd } = parseYear(b.year);

        if (yearAStart < yearBStart) {
          return 1;
        } else if (yearAStart > yearBStart) {
          return -1;
        } else if (yearAEnd < yearBEnd) {
          return 1;
        } else if (yearAEnd > yearBEnd) {
          return -1;
        } else {
          return 0;
        }
      });
      setExperiences(data);
    });

    client.fetch(skillsQUery).then((data) => {
      data.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
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
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5 }}
                    className="app__skills-exp-work"
                    key={work.name}
                  >
                    <div className="work-header">
                      <h4 className="bold-text">{work.name}</h4>
                      <h5 className="p-text">{work.company}</h5>
                    </div>
                    <ul className="app__skills-exp-desc">
                      {work.desc.split("|").map((point, index) => (
                        <li key={index} className="p-text" >
                          {point.trim()}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
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
