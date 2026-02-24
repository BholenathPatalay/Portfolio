import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Education from "./pages/Education";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-(--bg-dark) text-(--txt) antialiased">
      <Navbar />
      <main>
        {/* Each section's id matches a NAV_ITEMS entry */}
        <section id="home" className="scroll-mt-20 md:scroll-mt-24">
          <Home />
        </section>
        <section id="about" className="scroll-mt-20 md:scroll-mt-24">
          <About />
        </section>
        <section id="skills" className="scroll-mt-20 md:scroll-mt-24">
          <Skills />
        </section>
        <section id="projects" className="scroll-mt-20 md:scroll-mt-24">
          <Projects />
        </section>
        <section id="education" className="scroll-mt-20 md:scroll-mt-24">
          <Education />
        </section>
        <section id="contact" className="scroll-mt-20 md:scroll-mt-24">
          <Contact />
        </section>
      </main>
    </div>
  );
}
