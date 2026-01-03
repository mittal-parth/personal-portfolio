import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoint for fetching GitHub contributions
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

app.post('/api/fetchContributions', async (req, res) => {
  try {
    const { repos, username } = req.body;
    
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

    res.json(formattedPRs);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch contributions' });
  }
});

// Handle SPA routing - serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
