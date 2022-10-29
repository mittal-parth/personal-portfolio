import React from "react";
import { blogPosts } from "../constants";
import { motion } from "framer-motion";
import Button from "./Button";

const BlogPost = (props) => {
  return (
    <motion.div
      className="overflow-hidden transition-colors duration-300 transform border rounded-xl hover:border-transparent group dark:border-gray-700 dark:hover:border-transparent feature-card"
      whileInView={{ y: [-40, 0], opacity: [0, 1] }}
      transition={{ duration: 1 }}
    >
      <img
        className="flex-shrink-0 object-cover w-full h-40"
        src={props.image}
        alt=""
      />
      <div className="px-12 py-8 ">
        <div className="flex flex-col">
          <div>
            <p className="font-poppins font-normal text-dimWhite mb-3">
              {props.date}
            </p>
            <h1
              className="text-xl font-semibold font-poppins text-gray-700 capitalize md:text-2xl group-hover:text-white text-gradient blog-title"
              title={props.title}
            >
              {props.title}
            </h1>
            <p className="mt-5 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">
              <div className="flex sm:flex-row">
                {props.tags.map((tag, index) => (
                  <div
                    key={tag.id}
                    index={index}
                    className="text-dimWhite mr-5 text-sm hover:text-teal-200 p-1.5 ring-1 ring-dimWhite hover:ring-teal-200 rounded text-ellipsis whitespace-nowrap overflow-hidden"
                    title={tag.name}
                  >
                    <span className="cursor-default">{tag.name}</span>
                  </div>
                ))}
              </div>
            </p>
          </div>
        </div>

        <div className="mt-8">
          <a href={props.link} target="_blank">
            <Button text="Read more &rarr;" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const BlogPosts = (props) => {
  if (props.enabled !== true) return null;
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
