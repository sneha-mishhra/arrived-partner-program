// PAGE: /partners/designers
// Matches Figma structure exactly.
// Each component maps 1:1 to a future Contentful content type.

import Hero from "@/components/Hero";
import BenefitsGrid from "@/components/BenefitsGrid";
import ProcessSteps from "@/components/ProcessSteps";
import DesignJamCard from "@/components/DesignJamCard";
import FAQ from "@/components/FAQ";
import ApplyForm from "@/components/ApplyForm";
import Footer from "@/components/Footer";

// The apply section reads its form config from the Arrived event, so the page
// re-fetches every 5 minutes instead of baking the CMS state in at build time.
export const revalidate = 300;

export default function Page() {
  return (
    <main className="w-full">
      <Hero />
      <BenefitsGrid />
      <ProcessSteps />
      <DesignJamCard />
      <FAQ />
      <ApplyForm />
      <Footer />
    </main>
  );
}
