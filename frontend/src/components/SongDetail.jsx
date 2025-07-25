const SongDetail = ({ song }) => {
  return (
    <div className="flex flex-col border-2 rounded shadow-md shadow-black">
      <div className="flex items-center gap-5 p-5 w-full border-b border-dashed border-base-content">
        <img
          src={song.coverImage}
          alt={song.title}
          className="w-70 rounded-md"
        />
        <div>
          <h2 className="text-2xl">{song.vtuber.name}</h2>
          <h3 className="text-lg text-base-content/70">
            {song.vtuber.originalName}
          </h3>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-5 border-b border-dashed">
          <div className="border-r pr-5 h-full p-5 w-47 bg-base-100">
            <h2 className="text-xl">Title:</h2>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{song.title}</h3>
            <h3 className="text-sm text-base-content/70">
              {song.originalTitle}
            </h3>
          </div>
        </div>

        {song.relatedArtists.length > 0 && (
          <div className="flex items-center gap-5 border-b border-dashed">
            <div className="border-r pr-5 h-full p-5 w-47 bg-base-100">
              <h2 className="text-xl">Related Artists:</h2>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {song.relatedArtists.join(", ")}
              </h3>
            </div>
          </div>
        )}

        <div className="flex items-center gap-5 border-b border-dashed">
          <div className="border-r pr-5 h-full p-5 w-47 bg-base-100">
            <h2 className="text-xl">Release Date:</h2>
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              {song.releaseDate.slice(0, 10)}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-5 border-b border-dashed">
          <div className="border-r pr-5 h-full p-5 w-47 bg-base-100">
            <h2 className="text-xl">Composer:</h2>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{song.composer}</h3>
          </div>
        </div>

        <div className="flex items-center gap-5 border-b border-dashed">
          <div className="border-r pr-5 h-full p-5 w-47 bg-base-100">
            <h2 className="text-xl">Arranger:</h2>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{song.arranger}</h3>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="border-r pr-5 h-full p-5 w-47 bg-base-100">
            <h2 className="text-xl">Lyricist:</h2>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{song.lyricist}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetail;
