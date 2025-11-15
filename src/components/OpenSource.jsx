import React, { useState, useEffect } from "react";
import { DiGitMerge, DiGitPullRequest } from "react-icons/di";
import { AiFillApi, AiOutlineGithub } from "react-icons/ai";
import { motion } from "framer-motion";
import { fetchContributionsWithRetry, fallbackContributions } from "../lib/helperFunctions";
import { aboutMe } from "../constants";

const Contribution = (props) => {
  return (
    <motion.div
      className="flex flex-col justify-between px-6 py-6 rounded-[20px] max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 transition-colors duration-300 transform border hover:border-transparent dark:border-gray-700 dark:hover:border-transparent"
      whileInView={{ x: [-40, 0], opacity: [0, 1] }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-row">
        <img
          src={props.logoUrl}
          alt={props.organization}
          className="w-[30px] h-[30px] rounded-full mt-2"
        />
        <div className="flex flex-col ml-4">
          <a
            className="font-poppins font-normal text-[16px] text-white my-1 leading-[24px] hover:text-teal-200"
            href={props.link}
            target="_blank"
          >
            {props.title}
          </a>
          <p className="font-poppins italic font-normal text-[14px] text-dimWhite my-1">
            {props.organization}/{props.repo}
          </p>
        </div>
      </div>

      <div
        className={`flex flex-row ${
          props.linesAdded ? "justify-around ml-2" : "ml-10"
        } mt-4`}
      >
        <a
          className="font-poppins font-normal text-[12px] text-dimWhite inline"
          href={props.link}
          target="_blank"
        >
          {props.status === "MERGED" ? (
            <DiGitMerge size="1.5rem" className="text-violet-700 inline" />
          ) : (
            <DiGitPullRequest size="1.5rem" className="text-green-600 inline" />
          )}
          {props.number}
        </a>
        {props.linesAdded ? (
          <p className="font-poppins font-normal text-[14px]">
            <span className="text-green-600">+{props.linesAdded} </span>
            <span className="text-red-700">-{props.linesDeleted}</span>
          </p>
        ) : (
          ""
        )}
      </div>
    </motion.div>
  );
};

const OpenSource = () => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [filters, setFilters] = useState(["All"]);

  useEffect(() => {
    const getContributions = async () => {
      try {
        setLoading(true);
        const data = await fetchContributionsWithRetry();

        if (data === fallbackContributions) {
          setUsingFallback(true);
        }

        setContributions(data);
        setError(null);
      } catch (err) {
        console.error("Error in getContributions:", err);
        setError("Failed to load contributions. Using sample data.");
        setUsingFallback(true);
        setContributions(fallbackContributions);
      } finally {
        setLoading(false);
      }
    };

    getContributions();
  }, []);

  const getStateIcon = (state) => {
    switch (state) {
      case "MERGED":
        return <DiGitMerge className="text-purple-500" />;
      case "CLOSED":
        return <DiGitPullRequest className="text-red-500" />;
      default:
        return <DiGitPullRequest className="text-blue-500" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section id="open-source" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Open Source Contributions</h2>
            <p className="text-gray-400">My contributions to open source projects</p>
          </div>
          {!loading && !usingFallback && (
            <a
              href={`https://github.com/${aboutMe.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors mt-4 md:mt-0"
            >
              <AiOutlineGithub className="mr-2" />
              View on GitHub
            </a>
          )}
        </div>

        {usingFallback && (
          <div className="bg-yellow-900/20 border border-yellow-500 text-yellow-200 p-4 rounded-lg mb-6 flex items-start">
            <svg
              className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="font-medium">Using sample data</p>
              <p className="text-sm text-yellow-300">
                {import.meta.env.VITE_GH_TOKEN
                  ? 'Error fetching live data from GitHub. Showing sample contributions.'
                  : 'Add a GitHub token to see your real contributions.'}
              </p>
            </div>
          </div>
        )}

        {error && !usingFallback && (
          <div className="bg-red-900/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400">Loading contributions...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contributions.map((contribution, index) => (
              <Contribution
                key={index}
                index={index}
                {...contribution}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OpenSource;
