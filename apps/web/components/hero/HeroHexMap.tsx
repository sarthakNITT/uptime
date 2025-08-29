'use client';
import { useEffect, useRef } from 'react';

export function HeroHexMap() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth, height = window.innerHeight;
    canvas.width = width; canvas.height = height;
    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });
    const DOTS = [];
    for (let i = 0; i < 80; i++) {
      DOTS.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 2 + Math.random() * 2,
        dx: (Math.random()-0.5)*0.5,
        dy: (Math.random()-0.5)*0.5,
        alpha: 0.6 + Math.random()*0.4,
      });
    }
    function draw() {
      ctx.clearRect(0,0,width,height);
      ctx.fillStyle = "#000"; ctx.fillRect(0,0,width,height);
      for (let dot of DOTS) {
        ctx.save();
        ctx.globalAlpha = dot.alpha;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#13edf2";
        ctx.shadowColor = "#13edf2";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
        dot.x += dot.dx;
        dot.y += dot.dy;
        if (dot.x < 0 || dot.x > width) dot.dx *= -1;
        if (dot.y < 0 || dot.y > height) dot.dy *= -1;
      }
      requestAnimationFrame(draw);
    }
    draw();
    return () => window.removeEventListener('resize', ()=>{});
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
