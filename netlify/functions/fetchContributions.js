const axios = require('axios');

const generatePRQuery = (repos, username) => {
  const queries = repos
    .map((repo) => {
      return `repo:${repo} is:pr author:${username}`;
    })
    .join(" ");

  return `
    query {
      search(query: "${queries}", type: ISSUE, first: 100) {
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
  try {
    const { repos, username } = JSON.parse(event.body);
    
    const query = generatePRQuery(repos, username);
    
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

    const pullRequests = response.data.data.search.nodes;
    const formattedPRs = pullRequests.map((item) => {
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

    return {
      statusCode: 200,
      body: JSON.stringify(formattedPRs),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch contributions' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    };
  }
};
