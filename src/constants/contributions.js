const openSourceContributions = []
let options = {}

if (import.meta.env.VITE_GH_TOKEN) {
  options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GH_TOKEN}`,
    }
  }
} else {
  options = {
    method: 'GET',
  }
}

export async function fetchContributions(username) {
  const pullsResponse = await fetch(`https://api.github.com/search/issues?q=is:pr+author:${username}`, options)
  const issuesResponse = await fetch(`https://api.github.com/search/issues?q=is:issue+author:${username}`, options)

  if (pullsResponse.status !== 200 || issuesResponse.status !== 200) {
    return null
  }

  const pulls = await pullsResponse.json()
  const issues = await issuesResponse.json()

  pulls.items.forEach((pr) => {
    if (pr.author_association === "OWNER") {
      return
    }

    const {organization, repo, logoUrl} = parseOriginFromUrl(pr.url)

    createContribution({
      id: pr.id,
      organization: organization,
      logo: logoUrl,
      repo: repo,
      type: 'pull-request',
      status: pr.pull_request.merged_at ?
        (
          'merged'
        ) : (
          pr.closed_at ?
          (
            'closed'
          ) : (
            'open'
          )
        ),
      title: pr.title,
      link: pr.html_url,
      number: `#${pr.number}`,
      date: pr.created_at,
    })
  })

  issues.items.forEach((issue) => {
    if (issue.author_association === "OWNER") {
      return
    }

    const {organization, repo, logoUrl} = parseOriginFromUrl(issue.url)

    createContribution({
      id: issue.id,
      organization: organization,
      logo: logoUrl,
      repo: repo,
      type: 'issue',
      status: issue.closed_at ? 'closed' : 'open',
      title: issue.title,
      link: issue.html_url,
      number: `#${issue.number}`,
      date: issue.created_at,
    })
  })

  return Object.values(openSourceContributions)
}

function createContribution({ id, organization, logo, repo, type, status, title, link, number, date }) {
  openSourceContributions.push({
    id,
    organization,
    logo,
    repo,
    type,
    status,
    title,
    link,
    number,
    date,
    linesAdded: '',
    linesRemoved: ''
  })
}

function parseOriginFromUrl(url) {
  /**
   * splits https://api.github.com/repos/org-name/repo-name/issues/25
   * into ["https://", "api.github.com", "repos", "org-name", "repo-name", "issues", "25"]
   */
  const parts = url.split(/https:\/\/|\//gm)
  const organization = parts[3]
  const repo = parts[4]

  /**
   * accessing a github profile or organization and adding a .png 
   * at the end of the URL will return their logo/profile picture
   */
  const logoUrl = `https://github.com/${organization}.png`

  return {
    organization,
    repo,
    logoUrl
  }
}
