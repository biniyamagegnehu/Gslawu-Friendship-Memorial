import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from './components/Layout'
import Timeline from './components/Timeline'
import FriendCard from './components/FriendCard'
import SpotifyEmbed from './components/SpotifyEmbed'
import FriendshipQuiz from './components/FriendshipQuiz'
import PhotoGallery from './components/PhotoGallery'
import ThankYouModal from './components/ThankYouModal'
import EasterEgg from './components/EasterEgg'
import { timelineData } from './data/timeline'
import { friendsData } from './data/friends'

function App() {
  const [showThankYou, setShowThankYou] = useState(false)

  return (
    <Layout>
      {/* Easter Eggs - hidden around the page */}
      <EasterEgg />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 text-center px-4 bg-friendBlack"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6"
          style={{
            background: 'linear-gradient(to right, var(--electricBlue), var(--hotPink))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          Our Squad Chronicles
        </motion.h1>
        <motion.p 
          className="text-xl max-w-2xl mx-auto"
          style={{ color: 'var(--friendLightGray)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          A digital time capsule of all the laughs, memories, and chaos we've shared together.
        </motion.p>
        <motion.div
          className="mt-8 text-4xl"
          style={{ color: 'var(--electricBlue)' }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 2 
          }}
        >
          👯‍♂️
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-4 space-y-20 pb-20 bg-friendBlack">
        <Timeline events={timelineData} />
        
        <section id="squad" className="py-10">
          <motion.h2 
            className="text-4xl font-bold mb-10 text-center"
            style={{
              background: 'linear-gradient(to right, var(--electricBlue), var(--hotPink))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
            whileHover={{ scale: 1.05 }}
          >
            The Legendary Squad
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {friendsData.map((friend, index) => (
              <FriendCard key={index} friend={friend} />
            ))}
          </div>
        </section>

        <SpotifyEmbed 
          url="https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6" 
          title="Our Squad Anthems"
        />
        
        <FriendshipQuiz />
        <PhotoGallery />
      </div>

      {/* Final Thank You */}
      <div 
        className="py-20 text-center"
        style={{
          background: 'linear-gradient(to bottom, var(--friendBlack), var(--friendGray))'
        }}
      >
        <motion.button 
          onClick={() => setShowThankYou(true)}
          className="px-8 py-4 rounded-full text-xl font-bold shadow-lg transition-all"
          style={{
            background: 'linear-gradient(to right, var(--hotPink), var(--electricBlue))',
            color: 'var(--friendWhite)'
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 15px var(--electricBlue)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          Click for a Surprise! 🎁
        </motion.button>
        
        <p 
          className="mt-8 max-w-lg mx-auto"
          style={{ color: 'var(--friendLightGray)' }}
        >
          Thanks for being part of this incredible journey. Here's to many more memories together!
        </p>
      </div>

      {showThankYou && <ThankYouModal onClose={() => setShowThankYou(false)} />}
    </Layout>
  )
}

export default App