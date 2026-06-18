const STATS = [
  { value: "5–7",  label: "days setup to live"               },
  { value: "7+",   label: "product types built per batch"    },
  { value: "5–10", label: "days per order, made and shipped" },
  { value: "0",    label: "inventory required"               },
];

export default function StatStrip() {
  return (
    <section
      className="py-16 px-6"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {STATS.map(({ value, label }) => (
          <div key={label} className="text-center">
            <p
              className="font-display font-bold text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1 }}
            >
              {value}
            </p>
            <p className="label mt-3" style={{ color: "rgba(255,255,255,0.22)" }}>{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
