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
  className={`${
    inline
      ? 'relative flex flex-col items-center space-y-2'
      : 'fixed right-10 z-50 flex flex-col items-center space-y-2'
  }`}
  style={inline ? {} : { top: '30px' }}
>


      {/* Vinyl disc button */}
      <motion.button
  onClick={handleToggle}
  animate={controls}
  className={`
    relative flex flex-col items-center justify-center
    w-[14rem] h-[14rem] md:w-[20rem] md:h-[20rem]
    rounded-full
    bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400
    border-[6px] border-yellow-500
    shadow-[0_0_100px_rgba(255,240,160,1)]
    hover:scale-110 hover:shadow-[0_0_140px_rgba(255,255,200,1)]
    transition-transform duration-500
    animate-float-cute
  `}
  style={{ zIndex: 100 }}
>
  {/* ✨ Cute label on top of button */}
  <span
    className="
      absolute top-[20%]
      text-2xl md:text-4xl
      font-bold font-serif
      text-yellow-900
      drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]
      pointer-events-none
      animate-bounce
    "
  >
    Best Theme Tune 🎵
  </span>

  {/* Inner glowing center play/pause */}
  <div
    className="
      w-[50%] h-[50%]
      rounded-full bg-white flex items-center justify-center
      text-yellow-700 font-extrabold text-6xl md:text-8xl
      shadow-[0_0_20px_rgba(255,255,255,0.9)]
    "
  >
    {playing ? '❚❚' : '▶'}
  </div>

  {/* Glowy aura layers */}
  <div className="absolute inset-0 rounded-full bg-yellow-200/30 blur-3xl animate-pulse"></div>
  <div className="absolute w-full h-full rounded-full border-8 border-white/40 opacity-40"></div>
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
        Press
      </button>
      
      )}
    </div>
  );
}
