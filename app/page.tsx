import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InstitutionalMetrics from "@/components/metrics/InstitutionalMetrics";
// import PriceTicker from "@/components/PriceTicker";
import Solutions from "@/components/Solutions";

import Infrastructure from "@/components/Infrastructure";
import Clients from "@/components/Clients";
import JKVConnectivity from "@/components/JKVConnectivity";
// import Onboarding from "@/components/Onboarding";
// import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <InstitutionalMetrics />
        {/* <PriceTicker /> */}
        <Solutions />

        <Clients />
        <Infrastructure />
        <JKVConnectivity />
        {/* <Onboarding /> */}
        {/* <Contact /> */}
      </main>
      <Footer />
    </>
  );
}
