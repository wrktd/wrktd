import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-16 px-6 md:px-10"
      style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--bd)" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div>
          <div className="mb-3">
            <Image src="/logo.png" alt="WRKTD" width={120} height={36} style={{ objectFit: "contain", filter: "var(--logo-filter, none)" }} />
          </div>
          <p className="text-xs leading-relaxed max-w-xs" style={{ color: "var(--fg-4)" }}>
            Done-for-you home decor products for brands, creators, and artists with existing designs and audiences.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <p className="text-xs" style={{ color: "var(--fg-4)" }}>
            © {new Date().getFullYear()} WRKTD LLC. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--fg-4)", opacity: 0.5 }}>
            WRKTD LLC is a Nevada entity, separate from Rugolution LLC.
          </p>
        </div>
      </div>
    </footer>
  );
}
