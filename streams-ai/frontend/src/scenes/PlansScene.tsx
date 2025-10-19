import HoloCard from "../components/HoloCard";
import NeonButton from "../components/NeonButton";
import ProgressDots from "../components/ProgressDots";
import type { Plan } from "../state/flow";

export default function PlansScene(
  {selected, onSelect, onNext}:{selected?:Plan; onSelect:(p:Plan)=>void; onNext:()=>void;}
){
  const Card = ({id,title,price}:{id:Plan; title:string; price:string}) => (
    <HoloCard className={`cursor-pointer ${selected===id? "ring-2 ring-acc1/70" : ""}`} >
      <div className="text-sm text-white/60">Plan</div>
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-white/70 mt-1">{price}</div>
      <div className="mt-4">
        <NeonButton variant="ghost" onClick={()=> onSelect(id)}>
          {selected===id? "Selected" : "Select"}
        </NeonButton>
      </div>
    </HoloCard>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Choose your plan</h2>
        <ProgressDots step={1} total={4}/>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <Card id="monthly"  title="Monthly"  price="2.0000 ALGO / period"/>
        <Card id="annual"   title="Annual"   price="20.0000 ALGO / year"/>
        <Card id="streaming" title="Streaming" price="0.0010 ALGO / min"/>
      </div>
      <div className="pt-2">
        <NeonButton onClick={onNext} disabled={!selected}>Continue</NeonButton>
      </div>
    </div>
  );
}
