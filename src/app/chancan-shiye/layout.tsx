'use client';

import { ReactNode, useEffect, useState } from 'react';

export default function SubpageLayout({ children }: { children: ReactNode }) {
  const [petals, setPetals] = useState<React.ReactElement[]>([]);


  useEffect(() => {
    const originalBg = document.body.style.backgroundColor;
    const originalColor = document.body.style.color;
    document.body.style.backgroundColor = '#fffaf5';
    document.body.style.color = '#c41f4f';

    const generatedPetals = Array.from({ length: 50 }, (_, i) => {
      const size = Math.random() * 16 + 8; // 8px - 24px
      // choose a horizontal start across full viewport (pixels so it's not affected by centering)
      const left = Math.random() * window.innerWidth;
      const delay = Math.random() * 10;
      const duration = Math.random() * 8 + 8;
      const rotate = Math.random() * 360;
      const drift = Math.random() * 40 - 20; // horizontal drift
      const scale = Math.random() * 0.6 + 0.7; // depth

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
            // CSS custom properties for the animation to read
            // (JS will stringify these; CSS uses var(--drift) and var(--scale))
            // we keep them as strings so the global CSS can use them
            ['--drift' as any]: `${drift}px`,
            ['--scale' as any]: scale,
            zIndex: Math.random() > 0.5 ? 1 : -1,
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
      {/* Tree2 in center */}
      <img
        src="/Tree2.png"
        alt="Tree2"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/5 opacity-50 -z-10 animate-sway-strong"
      />

      {/* Cherry blossom petals occupying full-screen container */}
      <div className="absolute top-0 left-0 w-screen h-screen z-0">{petals}</div>

      {/* Page content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {children}
      </div>

      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-10%) translateX(0) rotate(0deg) scale(var(--scale));
            opacity: 1;
          }
          25% {
            transform: translateY(25vh) translateX(var(--drift)) rotate(90deg) scale(calc(var(--scale) * 1.05));
            opacity: 0.9;
          }
          50% {
            transform: translateY(50vh) translateX(calc(-1 * var(--drift))) rotate(180deg) scale(calc(var(--scale) * 1.1));
            opacity: 0.8;
          }
          75% {
            transform: translateY(75vh) translateX(var(--drift)) rotate(270deg) scale(calc(var(--scale) * 1.05));
            opacity: 0.6;
          }
          100% {
            transform: translateY(110vh) translateX(0) rotate(360deg) scale(var(--scale));
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(var(--scale));
          }
          50% {
            transform: scale(calc(var(--scale) * 1.25));
          }
        }

        .petal {
          position: absolute;
          top: -10%;
          background: radial-gradient(
            circle at 30% 30%,
            #ffc6d1 0%,
            #ffdce2 60%,
            #fff0f5 100%
          );
          border-radius: 60% 40% 60% 40%;
          pointer-events: none;
          will-change: transform, opacity;
        }

        @keyframes swayStrong {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
          75% { transform: rotate(-3deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-sway-strong {
          animation: swayStrong 6s ease-in-out infinite;
          transform-origin: bottom center;
        }
      `}</style>
    </div>
  );
}
