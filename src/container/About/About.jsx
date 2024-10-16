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
      <h2 className="head-text">
        Seeking a Software Developer role to leverage my 4+ years of experience
        in&nbsp;
        <span>ReactJS</span>, <span>Java</span>, and{" "}
        <span>Machine Learning</span>. Proficient in popular frontend
        technologies like <span>TypeScript</span>,<span>Next.js</span>, and{" "}
        <span>JavaScript</span>, as well as backend frameworks including{" "}
        <span>Spring Boot</span>, <span>Node.js</span>, and ML libraries such as{" "}
        <span>LangChain</span>, <span>Llama-3.1-70b</span>,
        <span>Stable Diffusion</span>, <span>PyTorch</span>, and&nbsp;
        <span>Hugging Face Diffusers</span>, along with image processing tools
        like&nbsp;
        <span>Pillow</span>.
      </h2>

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
