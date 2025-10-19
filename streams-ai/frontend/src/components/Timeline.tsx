import { motion } from "framer-motion";

const steps = [
  { k: "Connect", d: "Link Pera wallet to begin." },
  { k: "Choose", d: "Pick Monthly, Annual, or Streaming." },
  { k: "Negotiate", d: "AI offers a time-boxed deal within your policy caps." },
  { k: "Settle", d: "Pay + Pull or start Streaming; get a TxID receipt." },
];

export default function Timeline() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold mb-6">How it works</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className="rounded-2xl p-5 border border-white/10 bg-white/5 backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="text-white/60 text-sm">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="text-lg font-semibold">{s.k}</div>
            <div className="text-white/70">{s.d}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
