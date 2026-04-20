import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import { FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Colorthief from "colorthief";
import VtuberProfilePicture from "../components/VtuberProfilePicture.jsx";
import EditSongModal from "../components/form_components/edit_song_modal/EditSongModal.jsx";
import VtuberSong from "../components/VtuberSong.jsx";

const VtuberSongsPage = ({ vtubers }) => {
  const [vtuber, setVtuber] = useState([]);
  const [originalSongs, setOriginalSongs] = useState([]);
  const [coverSongs, setCoverSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [colorPalette, setColorPalette] = useState(null);
  const [error, setError] = useState(null);
  const [showEditSongModal, setShowEditSongModal] = useState({
    open: false,
    song: {},
  });
  const { id } = useParams();

  // Fetch vtuber
  useEffect(() => {
    if (vtubers) {
      setLoading(true);
      setError(null);
      try {
        const vtuber = vtubers.find((vtuber) => vtuber._id === id);
        if (!vtuber) throw new Error("Failed to find vtuber");

        setVtuber(vtuber);
      } catch (error) {
        console.error("Error finding vtuber", error.message);
        toast.error("Cannot find vtuber");
        setError("Something went wrong, try again later...");
      } finally {
        setLoading(false);
      }
    }
  }, [id, vtubers]);

  // Extract color from profile picture
  useEffect(() => {
    if (vtuber.profileImage) {
      const imageUrl = `http://localhost:5000/api/vtuber/proxy-image/${encodeURIComponent(
        vtuber.profileImage,
      )}`;
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageUrl;

      img.onload = () => {
        try {
          const colorThief = new Colorthief();
          const colorPalette = colorThief.getPalette(img, 5);
          setColorPalette({
            first: `rgb(${colorPalette[0].join(",")})`,
            second: `rgb(${colorPalette[1].join(",")})`,
            third: `rgb(${colorPalette[2].join(",")})`,
            fourth: `rgb(${colorPalette[3].join(",")})`,
            fifth: `rgb(${colorPalette[4].join(",")})`,
          });
        } catch (error) {
          console.error("Error extracting color from picture", error);
          toast.error("Failed to extract profile picture color");
        }
      };
    }
  }, [vtuber.profileImage]);

  // Extract original and cover songs
  useEffect(() => {
    if (vtuber.songs) {
      setOriginalSongs(vtuber.songs.filter((song) => song.original));
      setCoverSongs(vtuber.songs.filter((song) => !song.original));
    }
  }, [vtuber.songs]);

  // Toggle favorite
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
        colorPalette && (
          <div className="pl-2">
            <div className="flex items-center gap-10">
              <VtuberProfilePicture
                vtuber={vtuber}
                colorPalette={colorPalette}
              />
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
            </div>

            <div className="flex flex-col gap-5 ml-45 select-none">
              <h4 className="text-2xl mb-5 border-b border-base-content/80 pb-2">Original Songs</h4>
              {originalSongs.length > 0 ? (
                originalSongs.map((song) => (
                  <VtuberSong
                    key={song._id}
                    song={song}
                    toggleFavorite={toggleFavorite}
                    setShowEditSongModal={setShowEditSongModal}
                    favorites={favorites}
                  />
                ))
              ) : (
                <h3 className="error-msg">No original songs yet...</h3>
              )}

              <h4 className="text-2xl my-5 border-b border-base-content/80 pb-2">Cover Songs</h4>
              {coverSongs.length > 0 ? (
                coverSongs.map((song) => (
                  <VtuberSong
                    key={song._id}
                    song={song}
                    toggleFavorite={toggleFavorite}
                    setShowEditSongModal={setShowEditSongModal}
                    favorites={favorites}
                  />
                ))
              ) : (
                <h3 className="error-msg">No cover songs yet...</h3>
              )}
            </div>
          </div>
        )
      )}
      {error && <h3 className="error-msg">{error}</h3>}

      {showEditSongModal.open && (
        <EditSongModal
          song={showEditSongModal.song}
          vtuberId={id}
          setShowEditSongModal={setShowEditSongModal}
        />
      )}
      {showEditSongModal.open && console.log(showEditSongModal)}
    </div>
  );
};

export default VtuberSongsPage;
