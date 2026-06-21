"use client";
import { useState, useRef, useCallback, useEffect } from "react";

type ProductDef = { id: string; label: string; size: string; aspect: number; bg: string; weaveBg?: string; radius: string; };

const PRODUCTS: ProductDef[] = [
  { id: "rug",      label: "Area Rug",      size: "5×7 ft",   aspect: 4/3, bg: "#1A1A1A",
    weaveBg: `repeating-linear-gradient(0deg,rgba(255,255,255,.04) 0px,rgba(255,255,255,.04) 1px,transparent 1px,transparent 5px),repeating-linear-gradient(90deg,rgba(255,255,255,.04) 0px,rgba(255,255,255,.04) 1px,transparent 1px,transparent 5px),#1A1A1A`,
    radius: "10px" },
  { id: "pillow",   label: "Woven Pillow",  size: '18"×18"',  aspect: 1,   bg: "#141414",
    radius: "26px" },
  { id: "tapestry", label: "Wall Tapestry", size: "36×48 in", aspect: 3/4, bg: "#181818",
    radius: "3px" },
  { id: "blanket",  label: "Woven Blanket", size: '50"×60"',  aspect: 5/4, bg: "#161616",
    radius: "8px" },
];

function ProductCard({ product, imageUrl, loading }: { product: ProductDef; imageUrl: string | null; loading: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full" style={{ paddingBottom: `${(1 / product.aspect) * 100}%` }}>
        <div className="absolute inset-0 overflow-hidden"
          style={{ background: product.weaveBg ?? product.bg, borderRadius: product.radius }}>
          {loading && <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)", backgroundSize: "400px 100%", animation: "shimmer 1.2s infinite linear" }} />}
          {imageUrl && !loading && <img src={imageUrl} alt={product.label} className="absolute inset-0 w-full h-full object-cover" style={{ mixBlendMode: "screen", opacity: 0.7, borderRadius: product.radius }} />}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold" style={{ color: "var(--fg-3)" }}>{product.label}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--fg-4)" }}>{product.size}</p>
      </div>
    </div>
  );
}

export default function PreviewTool() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const prevUrl = useRef<string | null>(null);
  const showProducts = imageUrl !== null || loading;

  const handleFile = useCallback((file: File) => {
    if (!(/\.(jpe?g|png|svg|ai|psd|webp)$/i.test(file.name)) && !file.type.startsWith("image/")) { alert("Please upload a JPG, PNG, SVG, AI, or PSD file."); return; }
    if (prevUrl.current) URL.revokeObjectURL(prevUrl.current);
    setLoading(true); setFileName(file.name);
    const url = URL.createObjectURL(file); prevUrl.current = url;
    setTimeout(() => { setImageUrl(url); setLoading(false); }, 900);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0]; if (f) handleFile(f);
  }, [handleFile]);

  useEffect(() => () => { if (prevUrl.current) URL.revokeObjectURL(prevUrl.current); }, []);

  return (
    <section className="py-40 px-6" style={{ background: "var(--bg)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <div className="mb-10">
            <span className="pill"><span className="pill-dot" />Instant preview</span>
          </div>
          <h2 className="font-display font-extrabold leading-[0.88] mb-5"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "var(--fg)" }}>
            See your design on real<br />
            <span style={{ color: "var(--fg-ghost-h)" }}>products in seconds.</span>
          </h2>
          <p className="text-base max-w-md leading-relaxed" style={{ color: "var(--fg-3)" }}>
            No account. No payment. No signup. Drop in any design file and see it placed on rugs, pillows, tapestries, and blankets instantly.
          </p>
        </div>

        {/* Drop zone */}
        <div
          role="button" tabIndex={0}
          onClick={() => fileRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className="relative mb-14 cursor-pointer select-none transition-all duration-300"
          style={{
            border: `1px solid ${dragging ? "var(--blue)" : "var(--bd)"}`,
            background: dragging ? "var(--blue-dim)" : "var(--fg-ghost)",
            padding: "3.5rem 2rem", textAlign: "center",
            borderRadius: 12,
          }}
        >
          {(["tl","tr","bl","br"] as const).map((c) => (
            <span key={c} className="absolute" style={{
              top: c.startsWith("t") ? 8 : "auto", bottom: c.startsWith("b") ? 8 : "auto",
              left: c.endsWith("l") ? 8 : "auto", right: c.endsWith("r") ? 8 : "auto",
              width: 14, height: 14,
              borderTop:    c.startsWith("t") ? "1.5px solid rgba(46,91,255,0.45)" : "none",
              borderBottom: c.startsWith("b") ? "1.5px solid rgba(46,91,255,0.45)" : "none",
              borderLeft:   c.endsWith("l")   ? "1.5px solid rgba(46,91,255,0.45)" : "none",
              borderRight:  c.endsWith("r")   ? "1.5px solid rgba(46,91,255,0.45)" : "none",
            }} />
          ))}
          <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.svg,.ai,.psd,.webp" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-9 h-9 rounded-full border-2" style={{ borderColor: "rgba(46,91,255,0.2)", borderTopColor: "var(--blue)", animation: "spin 0.9s linear infinite" }} />
              <p className="label" style={{ color: "var(--blue)" }}>Placing your design on products…</p>
            </div>
          ) : imageUrl ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(46,91,255,0.12)" }}>
                <svg className="w-4 h-4" style={{ color: "var(--blue)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-medium mt-1" style={{ color: "var(--fg)" }}>{fileName}</p>
              <p className="label" style={{ color: "var(--fg-4)" }}>Drop a new file to try another design</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl" style={{ background: "rgba(46,91,255,0.08)" }}>
                <svg className="w-6 h-6" style={{ color: "var(--blue)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-base mb-1" style={{ color: "var(--fg)" }}>Drop your design here</p>
                <p className="label" style={{ color: "var(--fg-4)" }}>or click to browse — JPG · PNG · SVG · AI · PSD</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-8 mb-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} imageUrl={showProducts ? imageUrl : null} loading={loading} />
          ))}
        </div>

        {imageUrl && (
          <div className="p-8 text-center card" style={{ border: "1px solid rgba(46,91,255,0.18)", background: "rgba(46,91,255,0.04)" }}>
            <p className="text-sm mb-1" style={{ color: "var(--fg-3)" }}>
              This is a quick preview. A real batch includes every angle, size variation, and a print-ready manufacturing file per product.
            </p>
            <p className="font-semibold text-base mb-6" style={{ color: "var(--fg)" }}>Ready to turn this into a real catalog?</p>
            <a href="#pricing" className="btn-primary">See pricing and get started</a>
          </div>
        )}
      </div>
    </section>
  );
}
