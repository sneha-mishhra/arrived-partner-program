// Partner page, built on a custom --p-* CSS token system with Arrived's
// content: SkyHero, Benefits, UseCases, HowItWorks, Jam, FAQ, Apply, Footer,
// tied together by a recurring drifting/falling cloud motif.

import Apply from "@/components/v2/Apply";
import Benefits from "@/components/v2/Benefits";
import FAQ from "@/components/v2/FAQ";
import Footer from "@/components/v2/Footer";
import HowItWorks from "@/components/v2/HowItWorks";
import SkyHero from "@/components/v2/SkyHero";
import Jam from "@/components/v2/Jam";
import Nav from "@/components/v2/Nav";
import UseCases from "@/components/v2/UseCases";

// Apply reads the Arrived event's form config, so refresh it on the same
// cadence as the rest of the page's data.
export const revalidate = 300;

export default function Page() {
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
