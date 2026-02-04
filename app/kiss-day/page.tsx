"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export default function KissDay() {
  const [kissCount, setKissCount] = useState(0);
  const [flyingHearts, setFlyingHearts] = useState<number[]>([]);
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

  const handleKiss = () => {
    const newHeartId = Date.now();
    setKissCount((v) => v + 1);
    setFlyingHearts((prev) => [...prev, newHeartId]);

    setTimeout(() => {
      setFlyingHearts((prev) => prev.filter((id) => id !== newHeartId));
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-pink-200 overflow-hidden relative">
      {/* Floating Kiss Marks */}
      <div className="absolute inset-0 pointer-events-none">
        {viewport.width > 0 &&
          Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{
                x: Math.random() * viewport.width,
                y: Math.random() * viewport.height,
                opacity: 0.3,
                rotate: Math.random() * 360,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 6 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              💋
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
          <ArrowLeft className="w-5 h-5 text-pink-600" />
        </motion.button>
      </Link>

      {/* Flying Hearts */}
      {viewport.width > 0 &&
        flyingHearts.map((id) => (
          <motion.div
            key={id}
            className="fixed pointer-events-none text-4xl"
            initial={{
              x: viewport.width / 2,
              y: viewport.height / 2,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: viewport.width / 2 + (Math.random() - 0.5) * 400,
              y: viewport.height / 2 - 300,
              opacity: 0,
              scale: 0.5,
            }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            💕
          </motion.div>
        ))}

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
            animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💋
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
            Kiss Day
          </h1>
          <p className="text-lg text-pink-700 font-semibold">
            Sweet kisses filled with love
          </p>
        </motion.div>

        {/* Main Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-lg border-2 border-pink-200 text-center mb-12 max-w-2xl"
        >
          <motion.div
            className="text-9xl mb-8"
            animate={{ x: [0, 10, -10, 0], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            😘
          </motion.div>

          <p className="text-4xl font-bold text-pink-600 mb-6">
            Kisses Given:{" "}
            <span className="text-5xl text-purple-600">{kissCount}</span>
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleKiss}
            className="px-12 py-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-xl shadow-lg mb-6"
          >
            Blow a Kiss 😘
          </motion.button>

          <motion.p
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-lg text-pink-600 font-semibold"
          >
            *Giggle* You're so sweet! 🙈
          </motion.p>
        </motion.div>

        <Link href="/valentines-day">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-lg shadow-lg"
          >
            Final: Valentine&apos;s Day ❤️
          </motion.button>
        </Link>
      </div>
    </main>
  );
}
