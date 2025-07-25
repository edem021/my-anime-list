import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import { FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { motion } from "framer-motion";

const VtuberSongsPage = () => {
  const [vtuber, setVtuber] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchVtuber = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/vtuber/${id}`);
        if (!res.ok) throw new Error("Failed to fetch vtuber");
        const data = await res.json();
        setVtuber(data);
      } catch (error) {
        console.error("Error fetching vtuber:", error);
        toast.error("Failed to load vtuber");
      } finally {
        setLoading(false);
      }
    };
    fetchVtuber();
  }, [id]);

  const toggleFavorite = async (songId) => {
    setFavorites((prev) => ({
      ...prev,
      [songId]: !prev[songId],
    }));
  };

  return (
    <div
      className="flex flex-col gap-10 px-5 py-10"
      style={{ width: "calc(100vw - 18rem)" }}
    >
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex items-center gap-5">
            <Link to={vtuber.youtubeChannel} target="_blank">
              <img
                src={vtuber.profileImage}
                alt={vtuber.name}
                className="w-32 h-32 rounded-full"
              />
            </Link>
            <div className="border-b border-base-content pb-2 flex justify-between w-full z-20">
              <h2 className="text-4xl font-bold">{vtuber.name}</h2>

              <div className="flex items-center gap-3">
                <Link
                  to={vtuber.youtubeChannel}
                  target="_blank"
                  className="relative"
                >
                  <FaYoutube size={35} color="red" />
                  <span className="absolute top-2 left-2 w-[50%] h-[50%] bg-white -z-10" />
                </Link>
                <Link to={vtuber.twitter} target="_blank" className="relative">
                  <FaSquareXTwitter size={32} color="black" />
                  <span className="absolute top-1 left-1 w-[75%] h-[75%] bg-white -z-10" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 ml-37 select-none">
            {vtuber.songs?.map((song) => (
              <div
                key={song._id}
                className="flex justify-end border-dashed border-b border-base-content hover:bg-base-200/70 transition-colors duration-200"
              >
                <Link to={`song/${song._id}`} className="flex-1">
                  <div className="flex items-center gap-5 ">
                    <img
                      src={song.coverImage}
                      alt={song.title}
                      className="w-50 rounded"
                    />
                    <div className="flex flex-col">
                      <h2 className="text-xl">{song.title}</h2>
                      <h3 className="text-sm font-semibold text-base-content/70">
                        {song.originalTitle}
                      </h3>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center mr-5">
                  <motion.div
                    className="bg-base-content/50 p-1 rounded-full cursor-pointer"
                    onClick={() => toggleFavorite(song._id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {favorites[song._id] ? (
                      <MdFavorite size={30} color="red" />
                    ) : (
                      <MdFavoriteBorder size={30} color="white" />
                    )}
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VtuberSongsPage;
