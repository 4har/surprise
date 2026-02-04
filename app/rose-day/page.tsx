"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function RoseDay() {
  const [clickedRoses, setClickedRoses] = useState<Set<number>>(new Set());
  const roses = Array.from({ length: 6 });

  const handleRoseClick = (idx: number) => {
    const newSet = new Set(clickedRoses);
    newSet.add(idx);
    setClickedRoses(newSet);
  };

  const compliments = [
    "You're the prettiest flower in my life 🌹",
    "Your smile makes my heart bloom 🌸",
    "You are my favorite person 💕",
    "Smiley, you light up my world ✨",
    "You are absolutely beautiful 💗",
    "I love how you love 💖",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-pink-200 overflow-hidden">
      {/* Back Button */}
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-6 left-6 z-20 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-pink-500" />
        </motion.button>
      </Link>

      {/* Content */}
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            className="text-7xl mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            🌹
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600 mb-2 text-balance">
            Rose Day
          </h1>
          <p className="text-lg text-pink-600">A garden of roses just for you, Smiley!</p>
        </motion.div>

        {/* Interactive Roses */}
        <div className="space-y-8 mb-12">
          {roses.map((_, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Rose */}
              <motion.button
                onClick={() => handleRoseClick(idx)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0"
              >
                <motion.div
                  className="text-5xl cursor-pointer"
                  animate={
                    clickedRoses.has(idx)
                      ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, -10, 10, 0],
                        }
                      : {
                          rotate: [0, -3, 3, 0],
                        }
                  }
                  transition={{
                    duration: 0.6,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2,
                  }}
                >
                  🌹
                </motion.div>
              </motion.button>

              {/* Compliment Text - Always visible when clicked */}
              {clickedRoses.has(idx) && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-grow"
                >
                  <motion.div
                    className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-4 shadow-lg border-2 border-pink-300"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <p className="text-pink-600 font-semibold text-base">{compliments[idx]}</p>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border-2 border-pink-200 text-center"
        >
          <motion.div
            className="text-5xl mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            💕
          </motion.div>
          <p className="text-2xl text-pink-600 font-semibold italic">
            "You're the prettiest flower in my life 🌹 Smiley"
          </p>
          <p className="text-pink-500 mt-4">- Tap the roses to reveal sweet compliments -</p>
        </motion.div>

        {/* Next Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <Link href="/propose-day">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(236, 72, 153, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              Next: Propose Day 💌
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
