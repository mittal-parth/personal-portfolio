<h1 align="center"> Personal Portfolio </h1>

<img width="945" alt="image" src="https://user-images.githubusercontent.com/76661350/193249886-79f3d04a-47c0-4b4b-93a6-23c32cf762f1.png">

### Deployed link: https://parthmittal.netlify.app/

## Table of Contents 📁

1. [Tech Stack](https://github.com/mittal-parth/personal-portfolio/blob/main/readme.md#tech-stack)
2. [Implemented Sections](https://github.com/mittal-parth/personal-portfolio/blob/main/readme.md#implemented-sections)
3. [Use as a theme](https://github.com/mittal-parth/personal-portfolio/blob/main/readme.md#use-as-a-theme)
4. [Contributing](https://github.com/mittal-parth/personal-portfolio/blob/main/readme.md#contributing)
5. [Installation Guide](https://github.com/mittal-parth/personal-portfolio/blob/main/readme.md#installation-guide) 
6. [References & Inspirations](https://github.com/mittal-parth/personal-portfolio/blob/main/readme.md#references--inspirations)
7. [Illustrations](https://github.com/mittal-parth/personal-portfolio/blob/main/readme.md#illustrations)
<br>

## Tech Stack 🧰

<li>Frameworks</li>
    <ul>
        <li><a href="https://reactjs.org/" target="_blank">ReactJS</a></li>
        <li><a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a></li>
    </ul>
<li>Libraries/Tools</li>
    <ul>
        <li><a href="https://vitejs.dev/" target="_blank">ViteJS</a></li>
        <li><a href="https://react-icons.github.io/react-icons" target="_blank">React Icons</a></li>
        <li><a href="https://www.framer.com/" target="_blank">Framer</a></li>
        <li><a href="https://www.npmjs.com/package/react-lottie" target="_blank">React Lottie</a></li>
        <li><a href="https://merakiui.com/components/" target="_blank">Meraki UI</a></li>
    </ul>
</ul>
<br/>

## Implemented Sections ☑️
- Hero Section
- Skills & Experience
- Education
- Projects
- Open Source
- Extra Curricular
- Contact Me

## Using as a theme ✨

### Code changes
Three main things have to be changed to customize it your way (please open an issue if you find more such instances): 
1. Personal Information
  - <a href="https://github.com/mittal-parth/personal-portfolio/blob/main/src/constants/index.js" target="_blank"> `/src/constants/index.js` </a> contains all the      personal information one needs to change. Each website section is written as a JavaScript object and is pretty intuitive to change.

  - Icons
    - Whenever you want to use an icon, you'll have to make sure that the icon is imported. 
    - Head to <a href="https://react-icons.github.io/react-icons/search" target="_blank">https://react-icons.github.io/react-icons/search</a> and search for the desired icon. (Eg: SiReact for ReactJS)
    - Note the package it belongs to (Eg: 'Si' here)
    - Import the icon into <a href="https://github.com/mittal-parth/personal-portfolio/blob/main/src/constants/index.js" target="_blank"> `/src/constants/index.js` </a>. (Eg: `import { ...
    SiReact,
    } from "react-icons/si";` here)
    
2. Website title and icon
 - Go to <a href="https://github.com/mittal-parth/personal-portfolio/blob/main/index.html" target="_blank"> `index.html` </a> and change the <a href="https://github.com/mittal-parth/personal-portfolio/blob/main/index.html#L7">`title`</a> to your name. 
 - Also, change the link to the title <a href="https://github.com/mittal-parth/personal-portfolio/blob/main/index.html#L5" target="_blank">icon</a>.
   
3. Assets
 - Add any assets (images) to the <a href="https://github.com/mittal-parth/personal-portfolio/tree/main/src/assets" target="_blank"> `assets` </a> folder.
 - Import the asset and export it using the <a href="https://github.com/mittal-parth/personal-portfolio/blob/main/src/assets/index.js" target="_blank">`/src/assets/index.js`</a> file.

### Deployment 

You can use [Netlify](https://docs.netlify.com/) to deploy your site. Follow the instructions in their docs to do so.

## Contributing 🏆

We welcome contributions in the form of pull requests, issues and documentation. Feel free to help us in any way! ❤️

Please read and abide by our [Code of Conduct](https://github.com/mittal-parth/personal-portfolio/blob/main/CODE_OF_CONDUCT.md); 
our community aspires to be a respectful place both during online and in-person interactions.

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

#### If you found this repo helpful in anyway, considering giving it a star - it would mean the world to me! 🌟

## References & Inspirations 👏
- [JavaScript Mastery](https://youtu.be/_oO4Qi5aVZs)
- [Developerfolio](https://developerfolio.js.org/)
- [MasterPortfolio](https://github.com/ashutosh1919/masterPortfolio)

## Illustrations 🖼️
- [Coding Lottie](https://lottiefiles.com/90189-coding) by Yamesh Sai Balaji
- [Quiz Mode Lottie](https://lottiefiles.com/92377-quiz-mode) by SenecaDan
