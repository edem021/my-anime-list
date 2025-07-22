import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "../components/Loading.jsx";
import { getTrendingAnimes } from "../services/api.js";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

const HomePage = () => {
  const [trendingAnimes, setTrendingAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTrendingAnime, setCurrentTrendingAnime] = useState({});

  useEffect(() => {
    const fetchTrendingAnimes = async () => {
      try {
        const trendingAnimes = await getTrendingAnimes();
        const uniqueTrendingAnimes = [];
        const seen = new Set();

        for (const anime of trendingAnimes) {
          if (!seen.has(anime.mal_id)) {
            seen.add(anime.mal_id);
            uniqueTrendingAnimes.push(anime);
          }
        }

        setTrendingAnimes(uniqueTrendingAnimes);
      } catch (error) {
        toast.error("Error loading trending animes");
      }
    };
    fetchTrendingAnimes();
  }, []);

  useEffect(() => {
    if (trendingAnimes.length > 0) {
      setCurrentTrendingAnime(trendingAnimes[2]);
    }
  }, [trendingAnimes]);

  return (
    <>
      {loading && <Loading />}
      <div
        className="flex flex-col gap-10 px-5 py-10"
        style={{ width: "calc(100vw - 18rem)" }}
      >
        <div className="flex flex-col border-t border-neutral-800 py-5">
          <h2 className="text-3xl">Current Trending Animes</h2>
          <div className="flex gap-15 h-110 justify-center items-center overflow-hidden">
            {trendingAnimes.map((anime) => (
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                key={anime.mal_id}
                className={`rounded-lg shadow-lg shadow-black ${
                  anime.mal_id === currentTrendingAnime.mal_id
                    ? "scale-120"
                    : "scale-100"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center border-b h-80 border-neutral-800">
          <h2 className="text-2xl">{currentTrendingAnime.title}</h2>
        </div>
      </div>
    </>
  );
};

export default HomePage;
