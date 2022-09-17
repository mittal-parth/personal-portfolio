import {
  people01,
  people02,
  people03,
  facebook,
  instagram,
  linkedin,
  twitter,
  airbnb,
  binance,
  coinbase,
  dropbox,
  send,
  shield,
  star,
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
  graphql
} from "../assets";

import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillMail,
  AiOutlineTwitter,
  AiFillHtml5,
  AiOutlineGoogle,
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
} from "react-icons/si";

import { DiCss3 } from "react-icons/di";

export const navLinks = [
  {
    id: "education",
    title: "Education",
  },
  {
    id: "skills",
    title: "Skills & Experience",
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
      },
      {
        id: "icon-2",
        icon: AiFillHtml5,
      },
      {
        id: "icon-3",
        icon: DiCss3,
      },
      {
        id: "icon-4",
        icon: SiJavascript,
      },
      {
        id: "icon-5",
        icon: SiBootstrap,
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
      },
      {
        id: "icon-2",
        icon: AiFillHtml5,
      },
      {
        id: "icon-3",
        icon: DiCss3,
      },
      {
        id: "icon-4",
        icon: SiMaterialui,
      },
    ],
  },
  {
    id: "project-3",
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
      },
      {
        id: "icon-4",
        icon: SiMaterialui,
      },
      {
        id: "icon-5",
        icon: SiTailwindcss,
      },
    ],
  },
  {
    id: "project-4",
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
      },
      {
        id: "icon-2",
        icon: AiFillHtml5,
      },
      {
        id: "icon-3",
        icon: DiCss3,
      },
    ],
  },
  {
    id: "project-5",
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
      },
      {
        id: "icon-2",
        icon: SiDjango,
      },
    ],
  },
  {
    id: "project-6",
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
      },

      {
        id: "icon-2",
        icon: AiOutlineGoogle,
      },
      {
        id: "icon-3",
        icon: AiFillHtml5,
      },
      {
        id: "icon-4",
        icon: DiCss3,
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
