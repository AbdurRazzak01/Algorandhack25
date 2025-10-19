// src/components/Wizard/Step4.tsx

export default function Step4({ onClose }: { onClose: () => void }) {
    const txid = "ABC123"; // get from prop/store
  
    return (
      <div className="flex flex-col items-center gap-4 text-white text-center">
        <h2 className="text-xl font-semibold">All Set ✅</h2>
        <p className="text-white/70">Your transaction is confirmed.</p>
        <a
          href={`https://explorer.pera.xyz/tx/${txid}`}
          target="_blank"
          className="text-sm underline text-cyan-400 hover:text-cyan-300"
        >
          View on Algorand Explorer
        </a>
        <button
          onClick={onClose}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-[#62FFF6] to-[#7C4DFF] text-[#0A0E14] rounded-full font-semibold"
        >
          Done
        </button>
      </div>
    );
  }
  