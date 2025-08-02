import { useState } from 'react';

const musicOptions = [
  {
    id: 1,
    title: "Ayne Lay New",
    url: "https://open.spotify.com/embed/track/6YEG5cx8YnLpCsISDEQci4", // Removed ?si parameter
    description: ""
  },
  {
    id: 2,
    title: "Etie (Beka)",
    url: "https://open.spotify.com/embed/track/6G3g8j4PAPw7noaGPQOKiG", // Removed ?si parameter
    description: ""
  }
];

export default function SpotifyEmbed() {
  const [selectedTrack, setSelectedTrack] = useState(musicOptions[0]);

  return (
    <section className="py-10 bg-friendBlack" id="music">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6 text-center text-friendWhite">
          Music
        </h2>
        
        {/* Music Selector */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {musicOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedTrack(option)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedTrack.id === option.id
                  ? 'bg-electricBlue text-friendBlack'
                  : 'bg-friendGray text-friendWhite hover:bg-friendGray/70'
              }`}
            >
              {option.title}
            </button>
          ))}
        </div>

        {/* Player Container */}
        <div className="max-w-2xl mx-auto bg-friendGray/80 p-6 rounded-xl shadow-lg border border-friendGray/50 backdrop-blur-sm">
          <iframe
            src={`${selectedTrack.url}?utm_source=generator&theme=0`} // Added theme parameter
            width="100%"
            height="380"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </section>
  );
}