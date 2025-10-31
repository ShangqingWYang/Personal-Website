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
        <p>微风拂过桃花岸，红影点点如梦卷，</p>
        <p>夜露轻润丝竹声，半帘幽香入我眠。</p>
        <p>细雨浸透青衫袖，浅笑低吟未敢言，</p>
        <p>春水涟漪映朱颜，情意绵绵似锦延。</p>
        <p>月光如练洒庭院，轻叩花影舞翩跹，</p>
        <p>魂梦随风飘百里，红尘深处皆柔软。</p>
        <p>若问此心何所寄，唯愿花间共幽欢，</p>
        <p>轻纱薄雾托香气，蝶舞蜂喧绕指间。</p>
        <p>流云掠影拂发梢，缠绵此景不忍散，</p>
        <p>宛若人间桃源里，春色柔情共婵娟。</p>
        <p>琼楼玉宇隐烟霞，玉露花魂共徘徊，</p>
        <p>香径幽幽承夜雨，暗香浮动入衣怀。</p>
        <p>轻舟荡漾柳影下，水光潋滟映红苔，</p>
        <p>心随幽梦穿青冥，指尖流光似蝶来。</p>
        <p>锦瑟无端怨流年，朱颜暗香共月斜，</p>
        <p>芳菲落尽春未老，幽情难寄水云涯。</p>
        <p>长夜微凉灯影摇，轻叹低吟思若海，</p>
        <p>红尘滚滚人间梦，唯愿此景化烟霭。</p>
        <p>柔风拂面香盈袖，纤手轻触心已开，</p>
        <p>千般缱绻情未了，花间醉舞到天明。</p>
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
