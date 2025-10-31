'use client';

import './globals.css';
import { useEffect, useState } from 'react';
import '@fontsource/inter';
import '@fontsource/playfair-display/700.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import BackgroundMusic from './components/BackgroundMusic';
import Header from './components/Header';
import Footer from './components/Footer';
import { usePathname } from 'next/navigation';

const GoldParticles = dynamic(() => import('./components/GoldParticles'), { ssr: false });
const PhoenixBackground = dynamic(() => import('./components/PhoenixBackground'), { ssr: false });
const StallionBackground = dynamic(() => import('./components/StallionBackground'), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [windowHeight, setWindowHeight] = useState(0);
  const pathname = usePathname();
  const isSubPage = pathname === '/chancan-shiye';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setWindowHeight(window.innerHeight);

    const handleMove = (e: MouseEvent) => {
      document.body.style.setProperty('--x', `${e.clientX}px`);
      document.body.style.setProperty('--y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <html lang="en">
      <body className="relative text-gray-100">
        {/* Background Layers */}
        {!isSubPage && windowHeight > 0 && (
          <>
            <PhoenixBackground className="fixed top-1/2 right-0 -translate-y-1/2 -z-20 pointer-events-none" />
            <StallionBackground className="fixed inset-0 -z-20 pointer-events-none" />
            <GoldParticles className="fixed inset-0 -z-10 pointer-events-none" />
          </>
        )}

        {/* ✅ Header moved OUTSIDE main wrapper */}
        {!isSubPage && <Header />}

        {/* Main content wrapper */}
        <div className="relative z-0 flex flex-col items-center justify-center">
          {children}
          {!isSubPage && <Footer />}
        </div>
      </body>
    </html>
  );
}
