// src/components/Hero.tsx

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import AgentCanvas from "./AgentCanvas";
import StaticOrb from "./StaticOrb";

export default function Hero({ onConnect }: { onConnect: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      await onConnect();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0A0E14]">
      {/* Orb Background */}
      <div className="absolute inset-0 -z-10">
        {prefersReducedMotion ? <StaticOrb /> : <AgentCanvas />}
      </div>

      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center h-full px-4 text-center z-10 relative">
        <motion.h1
          className="text-white text-4xl md:text-6xl font-semibold mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Make subscriptions smart.
        </motion.h1>

        <motion.p
          className="text-white/70 text-lg md:text-xl max-w-xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          AI billing. Discounts. Real-time pay on Algorand.
        </motion.p>

        <motion.button
          className="bg-gradient-to-r from-[#62FFF6] to-[#7C4DFF] text-[#0A0E14] px-10 py-4 text-lg font-semibold rounded-full shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#62FFF6] transition-all duration-200"
          onClick={handleConnect}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          disabled={loading}
        >
          {loading ? "Connecting..." : "Connect Pera Wallet"}
        </motion.button>
      </div>
    </section>
  );
}
