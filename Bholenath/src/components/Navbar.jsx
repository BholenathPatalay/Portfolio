import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import ThemeToggle from "./Darkmode";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

/* hamburger */
function Hamburger({ open, toggle }) {
  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      className="relative flex items-center justify-center h-9 w-9 md:hidden"
    >
      {/* top line */}
      <motion.div
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: -6 }}
        className="absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 bg-(--txt)"
      />
      {/* middle line */}
      <motion.div
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        className="absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 bg-(--txt)"
      />
      {/* bottom line */}
      <motion.div
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 6 }}
        className="absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 bg-(--txt)"
      />
    </motion.button>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef();

  /* scroll shadow */
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  /* scroll spy */
  useEffect(() => {
    const handleScroll = () => {
      const middleOfScreen = window.scrollY + window.innerHeight / 2;

      for (let i = 0; i < NAV_ITEMS.length; i++) {
        const section = document.getElementById(NAV_ITEMS[i].id);
        if (!section) continue;

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (middleOfScreen >= top && middleOfScreen < bottom) {
          setActive(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* smooth scroll */
  const select = (id) => {
    setActive(id);
    setOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 py-4">
      <motion.nav
        ref={navRef}
        initial={{ y: -40, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        className={`
        relative
        w-full max-w-4xl
        rounded-2xl
        border border-white/10
        backdrop-blur-xl
        bg-white/5
        shadow-lg
        transition-all duration-500

        ${scrolled ? "shadow-[0_20px_60px_rgba(0,0,0,0.45)] bg-white/10" : ""}
        `}
      >
        {/* subtle bottom glow line */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

        <div className="flex items-center px-5 py-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div
              className="flex items-center justify-center w-8 h-8 font-black text-black shadow-lg  rounded-xl bg-linear-to-br from-yellow-300 to-yellow-500"
            >
              BP
            </div>

            <span className="font-bold tracking-wide">Bholenath</span>
          </motion.div>

          {/* desktop navigation */}
          <LayoutGroup>
            <div className="justify-center flex-1 hidden gap-2 md:flex">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => select(item.id)}
                    className="relative px-4 py-2 text-sm font-semibold rounded-full group"
                  >
                    {/* active pill */}
                    {isActive && (
                      <motion.span
                        layoutId="pill"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                          mass: 0.8,
                        }}
                        className="
                      absolute inset-0
                      rounded-full
                      bg-(--nav-bg-dark)
                      text-(--nav-text)
                      shadow-lg
                      "
                      />
                    )}

                    <span
                      className={`relative z-10 ${
                        isActive ? "text-(--nav-text)" : "text-(--txt)"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          {/* right side: theme toggle + hamburger */}
          <div className="flex items-center gap-2 ml-auto">
            <ThemeToggle />
            <Hamburger open={open} toggle={() => setOpen(!open)} />
          </div>
        </div>

        {/* mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden md:hidden"
            >
              <div className="px-4 pb-4 space-y-1">
                {/* Wrap mobile items with LayoutGroup to animate the pill */}
                <LayoutGroup>
                  {NAV_ITEMS.map((item, i) => {
                    const isActive = active === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => select(item.id)}
                        className="relative block w-full px-2 py-3 text-left rounded-lg"
                      >
                        {isActive && (
                          <motion.div
                            layoutId="mobile-pill"
                            className="absolute inset-0 rounded-lg bg-(--nav-bg-dark) shadow-lg"
                          />
                        )}
                        <span
                          className={`relative z-10 ${
                            isActive ? "text-(--nav-text)" : "text-(--txt)"
                          }`}
                        >
                          {item.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </LayoutGroup>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
