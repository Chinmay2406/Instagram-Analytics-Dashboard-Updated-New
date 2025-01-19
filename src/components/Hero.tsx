import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

export const Hero = () => {
  const handleGetStarted = () => {
    const analyticsSection = document.getElementById('analytics');
    analyticsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/50" />
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative z-10 mb-8"
      >
        <div className="relative w-32 h-32 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-2xl p-6 shadow-2xl">
          <Instagram className="w-full h-full text-white" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-5xl md:text-7xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
      >
        Empower Your Instagram Journey
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-xl text-gray-300 text-center max-w-2xl mb-8 px-4"
      >
        Unlock powerful analytics, schedule content, and grow your Instagram presence with AI-powered insights
      </motion.p>

      <motion.button
        onClick={handleGetStarted}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold shadow-lg hover:shadow-purple-500/20"
      >
        Get Started
      </motion.button>
    </div>
  );
};