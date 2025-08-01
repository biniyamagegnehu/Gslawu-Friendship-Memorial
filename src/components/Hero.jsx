import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const images = [
  "/images/group3.jpg",
  "/images/group9.jpg",
  "/images/group14.jpg", 
  "/images/group1.jpg",
  "/images/group4.jpg"
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-friendBlack">
      {/* Current Image Display */}
      <div className="absolute inset-0">
        <img
          src={images[currentIndex]}
          alt={`Gslawu Group ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-friendWhite"
        >
          Welcome to <span className="text-electricBlue">Gslawu</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl mb-8 max-w-2xl text-friendLightGray"
        >
          Celebrating our friendship journey together
        </motion.p>

        <motion.a
          href="#timeline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="inline-block bg-electricBlue hover:bg-hotPink text-friendWhite font-bold py-3 px-6 rounded-full transition-colors hover-glow"
        >
          Explore Our Story
        </motion.a>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-electricBlue' : 'bg-friendLightGray/50'
            }`}
            aria-label={`View slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}