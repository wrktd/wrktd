"use client";
import { useState, useRef, useCallback, useEffect } from "react";

type ProductDef = {
  id: string;
  label: string;
  size: string;
  aspect: number;
  bg: string;
  weaveBg?: string;
  radius: string;
  shadow?: string;
};

const PRODUCTS: ProductDef[] = [
  {
    id: "rug",
    label: "Area Rug",
    size: "5×7 ft",
    aspect: 4 / 3,
    bg: "#C8B89A",
    weaveBg: `repeating-linear-gradient(0deg,rgba(0,0,0,0.045) 0px,rgba(0,0,0,0.045) 1px,transparent 1px,transparent 5px),
              repeating-linear-gradient(90deg,rgba(0,0,0,0.045) 0px,rgba(0,0,0,0.045) 1px,transparent 1px,transparent 5px),
              #C8B89A`,
    radius: "10px",
    shadow: "0 8px 32px rgba(0,0,0,0.3)",
  },
  {
    id: "pillow",
    label: "Woven Pillow",
    size: '18"×18"',
    aspect: 1,
    bg: "#B8C4B0",
    weaveBg: `repeating-linear-gradient(0deg,rgba(0,0,0,0.04) 0px,rgba(0,0,0,0.04) 1px,transparent 1px,transparent 5px),
              repeating-linear-gradient(90deg,rgba(0,0,0,0.04) 0px,rgba(0,0,0,0.04) 1px,transparent 1px,transparent 5px),
              #B8C4B0`,
    radius: "26px",
    shadow: "0 12px 36px rgba(0,0,0,0.3), inset 0 -4px 12px rgba(0,0,0,0.14)",
  },
  {
    id: "tapestry",
    label: "Wall Tapestry",
    size: "36×48 in",
    aspect: 3 / 4,
    bg: "#ABABBC",
    radius: "3px",
    shadow: "0 4px 24px rgba(0,0,0,0.35), 0 0 0 2px #9A9BAC",
  },
  {
    id: "blanket",
    label: "Woven Blanket",
    size: '50"×60"',
    aspect: 5 / 4,
    bg: "#C4AE92",
    weaveBg: `repeating-linear-gradient(0deg,rgba(0,0,0,0.05) 0px,rgba(0,0,0,0.05) 1px,transparent 1px,transparent 6px),
              repeating-linear-gradient(90deg,rgba(0,0,0,0.03) 0px,rgba(0,0,0,0.03) 1px,transparent 1px,transparent 6px),
              #C4AE92`,
    radius: "8px",
    shadow: "0 8px 28px rgba(0,0,0,0.28)",
  },
];

function ProductCard({ product, imageUrl, loading }: { product: ProductDef; imageUrl: string | null; loading: boolean }) {
  const padBottom = `${(1 / product.aspect) * 100}%`;
  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full" style={{ paddingBottom: padBottom }}>
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ background: product.weaveBg ?? product.bg, borderRadius: product.radius, boxShadow: product.shadow }}
        >
          {loading && (
            <div className="absolute inset-0" style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 50%, transparent 100%)",
              backgroundSize: "400px 100%",
              animation: "shimmer 1.2s infinite linear",
            }} />
          )}
          {imageUrl && !loading && (
            <img src={imageUrl} alt={product.label} className="absolute inset-0 w-full h-full object-cover"
              style={{ mixBlendMode: "multiply", opacity: 0.87, borderRadius: product.radius }} />
          )}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-cream/70 tracking-wide">{product.label}</p>
        <p className="text-xs mt-0.5" style={{ color: "rgba(250,247,242,0.3)" }}>{product.size}</p>
      </div>
    </div>
  );
}

