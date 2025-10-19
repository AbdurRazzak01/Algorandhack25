// src/components/Wizard/Wizard.tsx

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { AnimatePresence } from "framer-motion";

interface WizardProps {
  open: boolean;
  step: number;
  setStep: (s: number) => void;
  plan: string | null;
  addr: string;
  onClose: () => void;
}

export default function Wizard({
  open,
  step,
  setStep,
  plan,
  addr,
  onClose,
}: WizardProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center px-4">
      <div className="bg-[#0A0E14] rounded-2xl shadow-xl max-w-2xl w-full p-6 md:p-10 relative overflow-hidden border border-white/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white text-xl"
        >
          ×
        </button>

        <AnimatePresence mode="wait">
          {step === 1 && <Step1 key="step1" setStep={setStep} />}
          {step === 2 && (
            <Step2 key="step2" open={open} step={step} plan={plan} addr={addr} />
          )}
          {step === 3 && <Step3 key="step3" />}
          {step === 4 && <Step4 key="step4" onClose={onClose} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
