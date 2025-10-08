'use client';

import './globals.css';
import { useEffect } from 'react';
import '@fontsource/inter';
import '@fontsource/playfair-display/700.css';
import GoldParticles from './components/GoldParticles';
import BackgroundMusic from './components/BackgroundMusic';
import Header from './components/Header';
import Footer from './components/Footer';
import PhoenixBackground from './components/PhoenixBackground'; 
import StallionBackground from './components/StallionBackground'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
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

    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <html lang="en">
      <body className="relative text-gray-100">
        {/* Phoenix spawns on left side */}
        <PhoenixBackground startX={835} startY={window.innerHeight / 2} className="fixed inset-0 -z-20 pointer-events-none" />

        {/* Stallion spawns on right side */}
        <StallionBackground startX={170} startY={window.innerHeight / 2} className="fixed inset-0 -z-20 pointer-events-none" />

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
