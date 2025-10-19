import { useState } from "react";
import { api } from "../lib/api";

export function useGPTAgent(userAddr?: string) {
  const [offer, setOffer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOffer = async (plan: "monthly" | "annual" | "streaming") => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/gpt-offer", { user: userAddr, plan });
      setOffer(res.data.text || "Switch to Annual and save 20% today.");
    } catch (e: any) {
      setError("GPT agent failed. Using default.");
      setOffer("Switch to Annual and save 20% today.");
    } finally {
      setLoading(false);
    }
  };

  return { offer, loading, error, fetchOffer };
}
