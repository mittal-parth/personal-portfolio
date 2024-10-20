import styles from "../style";
import { arrowUp, arrowUpLight } from "../assets";
import { callToAction } from "../constants";
import { useTheme } from "../context/ThemeContext"

const LetsConnect = () => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}
      onClick={() => window.open(callToAction)}
    >
      <div
        className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}
      >
        <div className={`${styles.flexStart} flex-row`}>
          <p className="font-poppins font-medium text-[18px] leading-[23px]">
            <span className={`${isDarkMode ? 'text-gradient' : 'text-gradient-light'}`}>Let's</span>
          </p>
          <img src={isDarkMode ? arrowUp: arrowUpLight} alt="arrowUp" className="w-[23px] h-[23px] " />
        </div>
        <div className={`${styles.flexStart} flex-row`}>
          <p className="font-poppins font-medium text-[18px] leading-[23px]">
            <span className={`${isDarkMode ? 'text-gradient' : 'text-gradient-light'}`}>Connect</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LetsConnect;