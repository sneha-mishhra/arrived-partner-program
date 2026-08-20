// Small primer for anyone landing on this page without knowing the product
// yet: one screenshot, a couple of sentences, one way out to go try it.
// Image and copy sit side by side on desktop; mobile stacks image over text.

import Image from "next/image";

import Section from "./Section";
import { Reveal, RollButton } from "./motion";

export default function AboutArrived() {
  return (
    <Section
      id="about-arrived"
      label="The platform"
      labelDot="var(--p-chip-blue)"
      heading="What is Arrived?"
      tone="transparent"
      padTop="sm"
      padBottom="sm"
    >
      <div className="grid items-center gap-[var(--p-space-3)] md:grid-cols-2 md:gap-[var(--p-space-5)]">
        <Reveal>
          <div className="overflow-hidden rounded-[var(--p-radius-lg)] border border-(--p-line)">
            <Image
              src="/happily-arrived.png"
              alt="Arrived event website builder and check-in tools"
              width={1920}
              height={1080}
              className="h-auto w-full"
            />
          </div>
        </Reveal>

        <div className="text-center md:text-left">
          <Reveal index={1}>
            <p className="p-lead">
              Arrived is built by Happily, a worldwide network of
              award-winning event specialists across 150+ different roles.
              The platform gives hosts the design they deserve, handling
              everything end to end, from their event site to check-in on
              the day. That&apos;s the experience you&apos;ll be designing.
            </p>
          </Reveal>

          <Reveal index={2}>
            <div className="mt-[var(--p-space-3)]">
              <RollButton
                href="https://teamhappily.com/arrived?utm_source=partner-page&utm_medium=web&utm_campaign=partner-page"
                external
                variant="secondary"
              >
                Explore Arrived
              </RollButton>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
