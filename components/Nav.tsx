// CONTENTFUL MAP → content type: "Nav"
// Fields: logoText (Short text), ctaLabel (Short text), ctaLink (Short text)

export default function Nav() {
  return (
    <header className="w-full px-6 md:px-12 py-5 flex items-center justify-between">
      <div className="text-brand-navy font-semibold text-lg tracking-tight">
        happily <span className="font-black">ARRIVED</span>
      </div>
      <a
        href="#apply"
        className="bg-brand-navy text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand-navy-2 transition"
      >
        Apply now
      </a>
    </header>
  );
}
