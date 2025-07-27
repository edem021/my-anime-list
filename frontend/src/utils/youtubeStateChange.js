export const youtubeStateChange = (
  player,
  event,
  song,
  lyricsContainerRef,
  intervalId
) => {
  const state = event.data;

  if (state === YT.PlayerState.PLAYING && !intervalId) {
    intervalId = setInterval(() => {
      const currentTime = player.getCurrentTime();
      const timestampKeys = Object.keys(song.timestamps).map(Number);

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
        let targetLineIndex = song.timestamps[currentTimestamp];

        if (currentIndex < timestampKeys.length - 1) {
          const nextTimestamp = timestampKeys[currentIndex + 1];
          if (currentTime >= nextTimestamp - 0.5) {
            targetLineIndex = song.timestamps[nextTimestamp] || targetLineIndex;
          }
        }

        if (targetLineIndex && targetLineIndex <= song.lyrics.length) {
          const lineElement = lyricsContainerRef.current.querySelector(
            `[data-line-index="${targetLineIndex}"]`
          );

          if (lineElement) {
            const headerHeight = 95;
            const rect = lineElement.getBoundingClientRect();
            const offsetTop = window.scrollY + rect.top - headerHeight;

            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            });
          }
        }
      }
    }, 100);
  } else if (
    (state === YT.PlayerState.PAUSED || state === YT.PlayerState.ENDED) &&
    intervalId
  ) {
    clearInterval(intervalId);
    intervalId = null;
  }

  return intervalId;
};
