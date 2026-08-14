"use client";

import { useEffect, useState } from "react";
import StickerPeel from "./StickerPeel";

// CONTENTFUL MAP → nested inside "Hero" content type
// Fields: stickers (List of {image, rotate, width, positionClass})
// Responsive sizing: shrinks on mobile so stickers don't overlap the text.

function useBreakpointScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) setScale(0.4);       // mobile
      else if (w < 768) setScale(0.55); // sm
      else if (w < 1024) setScale(0.75); // md
      else if (w < 1280) setScale(0.9); // lg
      else setScale(1);                  // xl+
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return scale;
}

export default function StickerStack() {
  const scale = useBreakpointScale();

  return (
    <div className="absolute inset-0 z-20">
      {/* Purple 'create with purpose' */}
      <StickerPeel
        imageSrc="/sticker-purpose.png"
        width={Math.round(200 * scale)}
        rotate={-8}
        peelBackHoverPct={35}
        peelBackActivePct={55}
        shadowIntensity={0.4}
        className="!left-0 md:!left-2 !top-[38%] md:!top-[40%]"
      />

      {/* Blue 'crafting experience' */}
      <StickerPeel
        imageSrc="/sticker-crafting.png"
        width={Math.round(400 * scale)}
        rotate={6}
        peelBackHoverPct={35}
        peelBackActivePct={55}
        shadowIntensity={0.4}
        className="!right-0 md:!right-8 !left-auto !top-2 md:!top-4"
      />

      {/* Green hands - above 'bold' word */}
      <StickerPeel
        imageSrc="/sticker-hands.png"
        width={Math.round(190 * scale)}
        rotate={0}
        peelBackHoverPct={35}
        peelBackActivePct={55}
        shadowIntensity={0.4}
        className="!left-[32%] md:!left-[36%] !top-4 md:!top-6"
      />
    </div>
  );
}
