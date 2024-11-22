import { useState } from "react";
import { close, parthmittal, menu } from "../assets";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { navLinks } from "../constants";
import { scrollToSection } from "../lib/helperFunctions";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [prev, setPrev] = useState(0);


  // This onupdate is called in scrollY.onChange callback
  function updateNavbar(latest, prev) {
    if (latest < prev) {
      setHidden(false)
    }
    else if (latest > 100 && latest > prev) {
      setHidden(true)
    }
  }

  // Using useMotionValueEvent hook to listen to change events
  useMotionValueEvent(scrollY, "change", (latest) => {
    updateNavbar(latest, prev)
    setPrev(latest)
  })

  return (
    <motion.nav className={`w-full sm:px-16 px-6 flex justify-between items-center navbar ${hidden ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"} bg-primary/50 backdrop-blur shadow-lg fixed z-10`}
      animate={{
        y: hidden ? -100 : 0,
        opacity: hidden ? 0 : 1,
      }}
      initial={{ y: 0, opacity: 1 }}
      transition={{
        ease: [0.1, 0.25, 0.3, 1],
        duration: 0.6
      }}>
      {/* Logo */}
      <a href="#home">
        <img
          src={parthmittal}
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
      </ul>

      {/* only for mobile devices, created separately */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
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
    </motion.nav>
  );
};

export default Navbar;
