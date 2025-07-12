import { motion } from "framer-motion";
import { useState } from "react";

const FramerMotionTest = () => {
  const [isLeft, setIsLeft] = useState(false);

  const togglePosition = () => {
    setIsLeft(!isLeft);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <motion.button
        onClick={togglePosition}
        whileHover={{ scale: 1.05 }}
        className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-lg"
        whileTap={{ scale: 0.95 }}
      >
        {isLeft ? "move right" : "move left"}
      </motion.button>

      <motion.div
        animate={{
          x: isLeft ? -100 : 100,
          backgroundColor: isLeft ? "#00aaff" : "#ff00aa",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-24 h-24 rounded-xl shadow-lg"
      />
    </div>
  );
};

export default FramerMotionTest;
