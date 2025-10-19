import HoloCard from "../components/HoloCard";
import ProgressDots from "../components/ProgressDots";

export default function ReceiptsScene({txid, explorer}:{txid?:string; explorer:string}){
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Receipts & Pass</h2>
        <ProgressDots step={4} total={4}/>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <HoloCard>
          <div className="text-sm text-white/60 mb-2">Latest receipt</div>
          {txid ? (
            <a className="underline" target="_blank" href={`${explorer}${txid}`}>
              {txid.slice(0,10)}…{txid.slice(-8)}
            </a>
          ) : <div className="text-white/50 text-sm">No recent transactions.</div>}
        </HoloCard>

        <HoloCard>
          <div className="text-sm text-white/60 mb-2">Access Pass</div>
          <div className="rounded-2xl h-28 bg-gradient-to-br from-acc1/25 to-acc2/25 border border-white/10 backdrop-blur-md flex items-center justify-center">
            <div className="text-white/75">Active (demo)</div>
          </div>
        </HoloCard>
      </div>
    </div>
  );
}
