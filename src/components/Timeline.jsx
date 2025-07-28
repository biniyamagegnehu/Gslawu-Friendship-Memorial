// Timeline.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TimelineItem = ({ event, isLast }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === event.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? event.images.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative flex pb-10 last:pb-0"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-5 top-10 h-full w-0.5 bg-gradient-to-b from-purple-300 to-pink-300"></div>
      )}
      
      {/* Emoji bubble */}
      <div className="absolute left-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg z-10">
        <span className="text-xl">{event.emoji}</span>
      </div>

      {/* Content card */}
      <div className="ml-16 flex-1">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          {/* Image slider */}
          {event.images && event.images.length > 0 && (
            <div className="mb-4 rounded-lg overflow-hidden relative group">
              <div className="relative h-48 w-full">
                <img 
                  src={event.images[currentImageIndex]} 
                  alt={`${event.title} memory ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation arrows */}
                {event.images.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              
              {/* Dots indicator */}
              {event.images.length > 1 && (
                <div className="flex justify-center mt-2 space-x-2">
                  {event.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          
          <h3 className="text-2xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {event.title}
          </h3>
          
          <p className="text-gray-600 mb-4 leading-relaxed">
            {event.description}
          </p>
          
          {/* Tags/moods */}
          <div className="flex flex-wrap gap-2">
            {event.tags?.map((tag, i) => (
              <span 
                key={i}
                className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Timeline({ events }) {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Our Story
          </span>
        </motion.h2>
        
        <div className="space-y-8">
          {events.map((event, index) => (
            <TimelineItem 
              key={event.id} 
              event={event} 
              isLast={index === events.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}