import {
  nitk,
  gdsc,
  iris,
  ecell,
  genesis,
  portfolio,
  cdc,
  chargeswap,
  placeicon,
  recruitment,
  oracle,
  comicify_ai,
  greentrust,
  averlon,
  devfolio,
  pba,
  ethglobal,
  polkadot,
  lightspeed,
  dennisivy,
  manipal,
  icon,
  ethforall,
  ethindia,
  globalAi,
  khoj,
  kosh,
  polkadot_dev_cli,
  hackathon_curation_agent,
  kudos,
} from "../assets";

import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillMail,
  AiOutlineTwitter,
  AiFillHtml5,
  AiOutlineGitlab,
} from "react-icons/ai";

import {
  SiDjango,
  SiJavascript,
  SiBootstrap,
  SiReact,
  SiTailwindcss,
  SiGraphql,
  SiPython,
  SiCplusplus,
  SiC,
  SiRubyonrails,
  SiJquery,
  SiPostman,
  SiGit,
  SiMysql,
  SiSolidity,
  SiNetlify,
  SiVite,
  SiArduino,
  SiWeb3Dotjs,
  SiIpfs,
  SiDotnet,
  SiTwilio,
  SiFlask,
  SiOpenai,
  SiGooglecloud,
  SiNextdotjs,
  SiTypescript,
  SiOracle,
  SiGmail,
  SiGooglesheets,
  SiThirdweb,
  SiIntellijidea
} from "react-icons/si";

import { FaHardHat, FaRust } from "react-icons/fa";

import { IoIosNotificationsOutline } from "react-icons/io";

import { FaGolang, FaXTwitter } from "react-icons/fa6";

import { DiCss3, DiJava, DiMsqlServer, DiRuby } from "react-icons/di";
import { VscAzure } from "react-icons/vsc";
import { BiLogoVisualStudio } from "react-icons/bi";

import { RiGeminiFill } from "react-icons/ri";

export const resumeLink =
  "https://drive.google.com/file/d/1vkxyMDB5_KpMwt4QXFgT2aqdRizr8Czh/view?usp=sharing";
export const repoLink = "https://github.com/mittal-parth/personal-portfolio";

export const callToAction = "https://www.linkedin.com/in/mittal-parth";

export const navLinks = [
  {
    id: "skills",
    title: "Skills & Experience",
  },
  {
    id: "education",
    title: "Education",
  },
  {
    id: "achievements",
    title: "Achievements",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "openSource",
    title: "Open Source",
  },
  {
    id: "extraCurricular",
    title: "Extra Curricular",
  },
  {
    id: "contactMe",
    title: "Contact Me",
  },
];

// Add your past academic experiences here
export const educationList = [
  {
    id: "education-1",
    icon: nitk,
    title: "Sakarya University, Turkey",
    degree: "Bachelor of Engineering",
    duration: "September 2016 - August 2020",
    content1: "Major: Industrial Engineering",
  },
  {
    id: "education-2",
    icon: pba,
    title: "Sakarya University, Turkey",
    degree: "Master of Management Information Systems",
    duration: "September 2022 - January 2026",
    content1:
      "Graduated with a distinction in the fifth cohort of the Polkadot Blockchain Academy at the National University of Singapore.",
  },
];

