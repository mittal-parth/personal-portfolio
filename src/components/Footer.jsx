import React from "react";
import Button from "./Button";
import { socialMedia } from "../constants";
import { profilePic } from "../assets";
import { layout } from "../style";
import { resumeLink } from "../constants";

const Footer = () => (
  <footer id="contactMe" className="bg-gray-900">
    <div className={layout.sectionReverse}>
      <div className={`px-6 ${layout.sectionInfo} md:ml-16`}>
        <h2 className="text-xl font-bold text-gray-800 font-poppins dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
          Parth Mittal
        </h2>
        <p
          className={`font-poppins font-normal text-dimWhite text-[16px] leading-[30.8px] max-w-[470px] mt-5`}
        >
          Upcoming MTS Intern @ Oracle India | Web Manager @ IRIS, NITK |
          Executive Member at GDSC, NITK
        </p>
        <div className="flex flex-row mt-4">
          {socialMedia.map((social, index) => (
            <a
              href={social.link}
              target="_blank"
              key={social.id}
              index={index}
              className="text-white mr-5 text-[25px] hover:text-teal-200"
            >
              {React.createElement(social.icon)}
            </a>
          ))}
        </div>
        {/* styles is a prop */}
        <a href={resumeLink} target="_blank">
          <Button
            styles="mt-10"
            text="Resume"
          />
        </a>
      </div>

      <div className={layout.sectionImgReverseEnd}>
        <img
          src={profilePic}
          alt="Parth Mittal"
          className="w-[200px] h-[200px] border-2 border-teal-200 relative z-[5] rounded-full md:mr-16"
        />
      </div>
    </div>
  </footer>
);

export default Footer;
