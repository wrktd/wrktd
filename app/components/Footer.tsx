export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-black text-white text-lg tracking-tight">WRKTD</p>
          <p className="text-sm mt-1">Done-for-you home decor products for brands, creators, and artists.</p>
        </div>
        <div className="text-sm text-center md:text-right">
          <p>© {new Date().getFullYear()} WRKTD LLC. All rights reserved.</p>
          <p className="mt-1 text-stone-600">Questions? Reach out and we&apos;ll get back to you.</p>
        </div>
      </div>
    </footer>
  );
}
