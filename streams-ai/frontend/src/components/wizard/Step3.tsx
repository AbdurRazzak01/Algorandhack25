// src/components/Wizard/Step3.tsx

export default function Step3() {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-white text-xl font-semibold mb-2">Stream Console</h2>
        <div className="flex gap-4">
          <button className="bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20">Start</button>
          <button className="bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20">Withdraw</button>
          <button className="bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20">Pause</button>
        </div>
      </div>
    );
  }
  