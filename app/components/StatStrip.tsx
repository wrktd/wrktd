const STATS = [
  { value: "5–7",  label: "days to go live"           },
  { value: "7+",   label: "product types per batch"   },
  { value: "343",  label: "files produced per design" },
  { value: "0",    label: "inventory required"        },
];

export default function StatStrip() {
  return (
    <section className="py-20 px-6" style={{ background: "#000000", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map(({ value, label }, i) => (
          <div key={label}
            className="p-8 text-center"
            style={{ background: "#0C0C0C", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
            <p className="font-display font-extrabold text-gold"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", lineHeight: 1 }}>
              {value}
            </p>
            <p className="label mt-4" style={{ color: "rgba(240,240,240,0.38)" }}>{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