// Add your past achievements here for example - rankings in hackathons/events
export const achievements = [
  {
    id: "a-1",
    icon: ethindia,
    event: "ETHIndia'24 | India's Largest Ethereum Hackathon",
    position: "Winner",
    content1: "Top 10 Overall Finalists/Winners, True Network's Winner",
    content2: "Polkadot's 1st Runner Up, Lit Protocol's 2nd Runner Up",
    content3: "Coinbase Pool Prize, Base Top 10",
    article:
      "https://www.linkedin.com/posts/mittal-parth_super-stoked-to-announce-that-our-team-emerged-activity-7274735259621961729-tkq4?utm_source=share&utm_medium=member_desktop",
    project: "https://devfolio.co/projects/khoj-3336",
    youtube:
      "https://www.youtube.com/live/qJ4OCtnvjUY?si=VkcnHEdwJTEEDlMg&t=4718",
  },
  {
    id: "a-2",
    icon: ethglobal,
    event: "ETHIndia'22 | World's Largest Ethereum Hackathon",
    position: "Winner",
    content1: "Top 12 Winners among 20k+ registrations",
    content2: "One of Polygon's Best Public Goods",
    content3: "Best Module on Biconomy SDK",
    article:
      "https://www.thehindu.com/news/cities/Mangalore/nitk-iiit-delhi-team-makes-it-to-top-12-winners-in-ethindia-22/article66238923.ece",
    project: "https://devfolio.co/projects/chargeswap-3527",
    youtube: "https://youtu.be/9rieTya8Yds?t=3908",
  },
  {
    id: "a-3",
    icon: polkadot,
    event: "Polkadot Hackathon: Europe Edition",
    position: "2nd Runner Up in the ink! Smart Contract Category",
    content1:
      "Built GreenTrust offering a novel solution for obtaining certification in organic farming.",
    content2: "",
    content3: "",
    article:
      "https://www.linkedin.com/posts/mittal-parth_hackathon-winners-web3-activity-7048340759116214272-eJvo?utm_source=share&utm_medium=member_desktop&rcm=ACoAADOa76QB7zljgX8NK4xVSZXi0Z49ETMeC-g",
    github: "https://github.com/pranav2305/GreenTrust",
  },
  {
    id: "a-4",
    icon: lightspeed,
    event: "Warpspeed by Lightspeed 2023",
    position: "1st Runner Up",
    content1: "1st Runner Up Overall by Lightspeed among 107 hackers",
    content2: "Top 3 projects using Replit",
    content3: "1st Runner Up by Amazon Web Services (AWS)",
    article: "https://shorturl.at/fhjsT",
  },
  {
    id: "a-5",
    icon: lightspeed,
    event: "Warpspeed: Agentic AI Hackathon | Lightspeed India",
    position: "Runners Up in the Base Track",
    content1: "Built an ambient virtual assistant before ChatGPT Pulse",
    content2: "Runners up in the Base Track with the Agentic AI theme for 2025",
    project: "https://devfolio.co/projects/aeva-58d2",
  },
  {
    id: "a-6",
    icon: kudos,
    event: "Kudos Carnival | Polkadot Blockchain Academy",
    position: "Runner Up",
    content1: "Finished 2nd globally among PBA Alumni in a 6-week event",
    content2: "Contributed to several repositories in the Polkadot ecosystem in a Hacktoberfest-style event",
    article: "https://www.morekudos.com/carnival",
  },
  {
    id: "a-7",
    icon: globalAi,
    event: "Global AI HackFest 2023",
    position: "Winner",
    content1:
      "1st Position in the Education, Finance & Tech track by AI Planet",
    content2: "",
    content3: "",
    article:
      "https://www.linkedin.com/posts/mittal-parth_happy-to-share-that-comicifyai-emerged-as-activity-7078790186435833856-88fh",
  },
  {
    id: "a-8",
    icon: dennisivy,
    event: "September Hackathon by Dennis Ivy",
    position: "Winner",
    content1:
      "Rated the best portfolio website among 450+ participants across the globe.",
    content2: "",
    content3: "",
    youtube: "https://www.youtube.com/watch?v=X2473En3h_o&t=5278s",
    project: "https://parthmittal.netlify.app/",
  },
  {
    id: "a-9",
    icon: manipal,
    event: "Manipal Hackathon'22",
    position: "Consolation Prize",
    content1: "Top 10 among 500+ teams across India",
    content2:
      "Developed a cross-platform mobile application to address the problem of social cohesion.",
    content3: "",
    article: "https://shorturl.at/exEIQ",
  },
  {
    id: "a-10",
    icon: icon,
    event: "ICON Hyperbuild Hackathon",
    position: "Honorable Mention",
    content1:
      "Honorable Mention among 655 participants across the globe in a 3 month-long online hackathon.",
    content2: "",
    content3: "",
    project: "https://devpost.com/software/green-trust-xj2w6g",
  },
  {
    id: "a-11",
    icon: ethforall,
    event: "ETHForAll 2023",
    position: "Top 3 Superfluid Projects",
    content1:
      "Bounty winners among 430 projects in ETHGlobal's largest online hackathon.",
    content2: "",
    content3: "",
    project: "https://devfolio.co/projects/green-trust-ed14",
  },
];

