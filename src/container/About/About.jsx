import React from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./About.scss";

const About = () => {
  const timelineData = [
    {
      date: "Jun 2023 - Present",
      title: "Full Stack Developer",
      desc: "Skills: ReactJS, JavaScript, Tailwind CSS, HTML, Redux., Python, MSSQL, Flask",

      accentColor: "#41516C",
    },
    {
      date: "Aug 2022 - Dec 2024",
      title: "Master of Computer Science",
      desc: "GPA: 3.85/4",
      accentColor: "#E24A68",
    },
    {
      date: "Jun 2019 - Oct 2022",
      title: "Backend Developer",
      desc: "Skills: Java, Spring Boot, Postgres, Eureka, Hibernate, RabbitMQ, Neo4j, Groovy",

      accentColor: "#FBCA3E",
    },
    {
      date: "Jan 2019 - Jun 2019",
      title: "Android Developer Intern",
      desc: "Skills: Java, Android Studio, SQLite",
      accentColor: "#4CADAD",
    },
    {
      date: "Aug 2017 - May 2019",
      title: "Master of Computer Application",
      desc: "GPA: 3.4/4",
      accentColor: "#1B5F8C",
    },
    {
      date: "Jul 2013 - May 2016",
      title: "Bachleors in Computer Science",
      desc: "GPA: 6.4/10",
      accentColor: "#6A4C77",
    },
  ];

  return (
    <>
      <h3 className="summary-text">
        Hello, I'm Vikas! 👋 A recent Master of Computer Science graduate (Dec
        2024) from California State University, Sacramento, where I maintained a
        3.85 GPA. By day, I'm a frontend developer passionate about optimizing
        React applications—like improving performance by 40% using React
        Virtualized and TypeScript. By night, I geek out over training
        generative AI models (Stable Diffusion, Llama-3) and solving complex
        problems, such as slashing memory usage by 44% in a parallel algorithm.
        When I'm not coding, you'll find me playing badminton, experimenting
        with pour-over coffee, or diving into the latest ML research. Let's
        connect and build something impactful!
      </h3>
      <div className="timeline-container">
        <ul className="timeline">
          {timelineData.map((item, index) => (
            <li key={index} style={{ "--accent-color": item.accentColor }}>
              <div className="date">{item.date}</div>
              <div className="title">{item.title}</div>
              <div className="descr">{item.desc}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
