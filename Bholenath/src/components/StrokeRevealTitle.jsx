import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

const StrokeRevealTitle = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [filled, setFilled] = useState(false);

  // Track scroll progress of this title
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "start 35%"], // tune if needed
  });

  // Toggle fill based on scroll direction & threshold
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.5 && !filled) {
      setFilled(true); // scrolling down → fill
    } else if (latest < 0.5 && filled) {
      setFilled(false); // scrolling up → outline
    }
  });

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {/* Outline always visible */}
      <h2 className="outlined-stroke">{children}</h2>

      {/* Fill toggled by scroll */}
      <motion.h2
        className="absolute inset-0 outlined-fill"
        style={{ visibility: filled ? "visible" : "hidden" }}
      >
        {children}
      </motion.h2>
    </div>
  );
};

export default StrokeRevealTitle;
