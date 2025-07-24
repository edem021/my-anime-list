import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const VtubersPage = () => {
  const [vtubers, setVtubers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVtubers = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/vtuber");
        if (!res.ok) throw new Error("Failed to fetch vtubers");
        const data = await res.json();
        setVtubers(data);
      } catch (error) {
        console.error("Error fetching vtubers:", error);
        toast.error("Failed to load vtubers");
      } finally {
        setLoading(false);
      }
    };
    fetchVtubers();
  }, []);

  return (
    <div
      className="flex flex-col gap-10 px-5 py-10"
      style={{ width: "calc(100vw - 18rem)" }}
    >
      <h2 className="text-4xl font-bold border-b border-base-content pb-2">
        Vtubers
      </h2>
      <div className="flex flex-col gap-5">
        {loading ? (
          <p>Loading...</p>
        ) : (
          vtubers.map((vtuber) => (
            <div
              key={vtuber._id}
              className="border-dashed border-b border-base-content pb-4 flex justify-between hover:bg-base-200 transition-colors z-20 relative"
            >
              <Link
                to={`/vtuber/${vtuber._id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={vtuber.profileImage}
                  alt={vtuber.name}
                  className="w-16 h-16 rounded-full"
                />
                <h2 className="text-xl">{vtuber.name}</h2>
              </Link>

              <div className="flex items-center gap-3">
                <Link
                  to={vtuber.youtubeChannel}
                  target="_blank"
                  className="relative"
                >
                  <FaYoutube size={35} color="red" />
                  <span className="absolute top-2 left-2 w-[50%] h-[50%] bg-white -z-10" />
                </Link>
                <Link
                  to={vtuber.twitter}
                  target="_blank"
                  className="relative"
                >
                  <FaSquareXTwitter size={32} color="black" />
                  <span className="absolute top-1 left-1 w-[75%] h-[75%] bg-white -z-10" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VtubersPage;
