'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const [offset, setOffset] = useState({ x: 0, y: 0 });

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
    <header className="w-full flex items-center justify-between px-10 md:px-20 pt-16 md:pt-20 relative">
      {/* Floating Logo with Fade-in */}
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
          SQWY
        </motion.span>
        <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent opacity-20 animate-[shimmer_3s_infinite]"></span>
      </motion.div>

      {/* Navigation with Fade-in */}
      <motion.nav
        className="flex flex-1 justify-evenly md:justify-between ml-10 text-gray-400 text-lg md:text-xl tracking-widest font-serif"
        style={{ rotateX: -offset.y / 2, rotateY: offset.x / 2 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
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
      </motion.nav>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-[shimmer_3s_infinite] {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </header>
  );
}
