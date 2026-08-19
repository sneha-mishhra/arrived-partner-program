// Rebuilt partner page, built on the Verseo layout system with Arrived's
// content. Lives at /v2 so the current page stays live until this one is
// approved; swapping it in means moving this composition into app/page.tsx.

import type { Metadata } from "next";

import Apply from "@/components/v2/Apply";
import Benefits from "@/components/v2/Benefits";
import FAQ from "@/components/v2/FAQ";
import Footer from "@/components/v2/Footer";
import HowItWorks from "@/components/v2/HowItWorks";
import SkyHero from "@/components/v2/SkyHero";
import Jam from "@/components/v2/Jam";
import Nav from "@/components/v2/Nav";
import UseCases from "@/components/v2/UseCases";

export const metadata: Metadata = {
  title: "Design Event Websites & Brand Kits | Arrived Designer Partners",
  description:
    "Join Arrived's designer network. Get matched to clients who need brand kits, invites, signage, and custom design work, with real budgets and clear scope.",
  robots: { index: false, follow: false },
};

// Apply reads the Arrived event's form config, so refresh it on the same
// cadence as the live page.
export const revalidate = 300;

export default function PartnerPageV2() {
  return (
    <div className="p-page relative w-full overflow-x-clip">
      <Nav />
      <main>
        <SkyHero />
        <Benefits />
        <UseCases />
        <HowItWorks />
        <Jam />
        <FAQ />
        <Apply />
      </main>
      <Footer />
    </div>
  );
}
