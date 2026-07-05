import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0f0e11] w-full flex flex-col">
      <Hero />
      
      <About />

      <Services />

      <Portfolio />

      <Contact />

      <Footer />
    </main>
  );
}
