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
} from "../assets";

import { AiFillGithub, AiFillInstagram, AiFillLinkedin, AiFillMail, AiOutlineTwitter } from 'react-icons/ai';

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

export const feedback = [
  {
    id: "feedback-1",
    content:
      "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.",
    name: "Herman Jensen",
    title: "Founder & Leader",
    img: people01,
  },
  {
    id: "feedback-2",
    content:
      "Money makes your life easier. If you're lucky to have it, you're lucky.",
    name: "Steve Mark",
    title: "Founder & Leader",
    img: people02,
  },
  {
    id: "feedback-3",
    content:
      "It is usually people in the money business, finance, and international trade that are really rich.",
    name: "Kenn Gallagher",
    title: "Founder & Leader",
    img: people03,
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
