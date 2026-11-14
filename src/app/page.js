import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import HeroBackground from "./components/HeroBackground";

const Divider = () => (
  <div aria-hidden="true" className="my-4 h-px w-full bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
);

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-clip">
      <div aria-hidden="true" className="star-dust pointer-events-none fixed inset-0" />
      <Navbar />
      <header className="relative overflow-hidden border-b border-white/5 pt-20 md:pt-24">
        <HeroBackground />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">
          <HeroSection />
        </div>
      </header>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 py-10">
        <SkillsSection />
        <Divider />
        <ProjectsSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
