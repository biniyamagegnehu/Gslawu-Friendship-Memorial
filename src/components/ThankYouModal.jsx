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
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        {showConfetti && <Confetti 
          width={width} 
          height={height} 
          colors={['#3ABEFF', '#FF4DA6', '#FFD500']}
          recycle={false} 
        />}
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="bg-friendGray rounded-xl max-w-md w-full p-8 shadow-2xl relative border-2 border-hotPink/50"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-friendLightGray hover:text-friendWhite"
          >
            ✕
          </button>
          
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold mb-4 text-hotPink">Thank You!</h3>
            <p className="text-friendLightGray mb-6">
              For all the laughs, the adventures, and for being the most amazing friends 
              anyone could ask for. This is just the beginning of our story!
            </p>
            <p className="text-lg font-medium text-electricBlue">
              - Biniyam Your Friend
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}