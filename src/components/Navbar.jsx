import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bars3Icon as MenuIcon, XMarkIcon as XIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 shadow-lg backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl">👑</span> {/* Changed emoji to crown */}
            <span className="font-bold text-xl text-purple-600">Gslawu</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#timeline" className="text-gray-700 hover:text-purple-600 transition-colors">Timeline</a>
            <a href="#squad" className="text-gray-700 hover:text-purple-600 transition-colors">The Squad</a>
            <a href="#memories" className="text-gray-700 hover:text-purple-600 transition-colors">Memories</a>
            <a href="#quiz" className="text-gray-700 hover:text-purple-600 transition-colors">Quiz</a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white/90 backdrop-blur-sm"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <a 
              href="#timeline" 
              className="text-gray-700 hover:text-purple-600 px-3 py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Timeline
            </a>
            <a 
              href="#squad" 
              className="text-gray-700 hover:text-purple-600 px-3 py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              The Squad
            </a>
            <a 
              href="#memories" 
              className="text-gray-700 hover:text-purple-600 px-3 py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Memories
            </a>
            <a 
              href="#quiz" 
              className="text-gray-700 hover:text-purple-600 px-3 py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Quiz
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}