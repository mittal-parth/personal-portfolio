const openSourceContributions = []
const options = {
  method: 'GET',
  // headers: {
  //   Authorization: 'Bearer <your-token>',
  // }
};

export async function fetchContributions(username) {
  const response = await fetch(`https://api.github.com/search/issues?q=author:${username}`, options)
  const data = await response.json()

  data.items.forEach((item) => {
    const {organization, repo, logoUrl} = parseOriginFromUrl(item.url)

    if (item.node_id.startsWith('I')) {
      createContribution({
        id: item.id,
        organization: organization,
        logo: logoUrl,
        repo: repo,
        type: 'issue',
        status: item.closed_at ? 'closed' : 'open',
        title: item.title,
        link: item.html_url,
        number: `#${item.number}`,
        date: item.created_at,
      })
    } else {
      createContribution({
        id: item.id,
        organization: organization,
        logo: logoUrl,
        repo: repo,
        type: 'pull-request',
        status: item.pull_request.merged_at ?
          (
            'merged'
          ) : (
            item.closed_at ?
            (
              'closed'
            ) : (
              'open'
            )
          ),
        title: item.title,
        link: item.html_url,
        number: `#${item.number}`,
        date: item.created_at,
      })
    }
  })

  return {
    openSourceContributions
  }
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
