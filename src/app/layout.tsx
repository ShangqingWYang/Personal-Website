'use client';

import './globals.css';
import { useEffect, useState } from 'react';
import '@fontsource/inter';
import '@fontsource/playfair-display/700.css';
import dynamic from 'next/dynamic';
import BackgroundMusic from './components/BackgroundMusic';
import Header from './components/Header';
import Footer from './components/Footer';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// ✅ Dynamically import particle + background components to disable SSR
const GoldParticles = dynamic(() => import('./components/GoldParticles'), { ssr: false });
const PhoenixBackground = dynamic(() => import('./components/PhoenixBackground'), { ssr: false });
const StallionBackground = dynamic(() => import('./components/StallionBackground'), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    // ✅ Run only in browser
    if (typeof window === 'undefined') return;

    setWindowHeight(window.innerHeight);

    const handleMove = (e: MouseEvent) => {
      document.body.style.setProperty('--x', `${e.clientX}px`);
      document.body.style.setProperty('--y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMove);

    const elements = document.querySelectorAll('.scroll-fade');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('show');
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('mousemove', handleMove);
      observer.disconnect();
    };
  }, []);

  return (
    <html lang="en">
      <body className="relative text-gray-100">
        {/* Phoenix spawns on left side */}
        {windowHeight > 0 && (
          <PhoenixBackground
            startX={835}
            startY={windowHeight / 1.4}
            className="fixed inset-0 -z-20 pointer-events-none"
          />
        )}

        {/* Stallion spawns on right side */}
        {windowHeight > 0 && (
          <StallionBackground
            startX={170}
            startY={windowHeight / 3}
            className="fixed inset-0 -z-20 pointer-events-none"
          />
        )}

        {/* Gold particle background */}
        <GoldParticles className="fixed inset-0 -z-10 pointer-events-none" />

        {/* Background music */}
        <BackgroundMusic />

        {/* Main content */}
        <div className="relative z-10">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
