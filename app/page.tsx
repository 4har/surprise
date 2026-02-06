"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Volume2, VolumeX } from "lucide-react";

// ⛔ prevent SSR crash
const FloatingHearts = dynamic(() => import("@/components/FloatingHearts"), {
  ssr: false,
});

const DAYS = [
  { day: "Rose", emoji: "🌹", path: "/rose-day", date: "Feb 7" },
  { day: "Propose", emoji: "💌", path: "/propose-day", date: "Feb 8" },
  { day: "Chocolate", emoji: "🍫", path: "/chocolate-day", date: "Feb 9" },
  { day: "Teddy", emoji: "🧸", path: "/teddy-day", date: "Feb 10" },
  { day: "Promise", emoji: "🤝", path: "/promise-day", date: "Feb 11" },
  { day: "Hug", emoji: "🤗", path: "/hug-day", date: "Feb 12" },
  { day: "Cutie", emoji: "😊", path: "/cutie-day", date: "Feb 13" },
  { day: "Valentine’s", emoji: "❤️", path: "/valentines-day", date: "Feb 14" },
];

export default function Home() {
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // ⛑ hydration safe

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-purple-100 to-pink-100 overflow-hidden relative">
      <FloatingHearts />

      {/* Music toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMusicOn(!isMusicOn)}
        className="fixed top-6 right-6 z-20 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg"
      >
        {isMusicOn ? (
          <Volume2 className="w-5 h-5 text-pink-500" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-500" />
        )}
      </motion.button>

      <div className="container max-w-4xl mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Valentine Week
          </motion.h1>

          <p className="text-2xl md:text-3xl text-pink-600 font-semibold">
            Welcome Smiley 💖
          </p>
          <p className="text-lg text-purple-600">
            Ready for your Valentine Week surprise?
          </p>
        </motion.div>

        {/* Days grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {DAYS.map((item, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Link href={item.path}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border-2 border-pink-200 hover:border-purple-300 transition cursor-pointer flex flex-col items-center text-center"
                >
                  <motion.div
                    className="text-5xl mb-3"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.2,
                    }}
                  >
                    {item.emoji}
                  </motion.div>

                  <h3 className="text-xl font-bold text-pink-600">
                    {item.day} Day
                  </h3>
                  <p className="text-sm text-purple-600">{item.date}</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center text-3xl"
        >
          👇 Choose a day to start! 👇
        </motion.div>
      </div>
    </main>
  );
}
