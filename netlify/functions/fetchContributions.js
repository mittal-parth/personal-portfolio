const axios = require('axios');

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const generatePRQuery = (repoConfigs, username, itemsToFetch) => {
  const queries = repoConfigs
    .map(({ fullName }) => `repo:${fullName} is:pr author:${username}`)
    .join(" ");

  return `
    query {
      search(query: "${queries}", type: ISSUE, first: ${itemsToFetch}) {
        nodes {
          ... on PullRequest {
            id
            title
            state
            merged
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
};

const parseOriginFromUrl = (url) => {
  const [, ...parts] = url.split(/https:\/\/|\//gm);
  const organization = parts[1];
  const repo = parts[2];
  const logoUrl = `https://github.com/${organization}.png`;

  return {
    organization,
    repo,
    logoUrl,
  };
};

exports.handler = async function(event, context) {
  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON body" }),
      headers: jsonHeaders,
    };
  }

  try {
    const { repoConfigs, username, itemsToFetch = 100 } = body;

    const displayNames = Object.fromEntries(
      repoConfigs.map(({ fullName, displayName }) => [fullName, displayName])
    );

    const query = generatePRQuery(repoConfigs, username, itemsToFetch);

    const response = await axios.post(
      "https://api.github.com/graphql",
      { query },
      {
        headers: {
          Authorization: `Bearer ${process.env.VITE_GH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data?.errors || !response.data?.data?.search?.nodes) {
      throw new Error(
        response.data?.errors?.[0]?.message || "Failed to fetch data from GitHub API"
      );
    }

    const pullRequests = response.data.data.search.nodes.filter(
      (item) => item && (item.state === "OPEN" || item.merged)
    );

    const formattedPRs = pullRequests.map((item) => {
      const { organization, repo, logoUrl } = parseOriginFromUrl(item.url);
      const fullName = `${organization}/${repo}`;

      return {
        id: item.id,
        organization,
        logoUrl,
        repo,
        fullName,
        displayName: displayNames[fullName] ?? repo,
        status: item.state,
        title: item.title,
        link: item.url,
        number: item.number,
        date: new Date(item.createdAt).toLocaleDateString(),
        linesAdded: item.additions,
        linesDeleted: item.deletions,
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(formattedPRs),
      headers: jsonHeaders,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch contributions' }),
      headers: jsonHeaders,
    };
  }
};
