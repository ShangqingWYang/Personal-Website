'use client';

import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine, Container } from 'tsparticles-engine';

interface SwirlParticlesProps {
  className?: string;
}

export default function SwirlParticles({ className }: SwirlParticlesProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // optional
  }, []);

  return (
    <Particles
      id="swirl-particles"
      className={className}
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: false, // contained in footer
        background: { color: 'transparent' },
        fpsLimit: 60,
        particles: {
          number: { value: 25, density: { enable: true, area: 800 } },
          color: { value: ['#d4af37', '#c0c0c0'] }, // gold & silver
          shape: { type: 'circle' },
          opacity: { value: 0.5, random: { enable: true, minimumValue: 0.2 }, animation: { enable: true, speed: 0.3 } },
          size: { value: { min: 5, max: 15 }, animation: { enable: true, speed: 1.5 } },
          move: {
            enable: true,
            speed: 0.8,
            direction: 'top-right',
            random: true,
            straight: false,
            outModes: { default: 'out' },
            attract: { enable: true, rotateX: 300, rotateY: 600 },
          },
          wobble: {
            enable: true,
            distance: 20,
            speed: 2,
          },
          tilt: { enable: true, value: 30, direction: 'clockwise', animation: { enable: true, speed: 10 } },
        },
        interactivity: {
          detectsOn: 'canvas',
          events: { onHover: { enable: false }, onClick: { enable: false } },
        },
        detectRetina: true,
      }}
    />
  );
}
