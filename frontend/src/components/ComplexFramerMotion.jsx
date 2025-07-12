import { useState } from "react";
import { motion } from "framer-motion";

const ComplexAnimationBox = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    setIsAnimating(true);
    // Visszaállítás 3.5 másodperc után (az animáció időtartama)
    setTimeout(() => setIsAnimating(false), 3500);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <motion.div
        style={{
          width: 100,
          height: 100,
          backgroundColor: "black",
          cursor: "pointer",
          position: "relative",
        }}
        onClick={startAnimation}
        animate={{
          // Alapállapot vagy animációs állapot
          backgroundColor: isAnimating
            ? ["black", "yellow", "yellow", "yellow", "yellow"]
            : "black",
          scale: isAnimating ? [1, 1.8, 1, 1, 1.2] : 1,
          rotate: isAnimating ? [0, 0, 30, -30, 0] : 0,
          y: isAnimating ? [0, -100, -100, 0, 0] : 0,
          borderRadius: isAnimating ? ["0%", "0%", "0%", "0%", "50%"] : "0%",
        }}
        transition={{
          duration: 3.5,
          times: [0, 0.1, 0.4, 0.7, 1], // Az animáció időpontjai (0-1 között)
          ease: "easeInOut",
        }}
        whileTap={{ scale: 0.95 }} // Kis méretváltozás kattintáskor
      >
        {/* Háromszög alakhoz tartalék */}
        {isAnimating && (
          <motion.div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              scale: 0,
            }}
            animate={{
              scale: isAnimating ? [0, 0, 0, 0, 1] : 0,
            }}
            transition={{
              duration: 3.5,
              times: [0, 0.1, 0.4, 0.7, 1],
            }}
          />
        )}
      </motion.div>
      <p
        className="text-orange-500 font-bold tracking-normal"
        style={{ marginTop: 20 }}
      >
        Kattints a kockára az animációhoz
      </p>
    </div>
  );
};

export default ComplexAnimationBox;
