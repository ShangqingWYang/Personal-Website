'use client';

import { ReactNode, useEffect, useState } from 'react';

export default function SubpageLayout({ children }: { children: ReactNode }) {
  const [petals, setPetals] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    const originalBg = document.body.style.backgroundColor;
    const originalColor = document.body.style.color;
    document.body.style.backgroundColor = '#fffaf5';
    document.body.style.color = '#000';

    // 🌸 Generate floating petals (fully independent animation)
    const generatedPetals = Array.from({ length: 50 }, (_, i) => {
      const size = Math.random() * 18 + 6;
      const left = Math.random() * window.innerWidth;
      const delay = Math.random() * 8;
      const duration = Math.random() * 8 + 10;
      const drift = Math.random() * 60 - 30;
      const hue = Math.random() * 20 + 340; // pink tone variation

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

    return () => {
      document.body.style.backgroundColor = originalBg;
      document.body.style.color = originalColor;
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fffaf5]">
      {/* 🌳 Tree background */}
      <img
        src="/Tree2.png"
        alt="Tree background"
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[45%] max-w-[600px] opacity-25 blur-[0.5px] -z-0 animate-sway-slow pointer-events-none select-none"
      />

      {/* 🌸 Independent petals */}
      <div className="absolute inset-0 z-30 overflow-hidden">{petals}</div>

      {/* 💬 Page content */}
      <div className="relative z-40 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {children}
      </div>

      {/* 🎨 Internal petal + tree animations */}
      <style jsx>{`
        /* 🌸 Individual petals */
        .petal-local {
          position: absolute;
          top: -10%;
          background: radial-gradient(
            circle at 30% 30%,
            hsl(var(--hue), 90%, 88%) 0%,
            hsl(var(--hue), 80%, 85%) 60%,
            hsl(var(--hue), 70%, 92%) 100%
          );
          border-radius: 60% 40% 60% 40%;
          opacity: 0.9;
          animation-name: petalFall, petalSway, petalSpin;
          animation-timing-function: linear, ease-in-out, ease-in-out;
          animation-iteration-count: infinite, infinite, infinite;
        }

        @keyframes petalFall {
          0% {
            transform: translateY(-10%) translateX(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(110vh) translateX(var(--drift)) rotate(360deg);
            opacity: 0.3;
          }
        }

        @keyframes petalSway {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(25px);
          }
        }

        @keyframes petalSpin {
          0% {
            rotate: 0deg;
          }
          50% {
            rotate: 180deg;
          }
          100% {
            rotate: 360deg;
          }
        }

        /* 🌳 Tree swaying */
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
      `}</style>
    </div>
  );
}
