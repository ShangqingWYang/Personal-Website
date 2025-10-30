'use client';
import React, { useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface BackgroundMusicProps {
  inline?: boolean;
}

export default function BackgroundMusic({ inline = false }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const controls = useAnimation();

  const initAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio('/audio/Background1.mp3');
      audio.loop = true;
      audio.volume = 0;
      audioRef.current = audio;
    }
  };

  const fadeAudio = (fadeIn: boolean, duration = 3000) => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const stepTime = 50;
    const steps = duration / stepTime;
    const volStep = 0.3 / steps;

    if (fadeIn) {
      audio.volume = 0;
      audio.play().catch(() => console.log('Autoplay blocked'));
      let i = 0;
      const fade = setInterval(() => {
        if (i >= steps) clearInterval(fade);
        else {
          audio.volume = Math.min(audio.volume + volStep, 0.3);
          i++;
        }
      }, stepTime);
    } else {
      let i = 0;
      const fade = setInterval(() => {
        if (i >= steps) {
          audio.pause();
          clearInterval(fade);
        } else {
          audio.volume = Math.max(audio.volume - volStep, 0);
          i++;
        }
      }, stepTime);
    }
  };

  const handleToggle = () => {
    initAudio(); // ✅ make sure audio is ready
    const audio = audioRef.current;
    if (!audio) return;

    if (!playing) {
      fadeAudio(true);
      controls.start({
        rotate: 360,
        transition: { repeat: Infinity, ease: 'linear', duration: 10 },
      });
    } else {
      fadeAudio(false);
      controls.stop();
    }

    setPlaying(!playing);
  };

  return (
    <div
      className={`${
        inline
          ? 'relative flex flex-col items-center space-y-2'
          : 'fixed right-10 z-50 flex flex-col items-center space-y-2'
      }`}
      style={inline ? {} : { top: '30px' }}
    >
      {/* 🎵 Giant glowing vinyl button */}
      <motion.button
        onClick={handleToggle} // ✅ single handler
        animate={controls}
        className={`
          relative flex flex-col items-center justify-center
          w-[4.5rem] h-[4.5rem] md:w-[25rem] md:h-[25rem]
          rounded-full
          border-[8px]
          transition-all duration-700 ease-in-out
          animate-float-cute
          ${playing
            ? 'bg-gradient-to-b from-sky-300 via-sky-400 to-blue-500 border-blue-600 shadow-[0_0_160px_rgba(150,200,255,1)]'
            : 'bg-gradient-to-b from-white via-gray-100 to-gray-300 border-gray-400 shadow-[0_0_80px_rgba(255,255,255,0.8)]'}
        `}
        
        style={{ zIndex: 100 }}
      >
    
        {/* ✨ Huge label ON the button */}
        {!playing && (
          <span
            className="
              absolute top-[20%]
              text-2xl md:text-2xl font-playfair text-yellow-900
              drop-shadow-[0_0_25px_rgba(255,0,255,0.9)]
              pointer-events-none text-center tracking-wide animate-bounce
            "
          >
            PRESS 🎵
          </span>
        )}

        {/* Inner glowing center play/pause */}
        <div
          className="
            w-[55%] h-[55%]
            rounded-full bg-white flex items-center justify-center
            text-yellow-700 font-extrabold text-7xl md:text-9xl
            shadow-[0_0_30px_rgba(255,255,255,0.9)]
          "
        >
          {playing ? '❚❚' : '▶'}
        </div>

        {/* Glowy aura layers */}
        <div className="absolute inset-0 rounded-full bg-yellow-200/40 blur-3xl animate-pulse"></div>
        <div className="absolute w-full h-full rounded-full border-[10px] border-white/40 opacity-40"></div>
      </motion.button>
    </div>
  );
}
