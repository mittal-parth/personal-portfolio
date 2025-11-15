import React from 'react';
import { motion } from 'framer-motion';
import { 
  AiOutlineEye, 
  AiOutlineProject, 
  AiFillStar, 
  AiOutlineTeam,
  AiOutlineReload 
} from 'react-icons/ai';

// Components
import StatsCard from './components/StatsCard';
import ChartCard from './components/ChartCard';
import VisitorsOverTimeChart from './components/VisitorsOverTimeChart';
import RepoStatsChart from './components/RepoStatsChart';
import TrafficChart from './components/TrafficChart';
import TechnologyUsageChart from './components/TechnologyUsageChart';

// Hooks
import { useAnalyticsData } from './hooks/useAnalyticsData';

// Styles
import styles from '../style';

/**
 * AnalyticsDashboard Component
 * Main dashboard component that displays portfolio analytics
 */
const AnalyticsDashboard = () => {
  const { data, loading, error, refresh } = useAnalyticsData();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (error) {
    return (
      <section className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Failed to load analytics data
          </h2>
          <p className="text-dimWhite mb-6">{error}</p>
          <button
            onClick={refresh}
            className="px-6 py-3 bg-blue-gradient rounded-lg font-poppins font-medium text-primary hover:scale-105 transition-transform"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="analytics" className="bg-primary min-h-screen">
      <div className={`bg-primary ${styles.flexCenter} ${styles.paddingX}`}>
        <div className={`${styles.boxWidth}`}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="py-16"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="font-poppins font-semibold ss:text-[55px] text-[45px] text-white ss:leading-[80px] leading-[80px]">
                    Analytics Dashboard
                  </h1>
                  <p className="font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px] max-w-[600px] mt-2">
                    Live insights about my portfolio performance, visitor engagement, and project statistics.
                  </p>
                </div>
                
                <button
                  onClick={refresh}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 rounded-lg transition-colors disabled:opacity-50"
                >
                  <AiOutlineReload 
                    className={`text-teal-400 ${loading ? 'animate-spin' : ''}`} 
                    size={18} 
                  />
                  <span className="font-poppins text-sm text-white">
                    {loading ? 'Refreshing...' : 'Refresh'}
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Total Visitors"
                  value={data.stats.totalVisitors}
                  icon={AiOutlineEye}
                  color="teal"
                />
                <StatsCard
                  title="Project Views"
                  value={data.stats.projectViews}
                  icon={AiOutlineProject}
                  color="blue"
                />
                <StatsCard
                  title="GitHub Stars"
                  value={data.stats.githubStars}
                  icon={AiFillStar}
                  color="purple"
                />
                <StatsCard
                  title="GitHub Followers"
                  value={data.stats.githubFollowers}
                  icon={AiOutlineTeam}
                  color="green"
                />
              </div>
            </motion.div>

            {/* Charts Section */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Visitors Over Time */}
              <ChartCard
                title="Visitors Over Time"
                description="Daily visitor trends and page views for the last 30 days"
                loading={loading}
              >
                <VisitorsOverTimeChart data={data.charts.visitorsOverTime} />
              </ChartCard>

              {/* Two column layout for medium charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Repository Stats */}
                <ChartCard
                  title="Top Repositories"
                  description="GitHub repository statistics (stars, forks, watchers)"
                  loading={loading}
                >
                  <RepoStatsChart data={data.charts.repoStats} />
                </ChartCard>

                {/* Traffic Sources */}
                <ChartCard
                  title="Traffic Sources"
                  description="Where your visitors are coming from"
                  loading={loading}
                >
                  <TrafficChart data={data.charts.trafficSources} />
                </ChartCard>
              </div>

              {/* Technology Usage */}
              <ChartCard
                title="Technology Stack"
                description="Programming languages and frameworks used across projects"
                loading={loading}
                className="bg-gradient-to-br from-gray-900/60 to-gray-800/40"
              >
                <div className="relative">
                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none rounded-lg"></div>
                  
                  <TechnologyUsageChart 
                    data={data.charts?.techUsage || []} 
                    loading={loading}
                  />
                  
                  {/* Subtle glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-30 pointer-events-none"></div>
                </div>
              </ChartCard>
            </motion.div>

            {/* Footer Note */}
            <motion.div variants={itemVariants} className="mt-16 text-center">
              <p className="font-poppins text-sm text-dimWhite">
                Data refreshed every hour • Last updated: {new Date().toLocaleString()}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;
