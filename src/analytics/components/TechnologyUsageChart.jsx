import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

/**
 * TechnologyUsageChart Component
 * Displays technology/language usage as a horizontal bar chart
 * 
 * @param {Array} data - Array of objects with name and count
 */
const TechnologyUsageChart = ({ data = [], loading = false }) => {
  // Handle empty or loading data case
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[350px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500 mx-auto mb-3"></div>
          <p className="font-poppins text-dimWhite">
            Analyzing your code...
          </p>
          <p className="font-poppins text-xs text-gray-500 mt-1">
            This may take a moment while we scan your repositories
          </p>
        </div>
      </div>
    );
  }
  
  // Handle empty data case after loading
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[350px] p-4 text-center">
        <div className="bg-gray-800/50 rounded-full p-3 mb-3">
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h4 className="font-poppins text-white font-medium mb-1">No Code Data Found</h4>
        <p className="font-poppins text-sm text-gray-400 max-w-md">
          We couldn't analyze any code in your repositories. Make sure your repositories contain code files.
        </p>
      </div>
    );
  }

  // Format bytes to a human-readable format
  const formatBytes = (bytes, decimals = 1) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  // Enhanced custom tooltip with more detailed information
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload; // Get full data object
      const techColor = getTechColor(label);
      const bytes = data.rawBytes || 0;
      const percentage = data.percentage ? `${Math.round(data.percentage * 10) / 10}%` : 'N/A';
      
      return (
        <div className="bg-gray-900/98 backdrop-blur-md border border-gray-600/50 rounded-xl p-4 shadow-2xl shadow-black/30 max-w-xs">
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm"
              style={{ backgroundColor: techColor }}
            />
            <p className="font-poppins text-sm font-semibold text-white truncate">
              {label}
            </p>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Usage:</span>
              <span className="text-sm font-medium text-white">
                {data.count} {data.count === 1 ? 'project' : 'projects'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Code Size:</span>
              <span className="text-sm font-mono text-white">
                {formatBytes(bytes)}
              </span>
            </div>
            
            {data.percentage && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Of Total Code:</span>
                <span className="text-sm font-medium text-white">
                  {percentage}
                </span>
              </div>
            )}
          </div>
          
          {/* Subtle arrow */}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-2 bg-gray-900 rotate-45 border-r border-b border-gray-600/50"></div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Enhanced technology color mapping with vibrant, professional colors
  const getTechColor = (techName) => {
    const colorMap = {
      JavaScript: '#f7df1e',
      TypeScript: '#3178c6', 
      Python: '#306998',
      React: '#61dafb',
      'Node.js': '#68a063',
      Java: '#f89820',
      'C++': '#00599c',
      C: '#a8b9cc',
      HTML: '#e34c26',
      CSS: '#264de4',
      Go: '#00add8',
      Rust: '#ce422b',
      PHP: '#8892bf',
      Ruby: '#cc342d',
      Swift: '#fa7343',
      Kotlin: '#a97bff',
      Vue: '#4fc08d',
      Angular: '#dd1b16',
      Svelte: '#ff3e00',
      Dart: '#0175c2',
      Shell: '#89e051',
      Dockerfile: '#0db7ed',
      SCSS: '#cf649a',
      Less: '#1d365d',
      Solidity: '#627eea',
      Jupyter: '#f37626',
      Markdown: '#083fa1',
    };
    
    return colorMap[techName] || '#5ce1e6';
  };

  // Process and enhance the data with colors and additional metadata
  const dataWithColors = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    
    // Ensure we have valid data with rawBytes
    const validData = data.filter(item => item && item.name && (item.rawBytes || item.rawBytes === 0));
    
    if (validData.length === 0) {
      return [];
    }
    
    // Calculate total bytes from valid data
    const totalBytes = validData.reduce((sum, item) => sum + (item.rawBytes || 0), 0) || 1;
    
    return validData.map((item) => {
      const bytes = item.rawBytes || 0;
      const percentage = totalBytes > 0 ? (bytes / totalBytes) * 100 : 0;
      
      return {
        ...item,
        name: item.name,
        count: Math.max(1, Math.ceil(Math.log10(bytes + 1) * 3)), // Ensure at least 1 for display
        rawBytes: bytes,
        percentage: percentage,
        fill: getTechColor(item.name),
        formattedBytes: formatBytes(bytes)
      };
    }).sort((a, b) => b.rawBytes - a.rawBytes);
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={dataWithColors}
        margin={{ top: 30, right: 40, left: 30, bottom: 90 }}
        barCategoryGap="20%"
      >
        {/* Enhanced grid with subtle styling */}
        <CartesianGrid 
          strokeDasharray="2 4" 
          stroke="#374151" 
          opacity={0.2}
          horizontal={true}
          vertical={false}
        />
        
        {/* Styled X-Axis */}
        <XAxis
          dataKey="name"
          stroke="#9ca3af"
          style={{ 
            fontSize: '12px', 
            fontFamily: 'Poppins',
            fontWeight: '500'
          }}
          tick={{ fill: '#e5e7eb', fontSize: 11 }}
          angle={-35}
          textAnchor="end"
          height={90}
          interval={0}
          axisLine={{ stroke: '#4b5563', strokeWidth: 1 }}
          tickLine={{ stroke: '#6b7280', strokeWidth: 1 }}
        />
        
        {/* Styled Y-Axis */}
        <YAxis
          stroke="#9ca3af"
          style={{ 
            fontSize: '12px', 
            fontFamily: 'Poppins',
            fontWeight: '400'
          }}
          tick={{ fill: '#d1d5db', fontSize: 11 }}
          axisLine={{ stroke: '#4b5563', strokeWidth: 1 }}
          tickLine={{ stroke: '#6b7280', strokeWidth: 1 }}
          domain={[0, 'dataMax + 1']}
        />
        
        {/* Enhanced Tooltip */}
        <Tooltip 
          content={<CustomTooltip />} 
          cursor={{ 
            fill: 'rgba(92, 225, 230, 0.08)',
            stroke: 'rgba(92, 225, 230, 0.3)',
            strokeWidth: 1
          }} 
        />
        
        {/* Enhanced Bar with individual colors */}
        <Bar
          dataKey="count"
          radius={[6, 6, 0, 0]}
          maxBarSize={60}
        >
          {dataWithColors.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.fill}
              stroke={entry.fill}
              strokeWidth={0}
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TechnologyUsageChart;
