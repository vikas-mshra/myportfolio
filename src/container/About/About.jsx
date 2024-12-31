import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../client";
import "./About.scss";
import { AppWrap, MotionWrap } from "../../wrapper";

const About = () => {
  const [abouts, setAbouts] = useState([]);
  useEffect(() => {
    const query = '*[_type == "abouts"]';
    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  return (
    <>
      <h3 className="summary-text">
        Recent Master of Computer Science graduate, seeking a Software Developer
        role to leverage my 5+ years of experience in&nbsp;
        <span>ReactJS</span>, <span>Java</span>, and&nbsp;
        <span>Machine Learning</span>. Proficient in popular frontend
        technologies like <span>TypeScript</span>,&nbsp;<span>Next.js</span>,
        and&nbsp;
        <span>JavaScript</span>, as well as backend frameworks including&nbsp;
        <span>Spring Boot</span>, <span>Node.js</span>, and ML libraries such
        as&nbsp;
        <span>LangChain</span>, <span>Llama-3.1-70b</span>,&nbsp;
        <span>Stable Diffusion</span>, <span>PyTorch</span>, and&nbsp;
        <span>Hugging Face Diffusers</span>, along with image processing
        tools&nbsp;
        <span>Pillow</span>. Skilled in AWS services like <span>S3</span>,{" "}
        <span>Lambda</span>, <span>Glue</span>, <span>Athena</span>, and{" "}
        <span>QuickSight</span> for scalable data management and analytics.
      </h3>
      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
