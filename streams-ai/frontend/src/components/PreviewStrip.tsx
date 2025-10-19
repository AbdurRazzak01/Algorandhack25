import previews from "../data/previews.json";

export default function PreviewStrip() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-14">
      <h2 className="text-2xl font-semibold text-white mb-6">Live Preview</h2>
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-6 min-w-max snap-x snap-mandatory">
          {previews.map((p, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-[300px] rounded-2xl overflow-hidden bg-panel border border-white/10 backdrop-blur-md shadow-glow"
            >
              <img
                src={p.src}
                alt={p.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-white/90">
                <div className="font-semibold">{p.title}</div>
                <p className="text-white/60 text-sm mt-1">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
