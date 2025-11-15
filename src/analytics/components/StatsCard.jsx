import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { formatNumber, formatWithCommas } from '../utils/formatNumbers';

/**
 * StatsCard Component
 * Displays a single statistic with animated counter and optional icon
 * 
 * @param {string} title - Card title
 * @param {number} value - Numeric value to display
 * @param {React.Component} icon - Icon component
 * @param {number} previousValue - Previous value for trend calculation (optional)
 * @param {string} trend - Trend indicator (up/down/neutral)
 * @param {string} trendValue - Trend percentage value (optional, calculated if not provided)
 * @param {string} color - Color theme for the card
 */
const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  previousValue = null,
  trend = 'neutral',
  trendValue = '',
  color = 'teal',
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  // Calculate trend if previousValue is provided
  const calculateTrend = () => {
    if (previousValue === null || previousValue === undefined) {
      return { trend: 'neutral', trendValue: '', percentage: 0 };
    }

    const change = value - previousValue;
    const percentage = previousValue === 0 ? 100 : ((change / previousValue) * 100).toFixed(1);
    const trendType = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral';

    return {
      trend: trendType,
      trendValue: `${Math.abs(percentage)}%`,
      percentage: Math.abs(percentage),
    };
  };

  const trendData = calculateTrend();
  const displayTrend = trend !== 'neutral' ? trend : trendData.trend;
  const displayTrendValue = trendValue || trendData.trendValue;

  // Animated counter effect
  useEffect(() => {
    if (value === 0) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  // Color variants
  const colorVariants = {
    teal: {
      bg: 'bg-gradient-to-br from-teal-500/10 to-cyan-500/10',
      border: 'border-teal-500/20',
      icon: 'text-teal-400',
      text: 'text-teal-400',
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-500/10 to-indigo-500/10',
      border: 'border-blue-500/20',
      icon: 'text-blue-400',
      text: 'text-blue-400',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
      border: 'border-purple-500/20',
      icon: 'text-purple-400',
      text: 'text-purple-400',
    },
    green: {
      bg: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
      border: 'border-green-500/20',
      icon: 'text-green-400',
      text: 'text-green-400',
    },
  };

  const colors = colorVariants[color] || colorVariants.teal;

  // Trend indicator
  const getTrendIcon = () => {
    if (displayTrend === 'up') return '↑';
    if (displayTrend === 'down') return '↓';
    return '−';
  };

  const getTrendColor = () => {
    if (displayTrend === 'up') return 'text-green-400';
    if (displayTrend === 'down') return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        relative overflow-hidden rounded-xl border ${colors.border} ${colors.bg}
        backdrop-blur-sm transition-all duration-300
        hover:shadow-lg hover:shadow-${color}-500/10 hover:scale-[1.02]
      `}
    >
      <div className="p-6">
        {/* Header with icon */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-poppins text-sm font-medium text-dimWhite uppercase tracking-wider">
            {title}
          </h3>
          {Icon && (
            <div className={`${colors.icon} opacity-80`}>
              {React.createElement(Icon, { size: 24 })}
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-3">
          <p className={`font-poppins text-4xl font-bold ${colors.text}`}>
            {formatWithCommas(displayValue)}
          </p>
        </div>

        {/* Trend indicator */}
        {displayTrendValue && (
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${getTrendColor()}`}>
              {getTrendIcon()} {displayTrendValue}
            </span>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        )}
      </div>

      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default StatsCard;
