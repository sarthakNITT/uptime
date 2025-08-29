'use client';

import { useEffect, useRef, useState } from 'react';
import { useAccessibility } from '../../providers/AccessibilityProvider';

interface HexCell {
  id: string;
  x: number;
  y: number;
  vertices: Array<{ x: number; y: number }>;
  highlighted: boolean;
  highlightIntensity: number;
  row: number;
  col: number;
}

interface PathPoint {
  x: number;
  y: number;
  hexId: string;
}

interface GlowPoint {
  id: number;
  currentIndex: number;
  progress: number;
  speed: number;
  currentX: number;
  currentY: number;
  path: PathPoint[];
  glowRadius: number;
}

export function HeroHexMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const { animationsEnabled, prefersReducedMotion } = useAccessibility();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Set canvas size
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Hex grid parameters - smaller hexes for more detail
    const hexSize = 25;
    const hexWidth = hexSize * 2;
    const hexHeight = Math.sqrt(3) * hexSize;
    const horizontalSpacing = hexWidth * 0.75; // Overlap for touching hexes
    const verticalSpacing = hexHeight;

    const cols = Math.ceil(rect.width / horizontalSpacing) + 6;
    const rows = Math.ceil(rect.height / verticalSpacing) + 6;

    // Generate connected hex grid
    const hexCells: HexCell[] = [];
    const hexMap = new Map<string, HexCell>();

    for (let row = -3; row < rows; row++) {
      for (let col = -3; col < cols; col++) {
        const xOffset = (row % 2) * (horizontalSpacing * 0.5);
        const centerX = col * horizontalSpacing + xOffset;
        const centerY = row * verticalSpacing;
        
        // Calculate hex vertices
        const vertices: Array<{ x: number; y: number }> = [];
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          vertices.push({
            x: centerX + hexSize * Math.cos(angle),
            y: centerY + hexSize * Math.sin(angle),
          });
        }

        const hexId = `${row}-${col}`;
        const hex: HexCell = {
          id: hexId,
          x: centerX,
          y: centerY,
          vertices,
          highlighted: false,
          highlightIntensity: 0,
          row,
          col,
        };

        hexCells.push(hex);
        hexMap.set(hexId, hex);
      }
    }

    // Create connected paths that traverse multiple hexagons
    const createConnectedPath = (startRow: number, startCol: number, pathLength: number): PathPoint[] => {
      const path: PathPoint[] = [];
      let currentRow = startRow;
      let currentCol = startCol;
      const visited = new Set<string>();

      for (let i = 0; i < pathLength; i++) {
        const hexId = `${currentRow}-${currentCol}`;
        const hex = hexMap.get(hexId);
        
        if (hex && !visited.has(hexId)) {
          // Add multiple points along this hex's perimeter
          for (let v = 0; v < 6; v++) {
            const vertex = hex.vertices[v];
            const nextVertex = hex.vertices[(v + 1) % 6];
            
            // Add points along this edge
            for (let t = 0; t < 1; t += 0.2) {
              path.push({
                x: vertex!.x + (nextVertex!.x - vertex!.x) * t,
                y: vertex!.y + (nextVertex!.y - vertex!.y) * t,
                hexId: hex.id,
              });
            }
          }
          visited.add(hexId);
        }

        // Move to adjacent hex (6 possible directions in hex grid)
        const directions = [
          { row: -1, col: 0 },   // North
          { row: -1, col: currentRow % 2 === 0 ? -1 : 1 }, // Northeast
          { row: 1, col: currentRow % 2 === 0 ? -1 : 1 },  // Southeast
          { row: 1, col: 0 },    // South
          { row: 1, col: currentRow % 2 === 0 ? -2 : 0 },  // Southwest
          { row: -1, col: currentRow % 2 === 0 ? -2 : 0 }, // Northwest
        ];

        const direction = directions[Math.floor(Math.random() * directions.length)];
        currentRow += direction!.row;
        currentCol += direction!.col;

        // Keep within bounds
        if (currentRow < -2) currentRow = -2;
        if (currentRow >= rows - 1) currentRow = rows - 2;
        if (currentCol < -2) currentCol = -2;
        if (currentCol >= cols - 1) currentCol = cols - 2;
      }

      return path;
    };

    // Initialize glowing points with connected paths
    const glowPoints: GlowPoint[] = [
      {
        id: 0,
        currentIndex: 0,
        progress: 0,
        speed: 0.8,
        currentX: 0,
        currentY: 0,
        path: createConnectedPath(Math.floor(rows * 0.3), Math.floor(cols * 0.2), 15),
        glowRadius: 20,
      },
      {
        id: 1,
        currentIndex: 0,
        progress: 0.33,
        speed: 0.6,
        currentX: 0,
        currentY: 0,
        path: createConnectedPath(Math.floor(rows * 0.6), Math.floor(cols * 0.7), 18),
        glowRadius: 18,
      },
      {
        id: 2,
        currentIndex: 0,
        progress: 0.66,
        speed: 0.9,
        currentX: 0,
        currentY: 0,
        path: createConnectedPath(Math.floor(rows * 0.4), Math.floor(cols * 0.5), 12),
        glowRadius: 22,
      },
    ];

    // Draw world map silhouette
    const drawWorldMap = (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = 'rgba(30, 50, 80, 0.4)';
      
      // Simplified world map shapes
      const continents = [
        // North America
        { x: rect.width * 0.15, y: rect.height * 0.25, w: rect.width * 0.25, h: rect.height * 0.35 },
        // Europe
        { x: rect.width * 0.45, y: rect.height * 0.2, w: rect.width * 0.15, h: rect.height * 0.25 },
        // Asia
        { x: rect.width * 0.6, y: rect.height * 0.15, w: rect.width * 0.3, h: rect.height * 0.4 },
        // Africa
        { x: rect.width * 0.48, y: rect.height * 0.4, w: rect.width * 0.12, h: rect.height * 0.3 },
        // South America
        { x: rect.width * 0.25, y: rect.height * 0.55, w: rect.width * 0.1, h: rect.height * 0.25 },
        // Australia
        { x: rect.width * 0.75, y: rect.height * 0.65, w: rect.width * 0.08, h: rect.height * 0.1 },
      ];

      continents.forEach(continent => {
        ctx.beginPath();
        ctx.roundRect(continent.x, continent.y, continent.w, continent.h, 8);
        ctx.fill();
      });

      // Add some islands and details
      const islands = [
        { x: rect.width * 0.1, y: rect.height * 0.4, r: 8 },
        { x: rect.width * 0.85, y: rect.height * 0.3, r: 6 },
        { x: rect.width * 0.7, y: rect.height * 0.8, r: 5 },
        { x: rect.width * 0.3, y: rect.height * 0.15, r: 4 },
      ];

      islands.forEach(island => {
        ctx.beginPath();
        ctx.arc(island.x, island.y, island.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Draw hexagon
    const drawHexagon = (ctx: CanvasRenderingContext2D, hex: HexCell) => {
      ctx.beginPath();
      hex.vertices.forEach((vertex, i) => {
        if (i === 0) {
          ctx.moveTo(vertex.x, vertex.y);
        } else {
          ctx.lineTo(vertex.x, vertex.y);
        }
      });
      ctx.closePath();

      // Fill if highlighted
      if (hex.highlighted && hex.highlightIntensity > 0) {
        const alpha = hex.highlightIntensity;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.06 * alpha})`;
        ctx.fill();
        
        // Add ice-blue tint at peak intensity
        if (alpha > 0.7) {
          ctx.fillStyle = `rgba(168, 240, 255, ${0.04 * alpha})`;
          ctx.fill();
        }
      }

      // Stroke
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    // Draw glowing point with trail effect
    const drawGlowPoint = (ctx: CanvasRenderingContext2D, point: GlowPoint) => {
      const { currentX, currentY, glowRadius } = point;

      // Outer glow
      const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, glowRadius);
      gradient.addColorStop(0, 'rgba(168, 240, 255, 0.9)');
      gradient.addColorStop(0.3, 'rgba(168, 240, 255, 0.6)');
      gradient.addColorStop(0.7, 'rgba(168, 240, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(168, 240, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(currentX, currentY, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Inner glow
      ctx.fillStyle = '#a8f0ff';
      ctx.beginPath();
      ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      if (!animationsEnabled || prefersReducedMotion) return;

      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw world map background
      drawWorldMap(ctx);

      // Fade all hex highlights
      hexCells.forEach(hex => {
        if (hex.highlightIntensity > 0) {
          hex.highlightIntensity -= 0.015;
          if (hex.highlightIntensity <= 0) {
            hex.highlighted = false;
            hex.highlightIntensity = 0;
          }
        }
      });

      // Update and draw glowing points
      glowPoints.forEach(point => {
        if (point.path.length === 0) return;

        // Move along path
        point.progress += point.speed;
        
        if (point.progress >= point.path.length) {
          point.progress = 0;
        }

        // Get current position
        const currentIndex = Math.floor(point.progress);
        const nextIndex = (currentIndex + 1) % point.path.length;
        const t = point.progress - currentIndex;

        const current = point.path[currentIndex];
        const next = point.path[nextIndex];

        if (current && next) {
          point.currentX = current.x + (next.x - current.x) * t;
          point.currentY = current.y + (next.y - current.y) * t;

          // Highlight nearby hex cells
          hexCells.forEach(hex => {
            const distance = Math.sqrt(
              Math.pow(hex.x - point.currentX, 2) + 
              Math.pow(hex.y - point.currentY, 2)
            );
            if (distance < 50) {
              hex.highlighted = true;
              hex.highlightIntensity = Math.max(hex.highlightIntensity, 1 - (distance / 50));
            }
          });
        }
      });

      // Draw hex grid
      hexCells.forEach(hex => {
        drawHexagon(ctx, hex);
      });

      // Draw glowing points
      glowPoints.forEach(point => {
        drawGlowPoint(ctx, point);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    if (animationsEnabled && !prefersReducedMotion) {
      animate();
    } else {
      // Static version with world map and hex grid
      ctx.clearRect(0, 0, rect.width, rect.height);
      drawWorldMap(ctx);
      hexCells.forEach(hex => {
        drawHexagon(ctx, hex);
      });
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient, animationsEnabled, prefersReducedMotion]);

  if (!isClient) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-bg-900 to-bg-900" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-900/50 to-bg-900"></div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-900/80 pointer-events-none"></div>
    </div>
  );
}