<h1 align="center"> Personal Portfolio </h1>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/76661350/193249886-79f3d04a-47c0-4b4b-93a6-23c32cf762f1.png">

### Deployed link: https://parthmittal.netlify.app/

## Table of Contents 📁

1. [Tech Stack](#tech-stack-)
2. [Implemented Sections](#implemented-sections-%EF%B8%8F)
3. [Use as a theme](#using-as-a-theme-)
4. [Contributing](#contributing-)
5. [Installation Guide](#installation-guide-)
6. [Sample Git Workflow](#sample-git-workflow)
7. [References & Inspirations](#references--inspirations-)
8. [Illustrations](#illustrations-%EF%B8%8F)
   <br>

## Tech Stack 🧰

<li>Frameworks</li>

- [ReactJS](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

<li>Libraries/Tools</li>
    
- [ViteJS](https://vitejs.dev/)
- [React Icons](https://react-icons.github.io/react-icons")
- [Framer](https://www.framer.com/)
- [React Lottie](https://www.npmjs.com/package/react-lottie)
- [Meraki UI](https://merakiui.com/components/)

<br/>

## Implemented Sections ☑️

- Hero Section
- Skills & Experience
- Education
- Projects
- Blogs
- Open Source Contributions
- Extra Curricular
- Contact Me

## Using as a theme ✨

### Code changes

Three main things have to be changed to customize it your way (please open an issue if you find more such instances):

1. Personal Information

- [/src/constants/index.js](https://github.com/mittal-parth/personal-portfolio/blob/main/src/constants/index.js) contains all the personal information one needs to change. Each website section is written as a JavaScript object and is pretty intuitive to change.

- Icons
  - Whenever you want to use an icon, you'll have to make sure that the icon is imported.
  - Head to [https://react-icons.github.io/react-icons/search](https://react-icons.github.io/react-icons/search) and search for the desired icon. (Eg: SiReact for ReactJS)
  - Note the package it belongs to (Eg: 'Si' here)
  - Import the icon into [`/src/constants/index.js`](https://github.com/mittal-parth/personal-portfolio/blob/main/src/constants/index.js) (Eg: `import { ... SiReact, } from "react-icons/si";` here)

2. Website title and icon

- Go to [`index.html`](https://github.com/mittal-parth/personal-portfolio/blob/main/index.html) and change the [`title`](https://github.com/mittal-parth/personal-portfolio/blob/main/index.html#L7") to your name.
- Also, change the link to the title [icon](https://github.com/mittal-parth/personal-portfolio/blob/main/index.html#L5)

3. Assets

- Add any assets (images) to the [`assets`](https://github.com/mittal-parth/personal-portfolio/tree/main/src/assets) folder.
- Import the asset and export it using the[`/src/assets/index.js`](https://github.com/mittal-parth/personal-portfolio/blob/main/src/assets/index.js) file.

4. Creating a .env file

Environment variables store sensitive information that vary for the user and should not be checked into source control.
One such example is the GitHub personal access token to automatically fetch the Open Source Contributions.

- A personal access token can be created to use the GitHub API following the official guide from GitHub - [GitHub Docs - Creating  personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)

The environment variables are to be added onto the .env file

- Create a file in your local dev environment to hold your environment variables called `.env` in the root project folder.
- Copy over the contents of the `.env.example` example file into the `.env` file.
- Replace the value of the environment variable value(s) with the values you want the environment variables to hold, for e.g. `VITE_GH_TOKEN=YOUR_GITHUB_TOKEN` where `YOUR_GITHUB_TOKEN` is the personal access token you generated earlier.

### Deployment

You can use [Netlify](https://docs.netlify.com/) to deploy your site. Follow the instructions in their docs to do so.

Since we have env variables, make sure to add them from the Netlify UI as well. [Link to Guide](https://docs.netlify.com/environment-variables/get-started/#site-environment-variables)

## Contributing 🏆

We welcome contributions in the form of pull requests, issues and documentation. Feel free to help us in any way! ❤️

- Please read and abide by our [Code of Conduct](https://github.com/mittal-parth/personal-portfolio/blob/main/CODE_OF_CONDUCT.md);
our community aspires to be a respectful place both during online and in-person interactions.
- Please follow the [installation guide](https://github.com/mittal-parth/personal-portfolio/blob/main/readme.md#installation-guide) and the [sample git workflow](https://github.com/mittal-parth/personal-portfolio/blob/main/readme.md#sample-git-workflow) to contribute.

## Installation Guide 🧑‍💻

### Using Git and Github

- [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repo
- [Clone](https://docs.github.com/en/get-started/quickstart/contributing-to-projects#cloning-a-fork) the forked repository
- Enter the new `portfolio` directory with `cd portfolio`
- Set the upstream remote to the original repository url so that git knows where to fetch updates from in future: `git remote add upstream https://github.com/mittal-parth/personal-portfolio.git`

### Install required packages

- `npm install`

### Run server

- `npm run dev`

<br/>

## Sample Git Workflow

- Follow the [installation guide](https://github.com/mittal-parth/personal-portfolio/blob/main/readme.md#installation-guide) to install the software
- Create a new feature branch with `git checkout -b <name-of-your-feature-branch>`
- Make changes and commit them in the feature branch.
- Once done developing, switch back to the main branch with `git checkout main` ; pull the latest version of the repo with `git pull https://github.com/mittal-parth/personal-portfolio.git main`
- Switch back to the feature branch with `git checkout <name-of-your-feature-branch>`. Apply the new changes on top of the latest version of the repo with `git rebase main`
- [Resolve merge conflicts](https://help.github.com/articles/resolving-a-merge-conflict-from-the-command-line/) (if any)
- Push your feature branch upto your remote repo with `git push origin <name-of-your-feature-branch>`
- [Submit a Pull Request](https://docs.github.com/en/get-started/quickstart/contributing-to-projects#making-a-pull-request) to the main branch.
- After any questions or changes have been resolved, your contribution would be merged in!


#### If you found this repo helpful in anyway, considering giving it a star - it would mean the world to me! 🌟

## References & Inspirations 👏

- [JavaScript Mastery](https://youtu.be/_oO4Qi5aVZs)
- [Developerfolio](https://developerfolio.js.org/)
- [MasterPortfolio](https://github.com/ashutosh1919/masterPortfolio)

## Illustrations 🖼️

- [Coding Lottie](https://lottiefiles.com/90189-coding) by Yamesh Sai Balaji
- [Quiz Mode Lottie](https://lottiefiles.com/92377-quiz-mode) by SenecaDan
