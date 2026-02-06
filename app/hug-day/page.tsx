"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, Heart } from "lucide-react";

export default function HugDay() {
  const [isHugging, setIsHugging] = useState(false);
  const [hugIntensity, setHugIntensity] = useState(0);

  const [viewport, setViewport] = useState({ width: 0, height: 0 });

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

  const handleBigHug = () => {
    setIsHugging(true);
    setHugIntensity(100);
    setTimeout(() => {
      setIsHugging(false);
      setHugIntensity(0);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 via-cyan-100 to-teal-100 overflow-hidden relative">
      {/* Cloud Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {viewport.width > 0 &&
          Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl opacity-50"
              initial={{
                x: Math.random() * viewport.width,
                y: Math.random() * viewport.height,
              }}
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 3 + i, repeat: Infinity }}
            >
              ☁️
            </motion.div>
          ))}
      </div>

      {/* Back Button */}
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-6 left-6 z-20 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 text-cyan-600" />
        </motion.button>
      </Link>

      <div className="container max-w-4xl mx-auto px-4 py-12 relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            className="text-7xl mb-4"
            animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🤗
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600">
            Hug Day
          </h1>
          <p className="text-lg text-cyan-700 font-semibold">
            Feel the warmth of a big hug!
          </p>
        </motion.div>

        {/* Hug Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`bg-white/80 backdrop-blur-sm rounded-3xl p-16 shadow-lg border-2 border-cyan-200 text-center mb-12 transition-all ${
            isHugging ? "ring-4 ring-cyan-400" : ""
          }`}
        >
          <motion.div
            className="text-9xl flex justify-center gap-4 mb-12"
            animate={
              isHugging
                ? { x: [0, -10, 0], scale: 1.1 }
                : { rotate: [0, 2, -2, 0] }
            }
            transition={{ duration: 1 }}
          >
            👧
            🫂
          </motion.div>

          {isHugging && (
            <motion.div
              className="text-6xl mb-6"
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              💓
            </motion.div>
          )}

          <div className="mb-8">
            <motion.div className="w-full bg-cyan-100 rounded-full h-3 overflow-hidden border-2 border-cyan-300">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-teal-500"
                animate={{ width: `${hugIntensity}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>

          <motion.div
            animate={isHugging ? { scale: [1, 1.1, 1] } : { opacity: 0.7 }}
            transition={{ duration: 1 }}
            className="text-2xl font-bold text-cyan-700 mb-8 flex items-center gap-3 justify-center"
          >
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            You are safe with me, Smiley
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBigHug}
            disabled={isHugging}
            className="px-12 py-6 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full font-bold text-xl shadow-lg"
          >
            {isHugging ? "Hugging... 🫂" : "Give Me A Big Hug 🤗"}
          </motion.button>
        </motion.div>

        <Link href="/cutie-day">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full font-bold text-lg shadow-lg"
          >
            Next: Cutie Day 😊
          </motion.button>
        </Link>
      </div>
    </main>
  );
}
