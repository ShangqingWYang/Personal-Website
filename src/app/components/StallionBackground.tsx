'use client';

import React, { useEffect, useRef, useState } from 'react';

interface StallionBackgroundProps {
  className?: string;
  startX?: number;
  startY?: number;
}

export default function StallionBackground({ className, startX, startY }: StallionBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ✅ Prevent SSR crash by checking for `window`
  const [stallionPos, setStallionPos] = useState(() => ({
    x: typeof window !== 'undefined' ? startX ?? window.innerWidth * 0.75 : 0,
    y: typeof window !== 'undefined' ? startY ?? window.innerHeight / 2 : 0,
  }));

  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return; // ✅ skip on server

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stallionImg = new Image();
    stallionImg.src = '/stallion.png'; // ✅ should be in /public/stallion.png

    const particles: {
      x: number;
      y: number;
      dx: number;
      dy: number;
      size: number;
      color: string;
      alpha: number;
    }[] = [];

    const colors = ['#00FFFF', '#1E90FF', '#7FFFD4', '#87CEFA'];
    const numParticles = 200;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: stallionPos.x,
        y: canvas.height + Math.random() * 200,
        dx: (Math.random() - 0.5) * 1.5,
        dy: -(Math.random() * 2 + 1.5),
        size: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.3,
      });
    }

    let angle = 0;

    // ✅ Dragging handlers
    const handleMouseDown = (e: MouseEvent) => {
      const imgWidth = canvas.width / 3;
      const imgHeight = stallionImg.height * (imgWidth / stallionImg.width);
      if (
        e.clientX >= stallionPos.x - imgWidth / 2 &&
        e.clientX <= stallionPos.x + imgWidth / 2 &&
        e.clientY >= stallionPos.y - imgHeight / 2 &&
        e.clientY <= stallionPos.y + imgHeight / 2
      ) {
        dragging.current = true;
        dragOffset.current = { x: e.clientX - stallionPos.x, y: e.clientY - stallionPos.y };
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (dragging.current) {
        setStallionPos({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        });
      }
    };

    const handleMouseUp = () => {
      dragging.current = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stallion
      const imgWidth = canvas.width / 3;
      const imgHeight = stallionImg.height * (imgWidth / stallionImg.width);
      ctx.save();
      ctx.translate(stallionPos.x, stallionPos.y);
      ctx.rotate(Math.sin(angle / 100) * 0.02);
      ctx.drawImage(stallionImg, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
      ctx.restore();

      angle++;

      // Draw flames/particles
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.003;

        if (p.alpha <= 0 || p.y < -10) {
          p.x = stallionPos.x + (Math.random() - 0.5) * imgWidth;
          p.y = canvas.height + Math.random() * 50;
          p.alpha = Math.random() * 0.6 + 0.3;
        }

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 15;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      requestAnimationFrame(animate);
    };

    stallionImg.onload = () => animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [stallionPos.x, stallionPos.y, startX, startY]);

  return <canvas ref={canvasRef} className={className} />;
}
