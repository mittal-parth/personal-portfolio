import React from "react";
import styles, { layout } from "../style";
import { educationList } from "../constants";
import Lottie from "react-lottie-player";
import animationData from "../lotties/quiz-mode-teal-dark.json";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

// lottie config
const defaultOptions = {
  loop: true,
  play: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const FeatureCard = ({
  icon,
  title,
  degree,
  duration,
  content1,
  content2,
  index,
}) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`flex flex-row p-6 rounded-[20px] ${
        index === educationList.length - 1 ? "mb-0" : "mb-6"
      } ${isDarkMode ? "feature-card" : "bg-gray-100"}`}
    >
      <div
        className={`w-[64px] h-[64px] rounded-full ${
          styles.flexCenter
        } ${isDarkMode ? "bg-dimBlue" : "bg-teal-100"}`}
      >
        <img src={icon} alt="icon" className="w-[80%] h-[80%] object-contain" />
      </div>
      <div className="flex-1 flex flex-col ml-4">
        <h4
          className={`font-poppins font-semibold text-[20px] leading-[30px] mb-1 ${
            isDarkMode ? "text-gradient" : "text-gradient-light"
          }`}
        >
          {title}
        </h4>
        <p
          className={`font-poppins font-normal text-[16px] leading-[30px] mb-1 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {degree}
        </p>
        <p
          className={`font-poppins font-normal text-[14px] leading-[30px] mb-1 ${
            isDarkMode ? "text-dimWhite" : "text-mediumGray"
          }`}
        >
          {duration}
        </p>
        <p
          className={`font-poppins font-normal text-[16px] leading-[30px] mb-1 ${
            isDarkMode ? "text-dimWhite" : "text-darkGray"
          }`}
        >
          ● {content1}
        </p>
        {content2 && (
          <p
            className={`font-poppins font-normal text-[16px] leading-[30px] mb-1 ${
              isDarkMode ? "text-dimWhite" : "text-darkGray"
            }`}
          >
            ● {content2}
          </p>
        )}
      </div>
    </div>
  );
};

const Education = () => {
  const { isDarkMode } = useTheme();
  return (
    <section id="education">
      <h1
        className={`flex-1 font-poppins font-semibold ss:text-[55px] text-[45px] ${
          isDarkMode ? "text-white" : "text-gray-800"
        } ss:leading-[80px] leading-[80px]`}
      >
        Education
      </h1>
      <motion.div
        className={layout.sectionReverse}
        whileInView={{ x: [-60, 0], opacity: [0, 1] }}
        transition={{ duration: 1 }}
      >
        <div className={layout.sectionImgReverse}>
          <div className="w-[80%] h-[80%] relative z-[5]">
            <Lottie {...defaultOptions} />
          </div>

          {/* gradient start */}
          <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
          <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
          {/* gradient end */}
        </div>

        <div className={`${layout.sectionInfo} flex-col`}>
          {educationList.map((feature, index) => (
            <FeatureCard key={feature.id} index={index} {...feature} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Education;