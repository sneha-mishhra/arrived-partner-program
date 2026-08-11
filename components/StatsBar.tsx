// CONTENTFUL MAP → content type: "StatsBar"
// Fields: stats (List of {label, value}) - repeatable

const STATS = [
  { value: "120+", label: "Designers in network" },
  { value: "$180k", label: "Paid to partners" },
  { value: "380+", label: "Events designed" },
  { value: "5 days", label: "Avg. match time" },
];

export default function StatsBar() {
  return (
    <section className="w-full px-6 py-14 md:py-20">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl md:text-4xl font-black text-brand-navy">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-brand-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
