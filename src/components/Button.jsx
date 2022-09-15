// styles is a prop
const Button = ({ styles, text }) => {
    return (
      <button
        type="button"
        className={`py-3 px-4 bg-blue-gradient font-poppins font-medium text-[12px] text-primary outline-none ${styles} rounded`}
      >
        {text}
      </button>
    );
  };

  export default Button;