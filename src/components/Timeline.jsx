// Timeline.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TimelineItem = ({ event, isLast }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
          {/* Image if available */}
          {event.image && (
            <div className="mb-4 overflow-hidden rounded-lg">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
              />
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