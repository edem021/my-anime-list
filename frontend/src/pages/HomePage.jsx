import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "../components/Loading.jsx";
import { getTrendingAnimes } from "../services/api.js";

const HomePage = () => {
  const [trendingAnimes, setTrendingAnimes] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div>
      {loading && <Loading />}
      {trendingAnimes.map((anime) => (
        <div key={anime.mal_id}>
          <h2>{anime.title}</h2>
          <img src={anime.images.jpg.image_url} alt="image" />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
