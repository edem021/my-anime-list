const SongDetailRow = ({
  value,
  hasBorder = true,
  keyName,
  isTitle = false,
  secondValue = null,
}) => {
  return (
    <div
      className={`flex items-center gap-5 ${
        hasBorder && "border-b border-dashed"
      } `}
    >
      <div className="song-detail-key">
        <h2 className="text-xl">{keyName}</h2>
      </div>

      {isTitle ? (
        <div>
          <h3 className="song-detail-value">{value}</h3>
          <h3 className="text-sm text-base-content/70">{secondValue}</h3>
        </div>
      ) : (
        <h3 className="song-detail-value">{value}</h3>
      )}
    </div>
  );
};

export default SongDetailRow;
