"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function ChocolateDay() {
  const [collectedCount, setCollectedCount] = useState(0);
  const [showingMessage, setShowingMessage] = useState<number | null>(null);
  const [hasRain, setHasRain] = useState(false);

  const chocolates = Array.from({ length: 12 });
  const messages = [
    'You are so sweet! 🍫',
    'Chocolate reminds me of you 💕',
    'Life is sweet with you 💗',
    'You are sweeter than chocolate 😊',
    'I love you more each day 💖',
    'You are my favorite treat 🎁',
    'So much love for you 💕',
    'Forever yours 💕',
    'You make life delicious 🍫',
    'Smiley, you are perfect 💕',
    'My heart is all yours 💖',
    'I am so grateful for you 💕',
  ];

  const handleCollectChocolate = (idx: number) => {
    if (idx !== collectedCount) return; // Only allow clicking the next chocolate in sequence
    setCollectedCount(collectedCount + 1);
    setShowingMessage(idx);
    setTimeout(() => setShowingMessage(null), 2000);

    if (collectedCount + 1 === chocolates.length) {
      setHasRain(true);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-100 via-yellow-100 to-orange-100 overflow-hidden relative">
      {/* Chocolate rain */}
      {hasRain && (
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -50,
                opacity: 1,
              }}
              animate={{
                y: window.innerHeight + 50,
                opacity: 0,
              }}
              transition={{
                duration: 3,
                delay: i * 0.05,
              }}
            >
              🍫
            </motion.div>
          ))}
        </div>
      )}

      {/* Back Button */}
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-6 left-6 z-20 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-amber-600" />
        </motion.button>
      </Link>

      {/* Content */}
      <div className="container max-w-4xl mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            className="text-7xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            🍫
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-orange-600 mb-2 text-balance">
            Chocolate Day
          </h1>
          <p className="text-lg text-amber-700 font-semibold">Collect chocolates & reveal sweet messages!</p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold text-amber-800">
              Collected: {collectedCount}/{chocolates.length}
            </p>
          </div>
          <motion.div className="w-full bg-white/50 rounded-full h-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${(collectedCount / chocolates.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </motion.div>

        {/* Chocolate Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {chocolates.map((_, idx) => {
            const isCollected = idx < collectedCount;
            return (
              <motion.button
                key={idx}
                onClick={() => handleCollectChocolate(idx)}
                disabled={isCollected}
                className="relative h-32"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <motion.div
                  className="text-6xl cursor-pointer"
                  animate={
                    isCollected
                      ? { scale: 0.5, opacity: 0.3 }
                      : { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }
                  }
                  transition={{
                    duration: 2,
                    repeat: isCollected ? 0 : Number.POSITIVE_INFINITY,
                  }}
                >
                  🍫
                </motion.div>

                {isCollected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center text-2xl"
                  >
                    ✨
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Message Popup */}
        {showingMessage !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-30"
          >
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border-2 border-orange-300 max-w-md text-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1 }}
            >
              <motion.div className="text-5xl mb-4">🍫</motion.div>
              <p className="text-lg text-amber-700 font-semibold">{messages[showingMessage]}</p>
            </motion.div>
          </motion.div>
        )}

        {/* Completion Message */}
        {collectedCount === chocolates.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border-2 border-orange-300 text-center mb-8"
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              🎉
            </motion.div>
            <h2 className="text-2xl font-bold text-amber-700 mb-3">All Chocolates Collected!</h2>
            <p className="text-amber-600 mb-6">You're so sweet, Smiley! ❤️</p>

            <Link href="/teddy-day">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow"
              >
                Next: Teddy Day 🧸
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  );
}
