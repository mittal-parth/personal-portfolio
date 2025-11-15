import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

/**
 * VisitorsOverTimeChart Component
 * Displays visitor trends over time using a line chart
 * 
 * @param {Array} data - Array of objects with date, visitors, and pageViews
 */
const VisitorsOverTimeChart = ({ data = [] }) => {
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="font-poppins text-sm text-white mb-2 font-semibold">
            {label}
          </p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="font-poppins text-xs"
              style={{ color: entry.color }}
            >
              {entry.name}: <span className="font-semibold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom dot for active point
  const CustomDot = (props) => {
    const { cx, cy, stroke } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill={stroke}
        stroke="white"
        strokeWidth={2}
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <defs>
          <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#5ce1e6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#5ce1e6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="pageViewsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#33bbcf" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#33bbcf" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        
        <XAxis
          dataKey="date"
          stroke="#9ca3af"
          style={{ fontSize: '12px', fontFamily: 'Poppins' }}
          tick={{ fill: '#9ca3af' }}
        />
        
        <YAxis
          stroke="#9ca3af"
          style={{ fontSize: '12px', fontFamily: 'Poppins' }}
          tick={{ fill: '#9ca3af' }}
        />
        
        <Tooltip content={<CustomTooltip />} />
        
        <Legend
          wrapperStyle={{
            paddingTop: '20px',
            fontFamily: 'Poppins',
            fontSize: '14px',
          }}
          iconType="line"
        />
        
        <Line
          type="monotone"
          dataKey="visitors"
          stroke="#5ce1e6"
          strokeWidth={3}
          dot={<CustomDot />}
          activeDot={{ r: 6 }}
          name="Visitors"
          fill="url(#visitorsGradient)"
        />
        
        <Line
          type="monotone"
          dataKey="pageViews"
          stroke="#33bbcf"
          strokeWidth={3}
          dot={<CustomDot />}
          activeDot={{ r: 6 }}
          name="Page Views"
          fill="url(#pageViewsGradient)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default VisitorsOverTimeChart;
