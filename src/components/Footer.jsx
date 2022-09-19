import React from "react";
import Button from "./Button";
import { socialMedia } from "../constants";
import { profilePic } from "../assets";
import styles, { layout } from "../style";

const Footer = () => (
  // <footer className="bg-white dark:bg-gray-900" id="contactMe">
  //   <div className="container px-6 py-8 mx-auto">
  //     <div className="text-center">
  //       <p
  //         href="#"
  //         className="text-2xl font-bold text-gray-800 font-poppins dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
  //       >
  //         Parth Mittal
  //       </p>

  //       <p className="mt-2 text-gray-500 dark:text-gray-400">
  //         Upcoming MTS Intern @ Oracle India | Web Manager @ IRIS, NITK |
  //         Executive Member at GDSC, NITK
  //       </p>

  //       <div className="flex flex-col mt-4 sm:flex-row sm:items-center sm:justify-center">
  //         <Button text="Resume" />
  //       </div>
  //     </div>

  //     <hr className="my-6 border-gray-200 dark:border-gray-700" />

  //     <div className="flex flex-row justify-center items-center">
  //       {socialMedia.map((social, index) => (
  //         <a href={social.link} target="_blank" key={social.id} index={index} className="text-white mr-5 text-[25px] hover:text-teal-200">
  //           {React.createElement(social.icon)}
  //         </a>
  //       ))}
  //     </div>
  //   </div>
  // </footer>
  <footer id="card-deal" className="bg-gray-900">
    <div className={layout.sectionReverse}>
      <div className={`px-6 ${layout.sectionInfo} md:ml-16`}>
        <h2 className="text-xl font-bold text-gray-800 font-poppins dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
          Parth Mittal
        </h2>
        <p className={`font-poppins font-normal text-dimWhite text-[16px] leading-[30.8px] max-w-[470px] mt-5`}>
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
        <Button styles="mt-10" text="Resume" />
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
