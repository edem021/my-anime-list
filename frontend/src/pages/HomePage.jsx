import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "../components/Loading.jsx";

const HomePage = () => {
  const [scheduleAnimes, setScheduleAnimes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchScheduleAnimes = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://api.jikan.moe/v4/schedules");
        if (!res.ok) throw new Error("Failed to fetch animes");
        const data = await res.json();
        setScheduleAnimes(data.data);
      } catch (error) {
        toast.error("Error loading animes");
      } finally {
        setLoading(false);
      }
    };
    fetchScheduleAnimes();
  }, []);

  return (
    <div>
      {loading && <Loading />}
      {scheduleAnimes.map((anime) => (
        <div key={anime.mal_id}>
          <h2>{anime.title}</h2>
          <img src={anime.images.jpg.image_url} alt="image" />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
