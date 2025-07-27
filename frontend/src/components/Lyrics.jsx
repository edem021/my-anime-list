const Lyrics = ({ song, lyricsType, currentTargetLine }) => {
  return (
    <div className="flex flex-col gap-2 relative">
      {currentTargetLine && (
        <div
          id="scroll-anchor"
          style={{
            position: "absolute",
            top: "80px",
            transform: `translateY(calc(${
              currentTargetLine - 1
            } * (100% + 8px)))`,
          }}
          aria-hidden="true"
        />
      )}
      {(() => {
        const lyrics = [];
        let lineNumber = 0;
        for (const [index, line] of song[lyricsType].entries()) {
          if (line.trim() !== "") {
            lineNumber++;
            lyrics.push(
              <div
                key={`line-${index}`}
                data-line-index={lineNumber}
                className="flex items-center gap-2 h-10 hover:bg-base-200/70 transition-colors duration-200 select-none pl-1 rounded tracking-wider mr-5.5"
              >
                <span>{lineNumber}.</span>
                <span className="flex items-center text-lg">{line}</span>
              </div>
            );
          } else {
            lyrics.push(
              <div
                key={`empty-${index}`}
                className="flex items-center gap-2 h-10"
              ></div>
            );
          }
        }
        return lyrics;
      })()}
    </div>
  );
};

export default Lyrics;
