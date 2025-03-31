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

export async function fetchContributions() {
  try {
    // Use the Netlify function to fetch contributions
    // to avoid exposing the Github token into the client side build output
    const response = await axios.post('/.netlify/functions/fetchContributions', {
      repos: includedRepos,
      username: aboutMe.githubUsername
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching contributions from Netlify function: ", error);
    throw error;
  }
}
