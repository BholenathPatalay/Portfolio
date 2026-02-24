import { motion } from "framer-motion";
import StrokeRevealTitle from "../components/StrokeRevealTitle";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    client: "Video calling website",
    title: "Meet",
    live: "https://meet-app-wheat.vercel.app",
    images: ["/meet.jpg", "/meethome.jpg", "/meet2.jpg"],
  },
  {
    client: "Trading Platform",
    title: "Zerodha_Clone",
    live: "https://zerodha-frontend-uex2.onrender.com",
    images: ["/zerodha.jpg", "/zerodhadashboard.jpg", "/zerodhaholdings.jpg"],
  },
  {
    client: "Ai Recipe Generator",
    title: "Chef_Claude",
    live: "https://chef-claude-8zk2.vercel.app/",
    images: ["/chefclaude2.jpg", "/chefclaude3.jpg", "/chefclaude.jpg"],
  },
];

// Animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const Projects = () => {
  return (
    <section className="px-4 py-12 overflow-hidden md:py-16 lg:py-20">
      {/* Title */}
      <div className="mb-8 text-center md:mb-12">
        <StrokeRevealTitle className="inline-block font-black tracking-[5px] text-4xl sm:text-6xl lg:text-8xl">
          PROJECTS
        </StrokeRevealTitle>
      </div>

      <div className="md:hidden">
        <div className="flex gap-6 px-4 pb-4 -mx-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="snap-center min-w-[85%] sm:min-w-[60%]"
            >
              <ProjectCard index={i + 1} {...project} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative hidden max-w-6xl mx-auto mt-8 md:block lg:mt-12">
        <div className="grid grid-cols-1 gap-16 lg:gap-24">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="sticky"
              style={{
                top: `${120 + i * 40}px`,
              }}
            >
              <ProjectCard index={i + 1} {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