// Add your software developments skills here for example - programming languages, frameworks etc.
export const skills = [
  {
    title: "Programming Languages",
    items: [
      {
        id: "pl-1",
        icon: SiPython,
        name: "Python",
      },
      {
        id: "pl-2",
        icon: SQL,
        name: "SQL",
      },
    ],
  },
  {
    title: "Frameworks/Libraries",
    items: [
      {
        id: "f-1",
        icon: SiReact,
        name: "ReactJS",
      },
      {
        id: "f-2",
        icon: SiDjango,
        name: "Django",
      },
      {
        id: "f-3",
        icon: SiRubyonrails,
        name: "Ruby on Rails",
      },
      {
        id: "f-4",
        icon: SiBootstrap,
        name: "Bootstrap",
      },
      {
        id: "f-5",
        icon: SiTailwindcss,
        name: "Tailwind CSS",
      },
      {
        id: "f-6",
        icon: SiJquery,
        name: "jQuery",
      },
      {
        id: "f-7",
        icon: SiGraphql,
        name: "GraphQL",
      },
      {
        id: "f-8",
        icon: SiDotnet,
        name: ".NET",
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        id: "t-1",
        icon: SiOracle,
        name: "Oracle Cloud",
      },
      {
        id: "t-2",
        icon: VscAzure,
        name: "Azure",
      },
      {
        id: "t-3",
        icon: MSSQL,
        name: "MSSQL",
      },
      {
        id: "t-4",
        icon: SiPostman,
        name: "Postman",
      },
      {
        id: "t-5",
        icon: BiLogoVisualStudio,
        name: "VS Code",
      },
      {
        id: "t-6",
        icon: SiIntellijidea,
        name: "IntelliJ IDEA",
      },
      {
        id: "t-7",
        icon: SiGit,
        name: "Git",
      },
      {
        id: "t-8",
        icon: AiFillGithub,
        name: "GitHub",
      },
     {
        id: "t-11",
        icon: SiVite,
        name: "ViteJS",
      },
    ],
  },
];

// Add your current/past professional work experience here
export const experiences = [
  {
    organisation: "Anadolu Efes, Istanbul",
    logo: oracle,
    link: "http://anadoluefes.com.tr",
    positions: [
      {
        title: "BI Data Analyst",
        duration: "Jan 2025 - Aug 2025",
        content: [
          {
            text: "Working in the Database as a Service Control Plane team for Oracle Cloud Infrastructure.",
            link: "",
          },
        ],
      },
      {
        title: "Member of Technical Staff - 1",
        duration: "Jul 2024 - Sep 2025",
        content: [
          {
            text: "Made several fixes to reduce the time taken for backup deletion from OCI Object Storage for large customers resulting in decreased costs.",
            link: "",
          },
          {
            text: "Worked towards building an AI On-Call Agent using an internal agentic framework.",
            link: "",
          },
          {
            text: "Developed a common integration test framework for ExaCS, ExaDB-XS and ExaCC, reducing code maintenance by ~67% and increased coverage by ~50%",
            link: "",
          },
        ],
      },
      {
        title: "Member of Technical Staff Intern",
        duration: "May 2023 - Jul 2023",
        content: [
          {
            text: "Worked with the Exadata Cloud@Customer team in the Database Unit.",
            link: "",
          },
          {
            text: "Wrote APIs in Java to help gracefully migrate a running ExaC@C infrastructure to a new region in the case of a region failure",
            link: "",
          },
        ],
      },
    ],
  },
  {
    organisation: "Kigili, Istanbul",
    logo: averlon,
    link: "https://corporate.kigili.com",
    positions: [
      {
        title: "Software Developer Intern",
        duration: "Sept 2023 - Feb 2024",
        content: [
          {
            text: "Added support for the discoverability of Microsoft Azure assets utilising Go and Gremlin.",
            link: "",
          },
          {
            text: "Extended support for Azure for reachability analysis of assets for cloud security posture management.",
            link: "",
          },
        ],
      },
    ],
  },
  {
    organisation: "LC Waikiki, Istanbul",
    logo: iris,
    link: "https://corporate.lcwaikiki.com",
    positions: [
      {
        title: "Tech Lead",
        duration: "Apr 2023 - Apr 2024",
        content: [
          {
            text: "Led a team of 40+ students in digitizing administrative, academic and alumni-related work.",
            link: "",
          },
          {
            text: "Managed all phases of Software Development Life Cycle (SDLC) for 15+ modules.",
            link: "",
          },
        ],
      },
      {
        title: "Web Lead",
        duration: "Apr 2022 - Present",
        content: [
          {
            text: "Managed a team of 6 student developers while also overlooking multiple modules.",
            link: "",
          },
        ],
      },
      {
        title: "Web Developer",
        duration: "Nov 2021 - Apr 2022",
        content: [
          {
            text: "Added Conditional Fields support to the Forms Module.",
            link: "",
          },
        ],
      },
      {
        title: "Web Developer Intern",
        duration: "Jun 2021 - Oct 2021",
        content: [
          {
            text: "Developed a multi-role approval flow system to facilitate data collection and display on the Institute's Department Websites.",
            link: "",
          },
        ],
      },
    ],
  },
];

