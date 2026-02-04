"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const PROMISES = [
  "Always make you smile",
  "Protect you",
  "Love forever",
  "Support your dreams",
  "Make you laugh every day",
  "Be your best friend",
];

export default function PromiseDay() {
  const [selectedPromises, setSelectedPromises] = useState<Set<number>>(new Set());
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const heartFill = (selectedPromises.size / PROMISES.length) * 100;

  useEffect(() => {
    const update = () =>
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const togglePromise = (idx: number) => {
    setSelectedPromises((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-100 via-amber-100 to-orange-100 overflow-hidden relative">
      {/* Sparkle background */}
      <div className="absolute inset-0 pointer-events-none">
        {viewport.width > 0 &&
          Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-5xl"
              initial={{
                x: Math.random() * viewport.width,
                y: Math.random() * viewport.height,
                opacity: 0,
              }}
              animate={{
                opacity: [0, 0.3, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              ✨
            </motion.div>
          ))}
      </div>

      {/* Back */}
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-6 left-6 z-20 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 text-amber-700" />
        </motion.button>
      </Link>

      <div className="container max-w-4xl mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            className="text-7xl mb-4"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🤝
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 text-transparent bg-clip-text">
            Promise Day
          </h1>

          <p className="text-lg text-amber-700 font-semibold">
            Promises filled with love for you, Smiley
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-amber-200 text-center mb-12"
        >
          {/* Meter */}
          <div className="mb-8">
            <div className="text-6xl mb-4">💛</div>
            <p className="text-2xl font-bold text-amber-700 mb-6">
              Promises Selected: {selectedPromises.size}
            </p>

            <div className="w-full bg-yellow-100 rounded-full h-6 overflow-hidden border-2 border-amber-300">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 to-amber-500"
                animate={{ width: `${heartFill}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Promise list */}
          <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200 mb-8">
            <p className="text-lg text-amber-800 font-semibold mb-6">
              Click on the promises you believe in:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROMISES.map((promise, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => togglePromise(idx)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-lg font-semibold text-lg transition ${
                    selectedPromises.has(idx)
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {selectedPromises.has(idx) ? "✓ " : ""}
                  {promise}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Completion */}
          {selectedPromises.size === PROMISES.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-amber-200 to-orange-200 rounded-xl p-6 border-2 border-orange-300"
            >
              <motion.div
                className="text-5xl mb-4"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🎉
              </motion.div>

              <p className="text-2xl font-bold text-amber-800">
                All Promises Kept!
              </p>
              <p className="text-amber-700 mt-2">
                I promise to keep all these forever, Smiley! 💕
              </p>
            </motion.div>
          )}
        </motion.div>

        <Link href="/hug-day">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-bold text-lg shadow-lg"
          >
            Next: Hug Day 🤗
          </motion.button>
        </Link>
      </div>
    </main>
  );
}
