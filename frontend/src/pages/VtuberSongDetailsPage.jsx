import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import { toast } from "sonner";
import SongDetail from "../components/songDetail.jsx";
import { TracingBeam } from "../components/ui/TracingBeam.jsx";
import Lyrics from "../components/Lyrics.jsx";
import LyricsSelection from "../components/LyricsSelection.jsx";
import YoutubeContainer from "../components/YoutubeContainer.jsx";

const VtuberSongDetailsPage = () => {
  const [song, setSong] = useState({});
  const [loading, setLoading] = useState(false);
  const { songId, id } = useParams();
  const [embedUrl, setEmbedUrl] = useState(null);
  const [activeLyrics, setActiveLyrics] = useState("lyrics");
  const lyricsContainerRef = useRef(null);

  useEffect(() => {
    const fetchSong = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/vtuber/${id}/song/${songId}`
        );
        if (!res.ok) throw new Error("Failed to fetch song");
        const data = await res.json();
        console.log("Fetched song data:", data);
        setSong(data);
      } catch (error) {
        console.error("Error fetching song:", error);
        toast.error("Failed to load song");
      } finally {
        setLoading(false);
      }
    };
    fetchSong();
  }, [id, songId]);

  useEffect(() => {
    if (song && song.lyrics) {
      const getYouTubeEmbedUrl = (url) => {
        console.log("Processing video URL:", url);
        const videoIdMatch = url.match(
          /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        );
        console.log("Video ID Match:", videoIdMatch);
        const videoId = videoIdMatch[1];
        return `https://www.youtube.com/embed/${videoId}`;
      };

      const embed = getYouTubeEmbedUrl(song.videoUrl);
      setEmbedUrl(embed);
    }
  }, [song]);

  useEffect(() => {
    if (!song.lyrics || !embedUrl || !song.timestamps) {
      console.log("Missing data:", {
        lyrics: song.lyrics,
        embedUrl,
        timestamps: song.timestamps,
      });
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let player, intervalId;
    window.onYouTubeIframeAPIReady = () => {
      player = new YT.Player("youtube-player", {
        events: {
          onReady: (event) => {
            intervalId = setInterval(() => {
              if (!lyricsContainerRef.current) {
                console.log("Ref is null");
                return;
              }
              const currentTime = event.target.getCurrentTime();
              const lastTimestamp = song.timestamps[song.timestamps.length - 1];
              console.log(
                "Current Time:",
                currentTime,
                "Last Timestamp:",
                lastTimestamp
              );
              if (currentTime >= lastTimestamp) {
                lyricsContainerRef.current.scrollTo({
                  top: lyricsContainerRef.current.scrollHeight,
                  behavior: "smooth",
                });
              } else {
                const currentIndex = song.timestamps.findIndex(
                  (time) => currentTime >= time
                );
                if (currentIndex !== -1) {
                  const nextLineIndex = currentIndex + 1;
                  if (nextLineIndex < song.lyrics.length) {
                    const nextLineElement =
                      lyricsContainerRef.current.querySelector(
                        `[data-line-index="${nextLineIndex}"]`
                      );
                    if (nextLineElement) {
                      nextLineElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    } else {
                      console.log(
                        "Next line element not found for index:",
                        nextLineIndex
                      );
                    }
                  }
                }
              }
            }, 100);
          },
        },
      });
    };

    return () => {
      window.onYouTubeIframeAPIReady = null;
      if (intervalId) clearInterval(intervalId);
      if (player) player.destroy();
    };
  }, [song, embedUrl]);

  return (
    <div
      className="flex flex-col gap-10 px-5 py-10"
      style={{ width: "calc(100vw - 18rem)" }}
    >
      <div>
        {loading ? (
          <Loading />
        ) : (
          song.lyrics && (
            <div className="flex">
              <div
                className="flex flex-col gap-5"
                style={{ width: "calc(100vw - 50.5rem)" }}
              >
                <SongDetail song={song} />

                <LyricsSelection setActiveLyrics={setActiveLyrics} />

                {activeLyrics === "lyrics" ? (
                  <TracingBeam>
                    <div ref={lyricsContainerRef}>
                      <Lyrics song={song} lyricsType="lyrics" />
                    </div>
                  </TracingBeam>
                ) : activeLyrics === "original" ? (
                  <TracingBeam>
                    <Lyrics song={song} lyricsType="originalLyrics" />
                  </TracingBeam>
                ) : (
                  activeLyrics === "side-by-side" && (
                    <TracingBeam>
                      <div className="flex gap-50">
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
      </div>
    </div>
  );
};

export default VtuberSongDetailsPage;
