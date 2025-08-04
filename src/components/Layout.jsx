import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Hero from './Hero'; // Keep this import

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-friendBlack font-sans">
      {/* Fixed navbar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </header>
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero section as first element */}
        <Hero />
        
        {/* Add padding-top to account for fixed navbar */}
        <div className="pt-16">
          {children}
        </div>
      </motion.main>
    </div>
  );
}