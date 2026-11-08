import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PriceTicker from "@/components/PriceTicker";
import Solutions from "@/components/Solutions";
import Infrastructure from "@/components/Infrastructure";
import Clients from "@/components/Clients";
import Onboarding from "@/components/Onboarding";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PriceTicker />
        <Solutions />
        <Infrastructure />
        <Clients />
        <Onboarding />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
