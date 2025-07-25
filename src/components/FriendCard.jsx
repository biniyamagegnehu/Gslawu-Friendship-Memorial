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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="relative h-96 w-72 [perspective:1000px] mx-auto"
    >
      <div 
        className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] cursor-pointer ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of Card */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 flex flex-col items-center [backface-visibility:hidden] border-2 border-white overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-purple-200 opacity-20"></div>
          <div className="absolute -bottom-5 -left-5 w-24 h-24 rounded-full bg-pink-200 opacity-20"></div>
          
          {/* Avatar */}
          <div className="relative z-10 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 mt-2">
            <img 
              src={`/images/${friend.avatar}`} 
              alt={friend.name} 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          {/* Name and Role */}
          <div className="relative z-10 text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {friend.name}
            </h3>
            {friend.nickname && (
              <p className="text-sm text-gray-500">AKA "{friend.nickname}"</p>
            )}
            <div className="mt-1 px-3 py-1 bg-white rounded-full text-xs font-semibold text-purple-600 shadow-sm">
              {friend.role}
            </div>
          </div>
          
          {/* Emoji and Description */}
          <div className="relative z-10 mt-4 flex flex-col items-center flex-1">
            <div className="text-4xl mb-3">{friend.emoji}</div>
            <p className="text-center text-gray-600 italic px-2">
              "{friend.description}"
            </p>
          </div>
          
          {/* Flip hint */}
          <div className="relative z-10 mt-auto text-xs text-purple-400 font-medium">
            Click for details →
          </div>
        </div>
        
        {/* Back of Card */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-lg p-6 flex flex-col [transform:rotateY(180deg)] [backface-visibility:hidden] border-2 border-white overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-5 -left-5 w-20 h-20 rounded-full bg-purple-300 opacity-10"></div>
          <div className="absolute -bottom-5 -right-5 w-28 h-28 rounded-full bg-pink-300 opacity-10"></div>
          
          <h3 className="text-xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Friendship Dossier
          </h3>
          
          {/* Stats */}
          <div className="space-y-3 mb-4">
            {Object.entries(friend.stats).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600 capitalize">{key}:</span>
                <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-purple-600 shadow-sm">
                  {value}
                </span>
              </div>
            ))}
          </div>
          
          {/* Bio */}
          <div className="bg-white/80 rounded-lg p-3 flex-1 overflow-y-auto">
            <p className="text-sm text-gray-700">{friend.bio}</p>
          </div>
          
          {/* Flip back hint */}
          <div className="mt-2 text-xs text-purple-400 font-medium text-center">
            ← Click to return
          </div>
        </div>
      </div>
    </motion.div>
  );
}