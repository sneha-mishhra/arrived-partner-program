// CONTENTFUL MAP → content type: "PortfolioStrip"
// Fields: eyebrow, headline, items (List of {image (Media), caption, designerName}) - repeatable

const ITEMS = [
  { caption: "Neon Summit '26", designer: "Priya M." },
  { caption: "The Studio Dinner", designer: "Ben O." },
  { caption: "Launch Pad Berlin", designer: "Ines K." },
  { caption: "Founder Weekender", designer: "Marcus L." },
  { caption: "Rooftop Awards Night", designer: "Ana C." },
  { caption: "Wilderness Retreat", designer: "Yui T." },
];

export default function PortfolioStrip() {
  return (
    <section className="w-full px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <span className="pill mb-6 inline-block">Made by our network</span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-2xl mx-auto">
          Work by designers already in the room.
        </h2>
        <p className="mt-4 text-base text-brand-muted max-w-xl mx-auto">
          A snapshot of recent event brand kits, invites, and event pages
          designed by partners.
        </p>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
          {ITEMS.map((item, i) => (
            <div
              key={item.caption}
              className="aspect-[4/5] rounded-2xl overflow-hidden relative flex items-end p-4"
              style={{
                background: `linear-gradient(135deg, hsl(${
                  240 + i * 15
                }, 60%, 70%), hsl(${260 + i * 10}, 70%, 55%))`,
              }}
            >
              <div className="text-left text-white">
                <div className="font-bold text-sm">{item.caption}</div>
                <div className="text-xs opacity-80">by {item.designer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
