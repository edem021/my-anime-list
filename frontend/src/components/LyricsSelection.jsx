const LyricsSelection = ({ setActiveLyrics }) => {
  return (
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
  );
};

export default LyricsSelection;
