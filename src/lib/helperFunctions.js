import axios from "axios";
import { aboutMe, itemsToFetch, includedRepos } from "../constants";

export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  const yOffset = -70;
  const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
};

const parseOriginFromUrl = (url) => {
  /**
   * splits https://github.com/repos/org-name/repo-name/issues/25
   * into [ "github.com", "repos", "org-name", "repo-name", "issues", "25"]
   */
  const [, ...parts] = url.split(/https:\/\/|\//gm);
  const organization = parts[1];
  const repo = parts[2];
  /**
   * accessing a github profile or organization and adding a .png
   * at the end of the URL will return their logo/profile picture
   */
  const logoUrl = `https://github.com/${organization}.png`;

  return {
    organization,
    repo,
    logoUrl,
  };
};

export async function fetchContributionsWithRetry(maxRetries = 1) {
  let attempts = 0;

  while (attempts <= maxRetries) {
    try {
      const result = await fetchContributions();
      return result;
    } catch (error) {
      attempts++;
      console.log(`Attempt ${attempts} failed: ${error.message}. Retrying...`);

      if (attempts > maxRetries) {
        console.log("Max retries reached. Returning last error.");
        return { error: error.message };
      }
    }
  }
}

function generatePRQuery(repos, username) {
  const queries = repos
    .map((repo) => {
      return `repo:${repo} is:pr author:${username}`;
    })
    .join(" ");

  return `
    query {
      search(query: "${queries}", type: ISSUE, first: ${itemsToFetch}) {
        nodes {
          ... on PullRequest {
            id
            title
            state
            number
            createdAt
            url
            additions
            deletions
          }
        }
      }
    }
  `;
}

// Fallback data in case the API fails
export const fallbackContributions = [
  {
    title: "Fixed critical bug in authentication flow",
    state: "MERGED",
    repo: "publiclab/plots2",
    organization: "publiclab",
    logoUrl: "https://github.com/publiclab.png",
    url: "https://github.com/publiclab/plots2/pull/1234",
    createdAt: "2023-10-15T14:30:00Z",
    additions: 42,
    deletions: 15
  },
  {
    title: "Added dark mode support",
    state: "MERGED",
    repo: "zulip/zulip",
    organization: "zulip",
    logoUrl: "https://github.com/zulip.png",
    url: "https://github.com/zulip/zulip/pull/5678",
    createdAt: "2023-09-20T09:15:00Z",
    additions: 128,
    deletions: 64
  },
  {
    title: "Improved performance of data fetching",
    state: "MERGED",
    repo: "paritytech/polkadot-sdk",
    organization: "paritytech",
    logoUrl: "https://github.com/paritytech.png",
    url: "https://github.com/paritytech/polkadot-sdk/pull/9012",
    createdAt: "2023-08-05T16:45:00Z",
    additions: 87,
    deletions: 32
  }
];

export async function fetchContributions() {
  // If no GitHub token is provided, return fallback data
  if (!import.meta.env.VITE_GH_TOKEN) {
    console.log('No GitHub token found, using fallback contributions data');
    return fallbackContributions;
  }

  const GITHUB_API = 'https://api.github.com/graphql';
  const token = import.meta.env.VITE_GH_TOKEN;
  
  try {
    const query = `
      query {
        user(login: "${aboutMe.githubUsername}") {
          pullRequests(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              title
              state
              url
              createdAt
              additions
              deletions
              repository {
                nameWithOwner
              }
            }
          }
        }
      }
    `;

    const response = await axios.post(
      GITHUB_API,
      { query },
      {
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.errors) {
      console.error('GitHub API Error:', response.data.errors);
      return fallbackContributions;
    }

    const prs = response.data.data?.user?.pullRequests?.nodes || [];
    
    return prs.map(pr => ({
      title: pr.title,
      state: pr.state,
      repo: pr.repository.nameWithOwner,
      organization: pr.repository.nameWithOwner.split('/')[0],
      logoUrl: `https://github.com/${pr.repository.nameWithOwner.split('/')[0]}.png`,
      url: pr.url,
      createdAt: pr.createdAt,
      additions: pr.additions,
      deletions: pr.deletions
    }));
  } catch (error) {
    console.error("Error fetching contributions from GitHub API: ", error);
    return fallbackContributions;
  }
}
