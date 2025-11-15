/**
 * Utility functions for formatting numbers in the analytics dashboard
 */

/**
 * Formats large numbers with K/M/B suffixes
 * @param {number} num - The number to format
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted number string
 * 
 * @example
 * formatNumber(1234) // "1.2K"
 * formatNumber(1234567) // "1.2M"
 */
export const formatNumber = (num, decimals = 1) => {
  if (num === null || num === undefined) return '0';
  
  const absNum = Math.abs(num);
  
  if (absNum >= 1000000000) {
    return (num / 1000000000).toFixed(decimals) + 'B';
  }
  if (absNum >= 1000000) {
    return (num / 1000000).toFixed(decimals) + 'M';
  }
  if (absNum >= 1000) {
    return (num / 1000).toFixed(decimals) + 'K';
  }
  
  return num.toString();
};

/**
 * Formats number with commas as thousands separators
 * @param {number} num - The number to format
 * @returns {string} Formatted number with commas
 * 
 * @example
 * formatWithCommas(1234567) // "1,234,567"
 */
export const formatWithCommas = (num) => {
  if (num === null || num === undefined) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Formats percentage values
 * @param {number} value - The percentage value
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted percentage string
 * 
 * @example
 * formatPercentage(0.8523) // "85.2%"
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return '0%';
  return (value * 100).toFixed(decimals) + '%';
};

/**
 * Calculates percentage change between two numbers
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {object} Object with change value and percentage
 * 
 * @example
 * calculateChange(150, 100) // { value: 50, percentage: 50 }
 */
export const calculateChange = (current, previous) => {
  if (!previous || previous === 0) {
    return { value: current, percentage: 100 };
  }
  
  const change = current - previous;
  const percentageChange = ((change / previous) * 100).toFixed(1);
  
  return {
    value: change,
    percentage: parseFloat(percentageChange),
    isPositive: change >= 0,
  };
};

/**
 * Formats duration in seconds to human-readable string
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration string
 * 
 * @example
 * formatDuration(125) // "2m 5s"
 */
export const formatDuration = (seconds) => {
  if (seconds < 60) {
    return `${Math.floor(seconds)}s`;
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  if (minutes < 60) {
    return remainingSeconds > 0 
      ? `${minutes}m ${remainingSeconds}s` 
      : `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  return `${hours}h ${remainingMinutes}m`;
};

/**
 * Generates a random number within a range
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
export const randomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
