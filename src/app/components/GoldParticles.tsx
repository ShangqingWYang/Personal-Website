'use client';

import React, { useEffect, useRef, useState } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';

export default function GoldParticles() {
  const particlesRef = useRef<any>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse for subtle parallax
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      id="gold-particles"
      init={particlesInit}
      ref={particlesRef}
      className="pointer-events-none fixed inset-0 z-0"
      options={{
        background: { color: 'transparent' },
        fpsLimit: 60,
        interactivity: {
          detectsOn: 'window',
          events: {
            onHover: { enable: false },
            onClick: { enable: false },
          },
        },
        particles: {
          color: { value: '#ffd700' },
          move: {
            enable: true,
            speed: 0.2,
            direction: 'none',
            outModes: { default: 'out' },
            random: true,
            straight: false,
          },
          number: {
            value: 60,
            density: { enable: true, area: 1500 },
          },
          opacity: {
            value: 0.4,
            random: { enable: true, minimumValue: 0.1 },
            anim: { enable: true, speed: 20, opacity_min: 0.1, sync: false },
          },
          shape: { type: 'circle' },
          size: {
            value: { min: 1, max: 3 },
            random: true,
          },
        },
        detectRetina: true,
        // subtle parallax effect
        retina_detect: true,
        responsive: [
          {
            maxWidth: 1500,
            options: {
              particles: { number: { value: 100 } },
            },
          },
        ],
      }}
    />
  );
}
