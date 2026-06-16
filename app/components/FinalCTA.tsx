import PreviewTool from "./PreviewTool";

export default function FinalCTA() {
  return (
    <section className="bg-stone-50 border-t border-stone-100">
      <div className="py-16 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-4">
          Ready to see what your designs could become?
        </h2>
        <p className="text-lg text-stone-500 mb-3">
          Upload any design below — no account, no card, no commitment.
        </p>
        <p className="text-sm text-stone-400 mb-2">
          When you&apos;re ready to turn it into a real catalog, we&apos;re one message away.
        </p>
      </div>
      <PreviewTool />
    </section>
  );
}
