"use client";
import { useState, useRef, useCallback, useEffect } from "react";

type ProductDef = {
  id: string; label: string; size: string; aspect: number;
  bg: string; weaveBg?: string; radius: string; shadow?: string;
};

const PRODUCTS: ProductDef[] = [
  {
    id: "rug", label: "Area Rug", size: "5×7 ft", aspect: 4 / 3,
    bg: "#1A1A1A",
    weaveBg: `repeating-linear-gradient(0deg,rgba(255,255,255,0.04) 0px,rgba(255,255,255,0.04) 1px,transparent 1px,transparent 5px),repeating-linear-gradient(90deg,rgba(255,255,255,0.04) 0px,rgba(255,255,255,0.04) 1px,transparent 1px,transparent 5px),#1A1A1A`,
    radius: "10px", shadow: "0 16px 64px rgba(0,0,0,0.8)",
  },
  {
    id: "pillow", label: "Woven Pillow", size: '18"×18"', aspect: 1,
    bg: "#141414",
    weaveBg: `repeating-linear-gradient(0deg,rgba(255,255,255,0.04) 0px,rgba(255,255,255,0.04) 1px,transparent 1px,transparent 5px),repeating-linear-gradient(90deg,rgba(255,255,255,0.04) 0px,rgba(255,255,255,0.04) 1px,transparent 1px,transparent 5px),#141414`,
    radius: "26px", shadow: "0 20px 72px rgba(0,0,0,0.8), inset 0 -4px 16px rgba(0,0,0,0.4)",
  },
  {
    id: "tapestry", label: "Wall Tapestry", size: "36×48 in", aspect: 3 / 4,
    bg: "#181818", radius: "3px",
    shadow: "0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)",
  },
  {
    id: "blanket", label: "Woven Blanket", size: '50"×60"', aspect: 5 / 4,
    bg: "#161616",
    weaveBg: `repeating-linear-gradient(0deg,rgba(255,255,255,0.05) 0px,rgba(255,255,255,0.05) 1px,transparent 1px,transparent 6px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 6px),#161616`,
    radius: "8px", shadow: "0 12px 48px rgba(0,0,0,0.7)",
  },
];

