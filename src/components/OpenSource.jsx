import React, { useState, useEffect } from "react";
import { DiGitMerge, DiGitPullRequest } from "react-icons/di";
import { AiFillApi } from "react-icons/ai";
import { motion } from "framer-motion";
import { fetchContributionsWithRetry } from "../lib/helperFunctions";

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
  const [filterContribution, setFilterContribution] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [filters, setFilters] = useState(["All"]);

  useEffect(() => {
    const getContributions = async () => {
      const fetchedContributions = await fetchContributionsWithRetry();
      setContributions(fetchedContributions);
      setFilterContribution(fetchedContributions);

      // Filters based on fetched contributions
      if (!fetchedContributions.error) {
        const uniqueRepos = [...new Set(fetchedContributions.map(c => c.repo))];
        setFilters(["All", ...uniqueRepos]);
      }
    };

    getContributions();
  }, []);

  const handleContributionFilter = (item) => {
    setActiveFilter(item);

    setTimeout(() => {
      if (item === "All") {
        setFilterContribution(contributions);
      } else {
        setFilterContribution(
          contributions.filter(
            (contribution) => contribution.repo.toLowerCase() == item.toLowerCase()
          )
        );
      }
    }, 500);
  };

  return (
    <section id="openSource">
      <h1 className="flex-1 font-poppins font-semibold ss:text-[55px] text-[45px] text-white ss:leading-[80px] leading-[80px]">
        Open Source Contributions
      </h1>

      <div className="container px-2 py-5 mx-auto mb-8">
        <div className="flex items-center justify-center">
          {!contributions.error && (
            <div className="flex flex-wrap items-center p-1 border border-blue-gradient dark:border-teal-400 rounded-xl">
              {filters.map(
                (item, index) => (
                  <button
                    key={index}
                    onClick={() => handleContributionFilter(item)}
                    className={`px-2 py-2 text-sm font-medium text-white md:py-3 rounded-xl md:px-6 capitalize transition-colors duration-300 focus:outline-none hover:bg-teal-400 font-poppins ${
                      activeFilter === item ? "bg-teal-400" : ""
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          )}
        </div>
        {contributions.error ? (
          <div className="flex flex-col sm:-mx-4 sm:flex-row">
            <AiFillApi
              size="2rem"
              className="text-white mr-1 hover:text-teal-200"
            />

            <div className="mt-4 sm:mx-4 sm:mt-0">
              <h1 className="text-xl font-semibold font-poppins text-gray-700 md:text-2xl group-hover:text-white text-gradient">
                Something went wrong loading this section.
              </h1>
              <p className="font-poppins font-normal text-dimWhite mt-3">
                Please wait a few seconds and try reloading the page.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 justify-center gap-8 mt-8 md:mt-16 md:grid-cols-3 sm:grid-cols-2">
            {filterContribution.map((contribution, index) => (
              <Contribution
                key={contribution.id}
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
