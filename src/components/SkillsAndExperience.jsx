import React from "react";
import { experiences, skills } from "../constants";
import { layout } from "../style";
import { motion } from "framer-motion";
import { BsLink45Deg } from "react-icons/bs";
import { useTheme } from "../context/ThemeContext";

export const SkillIcon = ({ icon, name }) => {
  const { isDarkMode } = useTheme();
  return (
    <div className="flex flex-col items-center">
      <span className={`text-[30px] ${isDarkMode ? 'text-white hover:text-lightTeal' : 'text-darkGray hover:text-teal-600'}`}>
        {React.createElement(icon)}
      </span>
      <p className={`font-poppins text-[12px] mt-2 ${isDarkMode ? 'text-dimWhite' : 'text-mediumGray'}`}>{name}</p>
    </div>
  );
};

const SkillCard = (props) => {
  const { isDarkMode } = useTheme();
  return (
    <motion.div
      whileInView={{ y: [-20, 0], opacity: [0, 1] }}
      transition={{ duration: 1 }}
      className={`mt-4 mb-6 border-l ${isDarkMode ? 'border-darkGray' : 'border-silverGray'} mx-4`}
    >
      <div className={`relative w-3 h-3 rounded-full top-5 right-[6.2px] border ${isDarkMode ? 'bg-darkGray border-gray-900' : 'bg-lightGray border-white'}`}></div>
      <div className="flex flex-row items-center mb-6 ml-6">
        <h4 className={`font-poppins font-semibold text-[20px] leading-[32px] ${isDarkMode ? 'text-gradient' : 'text-gradient-light'}`}>
          {props.title}
        </h4>
      </div>
      <div className="grid grid-cols-3 gap-8 ml-8">
        {props.items.map((item) => (
          <SkillIcon key={item.id} {...item} />
        ))}
      </div>
    </motion.div>
  );
};

const Content = ({ text, link }) => {
  const { isDarkMode } = useTheme();
  return (
    <div>
      <p className={`font-poppins font-normal text-[14px] mt-4 ${isDarkMode ? 'text-dimWhite' : 'text-mediumGray'}`}>
        {text}{" "}
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <BsLink45Deg
              size="1rem"
              className={`inline ${isDarkMode ? 'hover:text-lightTeal' : 'hover:text-teal-600'}`}
            />
          </a>
        )}
      </p>
    </div>
  );
};

const ExperienceCard = (props) => {
  const { isDarkMode } = useTheme();
  return (
    <motion.div
      whileInView={{ y: [-20, 0], opacity: [0, 1] }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-row items-center mb-6">
        <img
          src={props.logo}
          alt={props.organisation}
          className="w-[52px] h-[52px] rounded-full z-[2]"
        />
         <h4 className={`font-poppins font-semibold text-[20px] leading-[32px] ml-2 ${isDarkMode ? 'text-gradient' : 'text-gradient-light'}`}>
          {props.organisation}
        </h4>
      </div>
      <ol className={`relative border-l ${isDarkMode ? 'border-darkGray' : 'border-silverGray'} ml-6`}>
      <ol className={`relative border-l ${isDarkMode ? 'border-darkGray' : 'border-silverGray'} ml-6`}>
        {props.positions.map((position, index) => (
          <li
          key={index}
          className={`${index === props.positions.length - 1 ? "mb-0" : "mb-4"} ml-4`}
        >
          <div className={`absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border ${
            isDarkMode ? 'bg-darkGray border-gray-900' : 'bg-lightGray border-white'
          }`}></div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {position.title}
          </h3>
            <time className={`mb-1 text-sm font-normal leading-none ${isDarkMode ? 'text-gray-500' : 'text-mediumGray'}`}>
              {position.duration}
            </time>
            {position.content.map((info, index) => (
              <Content key={index} index={index} {...info} />
            ))}
          </li>
        ))}
      </ol>
    </motion.div>
  );
};

const SkillsAndExperience = () => {
  const { isDarkMode } = useTheme();
  return (
    <section id="skills" className="mb-12">
      <h1 className={`flex-1 font-poppins font-semibold ss:text-[55px] text-[45px] ${isDarkMode ? 'text-white' : 'text-gray-800'} ss:leading-[80px] leading-[80px]`}>
        Skills & Experience
      </h1>
      <div className={layout.section}>
        {/* Skills */}
        <motion.div className={`ml-2 mb-6 ${layout.sectionInfo}`}>
          {skills.map((skill, index) => (
            <SkillCard key={index} index={index} {...skill} />
          ))}
        </motion.div>

        {/* Experience */}
        <motion.div className="flex flex-1 items-center justify-start flex-col">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} index={index} {...exp} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsAndExperience;