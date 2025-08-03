const YoutubeContainer = ({ embedUrl, songTitle, id }) => {
  return (
    <div className="border p-3 rounded-lg border-base-100">
      <div className="w-full h-78.75">
        <iframe
          width="100%"
          height="100%"
          id={id}
          src={embedUrl}
          title={songTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow-md shadow-black"
        ></iframe>
      </div>
    </div>
  );
};

export default YoutubeContainer;
