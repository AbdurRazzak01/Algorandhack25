export function TxToast({ txid, explorer }: { txid?:string; explorer:string }){
    if(!txid) return null;
    return (
      <div className="fixed bottom-5 right-5 rounded-xl bg-panel border border-stroke backdrop-blur-md px-4 py-3 shadow-glow">
        <div className="text-sm text-white/70">Transaction confirmed</div>
        <a className="text-sm underline" href={`${explorer}${txid}`} target="_blank">
          {txid.slice(0,6)}…{txid.slice(-6)}
        </a>
      </div>
    );
  }
  