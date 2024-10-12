import axios from "axios";
import { aboutMe, itemsToFetch } from "../src/constants";

export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  const yOffset = -70; // Adjust this value based on your header height
  const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
};

const parseOriginFromUrl = (url) => {
  /**
   * splits https://api.github.com/repos/org-name/repo-name/issues/25
   * into ["https://", "api.github.com", "repos", "org-name", "repo-name", "issues", "25"]
   */
  const parts = url.split(/https:\/\/|\//gm);
  const organization = parts[3];
  const repo = parts[4];
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

export async function fetchContributions() {
  try {
    const response = await axios.get("https://api.github.com/search/issues", {
      params: {
        q: `author:${aboutMe.githubUsername}`,
        sort: "created",
        order: "desc",
        per_page: itemsToFetch,
      },
      headers: {
        Authorization: `token ${import.meta.env.VITE_GH_TOKEN}`,
      },
    });

    const items = response.data.items;

    const filteredContributions = await Promise.all(
      items.map(async (item) => {
        let linesAdded = 0;
        let linesDeleted = 0;
        if (item.pull_request) {
          const detailsResponse = await axios.get(item.pull_request.url, {
            headers: {
              Authorization: `token ${import.meta.env.VITE_GH_TOKEN}`,
            },
          });
          linesAdded = detailsResponse.data.additions || 0;
          linesDeleted = detailsResponse.data.deletions || 0;
        }

        const { organization, repo, logoUrl } = parseOriginFromUrl(item.url);

        if (organization === aboutMe.githubUsername) {
          return null;
        }

        return {
          id: item.id,
          organisation: organization,
          logo: logoUrl,
          repo: repo,
          type: item.pull_request ? "Pull Requests" : "Issues",
          status: item.state,
          title: item.title,
          link: item.html_url,
          number: `#${item.number}`,
          date: new Date(item.created_at).toLocaleDateString(),
          linesAdded,
          linesDeleted,
        };
      })
    );

    return filteredContributions
      .filter((contribution) => contribution != null)
      .slice(0, 12);
  } catch (error) {
    console.error("Error fetching contributions:", error.message);
    return { error: true, message: error.message };
  }
}
