import React from "react";
import { motion } from "framer-motion";
import StrokeRevealTitle from "../components/StrokeRevealTitle";

const skills = [
  { name: "MongoDB", category: "database" },
  { name: "Express.js", category: "backend" },
  { name: "React", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "JavaScript", category: "language" },
  { name: "Java", category: "language" },
  { name: "Git & GitHub", category: "tools" },
  { name: "REST APIs", category: "backend" },
  { name: "HTML", category: "markup" },
  { name: "Framer Motion", category: "frontend" },
  { name: "C++", category: "language" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    },
  }),
};

const Skills = () => {
  return (
    <section id="skills" className="px-6 py-20 md:py-28 lg:py-32">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <div className="mb-10 md:mb-12">
          <StrokeRevealTitle className="mb-8 text-4xl font-black tracking-wide uppercase sm:text-6xl lg:text-8xl">
            SKILLS
          </StrokeRevealTitle>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="group relative flex flex-col items-center justify-center p-5 
                         bg-(--bg-light)/50 backdrop-blur-md
                         border border-(--border) rounded-2xl 
                         transition-all duration-300 hover:border-(--txt-muted)"
            >
              {/* v4 Linear Background Overlay */}
              <div className="absolute inset-0 transition-opacity duration-500 rounded-2xl opacity-0 group-hover:opacity-100 bg-linear-to-br from-(--primary)/10 via-transparent to-transparent" />

              {/* Skill Name */}
              <span className="relative z-10 text-center font-bold text-(--txt) text-sm sm:text-base tracking-tight">
                {skill.name}
              </span>

              {/* Category */}
              <span className="relative z-10 text-center text-[10px] sm:text-xs text-(--txt-muted) mt-1.5 uppercase tracking-widest font-medium opacity-70">
                {skill.category}
              </span>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-(--txt) rounded-full w-0 group-hover:w-1/3 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
