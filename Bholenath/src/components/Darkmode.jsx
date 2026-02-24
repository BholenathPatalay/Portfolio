import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const [light, setLight] = useState(
    () => localStorage.getItem("theme") === "light",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    localStorage.setItem("theme", next ? "light" : "dark");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      className="
        relative flex h-8 w-8 items-center justify-center overflow-hidden
        rounded-xl  cursor-pointer        
        text-(--txt) transition-colors
        hover:bg-(--highlight)
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        {light ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="absolute flex items-center justify-center"
          >
            <Moon size={20} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="absolute flex items-center justify-center"
          >
            <Sun size={20} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