function ProductCard({
  product, imageUrl, loading,
}: { product: ProductDef; imageUrl: string | null; loading: boolean }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="relative w-full" style={{ paddingBottom: `${(1 / product.aspect) * 100}%` }}>
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ background: product.weaveBg ?? product.bg, borderRadius: product.radius, boxShadow: product.shadow }}
        >
          {loading && (
            <div className="absolute inset-0" style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
              backgroundSize: "400px 100%", animation: "shimmer 1.2s infinite linear",
            }} />
          )}
          {imageUrl && !loading && (
            <img
              src={imageUrl} alt={product.label}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ mixBlendMode: "screen", opacity: 0.72, borderRadius: product.radius }}
            />
          )}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(0,0,0,0.18) 100%)" }} />
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.55)" }}>{product.label}</p>
        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.2)" }}>{product.size}</p>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const prevUrl = useRef<string | null>(null);

  const handleFile = useCallback((file: File) => {
    if (!(/\.(jpe?g|png|svg|ai|psd|webp)$/i.test(file.name)) && !file.type.startsWith("image/")) {
      alert("Please upload a JPG, PNG, SVG, AI, or PSD file.");
      return;
    }
    if (prevUrl.current) URL.revokeObjectURL(prevUrl.current);
    setLoading(true);
    setFileName(file.name);
    const url = URL.createObjectURL(file);
    prevUrl.current = url;
    setTimeout(() => { setImageUrl(url); setLoading(false); }, 900);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  useEffect(() => () => { if (prevUrl.current) URL.revokeObjectURL(prevUrl.current); }, []);

  const showProducts = true; // always show products — sample design before upload, real design after
  const displayUrl = imageUrl || "/sample-design.svg";

  return (
    <section id="preview" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-32 pb-24">

        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-20 items-start">

          {/* Left column — headline + upload */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-8 bg-gold" />
              <span className="label text-gold">Done-for-you home decor</span>
            </div>

            <h1
              className="font-display font-extrabold text-white leading-[0.88] mb-7 tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
            >
              What if your designs<br />
              were already selling<br />
              <span style={{ color: "rgba(255,255,255,0.35)" }}>home decor?</span>
            </h1>

            <p
              className="text-base md:text-lg font-light leading-relaxed mb-10"
              style={{ color: "rgba(255,255,255,0.60)", maxWidth: "26rem" }}
            >
              Drop one design. See it on rugs, pillows, blankets, and wall decor in seconds — free, no signup. If it looks good, WRKTD turns it into products your audience can actually buy.
            </p>

            {/* Upload box */}
            <div
              role="button" tabIndex={0}
              onClick={() => fileRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className="relative cursor-pointer select-none transition-all duration-300 text-center"
              style={{
                border: `1px solid ${dragging ? "#B89A4E" : "rgba(255,255,255,0.09)"}`,
                background: dragging ? "rgba(184,154,78,0.06)" : "rgba(255,255,255,0.02)",
                padding: "2.5rem 1.5rem",
              }}
            >
              {(["tl", "tr", "bl", "br"] as const).map((c) => (
                <span key={c} className="absolute" style={{
                  top: c.startsWith("t") ? 7 : "auto", bottom: c.startsWith("b") ? 7 : "auto",
                  left: c.endsWith("l") ? 7 : "auto", right: c.endsWith("r") ? 7 : "auto",
                  width: 12, height: 12,
                  borderTop:    c.startsWith("t") ? "1.5px solid rgba(184,154,78,0.5)" : "none",
                  borderBottom: c.startsWith("b") ? "1.5px solid rgba(184,154,78,0.5)" : "none",
                  borderLeft:   c.endsWith("l")   ? "1.5px solid rgba(184,154,78,0.5)" : "none",
                  borderRight:  c.endsWith("r")   ? "1.5px solid rgba(184,154,78,0.5)" : "none",
                }} />
              ))}
              <input
                ref={fileRef} type="file"
                accept=".jpg,.jpeg,.png,.svg,.ai,.psd,.webp"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />

              {loading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2" style={{ borderColor: "rgba(184,154,78,0.2)", borderTopColor: "#B89A4E", animation: "spin 0.9s linear infinite" }} />
                  <p className="label text-gold">Placing your design on products…</p>
                </div>
              ) : imageUrl ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(184,154,78,0.12)" }}>
                    <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-white mt-1">{fileName}</p>
                  <p className="label" style={{ color: "rgba(255,255,255,0.45)" }}>Drop a new file to try another</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center" style={{ background: "rgba(184,154,78,0.08)" }}>
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm mb-1">Drop your design here</p>
                    <p className="label" style={{ color: "rgba(255,255,255,0.22)" }}>or click to browse — JPG · PNG · SVG · AI · PSD</p>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.35)" }}>
              No account. No payment. No commitment.
            </p>

            {/* "Make this real" — appears after upload */}
            {imageUrl && (
              <div className="mt-8 p-6" style={{ border: "1px solid rgba(184,154,78,0.2)", background: "rgba(184,154,78,0.05)" }}>
                <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                  A real batch includes every angle, size variation, and a print-ready file per product.
                </p>
                <p className="font-semibold text-white text-sm mb-5">Ready to turn this into a real catalog?</p>
                <a href="#pricing" className="label inline-block bg-gold text-black px-7 py-3.5 hover:bg-gold-lt transition-colors">
                  Make this real →
                </a>
              </div>
            )}
          </div>

          {/* Right column — product cards */}
          <div className="grid grid-cols-2 gap-5 pt-4 lg:pt-20">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} imageUrl={loading ? null : displayUrl} loading={loading} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
