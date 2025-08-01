import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { galleryPhotos } from '../data/galleryPhotos';

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || galleryPhotos.length <= 1) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex(prev => (prev + 1) % galleryPhotos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, galleryPhotos.length]);

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % galleryPhotos.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <section className="py-16 bg-friendBlack" id="memories">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-12 text-center"
      >
        <span className="bg-gradient-to-r from-electricBlue to-hotPink bg-clip-text text-transparent">
          Memory Gallery
        </span>
      </motion.h2>

      <div className="max-w-4xl mx-auto px-4">
        <div className="relative h-[500px] overflow-hidden rounded-3xl shadow-xl border border-friendGray/50">
          {/* Main Slide */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={galleryPhotos[currentIndex].image}
              alt={galleryPhotos[currentIndex].caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent via-black/30" />
            
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-friendWhite">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-2xl mx-auto text-center"
              >
                <p className="text-lg font-medium">{galleryPhotos[currentIndex].caption}</p>
                {galleryPhotos[currentIndex].date && (
                  <p className="text-sm opacity-80 mt-1">{galleryPhotos[currentIndex].date}</p>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation Arrows */}
          {galleryPhotos.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-friendGray/80 hover:bg-electricBlue text-friendWhite flex items-center justify-center backdrop-blur-sm transition-all hover-glow"
                aria-label="Previous photo"
              >
                {/* Left arrow icon */}
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-friendGray/80 hover:bg-electricBlue text-friendWhite flex items-center justify-center backdrop-blur-sm transition-all hover-glow"
                aria-label="Next photo"
              >
                {/* Right arrow icon */}
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {galleryPhotos.length > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {galleryPhotos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => goToSlide(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                  currentIndex === index 
                    ? 'ring-4 ring-electricBlue scale-110 hover-glow' 
                    : 'opacity-70 hover:opacity-100 border border-friendGray/50'
                }`}
                aria-label={`View photo ${index + 1}`}
              >
                <img
                  src={photo.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}