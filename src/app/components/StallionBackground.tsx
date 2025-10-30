'use client';

import React, { useEffect, useRef, useState } from 'react';

interface StallionBackgroundProps {
  className?: string;
}

export default function StallionBackground({ className }: StallionBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const stallionPos = useRef({ x: 0, y: 0 });

  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ✅ Resize + positioning
    const updateCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      setCanvasSize({ width, height });

      // ✅ Start FLUSH on LEFT edge, vertically centered
      stallionPos.current = {
        x: 0,
        y: height / 2,
      };
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const stallionImg = new Image();
    stallionImg.src = '/Stallion.png'; // Must exist in /public

    // 🔹 Blue glowing particle trail
    const colors = ['#00FFFF', '#1E90FF', '#7FFFD4', '#87CEFA'];
    const numParticles = 200;
    const particles = Array.from({ length: numParticles }, () => ({
      x: stallionPos.current.x + Math.random() * 200,
      y: canvas.height + Math.random() * 200,
      dx: (Math.random() - 0.5) * 1.5,
      dy: -(Math.random() * 2 + 1.5),
      size: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.6 + 0.3,
    }));

    let angle = 0;

    // 🔥 Animation loop
    const animate = () => {
      if (!ctx || !stallionImg.complete) {
        requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imgWidth = canvas.width / 3;
      const imgHeight = stallionImg.height * (imgWidth / stallionImg.width);

      // Clamp within viewport bounds
      stallionPos.current.x = Math.max(imgWidth / 2, Math.min(canvas.width - imgWidth / 2, stallionPos.current.x));
      stallionPos.current.y = Math.max(imgHeight / 2, Math.min(canvas.height - imgHeight / 2, stallionPos.current.y));

      const drawX = stallionPos.current.x - imgWidth / 2;
      const drawY = stallionPos.current.y - imgHeight / 2;

      // 🐎 Draw Stallion
      ctx.save();
      ctx.translate(stallionPos.current.x, stallionPos.current.y);
      ctx.rotate(Math.sin(angle / 100) * 0.02);
      ctx.drawImage(stallionImg, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
      ctx.restore();

      angle++;

      // 🌌 Blue particle glow
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.003;

        if (p.alpha <= 0 || p.y < -10) {
          p.x = stallionPos.current.x + Math.random() * imgWidth;
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

    // 🖱️ Dragging logic
    const handleMouseDown = (e: MouseEvent) => {
      const imgWidth = canvas.width / 3;
      const imgHeight = stallionImg.height * (imgWidth / stallionImg.width);
      const dx = e.clientX - stallionPos.current.x;
      const dy = e.clientY - stallionPos.current.y;

      // Detect if click is inside stallion bounds
      if (Math.abs(dx) < imgWidth / 2 && Math.abs(dy) < imgHeight / 2) {
        dragging.current = true;
        dragOffset.current = { x: dx, y: dy };
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (dragging.current) {
        stallionPos.current.x = e.clientX - dragOffset.current.x;
        stallionPos.current.y = e.clientY - dragOffset.current.y;
      }
    };

    const handleMouseUp = () => {
      dragging.current = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-screen h-screen pointer-events-auto ${className ?? ''}`}
    />
  );
}
