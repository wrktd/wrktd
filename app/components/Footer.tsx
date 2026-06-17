export default function Footer() {
  return (
    <footer className="py-16 px-6 md:px-10"
      style={{ background: "#060606", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div>
          <p className="font-display font-bold tracking-[0.18em] text-white text-2xl mb-3">WRKTD</p>
          <p className="text-xs leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            Done-for-you home decor products for brands, creators, and artists with existing designs and audiences.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
            © {new Date().getFullYear()} WRKTD LLC. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.1)" }}>
            WRKTD LLC is a Nevada entity, separate from Rugolution LLC.
          </p>
        </div>
      </div>
    </footer>
  );
}
