'use client';
import React, { useEffect, useRef } from 'react';

type Dot = {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  alpha: number;
};

export const HeroHexMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // device pixel ratio handling
    const dpr = Math.max(window.devicePixelRatio || 1, 1);

    let width = window.innerWidth;
    let height = window.innerHeight;

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      // set the canvas size in device pixels
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      // and size in CSS pixels
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // reset transforms and scale to DPR
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();

    // create dots with explicit typing
    const DOTS: Dot[] = [];
    const DOT_COUNT = 80;
    for (let i = 0; i < DOT_COUNT; i++) {
      DOTS.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 2 + Math.random() * 2,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        alpha: 0.6 + Math.random() * 0.4,
      });
    }

    let animationId: number | null = null;

    function draw() {
      // clear using CSS pixel dimensions (ctx is scaled by DPR)
      ctx!.clearRect(0, 0, width, height);

      // fill background
      ctx!.save();
      ctx!.globalAlpha = 1;
      ctx!.fillStyle = '#000';
      ctx!.fillRect(0, 0, width, height);
      ctx!.restore();

      for (const dot of DOTS) {
        ctx!.save();
        ctx!.globalAlpha = dot.alpha;
        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, dot.r, 0, 2 * Math.PI);
        ctx!.fillStyle = '#13edf2';
        ctx!.shadowColor = '#13edf2';
        ctx!.shadowBlur = 12;
        ctx!.fill();
        ctx!.restore();

        dot.x += dot.dx;
        dot.y += dot.dy;

        // bounce on bounds (use width/height in CSS pixels)
        if (dot.x < 0) {
          dot.x = 0;
          dot.dx *= -1;
        } else if (dot.x > width) {
          dot.x = width;
          dot.dx *= -1;
        }
        if (dot.y < 0) {
          dot.y = 0;
          dot.dy *= -1;
        } else if (dot.y > height) {
          dot.y = height;
          dot.dy *= -1;
        }
      }

      animationId = window.requestAnimationFrame(draw);
    }

    // start animation
    animationId = window.requestAnimationFrame(draw);

    // resize handler (keeps dots roughly in view)
    const onResize = () => {
      // capture previous CSS size ratio to adjust dot coords proportionally
      const prevWidth = width;
      const prevHeight = height;

      setCanvasSize();

      // adjust dot positions proportionally to new size
      const wRatio = width / Math.max(prevWidth, 1);
      const hRatio = height / Math.max(prevHeight, 1);
      for (const dot of DOTS) {
        dot.x *= wRatio;
        dot.y *= hRatio;
      }
    };

    window.addEventListener('resize', onResize, { passive: true });

    // cleanup
    return () => {
      if (animationId !== null) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default HeroHexMap;