// Add information about all the projects to be listed out in your portfolio
export const projects = [
  {
    id: "project-1",
    title: "Khoj",
    github: "https://github.com/mittal-parth/Khoj",
    link: "https://playkhoj.com/",
    image: khoj,
    content:
      "Participate in AI-personalised treasure hunts where each clue is a physical location. Earn on-chain rewards and onboard a million users. Overall winning project at ETHIndia'24.",
    stack: [
      {
        id: "proj1-icon-1",
        icon: SiSolidity,
        name: "Solidity",
      },
      {
        id: "proj1-icon-2",
        icon: SiTypescript,
        name: "Typescript",
      },
      {
        id: "proj1-icon-3",
        icon: SiReact,
        name: "React.js",
      },
      {
        id: "proj1-icon-4",
        icon: SiTailwindcss,
        name: "TailwindCSS",
      },
      {
        id: "proj1-icon-5",
        icon: RiGeminiFill,
        name: "Gemini",
      },
      {
        id: "proj1-icon-6",
        icon: SiThirdweb,
        name: "Thirdweb",
      },
      {
        id: "proj1-icon-7",
        icon: SiIpfs,
        name: "IPFS",
      },
    ],
  },
  {
    id: "project-2",
    title: "Hackathon Curation AI Agent",
    github: "https://github.com/mittal-parth/hackathon-curation-agent",
    image: hackathon_curation_agent,
    content:
      "An intelligent agent that automatically curates hackathons from your email newsletters, evaluates them using AI, and posts the best ones to Twitter.",
    stack: [
      {
        id: "proj2-icon-1",
        icon: SiPython,
        name: "Python",
      },
      {
        id: "proj2-icon-2",
        icon: RiGeminiFill,
        name: "Gemini",
      },
      {
        id: "proj2-icon-3",
        icon: SiGmail,
        name: "Gmail API",
      },
      {
        id: "proj2-icon-4",
        icon: SiGooglesheets,
        name: "Google Sheets API",
      },
      {
        id: "proj2-icon-5",
        icon: FaXTwitter,
        name: "Twitter API",
      },
      {
        id: "proj2-icon-6",
        icon: SiGooglecloud,
        name: "Google Cloud Platform",
      },
    ],
  },
  {
    id: "project-3",
    title: "Comicify.ai",
    github: "https://github.com/ayush4345/Comicify.ai",
    link: "https://devfolio.co/projects/comicifyai-97a6",
    image: comicify_ai,
    content:
      "Convert any academic/news/boring text into cool comic strips using GPT-3.5 and Stable Diffusion!",
    stack: [
      {
        id: "proj3-icon-1",
        icon: SiReact,
        name: "React",
      },
      {
        id: "proj3-icon-2",
        icon: SiTailwindcss,
        name: "TailwindCSS",
      },
      {
        id: "proj3-icon-3",
        icon: SiOpenai,
        name: "OpenAI",
      },
      {
        id: "proj3-icon-4",
        icon: SiGooglecloud,
        name: "Google Cloud Platform",
      },
      {
        id: "proj3-icon-5",
        icon: SiFlask,
        name: "Flask",
      },
    ],
  },
  {
    id: "project-4",
    title: "Polkadot Dev CLI",
    github: "https://github.com/mittal-parth/polkadot-dev-cli",
    link: "https://crates.io/crates/polkadot-dev-cli",
    image: polkadot_dev_cli,
    content:
      "CLI tool for Polkadot developers bundling linting, formatting, and version management. cargo install polkadot-dev-cli.",
    stack: [
      {
        id: "proj4-icon-1",
        icon: FaRust,
        name: "Rust",
      },
    ],
  },
  {
    id: "project-5",
    title: "Non-Teaching Recruitment Portal, NITK",
    github: "",
    link: "http://recruitment.nitk.ac.in/",
    image: recruitment,
    content:
      "The official recruitment portal for non-teaching staff with an admin panel, email notifications and payment integration.",
    stack: [
      {
        id: "proj5-icon-1",
        icon: SiRubyonrails,
        name: "Ruby on Rails",
      },
      {
        id: "proj5-icon-2",
        icon: SiTailwindcss,
        name: "TailwindCSS",
      },
      {
        id: "proj5-icon-3",
        icon: SiJquery,
        name: "jQuery",
      },
    ],
  },
  {
    id: "project-6",
    title: "GreenTrust",
    github: "https://github.com/mittal-parth/GreenTrust",
    link: "https://green-trust-fantom.netlify.app/",
    image: greentrust,
    content:
      "Winning project at 3 hackathons, GreenTrust offers a novel solution for obtaining certification in organic farming by organizing credible and decentralized Participatory Guarantee Systems (PGSs).",
    stack: [
      {
        id: "proj6-icon-1",
        icon: SiReact,
        name: "React",
      },
      {
        id: "proj6-icon-2",
        icon: SiTailwindcss,
        name: "TailwindCSS",
      },
      {
        id: "proj6-icon-3",
        icon: SiNextdotjs,
        name: "Next.js",
      },
      {
        id: "proj6-icon-4",
        icon: SiIpfs,
        name: "IPFS",
      },
      {
        id: "proj6-icon-5",
        icon: SiSolidity,
        name: "Solidity",
      },
      {
        id: "proj6-icon-6",
        icon: IoIosNotificationsOutline,
        name: "Push Protocol",
      },
    ],
  },
  {
    id: "project-7",
    title: "ChargeSwap",
    github: "https://github.com/CommanderAstern/ChargeSwap",
    link: "https://devfolio.co/projects/chargeswap-3527",
    image: chargeswap,
    content:
      "A Blockchain-based EV-Battery swapping solution - winning project at ETHIndia'22, the world's largest Ethereum Hackathon.",
    stack: [
      {
        id: "proj7-icon-1",
        icon: SiReact,
        name: "React",
      },
      {
        id: "proj7-icon-2",
        icon: SiWeb3Dotjs,
        name: "Web3.js",
      },
      {
        id: "proj7-icon-3",
        icon: SiSolidity,
        name: "Solidity",
      },
      {
        id: "proj7-icon-4",
        icon: FaHardHat,
        name: "HardHat",
      },
      {
        id: "proj7-icon-5",
        icon: SiIpfs,
        name: "IPFS",
      },
      {
        id: "proj7-icon-6",
        icon: SiArduino,
        name: "Arduino",
      },
      {
        id: "proj7-icon-7",
        icon: IoIosNotificationsOutline,
        name: "Push Protocol",
      },
    ],
  },
  {
    id: "project-8",
    title: "Samsotech Table Management System",
    github: "",
    link: "https://www.linkedin.com/posts/mittal-parth_technologysolutions-softwaredevelopment-technology-activity-6994915645066809344-WnMY?utm_source=share&utm_medium=member_desktop",
    image: placeicon,
    content:
      "Restaurant, Place, Table and realtime Reservation Management with Multi-Tenant Architecture, RBAC, SMS and Email integration for Samsotech International",
    stack: [
      {
        id: "proj8-icon-1",
        icon: SiDotnet,
        name: "Dot Net Core MVC 6",
      },
      {
        id: "proj8-icon-2",
        icon: SiBootstrap,
        name: "Bootstrap",
      },
      {
        id: "proj8-icon-3",
        icon: DiMsqlServer,
        name: "MS Sql Server",
      },
      {
        id: "proj8-icon-4",
        icon: SiJquery,
        name: "jQuery",
      },
      {
        id: "proj8-icon-5",
        icon: SiTwilio,
        name: "Twillio",
      },
    ],
  },
  {
    id: "project-9",
    title: "Career Development Centre, NITK Website",
    github: "",
    link: "http://cdc.nitk.ac.in/",
    image: cdc,
    content: "The official website of CDC, NITK with a custom built CMS.",
    stack: [
      {
        id: "proj9-icon-1",
        icon: SiRubyonrails,
        name: "Ruby on Rails",
      },
      {
        id: "proj9-icon-2",
        icon: SiBootstrap,
        name: "Bootstrap",
      },
      {
        id: "proj9-icon-3",
        icon: SiJavascript,
        name: "JavaScript",
      },
    ],
  },
  {
    id: "project-10",
    title: "Portfolio",
    github: "https://github.com/mittal-parth/personal-portfolio",
    link: "https://parthmittal.netlify.app/",
    image: portfolio,
    content: "Open source developer portfolio template with modern UI/UX. 140+ stars on GitHub.",
    stack: [
      {
        id: "proj10-icon-1",
        icon: SiReact,
        name: "React",
      },
      {
        id: "proj10-icon-2",
        icon: SiTailwindcss,
        name: "Tailwind CSS",
      },
      {
        id: "proj10-icon-3",
        icon: AiFillHtml5,
        name: "HTML",
      },
    ],
  },
  {
    id: "project-11",
    title: "Kosh SDK",
    github: "https://github.com/mittal-parth/kosh-sdk",
    link: "https://ethglobal.com/showcase/kosh-hk3mp",
    image: kosh,
    content:
      "Simple and secure way to interact with remote MCP Servers in Trusted Execution Environments (TEEs). Built at ETHGlobal Trifecta Hackathon.",
    stack: [
      {
        id: "proj11-icon-1",
        icon: SiTypescript,
        name: "Typescript",
      },
      {
        id: "proj11-icon-2",
        icon: SiTailwindcss,
        name: "TailwindCSS",
      },
      {
        id: "proj11-icon-3",
        icon: SiPython,
        name: "Python",
      },
    ],
  },
];

