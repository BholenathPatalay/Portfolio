import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ProjectCard = ({ index, client, title, images, live }) => {
  const padded = String(index).padStart(2, "0");

  return (
    <div className="sticky w-full top-16 md:top-24">
      <motion.div
        whileHover="hover"
        initial="rest"
        animate="rest"
        className="
        relative w-full
        rounded-2xl md:rounded-3xl
        border border-[(--border)]/30
        bg-[(--bg)]
        overflow-hidden
        p-4 md:p-8
        transition-all duration-500
        hover:border-[(--border)]/70
        "
      >
        {/*  TOP SECTION  */}
        <div className="flex flex-row items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-3 md:gap-4">
            <motion.span
              variants={{
                rest: { opacity: 0.15, y: 0 },
                hover: { opacity: 0.35, y: -2 },
              }}
              className="text-3xl md:text-5xl font-black tabular-nums text-[(--txt)]"
            >
              {padded}
            </motion.span>

            <div className="w-px h-6 md:h-10 bg-[(--border)]/40" />

            <div className="flex flex-col">
              <motion.h2
                variants={{
                  rest: { x: 0 },
                  hover: { x: 3 },
                }}
                className="font-bold text-base md:text-2xl text-[(--txt)] uppercase leading-tight"
              >
                {title}
              </motion.h2>
              <p className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-[(--txt-muted)]">
                {client}
              </p>
            </div>
          </div>

          {live && (
            <motion.a
              href={`${live}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] md:text-xs font-bold uppercase border border-[(--primary)]/30 text-[(--primary)] bg-[(--primary)]/5 hover:bg-[(--primary)]/10 transition-colors"
            >
              <span className="h-1 w-1 rounded-full bg-[(--primary)]" />
              Live <ArrowUpRight size={10} />
            </motion.a>
          )}
        </div>

        {/*  IMAGE SECTION */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
          {/* Main Image: 16:9 on mobile | Matches stack height on desktop */}
          <div className="relative aspect-video md:aspect-auto md:h-full overflow-hidden rounded-lg md:rounded-2xl bg-[--bg-light]">
            <motion.img
              src={images[0]}
              alt={title}
              variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 object-cover w-full h-full aspect-video"
            />
          </div>

          {/* Secondary Images */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-4">
            {[images[1], images[2]].map((src, i) => (
              <div
                key={i}
                className="relative aspect-video md:aspect-21/9 overflow-hidden rounded-lg md:rounded-2xl bg-[(--bg-light)]"
              >
                <motion.img
                  src={src}
                  alt={`${title}-${i}`}
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
