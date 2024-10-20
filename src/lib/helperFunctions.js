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
      return result; // If successful, return the result
    } catch (error) {
      attempts++;
      console.log(`Attempt ${attempts} failed: ${error.message}. Retrying...`);

      if (attempts > maxRetries) {
        console.log("Max retries reached. Returning last error.");
        // Optionally, return a formatted error message or throw
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

export async function fetchContributions() {
  const query = generatePRQuery(includedRepos, aboutMe.githubUsername);

  try {
    const response = await axios.post(
      "https://api.github.com/graphql",
      { query },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const pullRequests = response.data.data.search.nodes;
    return pullRequests.map((item) => {
      const { organization, repo, logoUrl } = parseOriginFromUrl(item.url);
      return {
        id: item.id,
        organization,
        logoUrl,
        repo,
        status: item.state,
        title: item.title,
        link: item.url,
        number: item.number,
        date: new Date(item.createdAt).toLocaleDateString(),
        linesAdded: item.additions,
        linesDeleted: item.deletions,
      };
    });
  } catch (error) {
    console.error("Error Fetching data from Github's GraphQL API: ", error);
    throw error;
  }
}
