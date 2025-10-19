import HoloCard from "../components/HoloCard";
import NeonButton from "../components/NeonButton";
import ProgressDots from "../components/ProgressDots";
import { StreamDial } from "../components/StreamDial";

export default function PayScene(
  { mode, price, onPay, onWithdraw, onPause, pct, loading }:{
    mode: "pull" | "stream";
    price: string;
    onPay: ()=>void;
    onWithdraw: ()=>void;
    onPause: ()=>void;
    pct: number;
    loading: boolean;
  }
){
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{mode==="pull" ? "Pay" : "Streaming Console"}</h2>
        <ProgressDots step={3} total={4}/>
      </div>

      {mode==="pull" ? (
        <HoloCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white/70 text-sm">Amount due</div>
              <div className="text-3xl font-mono">{price}</div>
            </div>
            <NeonButton onClick={onPay} disabled={loading}>Pay + Pull (Atomic)</NeonButton>
          </div>
        </HoloCard>
      ) : (
        <HoloCard>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <StreamDial pct={pct}/>
            <div>
              <div className="text-white/70">Withdrawable now</div>
              <div className="text-2xl font-mono">{(pct*0.05).toFixed(4)} ALGO</div>
              <div className="mt-4 flex gap-3">
                <NeonButton onClick={onWithdraw} disabled={loading}>Withdraw</NeonButton>
                <NeonButton variant="ghost" onClick={onPause}>Pause</NeonButton>
              </div>
            </div>
          </div>
        </HoloCard>
      )}
    </div>
  );
}
