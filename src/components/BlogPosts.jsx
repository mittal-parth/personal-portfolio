import React from "react";
import { blogPosts } from "../constants";
import { AiFillGithub } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { motion } from "framer-motion";
import Button from "./Button";

// TODO: Improve the mobile version

const BlogPost = (props) => {
  return (
    <motion.div
      className="overflow-hidden transition-colors duration-300 transform border rounded-xl hover:border-transparent group dark:border-gray-700 dark:hover:border-transparent feature-card"
      whileInView={{ y: [-40, 0], opacity: [0, 1] }}
      transition={{ duration: 1 }}
    >
      <img
        className="flex-shrink-0 object-cover w-full h-24"
        src={props.image}
        alt=""
      />
      <div className="px-12 py-8 ">
        <div className="flex flex-col">
          <div>
            <p className="font-poppins font-normal text-dimWhite mb-3">
              2022-10-12T12:46:11.340Z
            </p>
            <h1 className="text-xl font-semibold font-poppins text-gray-700 capitalize md:text-2xl group-hover:text-white text-gradient">
              {props.title}
            </h1>
            <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">
              <div className="flex sm:flex-row">
                {props.stack.map((tech, index) => (
                  <div
                    key={tech.id}
                    index={index}
                    className="text-dimWhite mr-5 text-[20px] hover:text-teal-200 tooltip"
                  >
                    {React.createElement(tech.icon)}
                    <span class="tooltiptext">{tech.name}</span>
                  </div>
                ))}
              </div>
            </p>
          </div>
        </div>

        <p className="mt-8 text-gray-500 dark:text-gray-300 group-hover:text-gray-300 font-poppins">
          {props.content}
        </p>

        <div className="flex justify-between mt-4 -mx-2">
          <div className="flex">
            {props.github ? (
              <a href={props.github} target="_blank">
                <AiFillGithub
                  size="2rem"
                  className="text-white mr-1 hover:text-teal-200"
                ></AiFillGithub>
              </a>
            ) : (
              ""
            )}
            {props.link ? (
              <a href={props.link} target="_blank">
                <BsLink45Deg
                  size="2rem"
                  className="text-white hover:text-teal-200"
                ></BsLink45Deg>
              </a>
            ) : (
              ""
            )}
          </div>
          <div>
            <Button styles="" text="Read more &rarr;" icon="AiFillGithub" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BlogPosts = () => {
  return (
    <section id="blog">
      <h1 className="flex-1 font-poppins font-semibold ss:text-[55px] text-[45px] text-white ss:leading-[80px] leading-[80px]">
        Blog Posts
      </h1>

      <div className="container px-2 py-10 mx-auto mb-8">
        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-3">
          {blogPosts.map((posts, index) => (
            <BlogPost key={posts.id} index={index} {...posts} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
