'use client';

import { useEffect, useRef } from 'react';

export default function WorldMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawHexagon = (x: number, y: number, radius: number, isHighlighted: boolean = false) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const hexX = x + radius * Math.cos(angle);
        const hexY = y + radius * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(hexX, hexY);
        } else {
          ctx.lineTo(hexX, hexY);
        }
      }
      ctx.closePath();
      
      if (isHighlighted) {
        // Draw white highlight
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 2;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.shadowBlur = 10;
      } else {
        // Draw grey lines
        ctx.strokeStyle = 'rgba(156, 163, 175, 0.3)';
        ctx.lineWidth = 1;
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw hexagon grid across entire canvas
      const hexSize = 60; // Larger hexagons
      const hexWidth = hexSize * Math.sqrt(3);
      const hexHeight = hexSize * 2;
      const rows = Math.ceil(canvas.height / (hexHeight * 0.75)) + 2;
      const cols = Math.ceil(canvas.width / hexWidth) + 2;
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const hexX = col * hexWidth + (row % 2) * (hexWidth / 2) - hexWidth;
          const hexY = row * (hexHeight * 0.75) - hexHeight;
          
          // Create moving highlight effect - multiple waves
          const wave1X = Math.sin(time * 0.008 + row * 0.3) * canvas.width * 0.4;
          const wave1Y = Math.sin(time * 0.006 + col * 0.2) * canvas.height * 0.3;
          const highlight1X = canvas.width * 0.2 + wave1X;
          const highlight1Y = canvas.height * 0.3 + wave1Y;
          
          const wave2X = Math.cos(time * 0.01 + row * 0.25) * canvas.width * 0.3;
          const wave2Y = Math.cos(time * 0.007 + col * 0.18) * canvas.height * 0.25;
          const highlight2X = canvas.width * 0.7 + wave2X;
          const highlight2Y = canvas.height * 0.6 + wave2Y;
          
          const distToHighlight1 = Math.sqrt((hexX - highlight1X) ** 2 + (hexY - highlight1Y) ** 2);
          const distToHighlight2 = Math.sqrt((hexX - highlight2X) ** 2 + (hexY - highlight2Y) ** 2);
          
          const isHighlighted = distToHighlight1 < 100 || distToHighlight2 < 80;
          
          drawHexagon(hexX, hexY, hexSize * 0.8, isHighlighted);
        }
      }
      
      // Add flowing light streaks
      for (let i = 0; i < 4; i++) {
        const angle = time * 0.003 + i * Math.PI * 2 / 4;
        const radius = Math.min(canvas.width, canvas.height) * 0.5;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const streakX = centerX + Math.cos(angle) * radius;
        const streakY = centerY + Math.sin(angle) * radius;
        
        const gradient = ctx.createRadialGradient(streakX, streakY, 0, streakX, streakY, 80);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(streakX - 80, streakY - 80, 160, 160);
      }
      
      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-50"
      style={{ background: 'transparent' }}
    />
  );
}