export default function FinalCTA() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const prevUrl = useRef<string | null>(null);

  const handleFile = useCallback((file: File) => {
    const accepted = /\.(jpe?g|png|svg|ai|psd|webp)$/i;
    if (!accepted.test(file.name) && !file.type.startsWith("image/")) {
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
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0]; if (f) handleFile(f);
  }, [handleFile]);

  useEffect(() => () => { if (prevUrl.current) URL.revokeObjectURL(prevUrl.current); }, []);

  const showProducts = imageUrl || loading;

  return (
    <section className="grain bg-ink overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-28 pb-28">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
          width: "70vw", height: "50vw", maxWidth: 800, maxHeight: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(184,154,78,0.09) 0%, transparent 65%)",
        }} />

        {/* Heading */}
        <div className="relative text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-10 bg-gold/30" />
            <span className="label text-gold/50">Ready when you are</span>
            <div className="h-px w-10 bg-gold/30" />
          </div>
          <h2 className="font-display font-light text-cream leading-[0.92] mb-5"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>
            See what your designs
            <br />
            <em className="not-italic text-gold">could become.</em>
          </h2>
          <p className="text-base max-w-sm mx-auto" style={{ color: "rgba(250,247,242,0.35)" }}>
            No account, no card, no commitment. Drop in a design — see it on real products in seconds.
          </p>
        </div>

        {/* Drop zone — dark variant */}
        <div
          role="button" tabIndex={0}
          onClick={() => fileRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className="relative mb-14 cursor-pointer select-none transition-all duration-300 text-center"
          style={{
            border: `1px solid ${dragging ? "#B89A4E" : "rgba(250,247,242,0.1)"}`,
            background: dragging ? "rgba(184,154,78,0.06)" : "rgba(250,247,242,0.02)",
            padding: "3.5rem 2rem",
          }}
        >
          {(["tl","tr","bl","br"] as const).map((c) => (
            <span key={c} className="absolute" style={{
              top: c.startsWith("t") ? 8 : "auto", bottom: c.startsWith("b") ? 8 : "auto",
              left: c.endsWith("l") ? 8 : "auto", right: c.endsWith("r") ? 8 : "auto",
              width: 14, height: 14,
              borderTop:    c.startsWith("t") ? "1.5px solid rgba(184,154,78,0.5)" : "none",
              borderBottom: c.startsWith("b") ? "1.5px solid rgba(184,154,78,0.5)" : "none",
              borderLeft:   c.endsWith("l")   ? "1.5px solid rgba(184,154,78,0.5)" : "none",
              borderRight:  c.endsWith("r")   ? "1.5px solid rgba(184,154,78,0.5)" : "none",
            }} />
          ))}
          <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.svg,.ai,.psd,.webp" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-9 h-9 rounded-full border-2 border-gold/20"
                style={{ borderTopColor: "#B89A4E", animation: "spin 0.9s linear infinite" }} />
              <p className="label text-gold">Placing your design on products…</p>
            </div>
          ) : imageUrl ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(184,154,78,0.15)" }}>
                <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-medium text-cream/70 mt-1">{fileName}</p>
              <p className="label" style={{ color: "rgba(250,247,242,0.3)" }}>Drop a new file to try another design</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center" style={{ background: "rgba(184,154,78,0.08)" }}>
                <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-cream/70 text-base mb-1">Drop your design here</p>
                <p className="label" style={{ color: "rgba(250,247,242,0.28)" }}>or click to browse — JPG · PNG · SVG · AI · PSD</p>
              </div>
            </div>
          )}
        </div>

        {/* Products */}
        <div className="grid gap-8 mb-12" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} imageUrl={showProducts ? imageUrl : null} loading={loading} />
          ))}
        </div>

        {/* Post-preview nudge */}
        {imageUrl && (
          <div className="p-8 text-center" style={{ border: "1px solid rgba(184,154,78,0.2)", background: "rgba(184,154,78,0.05)" }}>
            <p className="text-sm mb-1" style={{ color: "rgba(250,247,242,0.35)" }}>
              This is a quick preview. A real batch includes every angle, size variation, and a print-ready manufacturing file per product.
            </p>
            <p className="font-semibold text-cream/70 text-base mb-6">Ready to turn this into a real catalog?</p>
            <a href="#pricing" className="label inline-block bg-gold hover:bg-gold-light text-ink px-8 py-4 transition-colors">
              See pricing and get started
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
