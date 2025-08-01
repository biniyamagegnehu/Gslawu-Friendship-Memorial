export default function SpotifyEmbed({ url, title = "Our Playlist" }) {
  return (
    <section className="py-10 bg-friendBlack">
      <h2 className="text-4xl font-bold mb-6 text-center text-friendWhite">{title}</h2>
      <div className="max-w-2xl mx-auto bg-friendGray p-6 rounded-xl shadow-lg border border-friendGray/50">
        <iframe
          src={url}
          width="100%"
          height="380"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-lg"
        ></iframe>
        <p className="mt-4 text-center text-friendLightGray">
          The soundtrack to our friendship
        </p>
      </div>
    </section>
  )
}