import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from './components/Layout'
import Timeline from './components/Timeline'
import FriendCard from './components/FriendCard'
import SpotifyEmbed from './components/SpotifyEmbed'
import FriendshipQuiz from './components/FriendshipQuiz'
import PhotoGallery from './components/PhotoGallery';
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
        className="py-20 text-center px-4"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          Our Squad Chronicles
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          A digital time capsule of all the laughs, memories, and chaos we've shared together.
        </motion.p>
        <motion.div
          className="mt-8 text-4xl"
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
      <div className="container mx-auto px-4 space-y-20 pb-20">
        <Timeline events={timelineData} />
        
        <section id="squad" className="py-10">
          <motion.h2 
            className="text-4xl font-bold mb-10 text-center"
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

        {/* <JokeGenerator /> */}
        
        <SpotifyEmbed 
          url="https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6" 
          title="Our Squad Anthems"
        />
        
        {/* <MemoryGacha />
        <MemeGallery /> */}
        <FriendshipQuiz />
        <PhotoGallery />
        {/* <HallOfShame /> */}
      </div>

      {/* Final Thank You */}
      <div className="py-20 text-center bg-gradient-to-b from-white to-purple-50">
        <motion.button 
          onClick={() => setShowThankYou(true)}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Click for a Surprise! 🎁
        </motion.button>
        
        <p className="mt-8 text-gray-500 max-w-lg mx-auto">
          Thanks for being part of this incredible journey. Here's to many more memories together!
        </p>
      </div>

      {showThankYou && <ThankYouModal onClose={() => setShowThankYou(false)} />}
    </Layout>
  )
}

export default App