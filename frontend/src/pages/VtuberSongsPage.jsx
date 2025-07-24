import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const VtuberSongsPage = () => {
  const [vtuber, setVtuber] = useState([]);
  const [loading, setLoading] = useState(false);
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
  }, []);

  return (
    <div
      className="flex flex-col gap-10 px-5 py-10"
      style={{ width: "calc(100vw - 18rem)" }}
    >
      <div className="flex items-center gap-5">
        <img
          src={vtuber.profileImage}
          alt={vtuber.name}
          className="w-32 h-32 rounded-full"
        />
        <h2 className="text-4xl font-bold border-b border-base-content pb-2 flex-1">
          {vtuber.name}
        </h2>
      </div>

      <div className="flex flex-col gap-5 ml-37">
        {vtuber.songs?.map((song) => (
          <div
            key={song._id}
            className="flex border-dashed border-b border-base-content pb-2"
          >
            <img
              src={song.coverImage}
              alt={song.title}
              className="w-[13%] rounded"
            />
            <div className="flex flex-col ml-5">
              <h2 className="text-xl">{song.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VtuberSongsPage;
