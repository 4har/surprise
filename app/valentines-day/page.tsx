"use client"

import React from "react"

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const SLIDESHOW_CHARACTERS = ['🧸', '🐼', '💕', '✨', '🌹', '💌', '🍫', '🤗', '💋', '👧'];

export default function ValentinesDay() {
  const [isHeartOpen, setIsHeartOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDESHOW_CHARACTERS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Confetti animation
  const confetti = Array.from({ length: 40 });

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-200 via-pink-100 to-red-100 overflow-hidden relative">
      {/* Starry Night Sky */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Confetti */}
      {isHeartOpen &&
        confetti.map((_, i) => (
          <motion.div
            key={i}
            className="fixed pointer-events-none"
            initial={{
              x: window.innerWidth / 2,
              y: window.innerHeight / 2,
              opacity: 1,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              opacity: 0,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: i * 0.05,
            }}
          >
            {'💕✨🎉'[i % 3]}
          </motion.div>
        ))}

      {/* Back Button */}
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-6 left-6 z-20 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-pink-600" />
        </motion.button>
      </Link>

      {/* Content */}
      <div className="container max-w-4xl mx-auto px-4 py-12 relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            className="text-7xl mb-4"
            animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            ❤️
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600 mb-2 text-balance">
            Valentine's Day
          </h1>
          <p className="text-lg text-pink-700 font-semibold">The grand finale of our love week</p>
        </motion.div>

        {/* Giant Glowing Heart */}
        <motion.button
          onClick={() => setIsHeartOpen(!isHeartOpen)}
          className="mb-12 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="text-9xl"
            animate={
              isHeartOpen
                ? {
                    scale: [1.2, 1.3, 1.2],
                  }
                : {
                    scale: [1, 1.1, 1],
                    rotate: [0, 2, -2, 0],
                  }
            }
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 0.5,
            }}
          >
            ❤️
          </motion.div>
        </motion.button>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border-3 border-pink-300 text-center mb-12 max-w-3xl"
        >
          {/* Love Letter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-pink-600 mb-6">Dear Smiley 💕</h2>

            <motion.div
              className="text-lg text-pink-700 leading-relaxed mb-8 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.5 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                You are my everything. From the first moment I saw your smile, my heart knew...
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                This Valentine Week was a journey of showing you what I feel every single day.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                Every rose, every chocolate, every hug, every kiss - it's all a fraction of the love I have for you.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600"
              >
                Will you be my forever Valentine?
              </motion.p>
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-shadow mb-8"
          >
            Yes, Forever! 💕
          </motion.button>
        </motion.div>

        {/* Romantic Slideshow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-pink-100 to-red-100 rounded-3xl p-8 shadow-lg border-2 border-red-200 text-center mb-12 max-w-2xl"
        >
          <p className="text-lg text-pink-700 font-semibold mb-6">Journey of Our Love Week</p>

          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-8xl mb-4"
          >
            {SLIDESHOW_CHARACTERS[currentSlide]}
          </motion.div>

          <div className="flex justify-center gap-2">
            {SLIDESHOW_CHARACTERS.map((_, idx) => (
              <motion.div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-pink-600 w-8' : 'bg-pink-300 w-2'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Final Promise */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <motion.h2
            animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600 mb-6 text-balance"
          >
            I Love You So Much, Smiley! 💕
          </motion.h2>

          <motion.div
            className="flex gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white border-2 border-pink-500 text-pink-600 rounded-full font-bold shadow-lg hover:bg-pink-50 transition-colors"
              >
                Restart Journey 🔄
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow"
            >
              Save This Moment 📸
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
