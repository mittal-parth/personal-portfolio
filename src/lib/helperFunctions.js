import axios from "axios";
import { aboutMe, itemsToFetch, includedRepos } from "../constants";

/**
 * Normalizes `includedRepos` entries into objects the GitHub fetch flow expects.
 *
 * Each entry in `repos` may be:
 * - a string `"owner/repo"` — uses the repo slug (part after `/`) as the display name
 * - a tuple `["owner/repo", "Display Name"]` — uses the second value as the display name
 *
 * @param {Array<string | [string, string?]>} repos - Values from `includedRepos` in constants
 * @returns {Array<{ fullName: string, displayName: string }>}
 */
export const normalizeIncludedRepos = (repos) =>
  repos.map((entry) => {
    const fullName = typeof entry === "string" ? entry : entry[0];
    const displayName =
      typeof entry === "string" ? fullName.split("/")[1] : entry[1] ?? fullName.split("/")[1];

    return { fullName, displayName };
  });

export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  const yOffset = -70;
  const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
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

export async function fetchContributions() {
  try {
    const repoConfigs = normalizeIncludedRepos(includedRepos);

    // Use the Netlify function to fetch contributions
    // to avoid exposing the Github token into the client side build output
    const response = await axios.post('/.netlify/functions/fetchContributions', {
      repoConfigs,
      username: aboutMe.githubUsername,
      itemsToFetch,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching contributions from Netlify function: ", error);
    throw error;
  }
}
