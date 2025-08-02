import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TimelineItem = ({ event = {} }) => {
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
      className="pb-12"
    >
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="bg-friendGray/80 p-6 rounded-3xl shadow-xl backdrop-blur-sm border border-friendGray/30 overflow-hidden hover-glow transition-all duration-300"
      >
        {/* Date/Time Header */}
        {event.date && (
          <div className="flex items-center mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-electricBlue/50 to-transparent"></div>
            <span className="px-4 py-1 text-sm font-medium text-electricBlue bg-electricBlue/10 rounded-full">
              {event.date}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-electricBlue/50 to-transparent"></div>
          </div>
        )}
        
        {/* Image Gallery */}
        {images.length > 0 && (
          <div 
            className="mb-6 rounded-xl overflow-hidden relative group h-72"
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
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>
              
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-friendWhite p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-friendWhite p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="flex justify-center mt-3 space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-electricBlue w-3.5' : 'bg-friendLightGray/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-friendWhite">
            {event.title || 'Untitled Event'}
          </h3>
          
          <p className="text-friendLightGray leading-relaxed">
            {event.description || 'No description available'}
          </p>
          
          {event.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {event.tags.map((tag, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-electricBlue/10 text-electricBlue border border-electricBlue/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}