import React from "react";
import { Download, Github, Linkedin } from "lucide-react";
import Reveal from "../hooks/Reveal";

const buttons = [
  {
    href: "/Bholenath_Resume.pdf",
    label: "Download Resume",
    ariaLabel: "Download resume",
    icon: <Download size={22} />,
    download: true,
  },
  {
    href: "https://github.com/BholenathPatalay",
    label: "GitHub",
    ariaLabel: "View GitHub profile",
    icon: <Github size={22} />,
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/bholenath-patalay-14041822a/",
    label: "LinkedIn",
    ariaLabel: "View LinkedIn profile",
    icon: <Linkedin size={22} />,
    external: true,
  },
];

const Home = () => {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen pb-24 pt-28"
    >
      <div className="w-full max-w-6xl px-4 mx-auto text-center sm:px-6">
        {/* Greeting */}
        <Reveal delay={0.05}>
          <h2 className="font-black text-[clamp(3rem,6vw,6rem)] leading-[0.95] text-[--txt]">
            Hi,
          </h2>
        </Reveal>
        {/* Name */}
        <Reveal delay={0.15}>
          <h1 className="mt-3 font-black leading-[0.95] text-[--txt] text-[clamp(3rem,5vw,6rem)]">
            <span className="block">I&apos;M BHOLENATH</span>
            <span className="block">PATALAY</span>
          </h1>
        </Reveal>
        {/* Description */}
        <Reveal delay={0.25}>
          <p className="max-w-2xl mx-auto mt-6 text-lg leading-relaxed text-[--txt-muted] sm:text-xl">
            A full-stack developer passionate about building responsive, modern
            web applications.
          </p>
        </Reveal>
        {/* Action Buttons */}
        <Reveal delay={0.25}>
          <div className="flex flex-wrap justify-center gap-4 mt-10 sm:gap-5">
            {buttons.map((btn, index) => (
              <a
                key={index}
                href={btn.href}
                aria-label={btn.ariaLabel}
                download={btn.download}
                target={btn.external ? "_blank" : undefined}
                rel={btn.external ? "noopener noreferrer" : undefined}
                className="
                  group
                  relative
                  inline-flex
                  items-center
                  h-12
                  min-w-12
                  max-w-12
                  overflow-hidden
                  rounded-full
                  border
                border-yellow-400/20
                  bg-linear-to-br from-yellow-300 to-yellow-500
                  transition-all
                  duration-500
                  ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                  hover:max-w-64
                  focus-visible:max-w-64
                  shadow-lg
                  shadow-yellow-500/20
                  pr-0
                  hover:pr-5
                "
              >
                <span className="flex items-center justify-center w-12 h-12 text-black transition-transform duration-300 shrink-0 group-hover:scale-110">
                  {btn.icon}
                </span>

                <span className="text-sm font-black tracking-wider text-black uppercase transition-opacity duration-300 delay-100 opacity-0 whitespace-nowrap group-hover:opacity-100">
                  {btn.label}
                </span>

                <div className="absolute inset-0 transition-transform duration-700 ease-in-out translate-x-full pointer-events-none group-hover:translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Home;
