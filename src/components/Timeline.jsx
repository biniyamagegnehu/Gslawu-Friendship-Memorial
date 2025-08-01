import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TimelineItem = ({ event = {}, isLast }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const images = event.images || [];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  const nextImage = (e) => {
    e?.stopPropagation();
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative flex pb-10 last:pb-0"
    >
      {!isLast && (
        <div className="absolute left-5 top-10 h-full w-0.5 bg-gradient-to-b from-electricBlue to-hotPink"></div>
      )}
      
      <div className="absolute left-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-electricBlue to-hotPink shadow-lg z-10">
        <span className="text-xl">{event.emoji || '📅'}</span>
      </div>

      <div className="ml-16 flex-1">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-friendGray p-6 rounded-2xl shadow-lg border border-friendGray/50 overflow-hidden hover-glow"
        >
          {images.length > 0 && (
            <div 
              className="mb-4 rounded-lg overflow-hidden relative group h-64"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative w-full h-full">
                <img 
                  src={images[currentImageIndex]} 
                  alt={`${event.title || 'Event'} memory ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500"
                  key={currentImageIndex}
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-friendWhite p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {/* Left arrow icon */}
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-friendWhite p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {/* Right arrow icon */}
                    </button>
                  </>
                )}
              </div>
              
              {images.length > 1 && (
                <div className="flex justify-center mt-2 space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-electricBlue w-3' : 'bg-friendLightGray/50'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          
          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-electricBlue to-hotPink bg-clip-text text-transparent">
            {event.title || 'Untitled Event'}
          </h3>
          
          <p className="text-friendLightGray mb-4 leading-relaxed">
            {event.description || 'No description available'}
          </p>
          
          {event.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-electricBlue/20 text-electricBlue"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Timeline({ events = [] }) {
  return (
    <section className="py-16 px-4 bg-friendBlack" id="timeline">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="bg-gradient-to-r from-electricBlue to-hotPink bg-clip-text text-transparent">
            Our Story
          </span>
        </motion.h2>
        
        <div className="space-y-8">
          {events.map((event, index) => (
            <TimelineItem 
              key={event.id || index} 
              event={event} 
              isLast={index === events.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}