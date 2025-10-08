'use client';

import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

interface GoldParticlesProps {
  className?: string;
}

export default function GoldParticles({ className }: GoldParticlesProps) {
  // Initialize the particles engine
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="gold-particles"
      init={particlesInit}
      className={className}
      options={{
        background: { color: 'transparent' },
        fpsLimit: 60,
        interactivity: {
          detectsOn: 'window',
          events: { onHover: { enable: false }, onClick: { enable: false } },
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
          number: { value: 60, density: { enable: true, area: 1500 } },
          opacity: {
            value: 0.4,
            random: { enable: true, minimumValue: 0.1 },
            animation: { enable: true, speed: 20, minimumValue: 0.1, sync: false },
          },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 3 }, random: true },
        },
        detectRetina: true,
        responsive: [
          {
            maxWidth: 1500,
            options: { particles: { number: { value: 100 } } },
          },
        ],
      }}
    />
  );
}
