"use client"

import React from "react"

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function ProposeDay() {
  const [stage, setStage] = useState<'waiting' | 'nervous' | 'proposing' | 'responded'>('waiting');
  const [hasResponded, setHasResponded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const handlePropose = () => {
    setStage('nervous');
    setTimeout(() => setStage('proposing'), 2000);
  };

  const handleYes = () => {
    setHasResponded(true);
    setStage('responded');
  };

  const handleNo = () => {
    // Handle No response
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleNoHover = () => {
    const randomX = Math.random() * 300 - 150;
    const randomY = Math.random() * 300 - 150;
    setNoButtonPos({ x: randomX, y: randomY });
  };

  return (
    <main onMouseMove={handleMouseMove} className="min-h-screen bg-gradient-to-b from-indigo-200 via-purple-100 to-pink-100 overflow-hidden relative">
      {/* Starry background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: Math.random() * 3 }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Back Button */}
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-6 left-6 z-20 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-purple-500" />
        </motion.button>
      </Link>

      {/* Content */}
      <div className="container max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            className="text-7xl mb-4"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            💌
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2 text-balance">
            Propose Day
          </h1>
        </motion.div>

        {/* Teddy Character */}
        {stage === 'waiting' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-9xl mb-8"
          >
            🧸
          </motion.div>
        )}

        {stage === 'nervous' && (
          <motion.div
            key="nervous"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-9xl mb-8"
          >
            <motion.div
              animate={{
                x: [-10, 10, -10],
                rotate: [-5, 5, -5],
              }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              😰
            </motion.div>
          </motion.div>
        )}

        {stage === 'proposing' && (
          <motion.div
            key="proposing"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center mb-8"
          >
            <motion.div
              className="text-9xl mb-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              🧸
            </motion.div>
            <motion.div
              className="text-6xl"
              animate={{
                rotate: [0, 10, 0, -10, 0],
                y: [0, -5, 0],
              }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              ❤️
            </motion.div>
          </motion.div>
        )}

        {stage === 'responded' && (
          <motion.div
            key="responded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            {/* Confetti */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="fixed pointer-events-none"
                initial={{
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  opacity: 1,
                }}
                animate={{
                  x: window.innerWidth * (Math.random() - 0.5) * 2,
                  y: window.innerHeight * (Math.random() - 0.5) * 2,
                  opacity: 0,
                }}
                transition={{ duration: 2, delay: i * 0.05 }}
              >
                {'💕✨🎉'[i % 3]}
              </motion.div>
            ))}

            <motion.div
              className="text-8xl mb-6"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              🎉
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-pink-600 mb-4"
            >
              Yes!!! 💕
            </motion.h2>
          </motion.div>
        )}

        {/* Main Content */}
        {stage === 'waiting' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border-2 border-purple-200 text-center mb-8 max-w-md"
          >
            <p className="text-xl text-purple-600 font-semibold mb-6">Will you be my Valentine, Smiley? 💜</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePropose}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow"
            >
              Let's Begin 💕
            </motion.button>
          </motion.div>
        )}

        {stage === 'proposing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-pink-300 text-center mb-8 max-w-2xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl text-pink-600 font-bold mb-8"
            >
              Smiley, will you be my Valentine? 💕
            </motion.p>

            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow"
              >
                Yes! 💕
              </motion.button>

              <motion.button
                onMouseEnter={handleNoHover}
                animate={{
                  x: noButtonPos.x,
                  y: noButtonPos.y,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
                onClick={handleNo}
                className="px-8 py-3 bg-gray-300 text-gray-700 rounded-full font-bold shadow-lg cursor-pointer relative"
              >
                No 😅
              </motion.button>
            </div>
          </motion.div>
        )}

        {stage === 'responded' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-pink-300 text-center mb-8 max-w-2xl"
          >
            <motion.h2
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="text-3xl font-bold text-pink-600 mb-4"
            >
              I Love You So Much! 💕
            </motion.h2>
            <p className="text-lg text-purple-600 mb-6">You just made me the happiest...</p>

            <Link href="/chocolate-day">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow"
              >
                Next: Chocolate Day 🍫
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  );
}
