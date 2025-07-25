import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import { toast } from "sonner";
import SongDetail from "../components/songDetail.jsx";

const VtuberSongDetailsPage = () => {
  const [song, setSong] = useState({});
  const [loading, setLoading] = useState(false);
  const { songId, id } = useParams();
  const [embedUrl, setEmbedUrl] = useState(null);
  const [activeLyrics, setActiveLyrics] = useState("lyrics");

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
    if (song && song.lyrics) {
      const getYouTubeEmbedUrl = (url) => {
        const videoIdMatch = url.match(
          /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        );
        const videoId = videoIdMatch[1];
        return `https://www.youtube.com/embed/${videoId}`;
      };

      const embed = getYouTubeEmbedUrl(song.videoUrl);
      setEmbedUrl(embed);
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

                <div className="flex items-center bg-base-100 w-full h-12 rounded-md shadow-sm shadow-black">
                  <div className="flex items-center h-full">
                    <div
                      className="h-full flex items-center px-4 rounded-md cursor-pointer hover:bg-base-200 transition-colors duration-200"
                      onClick={() => setActiveLyrics("lyrics")}
                    >
                      <h2>Lyrics</h2>
                    </div>
                    <div
                      className=" h-full flex items-center px-4 rounded-md cursor-pointer hover:bg-base-200 transition-colors duration-200"
                      onClick={() => setActiveLyrics("original")}
                    >
                      <h2>Original</h2>
                    </div>
                    <div
                      className=" h-full flex items-center px-4 rounded-md cursor-pointer hover:bg-base-200 transition-colors duration-200"
                      onClick={() => setActiveLyrics("side-by-side")}
                    >
                      <h2>Side by side</h2>
                    </div>
                  </div>
                </div>

                {activeLyrics === "lyrics" ? (
                  <div className="flex flex-col gap-2 border-r-2">
                    {(() => {
                      const lyrics = [];
                      let lineNumber = 0;
                      for (const [index, line] of song.lyrics.entries()) {
                        if (line.trim() !== "") {
                          lineNumber++;
                          lyrics.push(
                            <div
                              key={`line-${index}`}
                              className="flex items-center gap-2 h-10 hover:bg-base-200/70 transition-colors duration-200 select-none pl-1 rounded tracking-wider"
                            >
                              <span>{lineNumber}.</span>
                              <span className="flex items-center text-lg">
                                {line}
                              </span>
                            </div>
                          );
                        } else {
                          lyrics.push(
                            <div
                              key={`empty-${index}`}
                              className="flex items-center gap-2 h-10"
                            >
                              <span></span>
                              <span className="flex items-center text-lg"></span>
                            </div>
                          );
                        }
                      }
                      return lyrics;
                    })()}
                  </div>
                ) : activeLyrics === "original" ? (
                  <div className="flex flex-col gap-2 border-r-2">
                    {(() => {
                      const lyrics = [];
                      let lineNumber = 0;
                      for (const [
                        index,
                        line,
                      ] of song.originalLyrics.entries()) {
                        if (line.trim() !== "") {
                          lineNumber++;
                          lyrics.push(
                            <div
                              key={`line-${index}`}
                              className="flex items-center gap-2 h-10 hover:bg-base-200/70 transition-colors duration-200 select-none pl-1 rounded tracking-wider"
                            >
                              <span>{lineNumber}.</span>
                              <span className="flex items-center text-lg">
                                {line}
                              </span>
                            </div>
                          );
                        } else {
                          lyrics.push(
                            <div
                              key={`empty-${index}`}
                              className="flex items-center gap-2 h-10"
                            >
                              <span></span>
                              <span className="flex items-center text-lg"></span>
                            </div>
                          );
                        }
                      }
                      return lyrics;
                    })()}
                  </div>
                ) : (
                  activeLyrics === "side-by-side" && (
                    <div className="flex justify-between gap-5 border-r-2">
                      <div className="flex flex-col gap-2">
                        {(() => {
                          const lyrics = [];
                          let lineNumber = 0;
                          for (const [index, line] of song.lyrics.entries()) {
                            if (line.trim() !== "") {
                              lineNumber++;
                              lyrics.push(
                                <div
                                  key={`line-${index}`}
                                  className="flex items-center gap-2 h-10 hover:bg-base-200/70 transition-colors duration-200 select-none pl-1 rounded tracking-wider"
                                >
                                  <span>{lineNumber}.</span>
                                  <span className="flex items-center text-lg">
                                    {line}
                                  </span>
                                </div>
                              );
                            } else {
                              lyrics.push(
                                <div
                                  key={`empty-${index}`}
                                  className="flex items-center gap-2 h-10"
                                >
                                  <span></span>
                                  <span className="flex items-center text-lg"></span>
                                </div>
                              );
                            }
                          }
                          return lyrics;
                        })()}
                      </div>

                      <div className="flex flex-col gap-2 pr-40">
                        {(() => {
                          const lyrics = [];
                          let lineNumber = 0;
                          for (const [index, line] of song.originalLyrics.entries()) {
                            if (line.trim() !== "") {
                              lineNumber++;
                              lyrics.push(
                                <div
                                  key={`line-${index}`}
                                  className="flex items-center gap-2 h-10 hover:bg-base-200/70 transition-colors duration-200 select-none pl-1 rounded tracking-wider"
                                >
                                  <span>{lineNumber}.</span>
                                  <span className="flex items-center text-lg">
                                    {line}
                                  </span>
                                </div>
                              );
                            } else {
                              lyrics.push(
                                <div
                                  key={`empty-${index}`}
                                  className="flex items-center gap-2 h-10"
                                >
                                  <span></span>
                                  <span className="flex items-center text-lg"></span>
                                </div>
                              );
                            }
                          }
                          return lyrics;
                        })()}
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="fixed right-0 top-24 w-130 p-8">
                {embedUrl && (
                  <div className="w-full h-78.75">
                    <iframe
                      width="100%"
                      height="100%"
                      src={embedUrl}
                      title={song.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg shadow-md shadow-black"
                    ></iframe>
                  </div>
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
