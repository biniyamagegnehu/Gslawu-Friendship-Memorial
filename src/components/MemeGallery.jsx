import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { memes } from '../data/memes'

export default function MemeGallery() {
  const [selectedMeme, setSelectedMeme] = useState(null)

  return (
    <section id="gallery" className="py-10 bg-friendBlack">
      <h2 className="text-4xl font-bold mb-10 text-center text-friendWhite">Meme Wall</h2>
      
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
                className="w-full h-64 object-cover rounded-lg shadow-md border border-friendGray/50"
              />
              <p className="mt-2 text-center text-friendLightGray">{meme.caption}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMeme && (
          <motion.div
            className="fixed inset-0 bg-friendBlack/90 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedMeme(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={`meme-${selectedMeme.id}`}
              className="bg-friendGray p-4 rounded-lg max-w-2xl w-full border border-electricBlue/50"
            >
              <img
                src={selectedMeme.image}
                alt={selectedMeme.caption}
                className="w-full h-auto rounded-lg"
              />
              <p className="mt-4 text-center text-xl font-medium text-friendWhite">
                {selectedMeme.caption}
              </p>
              <button
                onClick={() => setSelectedMeme(null)}
                className="mt-4 px-4 py-2 bg-electricBlue hover:bg-hotPink rounded-lg mx-auto block text-friendWhite font-medium transition-colors"
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