// Add links to blogs here
export const blogPosts = [
  {
    id: "post-1",
    title: "Blog Post 01 - Title",
    link: "#",
    date: new Date().toLocaleDateString(), // Can be edited to any string format
    image: "https://via.placeholder.com/600/92c952",
    tags: [
      {
        id: "tag-1",
        name: "tag 01",
      },
      {
        id: "tag-2",
        name: "tag 03",
      },
      {
        id: "tag-3",
        name: "tag 03",
      },
    ],
  },
  {
    id: "post-2",
    title: "Blog Post 02 - Title",
    link: "#",
    date: new Date().toLocaleDateString(),
    image: "https://via.placeholder.com/600/d32776",
    tags: [
      {
        id: "tag-1",
        name: "tag 01",
      },
      {
        id: "tag-2",
        name: "tag 03",
      },
      {
        id: "tag-3",
        name: "tag 03",
      },
    ],
  },
  {
    id: "post-3",
    title: "Blog Post 03 - Title",
    link: "#",
    date: new Date().toLocaleDateString(),
    image: "https://via.placeholder.com/600/771796",
    tags: [
      {
        id: "tag-1",
        name: "tag 01",
      },
      {
        id: "tag-2",
        name: "tag 03",
      },
      {
        id: "tag-3",
        name: "tag 03",
      },
    ],
  },
];

