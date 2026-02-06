'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import cutie from "./cutie.png"
interface Nickname {
  name: string;
  description: string;
  emoji: string;
  color: string;
}

export default function CuteDay() {
  const [selectedNickname, setSelectedNickname] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const nicknames: Nickname[] = [
    {
      name: 'Smiley',
      description: 'Your bright smile that lights up every room and makes everyone around you happy',
      emoji: '😊',
      color: 'from-yellow-200 to-yellow-300',
    },
    {
      name: 'Cutiefull',
      description: 'Your adorable personality and sweet nature that makes you absolutely lovable',
      emoji: '💕',
      color: 'from-pink-200 to-rose-300',
    },
    {
      name: 'BBgrl',
      description: 'Your confident, cool, and independent spirit that shines so bright',
      emoji: '✨',
      color: 'from-purple-200 to-indigo-300',
    },
    {
      name: 'Sweetu',
      description: 'Your gentle heart and the sweetness you bring to everything you do',
      emoji: '🍭',
      color: 'from-orange-200 to-pink-300',
    },
  ];

  const handleNicknameClick = (nickname: string) => {
    setSelectedNickname(nickname);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-100 via-pink-100 to-purple-100 overflow-hidden relative">
      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-white/80 hover:bg-white px-4 py-2 rounded-full shadow-lg transition-all"
      >
        <ArrowLeft className="w-5 h-5 text-pink-600" />
        <span className="text-pink-600 font-semibold">Back</span>
      </Link>

      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            animate={{
              y: [0, -500],
              x: [0, Math.sin(i) * 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
            style={{
              left: `${(i * 100) % 100}%`,
              top: '100%',
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl"
              animate={{
                y: [0, -400],
                x: [0, (Math.random() - 0.5) * 400],
                rotate: [0, Math.random() * 360],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2,
              }}
              style={{
                left: '50%',
                top: '50%',
              }}
            >
              {['✨', '💫', '🌟', '💕', '🎉'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-5 container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 pt-12"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-12 h-12 text-pink-500" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 mb-4 text-balance">
            Annu Singh
          </h1>
          <p className="text-xl text-gray-700 font-semibold mb-2">A celebration of YOU</p>
          <p className="text-gray-600">Discover the beautiful nicknames that define you</p>
        </motion.div>

        {/* Cute Character Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <motion.img
              src={cutie.src}
              alt="Smiley character"
              className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-full shadow-2xl border-8 border-white"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg"
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="text-4xl">✨</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Nicknames Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
          {nicknames.map((nick, idx) => (
            <motion.button
              key={nick.name}
              onClick={() => handleNicknameClick(nick.name)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="w-full"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-gradient-to-br ${nick.color} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow cursor-pointer border-2 border-white/50`}
              >
                <motion.div
                  className="text-5xl mb-4"
                  animate={
                    selectedNickname === nick.name
                      ? { scale: [1, 1.3, 1] }
                      : { scale: 1 }
                  }
                >
                  {nick.emoji}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                  {nick.name}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed drop-shadow-md">
                  {nick.description}
                </p>

                {selectedNickname === nick.name && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-4 inline-flex items-center gap-2 bg-white/30 rounded-full px-4 py-2"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-white font-semibold text-sm">That's you!</span>
                  </motion.div>
                )}
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Beautiful Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-pink-200 mb-12"
        >
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed font-medium">
              Annu, you are a beautiful blend of all these qualities and so much more.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed font-medium">
              Your smile brightens days, your heart is pure gold, and your spirit is absolutely magical.
            </p>
            <motion.p
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
            >
              You are truly one of a kind, and the world is better because you're in it.
            </motion.p>
          </div>
        </motion.div>

        {/* Cute Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center space-y-4"
        >
          <div className="flex justify-center gap-6 flex-wrap">
            {['💕', '🌸', '✨', '💫', '🎀'].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-3xl"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
          <p className="text-gray-600 font-medium">
            Celebrating you on this beautiful day and every day
          </p>
        </motion.div>

        {/* Next Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 pb-8"
        >
          <Link href="/valentines-day">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-lg shadow-lg"
            >
              Final: Valentine's Day
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
