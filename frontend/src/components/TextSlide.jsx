import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const TextSlide = () => {
  const containerRef = useRef(null);

  // Szövegek és animáció irányuk
  const texts = [
    { id: 1, content: "Balról beúszó szöveg", direction: "left" },
    { id: 2, content: "Jobbról beúszó szöveg", direction: "right" },
    { id: 3, content: "Kreatív megoldások", direction: "left" },
    { id: 4, content: "Modern animációk", direction: "right" },
  ];

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen p-8 space-y-16 bg-gray-50"
    >
      {texts.map((text, index) => (
        <motion.div
          key={text.id}
          initial={{
            x: text.direction === "left" ? -200 : 200,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: index * 0.3,
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          className={`p-6 text-2xl font-bold ${
            text.direction === "left"
              ? "self-start bg-blue-500 text-white"
              : "self-end bg-green-500 text-white"
          } rounded-lg shadow-lg max-w-md`}
        >
          {text.content}
        </motion.div>
      ))}
    </div>
  );
};

export default TextSlide;