// Highlight your GitHub stats like - Organisation, Issues Opened, Pull Requests etc.
export const stats = [
  {
    id: "stats-1",
    title: "Organisations",
    value: "2+",
  },
  {
    id: "stats-2",
    title: "Issues Opened",
    value: "6+",
  },
  {
    id: "stats-3",
    title: "Pull Requests",
    value: "6+",
  },
];

// List out the extra curricular activities you have indulged in, like - student clubs, research groups etc.
export const extraCurricular = [
  {
    id: 1,
    organisation: "Devfolio",
    title: "UniDAO Lead",
    duration: "December 2021 - Present",
    content: [
      {
        text: "Selected among 5 students across the country to lead the initiative and grow the culture of Blockchain and Ethereum, powered by Devfolio.",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7097977924686942209/",
      },
      {
        text: "Led a cohort of 37 selected students over 6 weeks to learn and build in the Ethereum ecosystem.",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7095310520282480641/",
      },
    ],
    logo: devfolio,
  },
  {
    id: 2,
    organisation: "Google Developer Student Club, NITK",
    title: "Co-Chair",
    duration: "December 2021 - Present",
    content: [
      {
        text: "Started HackClub to promote and spread the culture of Hackathons in the college. 20+ hackathons particiaptions, 15+ wins over the year.",
        link: "",
      },
      {
        text: "Co-designed and developed the official website of Incident, NITK with 15K+ visitors",
        link: "https://incident.nitk.ac.in/",
      },
    ],
    logo: gdsc,
  },
  {
    id: 3,
    organisation: "Genesis, NITK",
    title: "Competitions Head",
    duration: "Sep 2021 - Present",
    content: [
      {
        text: "Qualified for the nationals of Indian Hip Hop Dance Championship",
        link: "",
      },
      {
        text: "Won 7 inter-college solo dance competitions",
        link: "",
      },
    ],
    logo: genesis,
  },
  {
    id: 4,
    organisation: "IRIS, NITK",
    title: "Tutor",
    duration: "Jan 2022 - Jan 2022",
    content: [
      {
        text: "Mentored 150+ students in a month-long Web Development and Ruby on Rails Bootcamp",
        link: "https://github.com/IRIS-NITK/IRIS-RoR-Bootcamp-2021",
      },
    ],
    logo: iris,
  },
  {
    id: 5,
    organisation: "E-Cell, NITK",
    title: "Executive Member",
    duration: "Sep 2021 - Apr 2022",
    content: [
      {
        text: "Organised the season 3 of the E-Cell NITK Podcast",
        link: "https://www.youtube.com/watch?v=uA-Yrk6bVDc",
      },
      {
        text: "Member of the Sponsorship and E-Talks team for E-Summit'22",
        link: "",
      },
    ],
    logo: ecell,
  },
];

