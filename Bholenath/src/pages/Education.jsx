import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, GraduationCap, Calendar, Award } from "lucide-react";
import StrokeRevealTitle from "../components/StrokeRevealTitle";

const timelineContainer = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Education = () => {
  const educationData = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Nishitha Pg & Degree College",
      year: "2022 - 2024",
      score: "7.34 CGPA",
      highlights: [
        "Specialized in Web Technologies",
        "Data Structures, DBMS, Algorithms",
      ],
    },
    {
      degree: "Bachelor of Computer Science (BSc)",
      institution: "Ushodaya Degree College",
      year: "2018 - 2021",
      score: "7.81 CGPA",
      highlights: ["Foundation in Programming", "Database Concepts"],
    },
    {
      degree: "Intermediate (12th Grade)",
      institution: "Sri Gayatri Junior College",
      year: "2016 - 2018",
      score: "74%",
      highlights: ["Mathematics, Physics, Chemistry"],
    },
    {
      degree: "Secondary School (10th Grade)",
      institution: "St. Don Bosco High School",
      year: "2015 - 2016",
      score: "8.2 CGPA",
      highlights: ["Mathematics, Science"],
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-8 md:py-24 bg-[(--bkg)] text-[(--txt)]">
      {/* SECTION TITLE */}
      <div className="flex justify-center mb-12 md:mb-20">
        <StrokeRevealTitle className="text-4xl font-black tracking-widest uppercase sm:text-6xl lg:text-8xl">
          EDUCATION
        </StrokeRevealTitle>
      </div>

      {/* RESPONSIVE GRID */}
      <motion.div
        className="grid max-w-6xl grid-cols-1 gap-4 mx-auto md:grid-cols-2 md:gap-6"
        variants={timelineContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="
              group relative p-5 md:p-8 
              rounded-2xl md:rounded-3xl 
              border border-[(--border)]/20 
              bg-[(--bg-light)]/5 
              hover:bg-[(--bg-light)]/10 
              hover:border-[(--border)]/50
              transition-all duration-300
            "
          >
            {/* Degree & Score Row */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="text-lg font-bold leading-tight md:text-2xl">
                {edu.degree}
              </h3>
              <div className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[(--primary)]/10 text-[(--primary)] text-[10px] md:text-xs font-bold border border-[(--primary)]/20">
                <Award size={14} />
                {edu.score}
              </div>
            </div>

            {/* Institution & Year */}
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-2 text-xs md:text-sm text-[(--txt-muted)] font-medium">
                <GraduationCap size={16} className="text-[(--primary)]" />
                {edu.institution}
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-[(--txt-muted)]">
                <Calendar size={14} className="text-[(--primary)]" />
                {edu.year}
              </div>
            </div>

            {/* Highlights */}
            <ul className="space-y-2">
              {edu.highlights.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ChevronRight
                    size={14}
                    className="mt-1 shrink-0 text-[(--primary)]"
                    strokeWidth={3}
                  />
                  <span className="text-sm md:text-base text-[(--txt-muted)] group-hover:text-[(--txt)] transition-colors">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Education;
