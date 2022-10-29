// styles is a prop
import React from "react";
const Button = ({ styles, text, icon }) => {
  const classNames = `py-3 px-4 bg-blue-gradient font-poppins font-medium text-[12px] text-primary outline-none ${styles ?? ''} rounded`

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
