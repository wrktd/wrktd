"use client";
import { useState } from "react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-black text-xl tracking-tight text-stone-900">WRKTD</a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a href="#how-it-works" className="hover:text-stone-900 transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-stone-900 transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-stone-900 transition-colors">FAQ</a>
          <a href="#preview" className="bg-stone-900 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors">
            Try it free
          </a>
        </div>
        <button
          className="md:hidden p-2 text-stone-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current" />
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-stone-600">
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <a href="#preview" onClick={() => setMenuOpen(false)} className="bg-stone-900 text-white px-4 py-2 rounded-lg text-center">Try it free</a>
        </div>
      )}
    </nav>
  );
}
