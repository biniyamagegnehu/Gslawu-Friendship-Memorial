// FriendCard.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function FriendCard({ friend }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex justify-center"
    >
      <div 
        className={`relative h-[500px] w-full max-w-[350px] [perspective:1000px] cursor-pointer`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of Card */}
        <div className={`absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg overflow-hidden transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''} [backface-visibility:hidden] border-2 border-white flex flex-col`}>
          {/* Photo Section - Takes 70% of card */}
          <div className="relative h-[70%] overflow-hidden">
            <img 
              src={`/images/${friend.avatar}`} 
              alt={friend.name} 
              className="w-full h-full object-cover absolute inset-0 hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          
          {/* Info Section - Takes 30% of card */}
          <div className="flex-1 bg-white p-4 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{friend.name}</h3>
                {friend.nickname && (
                  <p className="text-sm text-gray-500 line-clamp-1">"{friend.nickname}"</p>
                )}
              </div>
              <span className="text-2xl">{friend.emoji}</span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">{friend.description}</p>
            
            <div className="flex justify-between items-center">
              <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-semibold rounded-full">
                {friend.role}
              </span>
              <span className="text-xs text-purple-400">Click for stats →</span>
            </div>
          </div>
        </div>
        
        {/* Back of Card - Stats Only */}
        <div className={`absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-lg p-6 flex flex-col transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '' : '[transform:rotateY(180deg)]'} [backface-visibility:hidden] border-2 border-white`}>
          <h3 className="text-xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {friend.name}'s Stats
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(friend.stats).map(([key, value]) => (
              <div key={key} className="bg-white/90 rounded-xl p-4 shadow-sm">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{key}</p>
                <p className="text-lg font-bold text-purple-600">{value}</p>
              </div>
            ))}
          </div>
          
          <p className="mt-auto pt-4 text-center text-xs text-purple-400">← Click to return</p>
        </div>
      </div>
    </motion.div>
  );
}