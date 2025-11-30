import React from "react";
import { BsLink45Deg } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { TiNews } from "react-icons/ti";
import { LinkPreview } from "./LinkPreview";
import { achievements } from "../constants";
import styles from "../style";
import { motion } from "framer-motion";

const Achievements = () => {
  return (
    <div className={`bg-primary ${styles.flexCenter} ${styles.paddingX}`}>
      <div className={`${styles.boxWidth}`}>
        <section id="achievements">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[55px] text-[45px] text-white ss:leading-[80px] leading-[80px]">
            Achievements
          </h1>

          <div className="container px-2 py-10 mx-auto mb-8">
            <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
              {achievements.map((achievement, index) => (
                <AchievementCard key={achievement.id} index={index} {...achievement} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const AchievementCard = (props) => {
  return (
    <motion.div
      className="achievement-card flex flex-col justify-around px-6 py-4 rounded-[20px] my-5 transition-all duration-300 transform border hover:border-teal-200 hover:shadow-lg hover:shadow-teal-200/20 dark:border-gray-700 dark:hover:border-transparent"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
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
    </motion.div>
  );
};

export default Achievements;
