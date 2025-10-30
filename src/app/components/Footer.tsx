'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  angle: number;
  speed: number;
  color: string;
  orbitX: number;
  orbitY: number;
  orbitRadius: number;
}

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || 200;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const numParticles = 50;
    const width = canvas.width;
    const height = canvas.height;

    const particles: Particle[] = Array.from({ length: numParticles }, () => {
      const orbitX = Math.random() * width;
      const orbitY = Math.random() * height;
      const orbitRadius = 30 + Math.random() * 70;
      const angle = Math.random() * Math.PI * 2;
      return {
        x: orbitX + Math.cos(angle) * orbitRadius,
        y: orbitY + Math.sin(angle) * orbitRadius,
        radius: 2 + Math.random() * 3,
        angle,
        speed: 0.002 + Math.random() * 0.004,
        color: Math.random() < 0.5 ? '#d4af37' : '#c0c0c0',
        orbitX,
        orbitY,
        orbitRadius,
      };
    });

    particlesRef.current = particles;

    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.angle += p.speed;
        p.x = p.orbitX + Math.cos(p.angle) * p.orbitRadius;
        p.y = p.orbitY + Math.sin(p.angle) * p.orbitRadius;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <footer className="relative w-full py-16 px-8 md:px-16 text-gray-200 overflow-hidden bg-black">
      {/* Canvas for swirling nodes */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />

      {/* Footer content */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full">
        <p className="text-lg md:text-xl font-serif tracking-widest text-gray-300">
          &copy; {new Date().getFullYear()} Website built from scratch by SY. All rights reserved.
        </p>
        <div className="flex justify-around w-full md:w-1/3 mt-6 md:mt-0">
          <a href="https://github.com/ShangqingWYang" className="hover:text-yellow-400 transition-all text-lg font-medium">
            GitHub
          </a>
          <a href="https://linkedin.com/in/yourusername" className="hover:text-yellow-400 transition-all text-lg font-medium">
            LinkedIn
          </a>
          <a href="#contact" className="hover:text-yellow-400 transition-all text-lg font-medium">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
