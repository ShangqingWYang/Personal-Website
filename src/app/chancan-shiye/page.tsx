'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '@fontsource/zhi-mang-xing/400.css';
import '@fontsource/noto-serif-sc/400.css';
import '@fontsource/noto-serif-sc/700.css';

export default function ChancanShiyePage() {
  const [petals, setPetals] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    const generatedPetals = Array.from({ length: 40 }, (_, i) => {
      const size = Math.random() * 18 + 6;
      const left = Math.random() * window.innerWidth;
      const delay = Math.random() * 8;
      const duration = Math.random() * 10 + 10;
      const drift = Math.random() * 80 - 40;
      const hue = Math.random() * 20 + 340; // pink hues

      return (
        <div
          key={i}
          className="petal-local"
          style={{
            width: `${size}px`,
            height: `${size * 0.8}px`,
            left: `${left}px`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            ['--drift' as any]: `${drift}px`,
            ['--hue' as any]: hue,
          }}
        />
      );
    });
    setPetals(generatedPetals);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden bg-transparent">
      {/* 🌳 Tree background */}
      <div
        className="fixed inset-0 -z-20 bg-center bg-contain bg-no-repeat animate-sway-slow pointer-events-none select-none opacity-25"
        style={{ backgroundImage: "url('/Tree2.png')" }}
      />

      {/* 🌸 Floating petals */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {petals}
      </div>

      {/* ✨ Title */}
      <motion.h1
        className="text-9xl md:text-[11rem] font-[Zhi_Mang_Xing] text-black"
      >
        春蚕食叶
      </motion.h1>

      {/* 🖋️ Poem text */}
      <motion.div
        className="text-2xl md:text-3xl font-calligraphy leading-[2.2] text-black space-y-4 ink-text glow-text max-w-4xl relative z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
      >
        <p>窗沿独坐，月色铺开如一池冷水，</p> <p>河声在夜里缓缓退潮，仿佛把旧日温柔一寸寸带走。</p> <p>霜意悄然入骨，割裂心底最细的丝线，</p> <p>原来越是深情，越像把灵魂交给命运拆解。</p> <p>若我随风坠入黑暗，回望那扇亮着灯的窗，</p> <p>是否仍会看见你——张开双臂，像从前那样呼我名字？</p> <p>可时间总是比爱更锋利，</p> <p>把誓言削得薄如薄冰，一触便碎。</p> <p>月光无言，只将思念照得太清，</p> <p>河水也不回应，只把回声卷入更深的夜色。</p> <p>回首多少好梦，都像落花坠入流年，</p> <p>越是放不下，越在心上留下齿痕。</p> <p>缘深不等于圆满，情重不等于能留住谁，</p> <p>人世得失如潮涨潮落，不过轮回的一瞬。</p> <p>春风吹皱了眉间，而我依旧在月下等候，</p> <p>你却在时光另一端，早已离我远去。</p> <p>夜色沉沉，灯影摇晃得像迟疑的心跳，</p> <p>若爱只剩回忆，握得再紧也只是空掌。</p> <p>原来情不过是人间的债，偿尽便各归尘埃，</p> <p>却仍留一丝温度，在肩头缱绻不散。</p> <p>当深情化雪，终会落成尘土，</p> <p>再多未说出口的心事，也只随水随风漂走。</p> <p>世事本来虚妄，真相多是一声无言的叹，</p> <p>到最后才明白——爱得越深，失去越沉。</p> <p>人心为何苦？不过因执念太重，放不下的人太真，</p> <p>命数与情意常常相背，未必走得向同一方天。</p> <p>若能放手便能醒，但能放手的人又有几分？</p>
      </motion.div>

      {/* 🎨 Styles */}
      <style jsx>{`
        .petal-local {
          position: absolute;
          top: -10%;
          background: radial-gradient(
            circle at 30% 30%,
            hsl(var(--hue), 90%, 88%) 0%,
            hsl(var(--hue), 80%, 84%) 60%,
            hsl(var(--hue), 70%, 94%) 100%
          );
          border-radius: 60% 40% 60% 40%;
          opacity: 0.9;
          animation: petalFloat var(--duration, 12s) linear infinite;
        }

        @keyframes petalFloat {
          0% {
            transform: translateY(-10%) translateX(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) translateX(calc(var(--drift) * 1px)) rotate(180deg);
            opacity: 0.9;
          }
          100% {
            transform: translateY(110vh) translateX(0) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes sway-slow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(1deg);
          }
        }
        .animate-sway-slow {
          animation: sway-slow 6s ease-in-out infinite;
        }

        .ink-text {
          color: rgba(0, 0, 0, 0.92);
          text-shadow:
            0 0 1px rgba(0, 0, 0, 0.4),
            0 0 2px rgba(0, 0, 0, 0.25),
            1px 1px 1px rgba(0, 0, 0, 0.15);
          filter: contrast(1.05) brightness(0.95);
          animation: inkPulse 10s ease-in-out infinite;
        }

        .glow-text {
          text-shadow:
            0 0 4px rgba(255, 240, 180, 0.4),
            0 0 10px rgba(255, 220, 120, 0.25),
            0 0 20px rgba(255, 220, 120, 0.15);
          animation: glowPulse 8s ease-in-out infinite;
        }

        @keyframes inkPulse {
          0%, 100% { filter: brightness(0.95) blur(0.2px); }
          50% { filter: brightness(1.05) blur(0.5px); }
        }

        @keyframes glowPulse {
          0%, 100% {
            text-shadow:
              0 0 4px rgba(255, 240, 180, 0.4),
              0 0 10px rgba(255, 220, 120, 0.25),
              0 0 20px rgba(255, 220, 120, 0.15);
          }
          50% {
            text-shadow:
              0 0 6px rgba(255, 240, 200, 0.6),
              0 0 14px rgba(255, 230, 140, 0.4),
              0 0 25px rgba(255, 230, 140, 0.2);
          }
        }
      `}</style>

      <style jsx global>{`
        .font-calligraphy {
          font-family: 'Zhi Mang Xing', cursive;
          font-weight: 400;
          letter-spacing: 0.03em;
        }
      `}</style>
    </div>
  );
}
