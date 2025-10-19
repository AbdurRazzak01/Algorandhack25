import { motion } from "framer-motion";
import HoloCard from "./HoloCard";

const items = [
  {
    title: "AI Negotiator",
    body: "Adaptive discounts, upgrades, pauses — at the exact moment of intent.",
  },
  {
    title: "Atomic Pulls",
    body: "User payment + app call grouped in one on-chain action.",
  },
  {
    title: "Streaming Escrow",
    body: "Rate-limited withdraws authorized by the app.",
  },
  {
    title: "ASA Access Pass",
    body: "Portable entitlements across Algorand dApps.",
  },
];

export default function ValueCards() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-14">
      <div className="grid md:grid-cols-4 gap-4">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <HoloCard>
              <div className="text-sm text-white/60">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="text-xl font-semibold">{it.title}</div>
              <p className="text-white/70 mt-1">{it.body}</p>
            </HoloCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
