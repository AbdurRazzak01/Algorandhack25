// src/components/Wizard/Step1.tsx

export default function Step1({ setStep }: { setStep: (s: number) => void }) {
    const handleSelect = (plan: string) => {
      // save to parent state
      localStorage.setItem("plan", plan);
      setStep(2);
    };
  
    return (
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-white text-xl font-semibold mb-4">Choose a Plan</h2>
        <div className="grid gap-4 md:grid-cols-3 w-full">
          {["Monthly", "Annual", "Streaming"].map((plan) => (
            <button
              key={plan}
              onClick={() => handleSelect(plan)}
              className="bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl border border-white/10"
            >
              {plan}
            </button>
          ))}
        </div>
      </div>
    );
  }
  