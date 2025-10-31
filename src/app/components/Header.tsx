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

  const moreItems = [
    { label: '春蚕食叶', href: '/chancan-shiye' },
    { label: 'Blog', href: '/blog' },
    { label: 'Gallery', href: '/gallery' },
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
      className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-md shadow-lg perspective-1000 z-[9999]"
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      {/* Outer container spans full width */}
      <div className="w-full max-w-7xl mx-auto flex justify-evenly items-center px-6 py-5">
        {/* Logo */}
        <motion.div
          style={{ rotateX: -offset.y, rotateY: offset.x }}
          className="text-gray-300 text-4xl md:text-5xl font-serif tracking-[0.25em] cursor-default relative"
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

        {/* Navigation Links (evenly spaced) */}
        <motion.nav
          className="flex items-center justify-evenly gap-16 text-gray-400 text-lg md:text-xl tracking-[0.25em] font-serif flex-1 max-w-4xl"
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
                <motion.ul
                  className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 bg-gray-900/95 rounded-xl px-6 py-4 shadow-[0_0_30px_rgba(255,255,150,0.4)] text-yellow-400 whitespace-nowrap z-50 border border-yellow-300/20 backdrop-blur-sm"
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  {moreItems.map((item) => (
                    <motion.li
                      key={item.label}
                      className="px-3 py-2 text-lg md:text-xl hover:text-white hover:bg-yellow-400/10 rounded-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      </div>

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
