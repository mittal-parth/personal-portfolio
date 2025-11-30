import styles from "../style";
import { motion } from "framer-motion";
import { parthmittal } from "../assets";

const Loading = () => {
  return (
    <motion.div
      id="loading"
      className={`w-[100vw] h-[100vh] flex "${styles.flexCenter}`}
      initial={{ scale: 1.0, opacity: 0.25 }}
      animate={{ scale: 2.0, opacity: 0.8 }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeOut" } }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
    >
      <img src={parthmittal} alt="Parth Mittal" className="w-[80px] h-[80px]" />
    </motion.div>
  );
};

export default Loading;
