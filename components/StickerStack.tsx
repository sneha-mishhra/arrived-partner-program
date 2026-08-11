"use client";

import StickerPeel from "./StickerPeel";

// CONTENTFUL MAP → nested inside "Hero" content type
// Fields: stickers (List of {image, rotate, width, positionClass})

export default function StickerStack() {
  return (
    <div className="absolute inset-0 z-20">
      {/* Purple 'create with purpose' — right beside "Grow together" */}
      <StickerPeel
        imageSrc="/sticker-purpose.png"
        width={200}
        rotate={-8}
        peelBackHoverPct={35}
        peelBackActivePct={55}
        shadowIntensity={0.4}
        className="!left-0 md:!left-2 !top-[38%] md:!top-[40%]"
      />

      {/* Blue 'crafting experience' — right side, large */}
      <StickerPeel
        imageSrc="/sticker-crafting.png"
        width={400}
        rotate={6}
        peelBackHoverPct={35}
        peelBackActivePct={55}
        shadowIntensity={0.4}
        className="!right-0 md:!right-8 !left-auto !top-2 md:!top-4"
      />

      {/* Green hands — just above "bold" word, straight */}
      <StickerPeel
        imageSrc="/sticker-hands.png"
        width={190}
        rotate={0}
        peelBackHoverPct={35}
        peelBackActivePct={55}
        shadowIntensity={0.4}
        className="!left-[32%] md:!left-[36%] !top-4 md:!top-6"
      />
    </div>
  );
}
