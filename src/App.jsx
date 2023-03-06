import React from "react";
import { motion } from "framer-motion";

import styles from "./style";
import {
  Navbar,
  Hero,
  Education,
  SkillsAndExperience,
  ExtraCurricular,
  Footer,
  OpenSource,
  Projects,
  BlogPosts,
  Loading
} from "./components";

const App = () => {
  const [isLoading,setIsLoading] = React.useState(true);

  React.useEffect(()=>{
    setTimeout(()=>{setIsLoading(false)},1600);
  },[])

  if(isLoading){
    return (
      <div className="bg-primary w-full overflow-hidden">
        <Loading/>
      </div>
    )
  }else{
    return (
      // A div to wrap the entire application
    <div className="bg-primary w-full overflow-hidden">
      <motion.section
        initial={{ x: -100, opacity: 0.25 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
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
            <SkillsAndExperience />
            <Education />
            <Projects />
            <BlogPosts enabled={false} />
            <OpenSource />
            <ExtraCurricular />
          </div>
        </div>
        <Footer />
      </motion.section>
    </div>

    );
  }
};

export default App;
