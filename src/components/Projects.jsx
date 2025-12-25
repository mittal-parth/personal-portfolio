import React, { useState, useEffect, useRef } from "react";
import { projects } from "../constants";
import { AiFillGithub } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";

const Project = (props) => {
  return (
    <div className="project-card flex-shrink-0 px-8 py-6 transition-colors duration-300 transform border rounded-xl hover:border-transparent group dark:border-gray-700 dark:hover:border-transparent feature-card w-[320px] sm:w-[400px] md:w-[500px] mr-6 sm:mr-8 md:mr-10">
      <div className="flex flex-col items-start">
        <img
          className="flex-shrink-0 object-cover w-20 h-20 rounded-full ring-4 ring-gray-300"
          src={props.image}
          alt=""
        />

        <div className="mt-4 w-full">
          <h1 className="text-xl font-semibold font-poppins text-gray-700 capitalize md:text-2xl group-hover:text-white text-gradient">
            {props.title}
          </h1>
          <p className="font-poppins font-normal text-dimWhite mt-3 mb-2">
            Tech Stack
          </p>
          <div className="text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">
            <div className="flex flex-wrap gap-4">
              {props.stack.map((tech, index) => (
                <div
                  key={tech.id}
                  index={index}
                  className="text-dimWhite text-[20px] hover:text-teal-200 tooltip"
                >
                  {React.createElement(tech.icon)}
                  <span className="tooltiptext">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-gray-500 dark:text-gray-300 group-hover:text-gray-300 font-poppins">
        {props.content}
      </p>

      <div className="flex mt-4 -mx-2">
        {props.github ? (
          <a href={props.github} target="_blank">
            <AiFillGithub
              size="2rem"
              className="text-white mr-1 hover:text-teal-200"
            />
          </a>
        ) : (
          ""
        )}
        {props.link ? (
          <a href={props.link} target="_blank">
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
  const [currentIndex, setCurrentIndex] = useState(0); // State to track current carousel position
  const [cardTotalWidth, setCardTotalWidth] = useState(0); // State to store total width of each card (width + margin) for scroll calculations
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

  // Navigate to previous project card
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const isNextDisabled = currentIndex >= projects.length - 1;
  const isPrevDisabled = currentIndex === 0;

  return (
    <section id="projects" className="overflow-hidden">
      <h1 className="flex-1 font-poppins font-semibold ss:text-[55px] text-[45px] text-white ss:leading-[80px] leading-[80px]">
        Projects
      </h1>

      <div className="container px-2 py-14 mx-auto mb-8">
        <div className="overflow-hidden">
          <div
            ref={containerRef}
            className="flex transition-transform duration-500 ease-in-out mb-8"
            style={{
              transform: `translateX(-${currentIndex * cardTotalWidth}px)`,
            }}
          >
            {/* Render all project cards */}
            {projects.map((project, index) => (
              <Project key={project.id} index={index} {...project} />
            ))}
          </div>
          <div className="flex justify-end mb-8">
            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              disabled={isPrevDisabled}
              // p-2 bg-gray-700 rounded-full disabled:opacity-50 mx-2 hover:bg-gray-600 transition-colors
              className="p-2 bg-gray-700 rounded-full disabled:opacity-50 mx-2 hover:bg-gray-600 transition-colors text-white"
            >
              &lt;
            </button>
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className="p-2 bg-gray-700 rounded-full disabled:opacity-50 mx-2 hover:bg-gray-600 transition-colors text-white"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
