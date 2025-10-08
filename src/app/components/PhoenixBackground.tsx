'use client';

import React, { useEffect, useRef, useState } from 'react';

interface PhoenixBackgroundProps {
  className?: string;
  startX?: number; // initial X in pixels
  startY?: number; // initial Y in pixels
}

export default function PhoenixBackground({ className, startX, startY }: PhoenixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize phoenixPos using startX/startY or default to center
  const [phoenixPos, setPhoenixPos] = useState({
    x: startX ?? window.innerWidth / 4, // default left quarter
    y: startY ?? window.innerHeight / 2, // vertically centered
  });

  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const phoenixImg = new Image();
    phoenixImg.src = '/phoenix.png';

    const particles: {
      x: number;
      y: number;
      dx: number;
      dy: number;
      size: number;
      color: string;
      alpha: number;
    }[] = [];
    const colors = ['#FF4500', '#FF8C00', '#FFD700', '#FF6347'];
    const numParticles = 200;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: phoenixPos.x,
        y: canvas.height + Math.random() * 200,
        dx: (Math.random() - 0.5) * 1.5,
        dy: - (Math.random() * 2 + 1.5),
        size: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.3,
      });
    }

    let angle = 0;

    // Dragging handlers
    const handleMouseDown = (e: MouseEvent) => {
      const imgWidth = canvas.width / 3;
      const imgHeight = phoenixImg.height * (imgWidth / phoenixImg.width);
      if (
        e.clientX >= phoenixPos.x - imgWidth / 2 &&
        e.clientX <= phoenixPos.x + imgWidth / 2 &&
        e.clientY >= phoenixPos.y - imgHeight / 2 &&
        e.clientY <= phoenixPos.y + imgHeight / 2
      ) {
        dragging.current = true;
        dragOffset.current = { x: e.clientX - phoenixPos.x, y: e.clientY - phoenixPos.y };
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (dragging.current) {
        setPhoenixPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
      }
    };

    const handleMouseUp = () => {
      dragging.current = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw phoenix
      const imgWidth = canvas.width / 3;
      const imgHeight = phoenixImg.height * (imgWidth / phoenixImg.width);
      ctx.save();
      ctx.translate(phoenixPos.x, phoenixPos.y);
      ctx.rotate(Math.sin(angle / 100) * 0.03);
      ctx.drawImage(phoenixImg, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
      ctx.restore();

      angle++;

      // Draw rising flames
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.003;

        if (p.alpha <= 0 || p.y < -10) {
          p.x = phoenixPos.x + (Math.random() - 0.5) * imgWidth;
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

    phoenixImg.onload = () => animate();

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
  }, [phoenixPos, startX, startY]);

  return <canvas ref={canvasRef} className={className} />;
}
