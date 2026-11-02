import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import LightningCanvas from "./components/LightningCanvas";
import SmokeBackground from "./components/SmokeBackground";
import VoltDivider from "./components/VoltDivider";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <SmokeBackground />
      <LightningCanvas />
      <Navbar />
      <div className="relative z-10 container mt-20 md:mt-24 mx-auto px-4 sm:px-6 lg:px-12 py-4">
        <HeroSection />
        <VoltDivider />
        <SkillsSection />
        <VoltDivider />
        <ProjectsSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
