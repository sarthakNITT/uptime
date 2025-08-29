'use client';

interface UptimeSparklineProps {
  data: number[];
  width?: number;
  height?: number;
}

export function UptimeSparkline({ data, width = 60, height = 20 }: UptimeSparklineProps) {
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - (value / 100) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="opacity-70">
      <polyline
        points={points}
        fill="none"
        stroke="#a8f0ff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - (value / 100) * height;
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="1"
            fill={value === 0 ? "#ef4444" : "#a8f0ff"}
          />
        );
      })}
    </svg>
  );
}