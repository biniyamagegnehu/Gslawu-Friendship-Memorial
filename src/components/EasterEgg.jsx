import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { Howl } from 'howler'

const easterEggSound = new Howl({
  src: ['/sounds/laugh.mp3'],
  volume: 0.5
})

export default function EasterEgg() {
  const { width, height } = useWindowSize()
  const [showEgg, setShowEgg] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleEggClick = () => {
    setShowEgg(true)
    setShowConfetti(true)
    easterEggSound.play()
    
    setTimeout(() => {
      setShowConfetti(false)
      setTimeout(() => setShowEgg(false), 1000)
    }, 3000)
  }

  return (
    <>
      <motion.div
        className="fixed bottom-4 left-4 w-12 h-12 cursor-pointer z-40"
        whileHover={{ scale: 1.2 }}
        onClick={handleEggClick}
      >
        <motion.div
          animate={{ rotate: [0, 20, -20, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-4xl"
        >
          🥚
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none"
          >
            {showConfetti && <Confetti 
              width={width} 
              height={height} 
              colors={['#3ABEFF', '#FF4DA6', '#FFD500']}
            />}
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="bg-friendGray p-6 rounded-xl shadow-lg max-w-xs text-center border-2 border-neonYellow"
            >
              <div className="text-6xl mb-4">🦄</div>
              <h4 className="text-xl font-bold mb-2 text-neonYellow">Remember!</h4>
              <p className="text-sm text-friendLightGray">Don't forget your friends because they will always remember you.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}