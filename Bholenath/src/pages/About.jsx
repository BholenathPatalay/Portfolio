import React from "react";
import { motion } from "framer-motion";
import StrokeRevealTitle from "../components/StrokeRevealTitle";

const About = () => {
  const text =
    "I'm an MCA graduate who loves building things with the MERN stack. From sleek frontends in React to powerful backends with Node.js, I enjoy turning ideas into real, working web apps. I'm passionate about clean code, learning new tech, and creating digital experiences that people enjoy using. Always eager to grow, collaborate, and bring value to the projects I work on.";

  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 5 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="px-6 sm:px-10 lg:px-20 py-20 bg-[(--bkg)] text-[(--txt)] overflow-hidden">
      <div className="max-w-4xl mx-auto text-center 2xl:max-w-6xl">
        {/* Title */}
        <StrokeRevealTitle className="mb-12 text-4xl font-black tracking-wide uppercase sm:text-6xl lg:text-8xl">
          ABOUT ME
        </StrokeRevealTitle>

        <motion.p
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto leading-relaxed text-lg sm:text-2xl lg:text-3xl font-medium max-w-[60ch] flex flex-wrap justify-center gap-x-2 gap-y-1"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </section>
  );
};

export default About;
