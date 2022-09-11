import React from "react";
import styles from "./style";
import {
  Navbar,
  Hero,
  Education,
  Skills,
  ExtraCurricular,
  Footer,
  OpenSource,
  Projects,
} from "./components";

const App = () => {
  return (
    // A div to wrap the entire application
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexCenter} ${styles.paddingX} `}>
        <div className={`${styles.boxWidth}`}>
          <Education />
          <Skills />
          <Projects />
          <OpenSource />
          <ExtraCurricular />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
