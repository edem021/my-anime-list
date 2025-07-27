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
  const [currentTargetLine, setCurrentTargetLine] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/vtuber/${id}/song/${songId}`
        );
        if (!res.ok) throw new Error("Failed to fetch song");
        const data = await res.json();
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
    if (song && song.lyrics && song.timestamps && lyricsContainerRef.current) {
      const getYouTubeEmbedUrl = (url) => {
        const videoIdMatch = url.match(
          /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        );
        const videoId = videoIdMatch[1];
        return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
      };

      const embed = getYouTubeEmbedUrl(song.videoUrl);
      setEmbedUrl(embed);

      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      tag.onload = () => console.log("API script loaded");
      tag.onerror = () => console.error("Failed to load API script");
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      let player, intervalId;

      window.onYouTubeIframeAPIReady = () => {
        const initializePlayer = () => {
          try {
            player = new YT.Player("youtube-player", {
              events: {
                onStateChange: (event) => {
                  const state = event.data;

                  if (state === YT.PlayerState.PLAYING && !intervalId) {
                    intervalId = setInterval(() => {
                      const currentTime = player.getCurrentTime();
                      const timestampKeys = Object.keys(song.timestamps).map(
                        Number
                      );
                      const lastTimestamp = Math.max(...timestampKeys);

                      if (currentTime >= lastTimestamp) {
                        lyricsContainerRef.current.scrollTo({
                          bottom: lyricsContainerRef.current.scrollHeight,
                          behavior: "smooth",
                        });
                      } else {
                        let currentIndex = -1;

                        for (let i = 0; i < timestampKeys.length; i++) {
                          if (timestampKeys[i] <= currentTime) {
                            currentIndex = i;
                          } else {
                            break;
                          }
                        }

                        if (currentIndex !== -1) {
                          const currentTimestamp = timestampKeys[currentIndex];
                          let nextLineIndex;

                          nextLineIndex = song.timestamps[currentTimestamp];
                          if (currentIndex < timestampKeys.length - 1) {
                            const nextTimestamp =
                              timestampKeys[currentIndex + 1];
                            if (currentTime >= nextTimestamp - 0.5) {
                              nextLineIndex = song.timestamps[nextTimestamp];
                            }
                          }

                          if (nextLineIndex <= song.lyrics.length) {
                            setCurrentTargetLine(nextLineIndex);
                            const anchorElement =
                              document.querySelector("#scroll-anchor");

                            if (anchorElement) {
                              anchorElement.scrollIntoView({
                                behavior: "smooth",
                              });
                            }
                          }
                        }
                      }
                    }, 100);
                  } else if (
                    (state === YT.PlayerState.PAUSED || YT.PlayerState.ENDED) &&
                    intervalId
                  ) {
                    clearInterval(intervalId);
                    intervalId = null;
                  }
                },
                onError: (error) => console.error("Player error: ", error),
              },
            });
          } catch (error) {
            console.error("Error initializing YT.player: ", error);
          }
        };
        initializePlayer();
      };

      return () => {
        window.onYouTubeIframeAPIReady = null;
        if (intervalId) clearInterval(intervalId);
        if (player) player.destroy();
      };
    }
  }, [song]);

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
                      <Lyrics
                        song={song}
                        lyricsType="lyrics"
                        currentTargetLine={currentTargetLine}
                      />
                    </div>
                  </TracingBeam>
                ) : activeLyrics === "original" ? (
                  <TracingBeam>
                    <Lyrics
                      song={song}
                      lyricsType="originalLyrics"
                      currentTargetLine={currentTargetLine}
                    />
                  </TracingBeam>
                ) : (
                  activeLyrics === "side-by-side" && (
                    <TracingBeam>
                      <div className="flex gap-50">
                        <Lyrics
                          song={song}
                          lyricsType="lyrics"
                          currentTargetLine={currentTargetLine}
                        />
                        <Lyrics
                          song={song}
                          lyricsType="originalLyrics"
                          currentTargetLine={currentTargetLine}
                        />
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
