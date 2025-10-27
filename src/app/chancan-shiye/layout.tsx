'use client';

import { ReactNode, useEffect, useState } from 'react';

export default function SubpageLayout({ children }: { children: ReactNode }) {
  const [petals, setPetals] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    // Backup and change body styles
    const originalBg = document.body.style.backgroundColor;
    const originalColor = document.body.style.color;
    document.body.style.backgroundColor = '#fffaf5';
    document.body.style.color = '#c41f4f';

    // Generate petals
    const generatedPetals = Array.from({ length: 50 }, (_, i) => {
      const size = Math.random() * 16 + 8; // 8px - 24px
      const left = Math.random() * window.innerWidth;
      const delay = Math.random() * 10;
      const duration = Math.random() * 8 + 8;
      const rotate = Math.random() * 360;
      const drift = Math.random() * 40 - 20;
      const scale = Math.random() * 0.6 + 0.7;

      return (
        <div
          key={i}
          className="petal"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}px`,
            animation: `fall ${duration}s ease-in-out ${delay}s infinite, pulse ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 5}s infinite`,
            transform: `rotate(${rotate}deg) scale(${scale})`,
            ['--drift' as any]: `${drift}px`,
            ['--scale' as any]: scale,
            zIndex: Math.random() > 0.5 ? 1 : -1,
          }}
        />
      );
    });

    setPetals(generatedPetals);

    // Cleanup
    return () => {
      document.body.style.backgroundColor = originalBg;
      document.body.style.color = originalColor;
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fffaf5]">
      {/* ✅ Tree background (make sure Tree2.png is in /public) */}
      <img
        src="/Tree2.png"
        alt="Tree"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/5 opacity-50 -z-10 animate-sway-strong pointer-events-none select-none"
      />

      {/* 🌸 Floating petals */}
      <div className="absolute inset-0 z-0 overflow-hidden">{petals}</div>

      {/* 💬 Page content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {children}
      </div>
    </div>
  );
}
