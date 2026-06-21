"use client";
import { useState, useRef, useCallback, useEffect } from "react";

const PRODUCTS: {
  type: string;
  label: string;
  size: string;
  bg: string;
  designScale: number;
  inner?: React.CSSProperties;
}[] = [
  { type: "rug",      label: "Area Rug",      size: "5×7 ft",    bg: "#ede8de", designScale: 0.78 },
  { type: "pillow",   label: "Woven Pillow",  size: '18"×18"',   bg: "#f4f2ef", designScale: 0.66, inner: { borderRadius: "6px" } },
  { type: "canvas",   label: "Canvas Art",    size: "24×30 in",  bg: "#f9f9f9", designScale: 0.74, inner: { border: "9px solid #2a1f14", boxSizing: "border-box" as const } },
  { type: "metal",    label: "Metal Print",   size: "16×16 in",  bg: "#1c1c1c", designScale: 0.84 },
  { type: "tapestry", label: "Wall Tapestry", size: '36"×48"',   bg: "#ede8de", designScale: 0.68 },
];

function ProductCard({ product, imageUrl }: { product: typeof PRODUCTS[0]; imageUrl: string | null }) {
  const src = imageUrl || "/sample-design.svg";
  const dim  = `${product.designScale * 100}%`;

  return (
    <div className="flex flex-col gap-2">
      <div style={{
        aspectRatio: "1 / 1",
        background: product.bg,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
      }}>
        {product.type === "tapestry" && (
          <div style={{
            position: "absolute", top: "10%", left: "11%", right: "11%",
            height: 6, background: "#7a4a1e", borderRadius: 3, zIndex: 2,
          }} />
        )}
        <div style={{ position: "relative", width: dim, height: dim, flexShrink: 0, ...product.inner }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={product.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        {product.type === "metal" && (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 55%)", pointerEvents: "none" }} />
        )}
      </div>
      <div>
        <p className="text-xs font-semibold tracking-wide" style={{ color: "var(--fg-3)" }}>{product.label}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--fg-4)" }}>{product.size}</p>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef  = useRef<HTMLInputElement>(null);
  const prevUrl  = useRef<string | null>(null);

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
    setTimeout(() => { setImageUrl(url); setLoading(false); }, 600);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0]; if (f) handleFile(f);
  }, [handleFile]);

  useEffect(() => () => { if (prevUrl.current) URL.revokeObjectURL(prevUrl.current); }, []);

  return (
    <section id="preview" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-32 pb-24">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-20 items-start">

          {/* Left: headline + upload */}
          <div>
            <div className="mb-10">
              <span className="pill"><span className="pill-dot" />Done-for-you home decor</span>
            </div>

            <h1 className="font-display font-extrabold leading-[0.88] mb-7 tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)", color: "var(--fg)" }}>
              What if your designs<br />
              were already selling<br />
              <span style={{ color: "var(--fg-ghost-h)" }}>home decor?</span>
            </h1>

            <p className="text-base md:text-lg font-light leading-relaxed mb-10"
              style={{ color: "var(--fg-2)", maxWidth: "26rem" }}>
              Drop one design. See it on rugs, pillows, canvas, metal, and wall tapestries — free, no signup. If it looks good, WRKTD turns it into products your audience can actually buy.
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
                border: `1px solid ${dragging ? "var(--blue)" : "var(--bd)"}`,
                background: dragging ? "var(--blue-dim)" : "var(--fg-ghost)",
                padding: "2.5rem 1.5rem",
                borderRadius: 12,
              }}
            >
              {(["tl","tr","bl","br"] as const).map((c) => (
                <span key={c} className="absolute" style={{
                  top: c.startsWith("t") ? 7 : "auto", bottom: c.startsWith("b") ? 7 : "auto",
                  left: c.endsWith("l") ? 7 : "auto",  right: c.endsWith("r") ? 7 : "auto",
                  width: 12, height: 12,
                  borderTop:    c.startsWith("t") ? "1.5px solid rgba(46,91,255,0.45)" : "none",
                  borderBottom: c.startsWith("b") ? "1.5px solid rgba(46,91,255,0.45)" : "none",
                  borderLeft:   c.endsWith("l")   ? "1.5px solid rgba(46,91,255,0.45)" : "none",
                  borderRight:  c.endsWith("r")   ? "1.5px solid rgba(46,91,255,0.45)" : "none",
                }} />
              ))}
              <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.svg,.ai,.psd,.webp"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

              {loading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2" style={{ borderColor: "rgba(46,91,255,0.2)", borderTopColor: "var(--blue)", animation: "spin 0.9s linear infinite" }} />
                  <p className="label" style={{ color: "var(--blue)" }}>Placing your design on products…</p>
                </div>
              ) : imageUrl ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(46,91,255,0.12)" }}>
                    <svg className="w-4 h-4" style={{ color: "var(--blue)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium mt-1" style={{ color: "var(--fg)" }}>{fileName}</p>
                  <p className="label" style={{ color: "var(--fg-4)" }}>Drop a new file to try another</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl" style={{ background: "rgba(46,91,255,0.08)" }}>
                    <svg className="w-5 h-5" style={{ color: "var(--blue)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: "var(--fg)" }}>Drop your design here</p>
                    <p className="label" style={{ color: "var(--fg-4)" }}>or click to browse — JPG · PNG · SVG · AI · PSD</p>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs mt-4" style={{ color: "var(--fg-4)" }}>No account. No payment. No commitment.</p>

            {imageUrl && (
              <div className="mt-8 p-6 card" style={{ border: "1px solid rgba(46,91,255,0.18)", background: "rgba(46,91,255,0.04)" }}>
                <p className="text-sm mb-1" style={{ color: "var(--fg-3)" }}>
                  A real batch includes every angle, size variation, and a print-ready file per product.
                </p>
                <p className="font-semibold text-sm mb-5" style={{ color: "var(--fg)" }}>Ready to turn this into a real catalog?</p>
                <a href="#pricing" className="btn-primary">
                  Make this real →
                </a>
              </div>
            )}
          </div>

          {/* Right: product preview grid */}
          <div className="pt-4 lg:pt-16">
            <div className="grid grid-cols-2 gap-3 mb-3">
              {PRODUCTS.filter((p) => p.type !== "tapestry").map((p) => (
                <ProductCard key={p.type} product={p} imageUrl={loading ? null : imageUrl} />
              ))}
            </div>
            <div style={{ maxWidth: "50%", margin: "0 auto" }}>
              <ProductCard
                product={PRODUCTS.find((p) => p.type === "tapestry")!}
                imageUrl={loading ? null : imageUrl}
              />
            </div>

            <div className="mt-6 flex items-center justify-between px-1">
              <p className="text-xs" style={{ color: "var(--fg-4)" }}>
                7 products · 7 sizes · 7 listing images
              </p>
              <p className="font-display font-bold" style={{ fontSize: "0.95rem", color: "var(--blue)" }}>
                343 files
              </p>
            </div>
            <p className="text-xs mt-1 px-1" style={{ color: "var(--fg-4)", opacity: 0.6 }}>
              per design — produced by WRKTD
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
