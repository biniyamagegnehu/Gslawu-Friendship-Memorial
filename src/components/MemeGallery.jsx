import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { memes } from '../data/memes'

export default function MemeGallery() {
  const [selectedMeme, setSelectedMeme] = useState(null)

  return (
    <section id="gallery" className="py-10">
      <h2 className="text-4xl font-bold mb-10 text-center">Meme Wall</h2>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {memes.map((meme) => (
            <motion.div
              key={meme.id}
              layoutId={`meme-${meme.id}`}
              onClick={() => setSelectedMeme(meme)}
              className="cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={meme.image}
                alt={meme.caption}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <p className="mt-2 text-center text-gray-700">{meme.caption}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMeme && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedMeme(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={`meme-${selectedMeme.id}`}
              className="bg-white p-4 rounded-lg max-w-2xl w-full"
            >
              <img
                src={selectedMeme.image}
                alt={selectedMeme.caption}
                className="w-full h-auto rounded-lg"
              />
              <p className="mt-4 text-center text-xl font-medium">
                {selectedMeme.caption}
              </p>
              <button
                onClick={() => setSelectedMeme(null)}
                className="mt-4 px-4 py-2 bg-gray-200 rounded-lg mx-auto block"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}