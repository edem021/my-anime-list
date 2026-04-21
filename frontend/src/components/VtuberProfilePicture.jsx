import { Link, useNavigate } from "react-router-dom";
import { getProxiedImageUrl } from "../utils/getProxiedImageUrl";

const VtuberProfilePicture = ({ vtuber, colorPalette }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-full relative z-100 p-1">
      <Link to={vtuber.youtubeChannel} target="_blank" className="group">
        <img
          src={getProxiedImageUrl(vtuber.profileImage)}
          alt={vtuber.name}
          className="w-40 rounded-full group-hover:scale-103 transition-transform duration-200 object-cover"
        />
        <div
          className="absolute -top-[5%] -left-[5%] w-[110%] h-[110%] rounded-full -z-10 animate-conic-rotate"
          style={{
            background: `conic-gradient(from var(--conic-angle), ${colorPalette.first}, ${colorPalette.third}, ${colorPalette.first}, ${colorPalette.first}, ${colorPalette.third}, ${colorPalette.first})`,
            "--glow-color": colorPalette.first,
          }}
        />
      </Link>
      <div
        className="absolute -top-[13%] -left-[13%] w-[55%] h-[55%] -z-20 rounded-xl cursor-pointer hover:-translate-1 transition-transform duration-200"
        style={{
          background: `linear-gradient(120deg, ${colorPalette.first}, ${colorPalette.second})`,
        }}
        onClick={() => navigate("/vtuber")}
      >
        <div className="absolute bg-base-300 w-[200%] h-[200%] rounded-full top-[2%] left-[2%] " />
      </div>
    </div>
  );
};

export default VtuberProfilePicture;
