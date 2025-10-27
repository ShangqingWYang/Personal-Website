'use client';
import React, { useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function BackgroundMusic() {
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

  const handlePlay = () => {
    initAudio();
    fadeAudio(true);
    controls.start({ rotate: 360, transition: { repeat: Infinity, ease: 'linear', duration: 10 } });
    setPlaying(true);
  };

  const handleToggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      fadeAudio(false);
      controls.stop();
    } else {
      fadeAudio(true);
      controls.start({ rotate: 360, transition: { repeat: Infinity, ease: 'linear', duration: 10 } });
    }
    setPlaying(!playing);
  };

  return (
    <div
      className="fixed right-10 z-50 flex flex-col items-center space-y-2"
      style={{ top: '30px' }} // moved 50px lower than before
    >

      {/* Vinyl disc button */}
      <motion.button
        onClick={handleToggle}
        animate={controls}
        className={`
          w-32 h-32 rounded-full
          bg-gradient-to-b from-gray-900 to-black
          border-4 border-gray-700
          shadow-2xl
          hover:scale-110 hover:shadow-3xl
          transition-transform duration-300
          relative flex items-center justify-center
        `}
      >
        <div className="w-1/2 h-1/2 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-xl">
          {playing ? '❚❚' : '▶'}
        </div>
        <div className="absolute w-full h-full rounded-full border border-gray-600 opacity-20"></div>
        <div className="absolute w-3/4 h-3/4 rounded-full border border-gray-600 opacity-20"></div>
      </motion.button>
  
      {/* Click to play text */}
      {!playing && (
        <button
        onClick={handlePlay}
        className="
          relative
          px-6 py-3
          text-lg md:text-xl
          font-serif font-bold
          text-transparent
          bg-clip-text
          bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-300
          shadow-[0_0_8px_rgba(255,255,200,0.5)]
          rounded-lg
          border border-yellow-300/50
          transition-all duration-500
          hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,200,0.9)]
          overflow-hidden
          before:absolute before:top-0 before:left-0 before:w-full before:h-full
          before:opacity-0 before:bg-white/20 before:blur-xl before:rounded-lg
          hover:before:opacity-100
          hover:before:animate-[sparkle_1.5s_linear_infinite]
        "
      >
        Best Theme Tune
      </button>
      
      )}
    </div>
  );
}
