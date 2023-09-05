import React, { useState } from "react";
import { client } from "../../client";
import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { motion } from "framer-motion";
import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { name, email, message } = formData;
  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    setLoading(true);
    const contact = {
      _type: "contact",
      name,
      email,
      message,
    };
    client.create(contact).then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    });
  };
  return (
    <>
      <h2 className="head-text"> Take a coffee & chat with me</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:vikas.mishra0796@gmail.com" className="p-text">
            vikas.mishra0796@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.linkedin} alt="email" />
          <a
            href="https://www.linkedin.com/in/vikas-mshra/"
            target="_blank"
            rel="noreferrer"
            className="p-text"
          >
            vikas_mshra
          </a>
        </div>
        {!isFormSubmitted ? (
          <div className="app__footer-form app__flex">
            <div className="app__flex">
              <input
                className="p-text"
                type="text"
                placeholder="your name"
                onChange={handleChangeInput}
                name="name"
                value={name}
              />
            </div>
            <div className="app__flex">
              <input
                className="p-text"
                type="text"
                placeholder="your email"
                onChange={handleChangeInput}
                name="email"
                value={email}
              />
            </div>
            <div>
              <textarea
                className="p-text"
                placeholder="your message"
                value={message}
                name="message"
                onChange={handleChangeInput}
              />
            </div>
            <button typ="button" className="p-text" onClick={handleSubmit}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        ) : (
          <>
            <div>
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, delayChildren: 0.5 }}
                className="app__header-img"
              >
                <img src={images.thanks} alt="profile_bg" />
                <motion.img
                  whileInView={{ scale: [0, 1] }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  src={images.circle}
                  alt="profile_circle"
                  className="overlay_circle"
                />
              </motion.div>
            </div>
            <h3 className="head-text">Thank you for getting in touch</h3>
          </>
        )}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
