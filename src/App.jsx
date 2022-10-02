import React from "react";
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
            <OpenSource />
            <ExtraCurricular />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default App;
