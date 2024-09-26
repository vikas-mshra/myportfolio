import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { client } from "../../client";
import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Footer.scss";

const isAnyFieldOnlySpaces = (formData) => {
  return Object.values(formData).some(
    (value) => typeof value === "string" && value.trim() === ""
  );
};

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const form = useRef();
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isAnyFieldOnlySpaces(formData)) {
      alert("Invalid Input! Enter some valid text");
      return;
    }

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
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_SERVICE_ID,
        process.env.REACT_APP_EMAIL_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAIL_PUBLIC_ID
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
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
          <form
            ref={form}
            onSubmit={handleSubmit}
            className="app__footer-form app__flex"
          >
            <div className="app__flex">
              <input
                className="p-text"
                type="text"
                placeholder="your name"
                onChange={handleChangeInput}
                name="name"
                value={name}
                required
              />
            </div>
            <div className="app__flex">
              <input
                className="p-text"
                type="email"
                placeholder="your email"
                onChange={handleChangeInput}
                name="email"
                value={email}
                required
              />
            </div>
            <div>
              <textarea
                className="p-text"
                placeholder="your message"
                value={message}
                name="message"
                onChange={handleChangeInput}
                required
              />
            </div>
            <button type="submit" className="p-text">
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        ) : (
          <div className="app__thanks">
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
          </div>
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
