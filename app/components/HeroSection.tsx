"use client";
import { useState, useRef, useCallback, useEffect } from "react";

const PRODUCTS = [
  { type: "rug",      label: "Area Rug",      size: "5×7 ft",    bg: "#E8E3D8", aspect: 4/3,  designScale: 0.80 },
  { type: "pillow",   label: "Woven Pillow",  size: '18"×18"',   bg: "#EDE9E2", aspect: 1,    designScale: 0.68, radius: "20px" },
  { type: "canvas",   label: "Canvas Art",    size: "24×30 in",  bg: "#F0EFEC", aspect: 4/5,  designScale: 0.78, border: "8px solid #1C1410" },
  { type: "blanket",  label: "Woven Blanket", size: '50"×60"',   bg: "#E2DDD3", aspect: 5/4,  designScale: 0.82 },
];

const WLoader = () => (
  <svg width="36" height="26" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 3 L10 25 L20 10 L30 25 L38 3"
      stroke="var(--blue)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
      strokeDasharray="90" strokeDashoffset="90">
      <animate attributeName="stroke-dashoffset" values="90;0;0;90" dur="1.6s" repeatCount="indefinite"/>
    </path>
  </svg>
);

function ProductCard({ product, imageUrl, loading }: {
  product: typeof PRODUCTS[0]; imageUrl: string | null; loading: boolean;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div style={{
        position: "relative", width: "100%",
        paddingBottom: `${(1 / product.aspect) * 100}%`,
        borderRadius: product.radius ?? "10px",
        overflow: "hidden",
        background: product.bg,
        boxShadow: "0 8px 32px rgba(0,0,0,0.32)",
        border: product.border ? product.border : undefined,
      }}>
        <img
          src={imageUrl ?? "/sample-design.svg"}
          alt={product.label}
          style={{
            position: "absolute", inset: 0,
            width: `${product.designScale * 100}%`,
            height: `${product.designScale * 100}%`,
            top: `${((1 - product.designScale) / 2) * 100}%`,
            left: `${((1 - product.designScale) / 2) * 100}%`,
            objectFit: "cover",
          }}
        />
        {loading && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
            backgroundSize: "400px 100%",
            animation: "shimmer 1.2s infinite linear",
          }} />
        )}
        {product.type === "canvas" && (
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
          }} />
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
  const fileRef = useRef<HTMLInputElement>(null);
  const prevUrl = useRef<string | null>(null);

  const handleFile = useCallback((file: File) => {
    if (!(/\.(jpe?g|png|svg|ai|psd|webp)$/i.test(file.name)) && !file.type.startsWith("image/")) {
      alert("Please upload a JPG, PNG, SVG, AI, or PSD file."); return;
    }
    if (prevUrl.current) URL.revokeObjectURL(prevUrl.current);
    setLoading(true); setFileName(file.name);
    const url = URL.createObjectURL(file); prevUrl.current = url;
    setTimeout(() => { setImageUrl(url); setLoading(false); }, 700);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0]; if (f) handleFile(f);
  }, [handleFile]);

  useEffect(() => () => { if (prevUrl.current) URL.revokeObjectURL(prevUrl.current); }, []);

  return (
    <section id="preview" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-32 pb-24">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20 items-center">

          {/* ── Left: headline + upload ── */}
          <div>
            <div className="mb-10">
              <span className="pill"><span className="pill-dot" />Done-for-you home decor</span>
            </div>

            <h1 className="font-display font-extrabold leading-[0.95] mb-7"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)", color: "var(--fg)", letterSpacing: "-0.03em" }}>
              What if your designs<br />
              were already selling<br />
              <span style={{ color: "#9AA6B8" }}>home decor?</span>
            </h1>

            <p className="text-lg font-light leading-relaxed mb-10"
              style={{ color: "var(--fg-2)", maxWidth: "28rem" }}>
              Drop one design. See it on real products in seconds — rugs, pillows, wall art, blankets, and more. If it looks good, WRKTD turns it into products your audience can actually buy.
            </p>

            {/* Upload box */}
            <div
              role="button" tabIndex={0}
              onClick={() => fileRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className="relative cursor-pointer select-none text-center"
              style={{
                border: `1px solid ${dragging ? "var(--bd-active)" : "var(--bd)"}`,
                background: dragging ? "var(--blue-dim)" : "var(--bg-card)",
                padding: "2.2rem 1.5rem",
                borderRadius: "12px",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              {/* Corner marks — logo-derived geometry */}
              {(["tl","tr","bl","br"] as const).map((c) => (
                <span key={c} style={{
                  position: "absolute",
                  top:    c.startsWith("t") ? 8   : "auto",
                  bottom: c.startsWith("b") ? 8   : "auto",
                  left:   c.endsWith("l")   ? 8   : "auto",
                  right:  c.endsWith("r")   ? 8   : "auto",
                  width: 13, height: 13,
                  borderTop:    c.startsWith("t") ? `1.5px solid ${dragging ? "var(--blue)" : "rgba(47,91,255,0.5)"}` : "none",
                  borderBottom: c.startsWith("b") ? `1.5px solid ${dragging ? "var(--blue)" : "rgba(47,91,255,0.5)"}` : "none",
                  borderLeft:   c.endsWith("l")   ? `1.5px solid ${dragging ? "var(--blue)" : "rgba(47,91,255,0.5)"}` : "none",
                  borderRight:  c.endsWith("r")   ? `1.5px solid ${dragging ? "var(--blue)" : "rgba(47,91,255,0.5)"}` : "none",
                  transition: "border-color 0.2s",
                }} />
              ))}

              <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.svg,.ai,.psd,.webp"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

              {loading ? (
                <div className="flex flex-col items-center gap-3">
                  <WLoader />
                  <p className="label" style={{ color: "var(--blue)" }}>Building previews…</p>
                </div>
              ) : imageUrl ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(47,91,255,0.12)" }}>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="var(--blue)" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium mt-1" style={{ color: "var(--fg)" }}>{fileName}</p>
                  <p className="label" style={{ color: "var(--fg-4)" }}>Drop a new file to try another</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-11 h-11 flex items-center justify-center"
                    style={{ background: "rgba(47,91,255,0.08)", borderRadius: 8 }}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--blue)" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: "var(--fg)" }}>
                      {dragging ? "Release to preview" : "Drop your design here"}
                    </p>
                    <p className="label" style={{ color: "var(--fg-4)" }}>JPG · PNG · SVG · AI · PSD</p>
                  </div>
                  <p className="text-xs mt-1" style={{ color: "var(--fg-4)", opacity: 0.7 }}>
                    No account. No card. No commitment.
                  </p>
                </div>
              )}
            </div>

            {imageUrl && (
              <div className="mt-6 p-5 card" style={{ border: "1px solid rgba(47,91,255,0.2)", background: "rgba(47,91,255,0.06)" }}>
                <p className="text-sm mb-1" style={{ color: "var(--fg-3)" }}>
                  A real batch includes every angle, size variation, and print-ready files per product.
                </p>
                <p className="font-semibold text-sm mb-4" style={{ color: "var(--fg)" }}>Ready to turn this into a real catalog?</p>
                <a href="#pricing" className="btn-primary" style={{ fontSize: "0.8rem", padding: "10px 20px" }}>
                  Make this real →
                </a>
              </div>
            )}
          </div>

          {/* ── Right: 4 product cards ── */}
          <div className="pt-4 lg:pt-8">
            <div className="grid grid-cols-2 gap-3">
              {PRODUCTS.map((p) => (
                <ProductCard key={p.type} product={p} imageUrl={loading ? null : imageUrl} loading={loading} />
              ))}
            </div>

            {/* Micro-proof */}
            <div className="mt-5 flex items-center justify-between px-1">
              <p className="text-xs" style={{ color: "var(--fg-4)" }}>
                1 design → 7 products → 343 files
              </p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--success)" }} />
                <p className="label" style={{ color: "var(--fg-4)" }}>live on dev</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
