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

function Hamburger({ open, toggle }) {
  const lineClass =
    "absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 bg-(--txt)";
  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        toggle();
      }}
      whileTap={{ scale: 0.9 }}
      className="relative flex items-center justify-center h-9 w-9 md:hidden"
    >
      <motion.div
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: -6 }}
        className={lineClass}
      />
      <motion.div
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        className={lineClass}
      />
      <motion.div
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 6 }}
        className={lineClass}
      />
    </motion.button>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isManualScrolling = useRef(false);

  // 1. Scroll Shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Optimized Intersection Observer (Scroll Spy)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Triggers when the section is near the middle
      threshold: 0,
    };

    const observerCallback = (entries) => {
      if (isManualScrolling.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 3. Robust Handle Select
  const handleSelect = (id) => {
    setActive(id);
    setOpen(false);
    isManualScrolling.current = true;

    // Use a tiny timeout to allow the mobile menu state to start closing
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      // Re-enable scroll spy after scroll finishes
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 1000);
    }, 10);
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 py-4 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`
          relative pointer-events-auto w-full max-w-4xl rounded-2xl border border-white/10 
          backdrop-blur-xl bg-white/5 transition-all duration-300
        
          ${
            scrolled
              ? "bg-white/10 shadow-xl shadow-black/20"
              : "bg-white/5 shadow-sm"
          }
        `}
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

        <div className="flex items-center px-5 py-3">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleSelect("home")}
          >
            <div className="flex items-center justify-center w-8 h-8 font-black text-black transition-transform shadow-lg rounded-xl bg-linear-to-br from-yellow-300 to-yellow-500 group-hover:scale-110">
              BP
            </div>
            <span className="font-bold tracking-wide">Bholenath</span>
          </div>

          {/* Desktop Nav */}
          <div className="justify-center flex-1 hidden gap-1 md:flex">
            <LayoutGroup id="desktop-nav">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className="relative px-4 py-2 text-sm font-semibold rounded-full"
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="pill"
                      className="absolute inset-0 rounded-full bg-(--nav-bg-dark) shadow-md"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors ${active === item.id ? "text-(--nav-text)" : "text-(--txt) opacity-60 hover:opacity-100"}`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </LayoutGroup>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <ThemeToggle />
            <Hamburger open={open} toggle={() => setOpen(!open)} />
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden md:hidden"
            >
              <div className="px-4 pb-4 space-y-1">
                <LayoutGroup id="mobile-nav">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className="relative block w-full px-4 py-3 text-left rounded-lg transition-active"
                    >
                      {active === item.id && (
                        <motion.div
                          layoutId="mobile-pill"
                          className="absolute inset-0 rounded-lg bg-(--nav-bg-dark) shadow-sm"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      <span
                        className={`relative z-10 ${active === item.id ? "text-(--nav-text) font-bold" : "text-(--txt) opacity-80"}`}
                      >
                        {item.label}
                      </span>
                    </button>
                  ))}
                </LayoutGroup>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
