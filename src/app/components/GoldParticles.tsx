'use client';

import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

interface GoldParticlesProps {
  className?: string;
}

export default function GoldParticles({ className }: GoldParticlesProps) {
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
          events: {
            onHover: { enable: false },
            onClick: { enable: false },
          },
        },
        particles: {
          color: { value: '#ffd700' },
          move: {
            enable: true,
            speed: 0.5,             // slower for a smooth drift
            direction: 'none',
            outModes: { default: 'out' },
            random: true,           // slight randomness in direction
            straight: false,
          },
          number: {
            value: 80,
            density: { enable: true, area: 1200 },
          },
          opacity: {
            value: 0.5,             // steady opacity
            random: false,          // no random flicker
            animation: { enable: false }, // disable shimmer animation
          },
          shape: { type: 'circle' },
          size: {
            value: { min: 1, max: 3 },
            random: true,
            animation: { enable: false }, // optional: prevent pulsing size
          },
        },
        detectRetina: true,
        responsive: [
          {
            maxWidth: 1500,
            options: {
              particles: { number: { value: 120 } },
            },
          },
        ],
      }}
    />
  );
}
