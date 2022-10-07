import {
  airbnb,
  binance,
  coinbase,
  dropbox,
  nitk,
  cluboard,
  cash_flow,
  freadom,
  bank,
  gdsc,
  iris,
  ecell,
  genesis,
  todo,
  graphql,
  portfolio,
  publiclab,
  zulip,
  cdc,
} from "../assets";

import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillMail,
  AiOutlineTwitter,
  AiFillHtml5,
  AiOutlineGoogle,
  AiOutlineGitlab,
} from "react-icons/ai";

import {
  SiDjango,
  SiSqlite,
  SiJavascript,
  SiBootstrap,
  SiReact,
  SiMaterialui,
  SiTailwindcss,
  SiGraphql,
  SiPython,
  SiCplusplus,
  SiC,
  SiRubyonrails,
  SiJquery,
  SiVisualstudiocode,
  SiPostman,
  SiGit,
  SiMysql,
  SiSolidity,
  SiNetlify,
  SiChartdotjs,
  SiVite,
} from "react-icons/si";

import { DiCss3, DiRuby } from "react-icons/di";

export const resumeLink = "https://drive.google.com/file/d/1wkPu9i_e2uAdHmbqe0hEM9BfBheJfxkT/view?usp=sharing";
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

export const educationList = [
  {
    id: "education-1",
    icon: nitk,
    title: "National Institute of Technology Karnataka, Surathkal",
    degree: "Bachelor of Technology",
    duration: "December 2020 - May 2024",
    content1: "Major: Electronics and Communication Engineering",
    content2: "Minor: Information Technology",
  },
];

