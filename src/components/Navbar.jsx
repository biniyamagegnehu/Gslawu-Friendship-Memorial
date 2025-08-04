import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bars3Icon as MenuIcon, XMarkIcon as XIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-friendGray/80 shadow-lg backdrop-blur-sm border-b border-friendGray">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl">👑</span>
            <span className="font-bold text-xl text-electricBlue">Gslawu</span>
          </div>
          
          {/* Desktop Menu - Added Hero link */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-friendWhite hover:text-hotPink transition-colors">Hero</a>
            <a href="#timeline" className="text-friendWhite hover:text-hotPink transition-colors">Timeline</a>
            <a href="#squad" className="text-friendWhite hover:text-hotPink transition-colors">The Squad</a>
            <a href="#quiz" className="text-friendWhite hover:text-hotPink transition-colors">Quiz</a>
            <a href="#memories" className="text-friendWhite hover:text-hotPink transition-colors">Photo Memories</a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-friendWhite focus:outline-none"
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
      
      {/* Mobile Menu - Added Hero link */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-friendGray backdrop-blur-sm"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <a 
              href="#" 
              className="text-friendWhite hover:text-hotPink px-3 py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Hero
            </a>
            <a 
              href="#timeline" 
              className="text-friendWhite hover:text-hotPink px-3 py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Timeline
            </a>
            <a 
              href="#squad" 
              className="text-friendWhite hover:text-hotPink px-3 py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              The Squad
            </a>
            <a 
              href="#memories" 
              className="text-friendWhite hover:text-hotPink px-3 py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Photo Memories
            </a>
            <a 
              href="#quiz" 
              className="text-friendWhite hover:text-hotPink px-3 py-2 transition-colors"
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