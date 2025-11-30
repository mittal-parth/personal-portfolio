import React, { useState, useEffect, useRef } from "react";
import { projects } from "../constants";
import { AiFillGithub } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import styles from "../style";

const Project = (props) => {
  return (
    <div className="project-card flex-shrink-0 w-[calc(100%-48px)] md:w-[calc(50%-20px)] px-12 py-8 mx-6 md:mx-0 md:mr-10 my-5 transition-colors duration-300 transform border rounded-xl hover:border-transparent group dark:border-gray-700 dark:hover:border-transparent feature-card">
      <div className="flex flex-col sm:-mx-4 sm:flex-row">
        <img
          className="flex-shrink-0 object-cover w-24 h-24 rounded-full sm:mx-4 ring-4 ring-gray-300"
          src={props.image}
          alt=""
        />

        <div className="mt-4 sm:mx-4 sm:mt-0">
          <h1 className="text-xl font-semibold font-poppins text-gray-700 capitalize md:text-2xl group-hover:text-white text-gradient">
            {props.title}
          </h1>
          <p className="font-poppins font-normal text-dimWhite mt-3">
            Tech Stack
          </p>
          <div className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">
            <div className="flex sm:flex-row">
              {props.stack.map((tech, index) => (
                <div
                  key={tech.id}
                  index={index}
                  className="text-dimWhite mr-5 text-[20px] hover:text-teal-200 tooltip"
                >
                  {React.createElement(tech.icon)}
                  <span className="tooltiptext">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-8 text-gray-500 dark:text-gray-300 group-hover:text-gray-300 font-poppins">
        {props.content}
      </p>

      <div className="flex mt-4 -mx-2">
        {props.github ? (
          <a href={props.github} target="_blank" rel="noopener noreferrer">
            <AiFillGithub
              size="2rem"
              className="text-white mr-1 hover:text-teal-200"
            />
          </a>
        ) : (
          ""
        )}
        {props.link ? (
          <a href={props.link} target="_blank" rel="noopener noreferrer">
            <BsLink45Deg
              size="2rem"
              className="text-white hover:text-teal-200"
            ></BsLink45Deg>
          </a>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardTotalWidth, setCardTotalWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(2);
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
          // Set visible cards based on screen size
          setVisibleCards(window.innerWidth >= 768 ? 2 : 1);
        }
      }
    };
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => {
      window.removeEventListener("resize", updateCardWidth);
    };
  }, []);

  // Navigation handlers - scroll by visible cards count
  const handleNext = () => {
    const maxIndex = projects.length - visibleCards;
    if (currentIndex < maxIndex) {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + visibleCards, maxIndex));
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - visibleCards, 0));
    }
  };

  const isNextDisabled = currentIndex >= projects.length - visibleCards;
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
