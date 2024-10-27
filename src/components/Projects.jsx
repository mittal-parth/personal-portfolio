import React from "react";
import { projects } from "../constants";
import { AiFillGithub } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext"

const Project = (props) => {
  const { isDarkMode } = useTheme();
  return (
    <motion.div
      className={`px-12 py-8 transition-colors duration-300 transform border rounded-xl hover:border-transparent group ${
        isDarkMode
          ? "dark:border-darkGray dark:hover:border-transparent feature-card"
          : "dark:border-darkGray dark:hover:border-transparent feature-card-light hover:bg-darkGray"
      }`}
      initial={{ y: -30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.75, delay: 0.1 }}
    >
      <div className="flex flex-col sm:-mx-4 sm:flex-row">
        <img
          className="flex-shrink-0 object-cover w-24 h-24 rounded-full sm:mx-4 ring-4 ring-silverGray"
          src={props.image}
          alt=""
        />

        <div className="mt-4 sm:mx-4 sm:mt-0">
          <h1
            className={`text-xl font-semibold font-poppins md:text-2xl ${
              isDarkMode ? "text-gradient" : "text-gradient-light"
            }`}
          >
            {props.title}
          </h1>
          <p
            className={`font-poppins font-normal mt-3 ${
              isDarkMode ? "text-dimWhite" : "text-darkGray group-hover:text-white"
            }`}
          >
            Tech Stack
          </p>
          <div className="flex sm:flex-row mt-2">
            {props.stack.map((tech) => (
              <div
                key={tech.id}
                className={`mr-5 text-[20px] ${
                  isDarkMode 
                    ? "text-dimWhite hover:text-lightTeal" 
                    : "text-darkGray group-hover:text-white hover:text-lightTeal"
                } tooltip`}
              >
                {React.createElement(tech.icon)}
                <span className="tooltiptext">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p
        className={`mt-8 font-poppins ${
          isDarkMode 
            ? "text-silverGray" 
            : "text-mediumGray group-hover:text-white"
        }`}
      >
        {props.content}
      </p>

      <div className="flex mt-4 -mx-2">
        {props.github && (
          <a href={props.github} target="_blank" rel="noopener noreferrer">
            <AiFillGithub
              size="2rem"
              className={`mr-1 transition-colors duration-300 ${
                isDarkMode 
                  ? "text-white hover:text-lightTeal" 
                  : "text-darkGray group-hover:text-white hover:text-lightTeal"
              }`}
            />
          </a>
        )}
        {props.link && (
          <a href={props.link} target="_blank" rel="noopener noreferrer">
            <BsLink45Deg
              size="2rem"
              className={`transition-colors duration-300 ${
                isDarkMode 
                  ? "text-white hover:text-lightTeal" 
                  : "text-darkGray group-hover:text-white hover:text-lightTeal"
              }`}
            />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { isDarkMode } = useTheme();
  return (
    <section id="projects">
      <h1
        className={`flex-1 font-poppins font-semibold ss:text-[55px] text-[45px] ${
          isDarkMode ? "text-white" : "text-gray-800"
        } ss:leading-[80px] leading-[80px]`}
      >
        Projects
      </h1>

      <div className="container px-2 py-10 mx-auto mb-8">
        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
          {projects.map((project) => (
            <Project key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;