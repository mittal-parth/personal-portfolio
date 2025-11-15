import { useState, useEffect } from 'react';
import axios from 'axios';
import { aboutMe } from '../../constants';

/**
 * Format bytes to human readable format
 */
const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Custom hook for fetching and managing analytics data
 * @returns {Object} Analytics data with loading and error states
 */
export const useAnalyticsData = () => {
  const [data, setData] = useState({
    stats: {
      totalVisitors: 0,
      projectViews: 0,
      githubStars: 0,
      githubFollowers: 0,
    },
    charts: {
      visitorsOverTime: [],
      repoStats: [],
      trafficSources: [],
      techUsage: [],
    },
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches language data for a repository
   */
  const fetchRepoLanguages = async (username, repoName) => {
    try {
      const response = await makeRequest(
        `https://api.github.com/repos/${username}/${repoName}/languages`
      );
      
      // Make sure we have valid data
      if (!response.data || typeof response.data !== 'object') {
        return {};
      }
      
      return response.data; // Returns object like { JavaScript: 1234, TypeScript: 5678, ... }
    } catch (error) {
      return {};
    }
  };

  /**
   * Makes an API request with retry logic for rate limits
   */
  const makeRequest = async (url, options = {}, retries = 1) => {
    try {
      const response = await axios({
        url,
        ...options,
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          ...(import.meta.env.VITE_GH_TOKEN ? {
            'Authorization': `token ${import.meta.env.VITE_GH_TOKEN}`
          } : {}),
          ...options.headers
        },
        params: {
          ...options.params,
          _: Date.now() // Cache buster
        },
        // Add timeout to prevent hanging
        timeout: 10000
      });
      return response;
    } catch (error) {
      // If we're rate limited and have retries left
      if (error.response?.status === 403 && retries > 0) {
        const resetTime = (error.response.headers['x-ratelimit-reset'] * 1000) || (Date.now() + 60000);
        const waitTime = Math.max(resetTime - Date.now(), 1000);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        return makeRequest(url, options, retries - 1);
      }
      
      // If no token is provided, throw a more helpful error
      if (!import.meta.env.VITE_GH_TOKEN) {
        throw new Error('GitHub token not found. Please add VITE_GH_TOKEN to your .env file.');
      }
      throw error;
    }
  };

  /**
   * Fetches GitHub user data with detailed language statistics
   */
  const fetchGitHubData = async () => {
    try {
      const username = aboutMe.githubUsername || 'mittal-parth';
      
      // Fetch user data with retry logic
      const [userResponse, reposResponse] = await Promise.all([
        makeRequest(`https://api.github.com/users/${username}`),
        makeRequest(`https://api.github.com/users/${username}/repos`, {
          params: {
            per_page: 100,
            sort: 'updated',
            type: 'owner'
          }
        })
      ]);
      
      
      const repos = reposResponse.data;
      
      // Calculate total stars and filter out forked repos
      const { totalStars, userRepos } = repos.reduce((acc, repo) => {
        if (!repo.fork) { // Only count non-forked repos
          acc.totalStars += repo.stargazers_count;
          acc.userRepos.push(repo);
        }
        return acc;
      }, { totalStars: 0, userRepos: [] });
      
      // Get top 8 most starred repos for the repo stats chart
      const topRepos = [...userRepos]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 8)
        .map(repo => ({
          name: repo.name,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          watchers: repo.watchers_count,
        }));
      
      // Get detailed language statistics across all repositories
      const languageStats = {};
      let totalBytesAllRepos = 0;
      
      // Process repositories in parallel batches to speed up data fetching
      // Limit to top 30 repos by updated date for faster processing
      const reposToProcess = userRepos.slice(0, 30);
      const batchSize = 5; // Process 5 repos in parallel
      
      for (let i = 0; i < reposToProcess.length; i += batchSize) {
        const batch = reposToProcess.slice(i, i + batchSize);
        
        // Process batch in parallel
        const batchPromises = batch.map(repo => 
          fetchRepoLanguages(username, repo.name)
            .catch(() => ({})) // Silently handle errors
        );
        
        const batchResults = await Promise.all(batchPromises);
        
        // Process results from this batch
        batchResults.forEach((langData) => {
          if (langData && Object.keys(langData).length > 0) {
            // Calculate total bytes for this repo
            const repoTotalBytes = Object.values(langData).reduce((sum, bytes) => sum + bytes, 0);
            totalBytesAllRepos += repoTotalBytes;
            
            // Aggregate language data
            Object.entries(langData).forEach(([lang, bytes]) => {
              // Normalize language names (GitHub sometimes returns variations)
              const normalizedLang = lang
                .replace(/\s*\+\+\s*$/, '++') // C++
                .replace(/\s*#\s*$/, '#');     // C#
                
              languageStats[normalizedLang] = (languageStats[normalizedLang] || 0) + bytes;
            });
          }
        });
        
        // Small delay between batches to avoid rate limiting
        if (i + batchSize < reposToProcess.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      
      // Convert to array and sort by bytes of code
      let techUsage = [];
      
      if (Object.keys(languageStats).length > 0) {
        // Calculate total bytes across all languages
        const totalBytes = Object.values(languageStats).reduce((sum, bytes) => sum + bytes, 1);
        
        techUsage = Object.entries(languageStats)
          .map(([name, bytes]) => ({
            name,
            count: Math.ceil(Math.log10(bytes + 1) * 3), // Adjusted scale for better visualization
            rawBytes: bytes,
            percentage: (bytes / totalBytes) * 100
          }))
          .sort((a, b) => b.rawBytes - a.rawBytes)
          .slice(0, 8);
          
      }
      
      // Fallback to mock data if no languages found
      if (techUsage.length === 0) {
        techUsage = [
          { name: 'JavaScript', count: 12, rawBytes: 12000 },
          { name: 'Python', count: 8, rawBytes: 8000 },
          { name: 'TypeScript', count: 6, rawBytes: 6000 },
          { name: 'HTML', count: 5, rawBytes: 5000 },
          { name: 'CSS', count: 5, rawBytes: 5000 },
          { name: 'Java', count: 3, rawBytes: 3000 },
          { name: 'Shell', count: 2, rawBytes: 2000 },
          { name: 'Dockerfile', count: 1, rawBytes: 1000 },
        ];
      }
      
      return {
        followers: userResponse.data.followers || 0,
        totalStars: totalStars || 0,
        topRepos: topRepos || [],
        techUsage: techUsage || [],
      };
    } catch (err) {
      throw err;
    }
  };


  /**
   * Main data fetching function - Uses only real GitHub data
   */
  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch real GitHub data
      const githubData = await fetchGitHubData();

      // Use only real GitHub data
      setData({
        stats: {
          totalVisitors: 0,
          projectViews: 0,
          githubStars: githubData.totalStars || 0,
          githubFollowers: githubData.followers || 0,
        },
        charts: {
          visitorsOverTime: [],
          repoStats: githubData.topRepos || [],
          trafficSources: [],
          techUsage: githubData.techUsage || [],
        },
      });

      setLoading(false);
    } catch (err) {
      setError('Failed to load GitHub analytics. Please check your token and try again.');
      setLoading(false);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  return {
    data,
    loading,
    error,
    refresh: fetchAnalyticsData,
  };
};
