import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import { toast } from "sonner";
import SongDetail from "../components/song details/SongDetail.jsx";
import { TracingBeam } from "../components/ui/TracingBeam.jsx";
import Lyrics from "../components/Lyrics.jsx";
import LyricsSelection from "../components/LyricsSelection.jsx";
import YoutubeContainer from "../components/YoutubeContainer.jsx";
import { youtubeStateChange } from "../utils/youtubeStateChange.js";
import { getYoutubeEmbedUrl } from "../utils/getYoutubeEmbedUrl.js";
import { MdKeyboardBackspace } from "react-icons/md";

const VtuberSongDetailsPage = ({ vtubers }) => {
  const [song, setSong] = useState({});
  const [vtuber, setVtuber] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { songId, id } = useParams();
  const [embedUrl, setEmbedUrl] = useState(null);
  const [activeLyrics, setActiveLyrics] = useState("lyrics");
  const lyricsContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (vtubers) {
      setLoading(true);
      setError(null);
      try {
        const vtuber = vtubers.find((vtuber) => vtuber._id === id);
        if (!vtuber) throw new Error("Failed to find vtuber");

        const song = vtuber.songs.find((song) => song._id === songId);
        if (!song) throw new Error("Failed to find song");

        setSong(song);
        setVtuber(vtuber);
      } catch (error) {
        console.error("Error finding song:", error);
        toast.error("Cannot find song");
        setError("Something went wrong, try again later...");
      } finally {
        setLoading(false);
      }
    }
  }, [id, songId, vtubers]);

  useEffect(() => {
    if (
      !song ||
      !song.lyrics ||
      !song.timestamps ||
      !lyricsContainerRef.current
    )
      return;

    setEmbedUrl(getYoutubeEmbedUrl(song.videoUrl));

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let player, intervalId;
    window.onYouTubeIframeAPIReady = () => {
      player = new YT.Player("youtube-player", {
        events: {
          onStateChange: (event) =>
            (intervalId = youtubeStateChange(
              player,
              event,
              song,
              lyricsContainerRef,
              intervalId
            )),
        },
      });
    };

    return () => {
      window.onYouTubeIframeAPIReady = null;
      if (intervalId) clearInterval(intervalId);
      if (player) player.destroy();
    };
  }, [song]);

  return (
    <div
      className="flex flex-col gap-10 px-5 py-10"
      style={{ width: "calc(100vw - 18rem)" }}
    >
      {loading ? (
        <Loading />
      ) : (
        song.lyrics && (
          <div className="flex">
            <div
              className="flex flex-col gap-5"
              style={{ width: "calc(100vw - 50.5rem)" }}
            >
              <div className="flex">
                <div
                  className="flex gap-2 items-center cursor-pointer hover:-translate-x-1.5 transition-transform duration-200"
                  onClick={() => navigate(-1)}
                >
                  <MdKeyboardBackspace size={22} />
                  <h3 className="font-semibold italic tracking-widest">
                    Return to song selection
                  </h3>
                </div>
              </div>

              <SongDetail song={song} vtuber={vtuber} />

              <LyricsSelection setActiveLyrics={setActiveLyrics} />

              {activeLyrics === "lyrics" ? (
                <TracingBeam>
                  <div ref={lyricsContainerRef}>
                    <Lyrics song={song} lyricsType="lyrics" />
                  </div>
                </TracingBeam>
              ) : activeLyrics === "original" ? (
                <TracingBeam>
                  <div ref={lyricsContainerRef}>
                    <Lyrics song={song} lyricsType="originalLyrics" />
                  </div>
                </TracingBeam>
              ) : (
                activeLyrics === "side-by-side" && (
                  <TracingBeam>
                    <div className="flex gap-50" ref={lyricsContainerRef}>
                      <Lyrics song={song} lyricsType="lyrics" />
                      <Lyrics song={song} lyricsType="originalLyrics" />
                    </div>
                  </TracingBeam>
                )
              )}
            </div>

            <div className="fixed right-0 top-24 w-130 p-8">
              {embedUrl && (
                <YoutubeContainer
                  embedUrl={embedUrl}
                  songTitle={song.title}
                  id="youtube-player"
                />
              )}
            </div>
          </div>
        )
      )}
      {error && <h3 className="error-msg">{error}</h3>}
    </div>
  );
};

export default VtuberSongDetailsPage;
