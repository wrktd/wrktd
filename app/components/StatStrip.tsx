const STATS = [
  { value: "5–7",  label: "days to go live"           },
  { value: "7+",   label: "product types per batch"   },
  { value: "343",  label: "files produced per design" },
  { value: "0",    label: "inventory required"        },
];

export default function StatStrip() {
  return (
    <section className="py-20 px-6" style={{ background: "var(--bg-soft)" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map(({ value, label }) => (
          <div key={label} className="p-8 text-center card">
            <p className="font-display font-extrabold"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", lineHeight: 1, color: "var(--blue)" }}>
              {value}
            </p>
            <p className="label mt-4" style={{ color: "var(--fg-4)" }}>{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
