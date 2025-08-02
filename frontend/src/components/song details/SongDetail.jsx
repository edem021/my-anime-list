import SongDetailRow from "./SongDetailRow";

const SongDetail = ({ song, vtuber }) => {
  return (
    <div className="flex flex-col border-2 rounded shadow-md shadow-black">
      <div className="flex items-center gap-5 p-5 w-full border-b border-dashed border-base-content">
        <img
          src={song.coverImage}
          alt={song.title}
          className="w-70 rounded-md"
        />
        <div>
          <h2 className="text-2xl">{vtuber.name}</h2>
          <h3 className="text-lg text-base-content/70">
            {vtuber.originalName}
          </h3>
        </div>
      </div>

      <div className="flex flex-col">
        <SongDetailRow
          value={song.title}
          keyName={"Title:"}
          isTitle={true}
          secondValue={song.originalTitle}
        />

        {song.relatedArtists.length > 0 && (
          <SongDetailRow
            value={song.relatedArtists.join(", ")}
            keyName={"Related Artists:"}
          />
        )}

        <SongDetailRow
          value={song.releaseDate.slice(0, 10)}
          keyName={"Release Date:"}
        />

        <SongDetailRow
          value={song.composers.join(", ")}
          keyName={"Composer:"}
        />

        <SongDetailRow
          value={song.arrangers.join(", ")}
          keyName={"Arranger:"}
        />

        <SongDetailRow
          value={song.lyricists.join(", ")}
          keyName={"Lyricist:"}
          hasBorder={false}
        />
      </div>
    </div>
  );
};

export default SongDetail;
