import { useEffect } from "react";
import AgentOrb from "../../components/AgentOrb";
import { useGPTAgent } from "../../hooks/useGPTAgent";

interface Step2Props {
  open: boolean;
  step: number;
  plan: string | null;
  addr: string;
  onAccept?: () => void;
  onDecline?: () => void;
  onReplayVoice?: () => void;
  setStep?: (s: number) => void;
}

export default function Step2({
  open,
  step,
  plan,
  addr,
  onAccept,
  onDecline,
  onReplayVoice,
  setStep,
}: Step2Props) {
  const { offer, fetchOffer, loading: offerLoading } = useGPTAgent(addr);

  useEffect(() => {
    if (open && step === 2 && plan) {
      fetchOffer(plan);
    }
  }, [open, step, plan]);

  const speak = (text: string) => {
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1.03;
      u.pitch = 1.05;
      speechSynthesis.speak(u);
    } catch {}
  };

  const handleReplay = () => {
    if (offer) speak(offer);
    else speak("Switch to annual now and save twenty percent. Say yes to accept or no to decline.");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] py-8">
      {/* Animated Orb */}
      <div className="mb-8">
        <AgentOrb speaking={offerLoading} />
      </div>

      {/* Offer Text */}
      <div className="text-white/90 text-xl font-medium max-w-lg leading-snug mb-8">
        {offerLoading ? (
          <div className="animate-pulse text-white/40">
            Fetching your personalized offer...
          </div>
        ) : (
          <>
            “{offer || "Switch to annual now and save 20% today?"}”
            <div className="text-sm text-white/40 mt-3">
              Agent-smart offer based on your current plan usage.
            </div>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onAccept || (() => setStep && setStep(3))}
          className="px-6 py-3 rounded-xl bg-gradient-to-br from-acc1 to-acc2 text-white font-semibold shadow-lg hover:opacity-90 transition"
        >
          ✅ Accept Offer
        </button>
        <button
          onClick={onDecline || (() => setStep && setStep(3))}
          className="px-6 py-3 rounded-xl border border-white/30 text-white/70 hover:text-white hover:border-white transition"
        >
          ❌ Decline
        </button>
      </div>

      {/* Replay Voice */}
      <button
        onClick={onReplayVoice || handleReplay}
        className="mt-6 text-sm text-white/40 hover:text-white transition underline"
      >
        🔁 Replay Agent Voice
      </button>
    </div>
  );
}
