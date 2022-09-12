import styles, { layout } from "../style";
import { educationList } from "../constants";
import { bill } from "../assets";
import Lottie from "react-lottie";
import animationData from "../lotties/quiz-mode-teal-dark.json";

// TODO: Add heading 'Education'

// lottie config
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const FeatureCard = ({ icon, title, degree, duration, content1, content2, index }) => (
  <div
    className={`flex flex-row p-6 rounded-[20px]
	${index === educationList.length - 1 ? "mb-0" : "mb-6"} feature-card`}
  >
    <div
      className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
    >
      <img src={icon} alt="icon" className="w-[80%] h-[80%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-4">
      <h4 className="font-poppins font-semibold text-white text-[20px] leading-[30px] mb-1 text-gradient">
        {title}
      </h4>
      <p className="font-poppins font-normal text-white text-[16px] leading-[30px] mb-1 ">
        {degree}
      </p>
      <p className="font-poppins font-normal text-dimWhite text-[14px] leading-[30px] mb-1">
        {duration}
      </p>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[30px] mb-1">
        - {content1}
      </p>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[30px] mb-1">
        - {content2}
      </p>
    </div>
  </div>
);

const Education = () => {
  return (
    <section id="education" className={layout.sectionReverse}>
      <div className={layout.sectionImgReverse}>
        <div className="w-[80%] h-[80%] relative z-[5]">
          <Lottie options={defaultOptions} />
        </div>

        {/* gradient start */}
        <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
        <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
        {/* gradient end */}
      </div>

      <div className={`${layout.sectionInfo} flex-col`}>
        {educationList.map((feature, index) => (
          <FeatureCard key={feature.id} index={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default Education;
