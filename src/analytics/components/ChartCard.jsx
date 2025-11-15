import React from 'react';
import { motion } from 'framer-motion';

/**
 * ChartCard Component
 * Reusable wrapper for chart components with consistent styling
 * 
 * @param {string} title - Chart title
 * @param {string} description - Optional chart description
 * @param {React.ReactNode} children - Chart component to render inside
 * @param {boolean} loading - Loading state
 * @param {string} className - Additional CSS classes
 */
const ChartCard = ({ 
  title, 
  description, 
  children, 
  loading = false,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`
        relative overflow-hidden rounded-xl border border-gray-700/50
        bg-gradient-to-br from-gray-900/50 to-gray-800/30
        backdrop-blur-sm transition-all duration-300
        hover:shadow-lg hover:shadow-teal-500/5
        ${className}
      `}
    >
      {/* Header */}
      <div className="p-6 pb-4 border-b border-gray-700/30">
        <h3 className="font-poppins text-lg font-semibold text-white mb-1">
          {title}
        </h3>
        {description && (
          <p className="font-poppins text-sm text-dimWhite">
            {description}
          </p>
        )}
      </div>

      {/* Chart Content */}
      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-teal-400/30 border-t-teal-400 rounded-full animate-spin" />
              <p className="text-sm text-dimWhite">Loading chart data...</p>
            </div>
          </div>
        ) : (
          children
        )}
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default ChartCard;
