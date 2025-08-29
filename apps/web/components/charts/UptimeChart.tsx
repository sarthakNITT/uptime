'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UptimeChart = () => {
  const data = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    
    return {
      date: date.toLocaleDateString(),
      uptime: 95 + Math.random() * 5,
      responseTime: 100 + Math.random() * 200,
    };
  });

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="date" 
            stroke="#6d6f79"
            fontSize={12}
            tick={{ fill: '#6d6f79' }}
          />
          <YAxis 
            stroke="#6d6f79"
            fontSize={12}
            tick={{ fill: '#6d6f79' }}
            domain={[90, 100]}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#0d0e17',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#f3f5f6'
            }}
            labelStyle={{ color: '#6d6f79' }}
          />
          <Line 
            type="monotone" 
            dataKey="uptime" 
            stroke="#a8f0ff" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#a8f0ff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UptimeChart;