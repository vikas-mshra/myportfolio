import React from "react";
import { About, Footer, Header, Skills, Testimonial, Work, ChatBot } from "./container";
import { Navbar } from "./components";
import "./App.scss"
const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default App;
