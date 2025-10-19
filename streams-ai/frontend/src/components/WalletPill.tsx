export default function WalletPill({addr,onClick}:{addr?:string; onClick:()=>void;}){
    return (
      <button onClick={onClick}
        className="rounded-full px-4 py-2 bg-white/10 border border-white/20">
        {addr ? addr.slice(0,6)+"…"+addr.slice(-4) : "Connect Pera"}
      </button>
    );
  }
  