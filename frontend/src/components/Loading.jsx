import { useRef } from "react";
import animationData from "../assets/loading.json";
import Lottie from "lottie-react";

const Loading = () => {
  const loadingRef = useRef();

  return (
    <div className="w-25">
      <Lottie
        onComplete={() => {
          loadingRef.current?.setDirection(-1);
        }}
        lottieRef={loadingRef}
        animationData={animationData}
        loop={true}
      />
    </div>
  );
};

export default Loading;
