import { useState } from 'react'; // Added this import
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function FriendCard({ friend }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isFlipped, setIsFlipped] = useState(false); // Now useState is properly imported

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative h-96 [perspective:1000px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        {/* Front of Card */}
        <div className="absolute inset-0 bg-white rounded-xl shadow-lg p-6 flex flex-col items-center [backface-visibility:hidden]">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-200 mb-4">
            <img 
              src={friend.avatar} 
              alt={friend.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h3 className="text-2xl font-bold text-center">{friend.name}</h3>
          <p className="text-purple-600 font-semibold mb-2">"{friend.nickname}"</p>
          <p className="text-gray-500 text-center mb-4">{friend.role}</p>
          
          <div className="text-4xl mb-4">{friend.emoji}</div>
          
          <div className="bg-purple-100 rounded-lg p-3 w-full">
            <p className="text-center italic">"{friend.quote}"</p>
          </div>
          
          <p className="mt-4 text-sm text-gray-500">Click to flip</p>
        </div>
        
        {/* Back of Card */}
        <div className="absolute inset-0 bg-purple-100 rounded-xl shadow-lg p-6 flex flex-col [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <h3 className="text-xl font-bold text-center mb-4">Friendship Stats</h3>
          
          <div className="space-y-2 mb-4">
            {Object.entries(friend.stats).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-medium capitalize">{key}:</span>
                <span className="font-bold">{value}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-lg p-3 flex-1">
            <p className="text-sm">{friend.bio}</p>
          </div>
          
          <p className="mt-2 text-sm text-purple-800 text-center">Click to flip back</p>
        </div>
      </div>
    </motion.div>
  );
}