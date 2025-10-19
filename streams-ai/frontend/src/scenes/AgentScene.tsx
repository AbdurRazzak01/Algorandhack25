// src/scenes/AgentScene.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AgentOrb from "../components/AgentOrb";
import NeonButton from "../components/NeonButton";

export default function AgentScene({
  onAccept,
  onDecline,
  onSpeak,
  speaking,
}: {
  onAccept: () => void;
  onDecline: () => void;
  onSpeak: () => void;
  speaking: boolean;
}) {
  const [agentMessage, setAgentMessage] = useState("Thinking...");
  const [loading, setLoading] = useState(true);

  // Fetch AI message from backend when component mounts
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch("http://localhost:8080/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              { role: "user", content: "Should I switch to annual plan?" },
            ],
          }),
        });

        const json = await res.json();
        setAgentMessage(json.reply);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setAgentMessage("⚠️ Agent is unavailable. Please try again later.");
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  // 🔊 Speak agent message automatically
  useEffect(() => {
    if (!loading && agentMessage && agentMessage !== "Thinking...") {
      const u = new SpeechSynthesisUtterance(agentMessage);
      u.rate = 1.03;
      u.pitch = 1.05;
      u.onstart = () => console.log("Speaking...");
      speechSynthesis.speak(u);
    }
  }, [agentMessage, loading]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center relative z-10">
      {/* 3D Orb */}
      <div className="mb-8">
        <AgentOrb speaking={speaking} />
      </div>

      {/* AI Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-white text-lg md:text-xl font-medium max-w-2xl mb-6 whitespace-pre-line leading-relaxed"
      >
        {loading ? "🤔 Thinking..." : agentMessage}
      </motion.div>

      {/* Buttons */}
      <div className="flex gap-4 flex-wrap justify-center">
        <NeonButton onClick={onAccept}>✅ Accept</NeonButton>
        <NeonButton onClick={onDecline}>❌ Decline</NeonButton>
        <NeonButton onClick={onSpeak}>🔁 Replay</NeonButton>
      </div>
    </div>
  );
}
