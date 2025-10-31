'use client';

import React from 'react';
import { motion } from 'framer-motion';
import '@fontsource/zhi-mang-xing/400.css'; // Brush-style Chinese calligraphy font
import '@fontsource/noto-serif-sc/400.css';
import '@fontsource/noto-serif-sc/700.css';

export default function ChancanShiyePage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden bg-transparent">
      {/* 🌳 Background tree image placeholder (handled by layout, ensures layering) */}
      <div
        className="fixed inset-0 -z-20 bg-center bg-contain bg-no-repeat animate-sway-slow pointer-events-none select-none opacity-0"
        style={{ backgroundImage: "url('/Tree2.png')" }}
      />

      {/* ✨ Title */}
      <motion.h1
        className="text-6xl md:text-8xl font-calligraphy mb-8 text-black ink-text glow-text tracking-[0.05em]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, type: 'spring', stiffness: 150 }}
      >
        春蚕食叶
      </motion.h1>

      {/* 🖋️ Poem text */}
      <motion.div
        className="text-2xl md:text-3xl font-calligraphy leading-[2.2] text-black space-y-4 ink-text glow-text max-w-4xl"
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

      {/* 🎨 Calligraphy glow + ink effect */}
      <style jsx>{`
        /* Subtle ink brush texture */
        .ink-text {
          color: rgba(0, 0, 0, 0.92);
          text-shadow:
            0 0 1px rgba(0, 0, 0, 0.4),
            0 0 2px rgba(0, 0, 0, 0.25),
            1px 1px 1px rgba(0, 0, 0, 0.15);
          filter: contrast(1.05) brightness(0.95);
          animation: inkPulse 10s ease-in-out infinite;
        }

        /* Soft glow to simulate golden ink reflecting light */
        .glow-text {
          text-shadow:
            0 0 4px rgba(255, 240, 180, 0.4),
            0 0 10px rgba(255, 220, 120, 0.25),
            0 0 20px rgba(255, 220, 120, 0.15);
          animation: glowPulse 8s ease-in-out infinite;
        }

        @keyframes inkPulse {
          0%, 100% {
            filter: brightness(0.95) blur(0.2px);
          }
          50% {
            filter: brightness(1.05) blur(0.5px);
          }
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

      {/* 🖋️ Global font declaration */}
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
