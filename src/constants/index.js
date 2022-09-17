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
  bank
} from "../assets";

import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillMail,
  AiOutlineTwitter,
  AiFillHtml5,
} from "react-icons/ai";

import {
  SiDjango,
  SiSqlite,
  SiJavascript,
  SiBootstrap,
  SiReact,
  SiMaterialui,
  SiTailwindcss
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
    id: "Contact Me",
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
        id: "icon-3",
        icon: AiFillHtml5,
      },
      {
        id: "icon-4",
        icon: DiCss3,
      },
      {
        id: "icon-5",
        icon: SiJavascript,
      },
      {
        id: "icon-6",
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
        id: "icon-3",
        icon: AiFillHtml5,
      },
      {
        id: "icon-4",
        icon: DiCss3,
      }
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
