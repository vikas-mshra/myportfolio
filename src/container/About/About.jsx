import React from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./About.scss";

const About = () => {
  const timelineData = [
    {
      date: "May 2024 - Present",
      title: "Full Stack Developer",
      desc: "Skills: ReactJS, TypeScript, Tailwind CSS, Python, MSSQL, Flask, AWS, Docker, MSSQL",
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
      desc: "Skills: Java, Spring Boot, Postgres, Eureka, Hibernate, RabbitMQ, Neo4j, Groovy, PostgreSQL",
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
        Hello, I'm Vikas! 👋 I'm a full stack developer with a strong backend
        foundation and expertise in frontend and AI-driven systems. I currently
        work at the Office of Water Programs, where I lead a team of 3
        developers and build scalable web applications using React, TypeScript,
        Python, MSSQL, and modern tooling. I started my career as a backend
        developer at Tata Consultancy Services, working on high-volume,
        event-driven systems with Java and Spring Boot. Over time, I expanded
        into frontend development, where I've focused on performance, usability,
        and building reusable components. I enjoy working on problems that
        involve system design, performance optimization, and data-heavy
        applications. Recently, I've also been exploring LLMs and multi-agent
        systems, building projects around AI-powered workflows and automation.
        Overall, I like building systems that are efficient, practical, and
        actually useful for the people using them.
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
  "app__whitebg",
);
