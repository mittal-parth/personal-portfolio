// styles is a prop
import React from "react";
const Button = ({ styles, text, icon }) => {
  return (
    <button
      type="button"
      className={`py-3 px-4 bg-blue-gradient font-poppins font-medium text-[12px] text-primary outline-none ${styles} rounded`}
    >
      {React.createElement(icon)}&nbsp;{text}
    </button>
  );
};

export default Button;
