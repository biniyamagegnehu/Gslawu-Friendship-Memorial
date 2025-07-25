import { useState } from 'react'
import { motion } from 'framer-motion'
import { Howl } from 'howler'
import { jokes } from '../data/jokes'

const sound = new Howl({
  src: ['/sounds/drumroll.mp3'],
  volume: 0.5
})

export default function JokeGenerator() {
  const [currentJoke, setCurrentJoke] = useState(null)
  const [isRevealing, setIsRevealing] = useState(false)

  const generateJoke = () => {
    setIsRevealing(true)
    sound.play()
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * jokes.length)
      setCurrentJoke(jokes[randomIndex])
      setIsRevealing(false)
    }, 1500)
  }

  return (
    <section className="py-10">
      <h2 className="text-4xl font-bold mb-10 text-center">Inside Joke Generator</h2>
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
        <button
          onClick={generateJoke}
          className="px-6 py-3 bg-yellow-400 text-black rounded-full font-bold mb-6 hover:bg-yellow-500 transition-all"
        >
          Generate Joke
        </button>
        
        <div className="min-h-32">
          {isRevealing ? (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="text-2xl"
            >
              🎭 Drumroll please... 🎭
            </motion.div>
          ) : currentJoke ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl"
            >
              <p className="mb-4">{currentJoke.text}</p>
              {currentJoke.image && (
                <img 
                  src={currentJoke.image} 
                  alt="Joke visual" 
                  className="rounded-lg mx-auto max-h-48"
                />
              )}
            </motion.div>
          ) : (
            <p className="text-gray-500">Click the button for a random inside joke!</p>
          )}
        </div>
      </div>
    </section>
  )
}