// Links to your social media profiles
export const socialMedia = [
  {
    id: "social-media-1",
    icon: AiFillLinkedin,
    link: "https://www.linkedin.com/in/mittal-parth",
  },
  {
    id: "social-media-2",
    icon: AiFillGithub,
    link: "https://www.github.com/mittal-parth",
  },
  {
    id: "social-media-3",
    icon: AiFillMail,
    link: "mailto:work.parthmittal@gmail.com",
  },
  {
    id: "social-media-4",
    icon: AiOutlineTwitter,
    link: "https://www.twitter.com/mittalparth_",
  },
  {
    id: "social-media-5",
    icon: AiFillInstagram,
    link: "https://www.instagram.com/mittalparth_",
  },
];

// Your professional summary
export const aboutMe = {
  name: "Parth Mittal",
  githubUsername: "mittal-parth",
  tagLine:
    "MTS @ Oracle | 10x Hackathon Winner 🏆 | ETHIndia'22,24 Winner | NITK'24 | PBA-5",
  intro:
    "Software Developer from India who is either busy improving his craft or pondering over the next big idea.",
};

// The maximum number of PRs to be displayed in the Open Source Contributions section.
export const itemsToFetch = 20;

// Add names of GitHub repos you'd like to display open source contributions from in the 'org/repo' format.
export const includedRepos = [
  "publiclab/plots2",
  "zulip/zulip",
  "paritytech/polkadot-sdk",
];
