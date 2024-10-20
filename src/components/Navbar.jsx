import { useState } from "react";
import { close, parthmittal,parthmittal_light, menu } from "../assets";
import { navLinks } from "../constants";
import { scrollToSection } from "../../lib/helperFunctions";
import {Sun, Moon} from "lucide-react";
import { useTheme } from "../context/ThemeContext"

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { isDarkMode, toggleTheme} = useTheme();

  return (
    <nav className="w-full  flex justify-between items-center navbar">
      {/* Logo */}
      <a href="#home">
        <img
          src={isDarkMode ? parthmittal:parthmittal_light}
          alt="Parth Mittal"
          className="w-[80px] h-[80px]"
        />
      </a>

      {/* List of links */}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins
            font-normal
            cursor-pointer
            text-[16px]
            ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}
            text-white hover:text-teal-200`}
            onClick={() => scrollToSection(nav.id)}
          >
            {nav.title}
          </li>
        ))}
        <li className="ml-10">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} transition-colors duration-200`}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </li>
      </ul>

      {/* only for mobile devices, created separately */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
      <button 
          onClick={toggleTheme} 
          className={`p-2 rounded-full mr-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} transition-colors duration-200`}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        {/* shows toggle icon based on its state */}
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          // correct way to change state using the prev
          // version of the same state using a callback function
          onClick={() => setToggle((prev) => !prev)}
        />

        <div
          className={`${toggle ? "flex" : "hidden"} p-6 bg-black-gradient
        absolute top-20 right-0 mx-4 my-2
        min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins
                font-normal
                cursor-pointer
                text-[16px]
                ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}
                text-white`}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
