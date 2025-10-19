import Waveform from "./WaveForm";
import NeonButton from "./NeonButton";

export default function AgentPanel(
  { onAccept, onReject, speaking, onSpeak }:{
    onAccept:()=>void; onReject:()=>void; speaking:boolean; onSpeak:()=>void;
  }
){
  return (
    <div className="space-y-3">
      <div className="text-sm text-white/70">
        “You’re at 82% of your quota. Switch to <b>Annual</b> and save <b>20%</b> today?”
      </div>
      <Waveform active={speaking}/>
      <div className="flex gap-3">
        <NeonButton onClick={onAccept}>Accept</NeonButton>
        <NeonButton variant="ghost" onClick={onReject}>No thanks</NeonButton>
        <NeonButton variant="ghost" onClick={onSpeak}>🔊 Replay</NeonButton>
      </div>
      <p className="text-xs text-white/45">
        Agent can only apply discounts within your on-chain policy — it never moves funds.
      </p>
    </div>
  );
}
