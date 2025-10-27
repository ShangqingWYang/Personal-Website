'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Header() {
  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  // Cursor offset for 3D tilt effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.header
      className="w-full flex items-center justify-between px-10 md:px-20 pt-6 md:pt-8 z-50 bg-gray-900/90 backdrop-blur-sm fixed top-0 left-0 perspective-1000 shadow-lg"
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      {/* Logo */}
      <motion.div
        style={{ rotateX: -offset.y, rotateY: offset.x }}
        className="text-gray-300 text-4xl md:text-5xl font-serif tracking-widest relative cursor-default"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <motion.span
          className="inline-block text-gray-100"
          animate={{ y: [0, -5, 0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        >
          SY
        </motion.span>
        <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent opacity-20 animate-shimmer"></span>
      </motion.div>

      {/* Navigation */}
      <motion.nav
        className="flex flex-1 justify-evenly md:justify-between ml-10 text-gray-400 text-lg md:text-xl tracking-widest font-serif relative"
        style={{ rotateX: -offset.y / 2, rotateY: offset.x / 2 }}
      >
        {navItems.map((nav) => (
          <motion.a
            key={nav.name}
            href={nav.href}
            className="relative group hover:text-gray-100 transition-all duration-300"
            whileHover={{ scale: 1.1, textShadow: '0 0 10px #f0e68c' }}
          >
            {nav.name}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-400 group-hover:w-full group-hover:bg-yellow-400 transition-all duration-300"></span>
          </motion.a>
        ))}

        {/* "More" dropdown */}
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <motion.span
            className="text-gray-400 hover:text-gray-100 transition-all duration-300"
            whileHover={{ scale: 1.1, textShadow: '0 0 20px #f0e68c' }}
          >
            More
          </motion.span>

          <AnimatePresence>
            {hovering && (
              <motion.div
                className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 bg-gray-900 rounded-lg px-8 py-4 shadow-[0_0_30px_rgba(255,255,150,0.6)] text-yellow-400 whitespace-nowrap z-50"
                initial={{ opacity: 0, y: -50, scale: 0.5, rotateX: 25 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, y: -50, scale: 0.5, rotateX: 25 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              >
                {/* Clickable Chinese subheading linking to new page */}
                <Link href="/chancan-shiye" passHref>
                  <motion.span
                    className="hover:text-white text-2xl font-serif animate-glow transition-all duration-500 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    春蚕食叶
                  </motion.span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Header styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }

        @keyframes glow {
          0% { text-shadow: 0 0 5px #f0e68c; }
          50% { text-shadow: 0 0 20px #ffff80; }
          100% { text-shadow: 0 0 5px #f0e68c; }
        }
        .animate-glow {
          animation: glow 2s infinite ease-in-out;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </motion.header>
  );
}
