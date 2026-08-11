// CONTENTFUL MAP → content type: "Testimonial"
// Fields: quote (Long text), authorName, authorRole, authorLocation, authorPhoto (Media)

export default function Testimonial() {
  return (
    <section className="w-full px-6 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-2xl md:text-3xl font-medium text-brand-navy leading-snug">
          &ldquo;First month in the network I designed two launch events I&apos;d
          have never landed on my own. The briefs were clean, the pay hit on
          time, and the hosts actually knew what they wanted.&rdquo;
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-brand-purple-2" />
          <div className="text-left">
            <div className="font-bold text-brand-navy">Ines Kaya</div>
            <div className="text-sm text-brand-muted">
              Brand designer · Berlin
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
