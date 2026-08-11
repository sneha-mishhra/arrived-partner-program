// PAGE: /partners/designers
// Matches Figma structure exactly.
// Each component maps 1:1 to a future Contentful content type.

import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import BenefitsGrid from "@/components/BenefitsGrid";
import ProcessSteps from "@/components/ProcessSteps";
import DesignJamCard from "@/components/DesignJamCard";
import FAQ from "@/components/FAQ";
import ApplyForm from "@/components/ApplyForm";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="w-full">
      <Hero />
      <FeatureCard />
      <BenefitsGrid />
      <ProcessSteps />
      <DesignJamCard />
      <FAQ />
      <ApplyForm />
      <Footer />
    </main>
  );
}
