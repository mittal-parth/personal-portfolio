import React from "react";
import styles from "../style";
import { extraCurricular } from "../constants";
import { BsLink45Deg } from "react-icons/bs";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext"

const Content = ({ text, link }) => {
  const { isDarkMode} = useTheme();
  return (
    <div>
      <p className="font-poppins font-normal text-[14px] ${isDarkMode ? 'text-dimWhite' : 'text-gray-600'} my-4 leading-[32px]">
        ● {text}{" "}
        {link ? (
          <a href={link} target="_blank">
            <BsLink45Deg
              size="1rem"
              className={`inline ${isDarkMode ? ' hover:text-teal-200' : 'hover:text-teal-600'}`}
            ></BsLink45Deg>
          </a>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};

const ExtraCurricularCard = (props) => {
  const { isDarkMode } = useTheme();
  return (
    <motion.div
      className={`flex flex-col px-10 py-12 rounded-[20px] max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 ${isDarkMode ? 'feedback-card' : 'bg-white shadow-lg'}`}
      whileInView={{ y: [-30, 0], opacity: [0, 1] }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-row">
        <img
          src={props.logo}
          alt={props.organisation}
          className="w-[52px] h-[52px] rounded-full"
        />
        <div className="flex flex-col ml-4">
          <h4 className={`font-poppins font-semibold text-[20px] ${isDarkMode ? 'text-gradient' : 'text-teal-600'} leading-[32px]`}>
            {props.organisation}
          </h4>
          <p className={`font-poppins font-normal text-[16px] ${isDarkMode ? 'text-white' : 'text-gray-800'} my-1 leading-[24px]`}>
            {props.title}
          </p>
          <p className={`font-poppins italic font-normal text-[14px] ${isDarkMode ? 'text-dimWhite' : 'text-gray-600'} my-1`}>
            {props.duration}
          </p>
        </div>
      </div>

      <div>
        {props.content.map((info) => {
          return <Content {...info} />;
        })}
      </div>
    </motion.div>
  );
};

const ExtraCurricular = () => {
  const { isDarkMode } = useTheme();
  return (
    <section id="extraCurricular">
       <h1 className={`flex-1 font-poppins font-semibold ss:text-[55px] text-[45px] ${isDarkMode ? 'text-white' : 'text-gray-800'} ss:leading-[80px] leading-[80px]`}>
        Extra Curricular
      </h1>

      <div className={`${styles.flexCenter} flex-col relative mb-4 mt-8`}>
        <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 md:mt-16 md:grid-cols-3">
          {extraCurricular.map((card) => (
            <ExtraCurricularCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtraCurricular;
