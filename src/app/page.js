import Starfield from "./components/Starfield";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import SectionJump from "./components/SectionJump";

// the thin line between sections
const Divider = () => (
  <div className="mx-auto max-w-6xl px-4 sm:px-6"><hr className="border-white/15" /></div>
);

export default function Home() {
  return (
    <>
      <Starfield />
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <Projects />
        <Divider />
        <Skills />
        <Divider />
        <Contact />
      </main>
      <SectionJump />
    </>
  );
}
