"use client";
import { useState, useRef, useCallback, useEffect } from "react";

const PRODUCTS = [
  {
    id: "rug",
    label: "Area Rug",
    aspect: "4/3",
    bgColor: "#e8e4de",
    shape: "rounded-2xl",
    description: "5×7 ft",
  },
  {
    id: "pillow",
    label: "Woven Pillow",
    aspect: "1/1",
    bgColor: "#dde8e4",
    shape: "rounded-xl",
    description: '18"×18"',
  },
  {
    id: "tapestry",
    label: "Wall Tapestry",
    aspect: "3/4",
    bgColor: "#e4dde8",
    shape: "rounded-lg",
    description: "36×48 in",
  },
  {
    id: "blanket",
    label: "Woven Blanket",
    aspect: "4/3",
    bgColor: "#e8e4d0",
    shape: "rounded-2xl",
    description: '50"×60"',
  },
];

function ProductMockup({
  product,
  imageUrl,
}: {
  product: (typeof PRODUCTS)[0];
  imageUrl: string | null;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`relative overflow-hidden ${product.shape} shadow-lg border border-white/50`}
        style={{
          aspectRatio: product.aspect,
          width: "100%",
          background: product.bgColor,
        }}
      >
        {imageUrl ? (
          <>
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 3px,
                  rgba(0,0,0,0.08) 3px,
                  rgba(0,0,0,0.08) 4px
                ), repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 3px,
                  rgba(0,0,0,0.08) 3px,
                  rgba(0,0,0,0.08) 4px
                )`,
              }}
            />
            <img
              src={imageUrl}
              alt={product.label}
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90"
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-stone-400 font-medium">{product.label}</span>
          </div>
        )}
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-stone-700">{product.label}</p>
        <p className="text-xs text-stone-400">{product.description}</p>
      </div>
    </div>
  );
}

export default function PreviewTool() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file) return;
    const accepted = ["image/jpeg", "image/png", "image/svg+xml", "image/webp"];
    if (!accepted.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|svg|ai|psd)$/i)) {
      alert("Please upload a JPG, PNG, or SVG file.");
      return;
    }
    setIsProcessing(true);
    setFileName(file.name);
    const url = URL.createObjectURL(file);
    setTimeout(() => {
      setImageUrl(url);
      setIsProcessing(false);
    }, 800);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  return (
    <section id="preview" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-4">
            See your design on real products — instantly.
          </h2>
          <p className="text-lg text-stone-500 max-w-xl mx-auto">
            Upload any design file. No account, no payment, no signup. See your design on rugs, pillows, tapestries, and blankets in seconds.
          </p>
        </div>

        <div
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all mb-12 ${
            isDragging
              ? "border-amber-400 bg-amber-50"
              : "border-stone-200 bg-stone-50 hover:border-stone-400 hover:bg-stone-100"
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.svg,.ai,.psd"
            className="hidden"
            onChange={onFileChange}
          />
          {isProcessing ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-stone-300 border-t-stone-700 rounded-full animate-spin" />
              <p className="text-stone-500 font-medium">Placing your design on products…</p>
            </div>
          ) : imageUrl ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-stone-700 font-semibold">{fileName}</p>
              <p className="text-stone-400 text-sm">Click or drag to try a different design</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-stone-200 flex items-center justify-center">
                <svg className="w-7 h-7 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-stone-700 font-semibold text-lg">Drop your design here</p>
                <p className="text-stone-400 text-sm mt-1">or click to browse — JPG, PNG, SVG, AI, PSD</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {PRODUCTS.map((product) => (
            <ProductMockup key={product.id} product={product} imageUrl={imageUrl} />
          ))}
        </div>

        {imageUrl && (
          <div className="text-center p-8 bg-stone-50 rounded-2xl border border-stone-100">
            <p className="text-stone-500 text-sm mb-1">
              This is a quick preview. A real batch includes every angle, size variation, and a print-ready file for each product.
            </p>
            <p className="font-semibold text-stone-700 mb-6">
              Ready to turn this into a real catalog?
            </p>
            <a
              href="#pricing"
              className="inline-block bg-stone-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-stone-700 transition-colors"
            >
              See pricing and get started
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
