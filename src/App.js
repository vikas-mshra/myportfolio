import React from "react";
import { Footer, Header } from "./components";
import { ThemeProvider } from "./context/ThemeContext";
import {
  About,
  Capabilities,
  Contact,
  Experience,
  Hero,
  SelectedWork,
} from "./sections";
import "./styles/global.scss";

/**
 * Purpose: Compose the single-page portfolio layout.
 */
const App = () => {
  return (
    <ThemeProvider>
      <div className="site">
        <Header />
        <main className="site__main">
          <Hero />
          <SelectedWork />
          <Experience />
          <Capabilities />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
