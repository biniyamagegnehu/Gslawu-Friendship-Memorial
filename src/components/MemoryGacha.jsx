import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { Howl } from 'howler'
import { memories } from '../data/memories'

const spinSound = new Howl({
  src: ['/sounds/drumroll.mp3'],
  volume: 0.5
})

const winSound = new Howl({
  src: ['/sounds/tada.mp3'],
  volume: 0.7
})

export default function MemoryGacha() {
  const [currentMemory, setCurrentMemory] = useState(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { width, height } = useWindowSize()

  const spin = () => {
    if (isSpinning) return
    
    setIsSpinning(true)
    setCurrentMemory(null)
    setShowConfetti(false)
    spinSound.play()
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * memories.length)
      setCurrentMemory(memories[randomIndex])
      setIsSpinning(false)
      setShowConfetti(true)
      winSound.play()
      
      setTimeout(() => setShowConfetti(false), 3000)
    }, 2000)
  }

  // Slot machine animation variants
  const slotVariants = {
    spinning: {
      rotateX: [0, 360],
      transition: {
        repeat: Infinity,
        duration: 0.3,
        ease: "linear"
      }
    },
    stopped: {
      rotateX: 0
    }
  }

  return (
    <section id="memories" className="py-10">
      <h2 className="text-4xl font-bold mb-10 text-center">Memory Gacha Machine</h2>
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
        {showConfetti && <Confetti width={width} height={height} recycle={false} />}
        
        <div className="relative h-64 mb-8 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg overflow-hidden border-2 border-purple-300 flex items-center justify-center">
          <AnimatePresence>
            {isSpinning ? (
              <motion.div
                key="spinning"
                variants={slotVariants}
                animate="spinning"
                className="text-6xl"
              >
                🎰
              </motion.div>
            ) : currentMemory ? (
              <motion.div
                key="memory"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 w-full"
              >
                <p className="text-xl font-bold mb-2 text-purple-700">{currentMemory.title}</p>
                <p className="mb-4">{currentMemory.description}</p>
                {currentMemory.image && (
                  <img 
                    src={currentMemory.image} 
                    alt="Memory" 
                    className="mt-4 rounded-lg mx-auto max-h-32 object-cover border-2 border-white shadow"
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-500 italic"
              >
                Spin to reveal a random memory!
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
        </div>
        
        <button
          onClick={spin}
          disabled={isSpinning}
          className={`px-8 py-3 rounded-full font-bold text-lg shadow-md transition-all transform hover:scale-105 active:scale-95 ${
            isSpinning 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white'
          }`}
        >
          {isSpinning ? (
            <span className="flex items-center justify-center">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="inline-block mr-2"
              >
                🔄
              </motion.span>
              Spinning...
            </span>
          ) : (
            'Spin the Gacha!'
          )}
        </button>
        
        <p className="mt-4 text-sm text-gray-500">
          {memories.length} memories loaded. Keep spinning to see them all!
        </p>
      </div>
    </section>
  )
}