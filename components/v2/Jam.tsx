// Design jams. Heading, lead, and a simple scroll carousel of real jam
// photos over the drifting sky, then the CTA.

import JamCarousel, { type CarouselImage } from "./JamCarousel";
import Section from "./Section";
import Sky from "./Sky";
import { Reveal, RollButton } from "./motion";

// The default band spreads clouds down to 66% of the container's height.
// This section got a lot shorter once its padding was tightened, so those
// low clouds now drift over the cards and CTA below. Keep them confined to
// the top, clear of the content.
const JAM_BAND = [
  { art: "light" as const, left: -8, top: 4, width: 640, opacity: 0.75, drift: 34 },
  { art: "dark" as const, left: 58, top: 12, width: 480, opacity: 0.45, drift: 30 },
];

const JAM_PHOTOS: CarouselImage[] = [
  { src: "/jam/jam-1.jpg", alt: "Design jam, session one" },
  { src: "/jam/jam-2.jpg", alt: "Design jam, session two" },
  { src: "/jam/jam-3.jpg", alt: "Design jam, session three" },
  { src: "/jam/jam-4.jpg", alt: "Design jam, session four" },
];

export default function Jam() {
  return (
    <Section
      id="jams"
      label="Design jams"
      labelDot="var(--p-chip-violet)"
      heading="Where designers worldwide come together to build"
      lead="We run these regularly for our global network, and the best design of each jam gets rewarded."
      tone="transparent"
      backdrop={
        <Sky band={JAM_BAND} fadeTop={16} fadeBottom={40} insetTop={16} />
      }
      padTop="sm"
      padBottom="sm"
    >
      <Reveal>
        <JamCarousel images={JAM_PHOTOS} />
      </Reveal>

      <Reveal>
        <div className="mt-[var(--p-space-3)] flex justify-center">
          <RollButton
            href="https://share-na2.hsforms.com/1k1a4O5OOQ0-VGlDGQ2cS7g59wvs"
            external
          >
            Join the next design jam
          </RollButton>
        </div>
      </Reveal>
    </Section>
  );
}
