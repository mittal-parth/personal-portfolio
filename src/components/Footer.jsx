import React from "react";
import Button from "./Button";
import { socialMedia } from "../constants";

const Footer = () => (
  <footer className="bg-white dark:bg-gray-900">
    <div className="container px-6 py-8 mx-auto">
      <div className="text-center">
        <p
          href="#"
          className="text-2xl font-bold text-gray-800 font-poppins dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
        >
          Parth Mittal
        </p>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Upcoming MTS Intern @ Oracle India | Web Manager @ IRIS, NITK |
          Executive Member at GDSC, NITK
        </p>

        <div className="flex flex-col mt-4 sm:flex-row sm:items-center sm:justify-center">
          <Button text="Resume" />
        </div>
      </div>

      <hr className="my-6 border-gray-200 dark:border-gray-700" />

      <div className="flex flex-row justify-center items-center">
        {/* {socialMedia.map((social, index) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[21px] h-[21px] object-contain cursor-pointer text-white ${
              index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
            }`}
            onClick={() => window.open(social.link)}
          />

        ))} */}

        {socialMedia.map((social, index) => (
          <a href={social.link} target="_blank" key={social.id} index={index} className="text-white mr-5 text-[25px] hover:text-teal-200">
            {React.createElement(social.icon)}
          </a>
        ))}
      </div>

      {/* <div className="flex flex-row md:mt-0 mt-6"></div> */}
    </div>
  </footer>
);

export default Footer;
