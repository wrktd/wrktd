const STATS = [
  { value: "5–7",  label: "days to go live"           },
  { value: "7+",   label: "product types per batch"   },
  { value: "343",  label: "files produced per design" },
  { value: "0",    label: "inventory required"        },
];

export default function StatStrip() {
  return (
    <section
      className="py-16 px-6"
      style={{
        background:   "#111009",
        borderTop:    "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {STATS.map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="font-display font-bold text-gold"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1 }}>
              {value}
            </p>
            <p className="label mt-3" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
