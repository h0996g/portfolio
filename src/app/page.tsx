import Script from "next/script";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/sweetalert2@11"
        strategy="beforeInteractive"
      />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <WorkExperience />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
