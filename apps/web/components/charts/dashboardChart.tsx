"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { time: "10:00", response: 200 },
  { time: "10:05", response: 350 },
  { time: "10:10", response: 180 },
  { time: "10:15", response: 420 },
  { time: "10:20", response: 300 },
  { time: "10:25", response: 250 },
  { time: "10:30", response: 400 },
  { time: "10:35", response: 200 },
  { time: "10:40", response: 350 },
  { time: "10:45", response: 180 },
  { time: "10:50", response: 420 },
  { time: "10:55", response: 300 },
  { time: "11:00", response: 250 },
  { time: "11:05", response: 400 },
  { time: "11:10", response: 200 },
  { time: "11:15", response: 350 },
  { time: "11:20", response: 180 },
  { time: "11:25", response: 420 },
  { time: "11:30", response: 300 },
  { time: "11:35", response: 250 },
  { time: "11:40", response: 400 },
  { time: "11:45", response: 200 },
  { time: "11:50", response: 350 },
  { time: "11:55", response: 180 },
  { time: "12:00", response: 420 },
  { time: "12:05", response: 300 },
  { time: "12:10", response: 250 },
  { time: "12:15", response: 400 },
];

export default function ResponseTimeChart() {
  return (
    <div className="bg-bg-800 rounded-card border border-white/10">
      <div className="p-6 shadow-lg rounded-2xl w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            
            <XAxis 
              dataKey="time" 
              stroke="Grey" 
              strokeWidth={2} 
              tick={{ fill: "grey" }} 
              interval={1}
              type="category"
            />
            <YAxis 
              stroke="Grey" 
              strokeWidth={2} 
              tick={{ fill: "grey" }} 
            />

            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="response"
              stroke="#8884d8"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
