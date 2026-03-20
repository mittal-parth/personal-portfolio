// styles is a prop
import React from "react";
const Button = ({ styles, text, icon }) => {
  // Use the same teal as `.text-gradient` (`#82E8EB`) so the buttons match text styling.
  const classNames = `py-3 px-4 bg-[#82E8EB] font-poppins font-medium text-[12px] text-primary outline-none ${styles ?? ''} rounded`

  return (
    icon ? (
      <button
        type="button"
        className={classNames}
      >
        {React.createElement(icon)}&nbsp;{text}
      </button>
    ) : (
      <button
        type="button"
        className={classNames}
      >
        {text}
      </button>
    )
  )
};

export default Button;
