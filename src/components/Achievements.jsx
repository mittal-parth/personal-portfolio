import React, { useState, useEffect, useRef } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { TiNews } from "react-icons/ti";
import { LinkPreview } from "./LinkPreview";
import { achievements } from "../constants";
import styles from "../style";

const Achievements = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // State to track current carousel position
  const [cardTotalWidth, setCardTotalWidth] = useState(0); // State to store total width of each card (width + margin) for scroll calculations
  const containerRef = useRef(null);

  // Calculate card width on mount and window resize for responsive carousel
  useEffect(() => {
    const updateCardWidth = () => {
      if (containerRef.current) {
        const card = containerRef.current.querySelector(".achievement-card");
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
    if (currentIndex < achievements.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };
  // Navigate to previous achievement card
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const isNextDisabled = currentIndex >= achievements.length - 1;
  const isPrevDisabled = currentIndex === 0;

  return (
    <section
      className="bg-primary overflow-hidden text-white mt-5 md:mt-10 relative"
      id="achievements"
    >
      <div className={`bg-primary ${styles.flexCenter} ${styles.paddingX}`}>
        <div className={`${styles.boxWidth}`}>
          <h1 className="flex-1 font-poppins font-semibold ss:text-[55px] text-[45px] text-white ss:leading-[80px] leading-[80px]">
            Achievements
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
                transform: `translateX(-${currentIndex * cardTotalWidth}px)`,
              }}
            >
              {/* Render all achievement cards */}
              {achievements.map((achievement, index) => (
                <AchievementCard key={index} {...achievement} />
              ))}
            </div>
            <div className="flex justify-end mb-4">
              {/* Navigation buttons */}
              <button
                onClick={handlePrev}
                disabled={isPrevDisabled}
                className="p-2 bg-gray-700 rounded-full disabled:opacity-50 mx-2 hover:bg-gray-600 transition-colors"
              >
                &lt;
              </button>
              <button
                onClick={handleNext}
                disabled={isNextDisabled}
                className="p-2 bg-gray-700 rounded-full disabled:opacity-50 mx-2 hover:bg-gray-600 transition-colors"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AchievementCard = (props) => {
  return (
    <div className="achievement-card flex-shrink-0 flex flex-col md:w-[400px] w-[320px] justify-around px-6 py-4 rounded-[20px] md:mr-10 mr-6 my-5 transition-all duration-300 transform border hover:border-teal-200 hover:shadow-lg hover:shadow-teal-200/20 dark:border-gray-700 dark:hover:border-transparent">
      {/* Achievement icon/logo */}
      <img
        src={props.icon}
        alt={props.event}
        className="w-[45px] h-[45px] rounded-full mt-1 mb-1"
      />
      <div className="flex flex-col justify-end mt-4 mb-1">
        {/* Event name */}
        <p className="font-poppins font-normal text-xl text-white leading-[24px] mb-2">
          {props.event}
        </p>
        {/* Position/Award */}
        <p className="font-poppins italic font-normal text-lg text-gradient mb-3">
          {props.position}
        </p>
        {/* Achievement descriptions - only render if content exists */}
        {props.content1 && (
          <p className="font-poppins font-normal text-dimWhite text-sm mb-1">
            🚀 {props.content1}
          </p>
        )}
        {props.content2 && (
          <p className="font-poppins font-normal text-dimWhite text-sm mb-1">
            ⚡ {props.content2}
          </p>
        )}
        {props.content3 && (
          <p className="font-poppins font-normal text-dimWhite text-sm mb-4">
            🔥 {props.content3}
          </p>
        )}
      </div>
      {/* Social/Project links with hover preview - only render if link exists */}
      <div className="flex flex-row mb-2 font-poppins font-normal text-dimWhite gap-3">
        {props.article && (
          <LinkPreview url={props.article}>
            <a
              href={props.article}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:text-teal-200 hover:scale-110 transition-all"
            >
              <TiNews size="1.5rem" className="inline" />
            </a>
          </LinkPreview>
        )}
        {props.youtube && (
          <LinkPreview
            url={props.youtube}
            className="inline-flex items-center hover:text-teal-200 hover:scale-110 transition-all"
          >
            <a
              href={props.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <FaYoutube size="1.5rem" className="inline" />
            </a>
          </LinkPreview>
        )}
        {props.github && (
          <LinkPreview
            url={props.github}
            className="inline-flex items-center hover:text-teal-200 hover:scale-110 transition-all"
          >
            <a
              href={props.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <AiFillGithub size="1.5rem" className="inline" />
            </a>
          </LinkPreview>
        )}
        {props.project && (
          <LinkPreview
            url={props.project}
            className="inline-flex items-center hover:text-teal-200 hover:scale-110 transition-all"
          >
            <a
              href={props.project}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <BsLink45Deg size="1.5rem" className="inline" />
            </a>
          </LinkPreview>
        )}
      </div>
    </div>
  );
};

export default Achievements;
