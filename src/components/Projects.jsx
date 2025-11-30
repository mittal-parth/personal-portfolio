import React, { useState, useEffect, useRef } from "react";
import { projects } from "../constants";
import { AiFillGithub } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import styles from "../style";

const Project = (props) => {
  return (
    <div className="project-card flex-shrink-0 flex flex-col md:w-[400px] w-[320px] justify-around px-6 py-4 rounded-[20px] md:mr-10 mr-6 my-5 transition-all duration-300 transform border hover:border-teal-200 hover:shadow-lg hover:shadow-teal-200/20 dark:border-gray-700 dark:hover:border-transparent">
      {/* Project image/logo */}
      <img
        src={props.image}
        alt={props.title}
        className="w-[45px] h-[45px] rounded-full mt-1 mb-1"
      />
      <div className="flex flex-col justify-end mt-4 mb-1">
        {/* Project title */}
        <p className="font-poppins font-normal text-xl text-white leading-[24px] mb-2">
          {props.title}
        </p>
        {/* Tech Stack */}
        <div className="flex flex-row mb-3">
          {props.stack.map((tech) => (
            <div
              key={tech.id}
              className="text-dimWhite mr-3 text-[18px] hover:text-teal-200 tooltip"
            >
              {React.createElement(tech.icon)}
              <span className="tooltiptext">{tech.name}</span>
            </div>
          ))}
        </div>
        {/* Project description */}
        <p className="font-poppins font-normal text-dimWhite text-sm mb-4">
          {props.content}
        </p>
      </div>
      {/* Project links */}
      <div className="flex flex-row mb-2 font-poppins font-normal text-dimWhite gap-3">
        {props.github && (
          <a href={props.github} target="_blank" rel="noopener noreferrer">
            <AiFillGithub
              size="1.5rem"
              className="text-white hover:text-teal-200 hover:scale-110 transition-all"
            />
          </a>
        )}
        {props.link && (
          <a href={props.link} target="_blank" rel="noopener noreferrer">
            <BsLink45Deg
              size="1.5rem"
              className="text-white hover:text-teal-200 hover:scale-110 transition-all"
            />
          </a>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardTotalWidth, setCardTotalWidth] = useState(0);
  const containerRef = useRef(null);

  // Calculate card width on mount and window resize for responsive carousel
  useEffect(() => {
    const updateCardWidth = () => {
      if (containerRef.current) {
        const card = containerRef.current.querySelector(".project-card");
        if (card) {
          const cardWidth = card.offsetWidth;
          const cardMargin = parseInt(
            window.getComputedStyle(card).marginRight,
            10
          );
          setCardTotalWidth(cardWidth + cardMargin);
        }
      }
    };
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => {
      window.removeEventListener("resize", updateCardWidth);
    };
  }, []);

  // Navigation handlers
  const handleNext = () => {
    if (currentIndex < projects.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const isNextDisabled = currentIndex >= projects.length - 1;
  const isPrevDisabled = currentIndex === 0;

  return (
    <section
      className="bg-primary overflow-hidden text-white mt-5 md:mt-10 relative"
      id="projects"
    >
      <div className={`bg-primary ${styles.flexCenter} ${styles.paddingX}`}>
        <div className={`${styles.boxWidth}`}>
          <h1 className="flex-1 font-poppins font-semibold ss:text-[55px] text-[45px] text-white ss:leading-[80px] leading-[80px]">
            Projects
          </h1>
        </div>
      </div>
      <div className="absolute z-[0] w-[60%] h-[60%] -left-[50%] rounded-full blue__gradient bottom-40" />
      <div className={`bg-primary ${styles.flexCenter} ${styles.paddingX}`}>
        <div className={`${styles.boxWidth}`}>
          <div className="my-20 overflow-hidden">
            <div
              ref={containerRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: cardTotalWidth ? `translateX(-${currentIndex * cardTotalWidth}px)` : 'translateX(0)',
              }}
            >
              {/* Render all project cards */}
              {projects.map((project, index) => (
                <Project key={project.id} index={index} {...project} />
              ))}
            </div>
            <div className="flex justify-end mb-4">
              {/* Navigation buttons */}
              <button
                onClick={handlePrev}
                disabled={isPrevDisabled}
                className="p-2 bg-gray-700 rounded-full disabled:opacity-50 mx-2 hover:bg-gray-600 transition-colors"
                aria-label="Previous project"
              >
                ‹
              </button>
              <button
                onClick={handleNext}
                disabled={isNextDisabled}
                className="p-2 bg-gray-700 rounded-full disabled:opacity-50 mx-2 hover:bg-gray-600 transition-colors"
                aria-label="Next project"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
