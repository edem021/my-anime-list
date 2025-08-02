import { useRef } from "react";
import animationData from "../assets/loading.json";
import Lottie from "lottie-react";

const Loading = ({ size }) => {
  const loadingRef = useRef();

  return (
    <div style={{width: size}}>
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
