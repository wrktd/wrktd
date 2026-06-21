"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "../ClientLayout";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { href: "#how-it-works", label: "How it works" },
    { href: "#pricing",      label: "Pricing"      },
    { href: "#faq",          label: "FAQ"          },
  ];

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <Image
            src="/logo.png"
            alt="WRKTD"
            height={28}
            width={160}
            style={{ height: 28, width: "auto", filter: theme === "light" ? "invert(1)" : "none", transition: "filter 0.25s" }}
            priority
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="label transition-colors"
              style={{ color: "var(--fg-3)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-3)")}>
              {l.label}
            </a>
          ))}

          {/* Theme toggle */}
          <button onClick={toggle} aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-full transition-all"
            style={{ border: "1px solid var(--bd)", background: "var(--fg-ghost)", color: "var(--fg-3)" }}>
            {theme === "dark" ? (
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <circle cx="12" cy="12" r="5"/><path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
              </svg>
            )}
          </button>

          <a href="#preview" className="btn-primary" style={{ padding: "10px 20px", fontSize: "0.75rem" }}>
            Try it free
          </a>
        </div>

        {/* Mobile burger */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggle} aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-full"
            style={{ border: "1px solid var(--bd)", background: "var(--fg-ghost)", color: "var(--fg-3)" }}>
            {theme === "dark" ? (
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <circle cx="12" cy="12" r="5"/><path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
              </svg>
            )}
          </button>
          <button onClick={() => setOpen(!open)}
            className="flex flex-col justify-center gap-[5px] w-8 h-8"
            aria-label="Menu" style={{ color: "var(--fg-3)" }}>
            <span className={`block h-px w-6 bg-current transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[8px]" : ""}`} />
            <span className={`block h-px w-6 bg-current transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block h-px w-6 bg-current transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[8px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 glass ${open ? "max-h-64" : "max-h-0"}`}>
        <div className="px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="label transition-colors" style={{ color: "var(--fg-3)" }}>
              {l.label}
            </a>
          ))}
          <a href="#preview" onClick={() => setOpen(false)} className="btn-primary text-center justify-center">
            Try it free
          </a>
        </div>
      </div>
    </nav>
  );
}