export const skills = [
  {
    title: "Programming Languages",
    items: [
      {
        id: "pl-1",
        icon: SiCplusplus,
        name: "C++",
      },
      {
        id: "pl-2",
        icon: SiPython,
        name: "Python",
      },
      {
        id: "pl-3",
        icon: DiRuby,
        name: "Ruby",
      },
      {
        id: "pl-4",
        icon: SiC,
        name: "C",
      },
      {
        id: "pl-5",
        icon: AiFillHtml5,
        name: "HTML",
      },
      {
        id: "pl-6",
        icon: DiCss3,
        name: "CSS",
      },
      {
        id: "pl-7",
        icon: SiJavascript,
        name: "JavaScript",
      },
      {
        id: "pl-8",
        icon: SiSolidity,
        name: "Solidity",
      },
    ],
  },
  {
    title: "Frameworks/Libraries",
    items: [
      {
        id: "f-1",
        icon: SiDjango,
        name: "Django",
      },
      {
        id: "f-2",
        icon: SiRubyonrails,
        name: "Ruby on Rails",
      },
      {
        id: "f-3",
        icon: SiReact,
        name: "ReactJS",
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
    ],
  },
  {
    title: "Tools",
    items: [
      {
        id: "t-1",
        icon: SiMysql,
        name: "MySQL",
      },
      {
        id: "t-2",
        icon: SiPostman,
        name: "Postman",
      },
      {
        id: "t-3",
        icon: SiVisualstudiocode,
        name: "VS Code",
      },
      {
        id: "t-4",
        icon: SiGit,
        name: "Git",
      },
      {
        id: "t-5",
        icon: AiFillGithub,
        name: "GitHub",
      },
      {
        id: "t-6",
        icon: AiOutlineGitlab,
        name: "Gitlab",
      },
      {
        id: "t-7",
        icon: SiNetlify,
        name: "Netlify",
      },
      {
        id: "t-8",
        icon: SiVite,
        name: "ViteJS",
      },
    ],
  },
];

export const experiences = [
  {
    organisation: "IRIS, NITK",
    logo: iris,
    link: "https://iris.nitk.ac.in/about_us",
    positions: [
      {
        title: "Web Manager",
        duration: "Apr 2022 - Present",
        content: [
          {
            text: "Managing a team of 6 student developers while also overlooking multiple modules.",
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
  {
    organisation: "Career Development Centre, NITK",
    logo: cdc,
    link: "https://cdc.nitk.ac.in/",
    positions: [
      {
        title: "Lead Developer",
        duration: "May 2022 - July 2022",
        content: [
          {
            text: "Led a team of 3 developers and developed various parts of the official public website using Ruby on Rails.",
            link: "",
          },
          {
            text: "Setup an admin interface for dynamic content management by different stakeholders.",
            link: "",
          },
        ],
      },
    ],
  },
];

export const openSourceContributions = [
  {
    id: "os-1",
    organisation: "PublicLab",
    logo: publiclab,
    repo: "plots2",
    type: "pull-request",
    status: "merged",
    title:
      "Move _wiki to old table look, common template for email and settings digest only",
    link: "https://github.com/publiclab/plots2/pull/10731",
    number: "#10731",
    date: "Feb 24 2022",
    linesAdded: "101",
    linesDeleted: "48",
  },
  {
    id: "os-2",
    organisation: "PublicLab",
    logo: publiclab,
    repo: "plots2",
    type: "pull-request",
    status: "merged",
    title: "Combine templates for email digest and settings digest",
    link: "https://github.com/publiclab/plots2/pull/10681",
    number: "#10681",
    date: "Feb 9 2022",
    linesAdded: "86",
    linesDeleted: "106",
  },
  {
    id: "os-3",
    organisation: "PublicLab",
    logo: publiclab,
    repo: "plots2",
    type: "pull-request",
    status: "merged",
    title: "Fix reverse chronological sorting on inline grids",
    link: "https://github.com/publiclab/plots2/pull/11114",
    number: "#11114",
    date: "May 4 2022",
    linesAdded: "1",
    linesDeleted: "1",
  },
  {
    id: "os-4",
    organisation: "PublicLab",
    logo: publiclab,
    repo: "plots2",
    type: "pull-request",
    status: "merged",
    title: "style: Make post page footer responsive",
    link: "https://github.com/publiclab/plots2/pull/10634",
    number: "#10634",
    date: "Feb 24 2022",
    linesAdded: "64",
    linesDeleted: "8",
  },
  {
    id: "os-5",
    organisation: "PublicLab",
    logo: publiclab,
    repo: "plots2",
    type: "issue",
    status: "closed",
    title: "Typos in Translation_System.md",
    link: "https://github.com/publiclab/plots2/issues/11120",
    number: "#11120",
    date: "May 6 2022",
    linesAdded: "",
    linesDeleted: "",
  },
  {
    id: "os-6",
    organisation: "PublicLab",
    logo: publiclab,
    repo: "plots2",
    type: "issue",
    status: "closed",
    title: "Missing translations on layouts/_header.html.erb",
    link: "https://github.com/publiclab/plots2/issues/11115",
    number: "#11115",
    date: "May 4 2022",
    linesAdded: "",
    linesDeleted: "",
  },
  {
    id: "os-7",
    organisation: "PublicLab",
    logo: publiclab,
    repo: "plots2",
    type: "issue",
    status: "closed",
    title: "Missing translation of 'This is part of' on _tagging.html.erb",
    link: "https://github.com/publiclab/plots2/issues/10986",
    number: "#10986",
    date: "Apr 8 2022",
    linesAdded: "",
    linesDeleted: "",
  },
  {
    id: "os-8",
    organisation: "PublicLab",
    logo: publiclab,
    repo: "plots2",
    type: "issue",
    status: "closed",
    title: "Wrong closing heading tag in _digest.html.erb",
    link: "https://github.com/publiclab/plots2/issues/10985",
    number: "#10985",
    date: "Apr 8 2022",
    linesAdded: "",
    linesDeleted: "",
  },
  {
    id: "os-9",
    organisation: "PublicLab",
    logo: publiclab,
    repo: "plots2",
    type: "issue",
    status: "closed",
    title: "Add class to center wiki.scraped_image in wikis template",
    link: "https://github.com/publiclab/plots2/issues/10797",
    number: "#10797",
    date: "Mar 18 2022",
    linesAdded: "",
    linesDeleted: "",
  },
  {
    id: "os-10",
    organisation: "PublicLab",
    logo: publiclab,
    repo: "plots2",
    type: "issue",
    status: "closed",
    title: "Images on /wiki are not center aligned",
    link: "https://github.com/publiclab/plots2/issues/10755",
    number: "#10755",
    date: "Mar 4 2022",
    linesAdded: "",
    linesDeleted: "",
  },
  {
    id: "os-11",
    organisation: "Zulip",
    logo: zulip,
    repo: "zulip",
    type: "pull-request",
    status: "merged",
    title: "invitations: Check invitation from a now-deactivated user.",
    link: "https://github.com/zulip/zulip/pull/20206",
    number: "#20206",
    date: "Dec 30 2021",
    linesAdded: "31",
    linesDeleted: "1",
  },
  {
    id: "os-12",
    organisation: "Zulip",
    logo: zulip,
    repo: "zulip",
    type: "pull-request",
    status: "merged",
    title: "invitations: Check invitation from a now-deactivated user.",
    link: "https://github.com/zulip/zulip/pull/20206",
    number: "#20206",
    date: "Dec 30 2021",
    linesAdded: "31",
    linesDeleted: "1",
  },
  {
    id: "os-13",
    organisation: "Zulip",
    logo: zulip,
    repo: "zulip",
    type: "pull-request",
    status: "merged",
    title: "authentication: Fix placeholder realms for redirects.",
    link: "https://github.com/zulip/zulip/pull/19689",
    number: "#19689",
    date: "Sep 9 2021",
    linesAdded: "1",
    linesDeleted: "1",
  },
  {
    id: "os-14",
    organisation: "Zulip",
    logo: zulip,
    repo: "zulip",
    type: "pull-request",
    status: "merged",
    title: "message_editing : Fix topic edit propagate option cut-off",
    link: "https://github.com/zulip/zulip/pull/19760",
    number: "#19760",
    date: "Feb 10 2022",
    linesAdded: "9",
    linesDeleted: "8",
  },
];

export const projects = [
  {
    id: "project-1",
    title: "Cluboard",
    github: "https://github.com/mittal-parth/Cluboard",
    link: "",
    image: cluboard,
    content:
      "A full-stack web application to facilitate sharing resources in college clubs with email notifications, requests and ticketing system, and analytical dashboards.",
    stack: [
      {
        id: "icon-1",
        icon: SiDjango,
        name: "Django"
      },
      {
        id: "icon-2",
        icon: AiFillHtml5,
        name: "HTML"
      },
      {
        id: "icon-3",
        icon: DiCss3,
        name: "CSS"
      },
      {
        id: "icon-4",
        icon: SiJavascript,
        name: "JavaScript"
      },
      {
        id: "icon-5",
        icon: SiBootstrap,
        name: "Bootstrap"
      },
      {
        id: "icon-6",
        icon: SiChartdotjs,
        name: "Chart.js"
      },
    ],
  },
  {
    id: "project-2",
    title: "Cash Flow Minimiser",
    github: "https://github.com/mittal-parth/Cash-Flow-Minmiser",
    link: "https://minimise-cash-flow.netlify.app/",
    image: cash_flow,
    content:
      "A React application to help users visualise and minimise cash flow among multiple transactions.",
    stack: [
      {
        id: "icon-1",
        icon: SiReact,
        name: "React"
      },
      {
        id: "icon-2",
        icon: AiFillHtml5,
        name: "HTML"
      },
      {
        id: "icon-3",
        icon: DiCss3,
        name: "CSS"
      },
      {
        id: "icon-4",
        icon: SiMaterialui,
        name: "Material UI"
      },
    ],
  },
  {
    id: "project-3",
    title: "Portfolio",
    github: "https://github.com/mittal-parth/personal-portfolio",
    link: "https://parthmittal.netlify.app/",
    image: portfolio,
    content: "Personal portfolio website with React and Tailwind CSS.",
    stack: [
      {
        id: "icon-1",
        icon: SiReact,
        name: "React"
      },
      {
        id: "icon-2",
        icon: SiTailwindcss,
        name: "Tailwind CSS"
      },
      {
        id: "icon-3",
        icon: AiFillHtml5,
        name: "HTML"
      },
    ],
  },
  {
    id: "project-4",
    title: "Bank Landing Page",
    github: "https://github.com/mittal-parth/bank-landing-page-react",
    link: "https://bank-landing-page-parth.netlify.app/",
    image: bank,
    content:
      "A landing page for a bank with modern UI/UX using React and Tailwind.",
    stack: [
      {
        id: "icon-1",
        icon: SiReact,
        name: "React"
      },
      {
        id: "icon-4",
        icon: SiMaterialui,
        name: "Material UI"
      },
      {
        id: "icon-5",
        icon: SiTailwindcss,
        name: "Tailwind CSS"
      },
    ],
  },
  {
    id: "project-5",
    title: "Freadom",
    github: "https://github.com/mittal-parth/Freadom",
    link: "",
    image: freadom,
    content:
      "A simple tool to scrape articles. Works even on websites that dont allow users to read the content without logging in.",
    stack: [
      {
        id: "icon-1",
        icon: SiDjango,
        name: "Django"
      },
      {
        id: "icon-2",
        icon: AiFillHtml5,
        name: "HTML"
      },
      {
        id: "icon-3",
        icon: DiCss3,
        name: "CSS"
      },
    ],
  },
  {
    id: "project-6",
    title: "GraphQL API",
    github: "https://github.com/mittal-parth/GSDC-NITK-CRUD-API",
    link: "",
    image: graphql,
    content:
      "A Django based CRUD API using GraphQL to manage employees in an organization.",
    stack: [
      {
        id: "icon-1",
        icon: SiGraphql,
        name: "GraphQL"
      },
      {
        id: "icon-2",
        icon: SiDjango,
        name: "Django"
      },
    ],
  },
  {
    id: "project-7",
    title: "To-Do App 2.0",
    github: "https://github.com/mittal-parth/To-Do-App-2.0",
    link: "",
    image: todo,
    content:
      "A Progressive Web Application with Google OAuth, media and speech to text features.",
    stack: [
      {
        id: "icon-1",
        icon: SiDjango,
        name: "Django"
      },

      {
        id: "icon-2",
        icon: AiOutlineGoogle,
        name: "Google OAuth"
      },
      {
        id: "icon-3",
        icon: AiFillHtml5,
        name: "HTML"
      },
      {
        id: "icon-4",
        icon: DiCss3,
        name: "CSS"
      },
    ],
  },
];

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

export const extraCurricular = [
  {
    organisation: "Google Developer Student Club, NITK",
    title: "Executive Member",
    duration: "December 2021 - Present",
    content: [
      {
        text: "Co-designed and developed the official website of Incident, NITK with 15K+ visitors",
        link: "https://incident.nitk.ac.in/",
      },
    ],
    logo: gdsc,
  },
  {
    organisation: "Genesis, NITK",
    title: "Executive Member",
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
    link: "mailto:mittalparth22@gmail.com",
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

export const clients = [
  {
    id: "client-1",
    logo: airbnb,
  },
  {
    id: "client-2",
    logo: binance,
  },
  {
    id: "client-3",
    logo: coinbase,
  },
  {
    id: "client-4",
    logo: dropbox,
  },
];

export const aboutMe = {
    name: "Parth Mittal",
    tagLine: "Web Manager @ IRIS, NITK | Executive Member at GDSC, NITK",
    intro: "Student web-developer from India who is either busy improving his craft or pondering over the next big idea."
}

