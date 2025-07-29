import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Howl } from 'howler';

const confettiSound = new Howl({
  src: ['/sounds/tada.mp3'],
  volume: 0.7
});

export default function ThankYouModal({ onClose }) {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    confettiSound.play();
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        {showConfetti && <Confetti width={width} height={height} recycle={false} />}
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-8 shadow-2xl relative transition-colors duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            ✕
          </button>
          
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold mb-4 text-purple-600 dark:text-purple-400">Thank You!</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              For all the laughs, the adventures, and for being the most amazing friends 
              anyone could ask for. This is just the beginning of our story!
            </p>
            <p className="text-lg font-medium dark:text-white">
              - Biniyam Your Friend
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}