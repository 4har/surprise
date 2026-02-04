"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface TeddyColor {
  name: string;
  heartEmoji: string;
  color: string;
}

export default function TeddyDay() {
  const [hugCount, setHugCount] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isHugging, setIsHugging] = useState(false);

  const colors: TeddyColor[] = [
    { name: 'Brown', heartEmoji: '🤎', color: 'brown' },
    { name: 'Pink', heartEmoji: '🩷', color: 'pink' },
    { name: 'Purple', heartEmoji: '💜', color: 'purple' },
    { name: 'Blue', heartEmoji: '💙', color: 'blue' },
  ];

  const handleHug = () => {
    setIsHugging(true);
    setHugCount(hugCount + 1);
    setTimeout(() => setIsHugging(false), 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-100 via-pink-100 to-red-100 overflow-hidden">
      {/* Back Button */}
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-6 left-6 z-20 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-orange-600" />
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
            animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            🧸
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-2 text-balance">
            Teddy Day
          </h1>
          <p className="text-lg text-orange-700 font-semibold">A cozy bedroom full of cuddles just for you!</p>
        </motion.div>

        {/* Main Hug Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-lg border-2 border-pink-200 text-center mb-12"
        >
          {/* Teddy & Character Hugging */}
          <div className="mb-8 h-40 flex items-center justify-center gap-8">
            <motion.div
              className="text-8xl"
              animate={
                isHugging
                  ? {
                      scale: [1, 0.8, 1],
                      x: [0, 20, 0],
                    }
                  : { rotate: [0, -3, 3, 0] }
              }
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
            >
              🧸
            </motion.div>

            <motion.div
              animate={isHugging ? { y: -20 } : { y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-7xl"
            >
              {isHugging ? '💕' : '👧'}
            </motion.div>
          </div>

          {/* Hug Counter */}
          <motion.div
            className="mb-8"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-3xl font-bold text-pink-600 mb-4">
              Hugs Given: <span className="text-4xl">{hugCount}</span>
            </p>
          </motion.div>

          {/* Big Hug Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleHug}
            className="px-12 py-6 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-shadow mb-8"
          >
            Give a Hug 🤗
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-pink-600"
          >
            BBgrl needs extra hugs today! 💕
          </motion.div>
        </motion.div>

        {/* Dress Up Game */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-purple-200 text-center mb-12"
        >
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Dress Up Your Teddy 🧸</h2>

          {/* Teddy Display with Color Background */}
          <motion.div
            className={`text-9xl mb-8 py-12 rounded-2xl transition-all ${
              selectedColor === 'brown'
                ? 'bg-orange-100'
                : selectedColor === 'pink'
                  ? 'bg-pink-100'
                  : selectedColor === 'purple'
                    ? 'bg-purple-100'
                    : selectedColor === 'blue'
                      ? 'bg-blue-100'
                      : 'bg-transparent'
            }`}
            animate={selectedColor ? { rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
          >
            🧸
          </motion.div>

          {/* Heart Color Indicator */}
          {selectedColor && (
            <motion.div
              className="text-6xl mb-6"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              {colors.find((c) => c.color === selectedColor)?.heartEmoji}
            </motion.div>
          )}

          {/* Color Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colors.map((color) => (
              <motion.button
                key={color.name}
                onClick={() => setSelectedColor(color.color)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-lg transition-all ${
                  selectedColor === color.color
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-3xl mb-2">{color.heartEmoji}</div>
                <p className="font-semibold text-sm">{color.name}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Sleepy Panda Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 shadow-lg border-2 border-purple-200 text-center mb-12"
        >
          <p className="text-5xl mb-4">🐼</p>
          <motion.p
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-2xl text-purple-600 font-semibold mb-4"
          >
            Cute sleepy panda cuddles
          </motion.p>
          <p className="text-lg text-purple-700">
            "You are safe with me, Smiley" <span className="text-3xl">💕</span>
          </p>
        </motion.div>

        {/* Next Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Link href="/promise-day">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              Next: Promise Day 🤝
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
