import GlitchTitle from "../components/GlitchTitle";
import NeonButton from "../components/NeonButton";
import WalletPill from "../components/WalletPill";

export default function HeroConnect({addr,onConnect}:{addr?:string; onConnect:()=>void;}){
  return (
    <div className="max-w-4xl mx-auto text-center py-20 px-6">
      <div className="aurora"></div>
      <GlitchTitle text="Make subscriptions smart."/>
      <p className="text-white/70 mt-3">
        AI negotiator. Usage-metered billing. Real-time settlement on Algorand — under cryptographic spend limits.
      </p>
      <div className="mt-8">
        <WalletPill addr={addr} onClick={onConnect}/>
      </div>
      <div className="mt-8 flex items-center justify-center gap-3 text-white/45 text-sm">
        <span>Step 1 of 4</span>
        <span>•</span>
        <span>Connect your wallet to begin</span>
      </div>
    </div>
  );
}
