"use client"

import { motion } from 'framer-motion';

export default function FloatingHearts() {
  const hearts = Array.from({ length: 15 });

  return (
    <div className="fixed inset-0 pointer-events-none">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-3xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            opacity: 0,
          }}
          animate={{
            y: -50,
            opacity: [0, 1, 1, 0],
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        >
          💕
        </motion.div>
      ))}
    </div>
  );
}
