import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

/**
 * RepoStatsChart Component
 * Displays GitHub repository statistics (stars, forks, watchers)
 * 
 * @param {Array} data - Array of repo objects with name, stars, forks, watchers
 */
const RepoStatsChart = ({ data = [] }) => {
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="font-poppins text-sm text-white mb-2 font-semibold">
            {label}
          </p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <p className="font-poppins text-xs text-dimWhite">
                {entry.name}: <span className="font-semibold text-white">{entry.value}</span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Truncate long repo names
  const truncateName = (name) => {
    return name.length > 15 ? `${name.substring(0, 12)}...` : name;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
      >
        <defs>
          <linearGradient id="starsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5ce1e6" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#5ce1e6" stopOpacity={0.3} />
          </linearGradient>
          <linearGradient id="forksGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#33bbcf" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#33bbcf" stopOpacity={0.3} />
          </linearGradient>
          <linearGradient id="watchersGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7de7eb" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#7de7eb" stopOpacity={0.3} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        
        <XAxis
          dataKey="name"
          stroke="#9ca3af"
          angle={-45}
          textAnchor="end"
          height={80}
          interval={0}
          style={{ fontSize: '11px', fontFamily: 'Poppins' }}
          tick={{ fill: '#9ca3af' }}
          tickFormatter={truncateName}
        />
        
        <YAxis
          stroke="#9ca3af"
          style={{ fontSize: '12px', fontFamily: 'Poppins' }}
          tick={{ fill: '#9ca3af' }}
        />
        
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(92, 225, 230, 0.1)' }} />
        
        <Legend
          wrapperStyle={{
            paddingTop: '10px',
            fontFamily: 'Poppins',
            fontSize: '14px',
            color: '#ffffff',
          }}
          textColor="#ffffff"
        />
        
        <Bar
          dataKey="stars"
          fill="url(#starsGradient)"
          radius={[6, 6, 0, 0]}
          name="Stars"
        />
        
        <Bar
          dataKey="forks"
          fill="url(#forksGradient)"
          radius={[6, 6, 0, 0]}
          name="Forks"
        />
        
        <Bar
          dataKey="watchers"
          fill="url(#watchersGradient)"
          radius={[6, 6, 0, 0]}
          name="Watchers"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RepoStatsChart;
