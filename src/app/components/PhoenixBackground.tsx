'use client';

import React, { useEffect, useRef, useState } from 'react';

interface PhoenixBackgroundProps {
  className?: string;
}

export default function PhoenixBackground({ className }: PhoenixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phoenixImgRef = useRef<HTMLImageElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const phoenixPos = useRef({ x: 0, y: 0 });

  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      setCanvasSize({ width, height });

      // ✅ Start phoenix touching the right edge, vertically centered
      phoenixPos.current = {
        x: width, // right edge
        y: height / 2,
      };
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const phoenixImg = new Image();
    phoenixImg.src = '/Phoenix.png'; // must live in /public
    phoenixImgRef.current = phoenixImg;

    // Fire particle setup
    const colors = ['#FF4500', '#FF8C00', '#FFD700', '#FF6347'];
    const particles = Array.from({ length: 200 }, () => ({
      x: phoenixPos.current.x - Math.random() * 200,
      y: canvas.height + Math.random() * 200,
      dx: (Math.random() - 0.5) * 1.5,
      dy: -(Math.random() * 2 + 1.5),
      size: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.6 + 0.3,
    }));

    let angle = 0;

    const animate = () => {
      if (!ctx || !phoenixImg.complete) {
        requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imgWidth = canvas.width / 3;
      const imgHeight = phoenixImg.height * (imgWidth / phoenixImg.width);

      // Clamp phoenix position so it can’t leave the canvas entirely
      phoenixPos.current.x = Math.max(imgWidth / 2, Math.min(canvas.width - imgWidth / 2, phoenixPos.current.x));
      phoenixPos.current.y = Math.max(imgHeight / 2, Math.min(canvas.height - imgHeight / 2, phoenixPos.current.y));

      const drawX = phoenixPos.current.x - imgWidth / 2;
      const drawY = phoenixPos.current.y - imgHeight / 2;

      ctx.save();
      ctx.translate(phoenixPos.current.x, phoenixPos.current.y);
      ctx.rotate(Math.sin(angle / 100) * 0.03);
      ctx.drawImage(phoenixImg, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
      ctx.restore();

      angle++;

      // Flame particles
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.003;

        if (p.alpha <= 0 || p.y < -10) {
          p.x = phoenixPos.current.x - Math.random() * imgWidth;
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

    // ✅ Dragging logic
    const handleMouseDown = (e: MouseEvent) => {
      const imgWidth = canvas.width / 3;
      const imgHeight = phoenixImg.height * (imgWidth / phoenixImg.width);
      const dx = e.clientX - phoenixPos.current.x;
      const dy = e.clientY - phoenixPos.current.y;

      // detect click within phoenix image bounds
      if (Math.abs(dx) < imgWidth / 2 && Math.abs(dy) < imgHeight / 2) {
        dragging.current = true;
        dragOffset.current = { x: dx, y: dy };
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (dragging.current) {
        phoenixPos.current.x = e.clientX - dragOffset.current.x;
        phoenixPos.current.y = e.clientY - dragOffset.current.y;
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
