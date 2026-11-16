import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InstitutionalMetrics from "@/components/metrics/InstitutionalMetrics";
// import PriceTicker from "@/components/PriceTicker";
import Solutions from "@/components/Solutions";

import Infrastructure from "@/components/Infrastructure";
import Clients from "@/components/Clients";
import JKVConnectivity from "@/components/JKVConnectivity";
import RiskManagementShowcase from "@/components/RiskManagementShowcase";
import PrimePackagesSection from "@/components/PrimePackagesSection";
import AboutPrime from "@/components/AboutPrime";
import PrimeFAQ from "@/components/PrimeFAQ";
import PrimeContactForm from "@/components/PrimeContactForm";
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
        <RiskManagementShowcase />
        <PrimePackagesSection />
        <AboutPrime />
        <PrimeFAQ />

        <PrimeContactForm />
      </main>
      <Footer />
    </>
  );
}
