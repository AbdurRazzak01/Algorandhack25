export default function ProgressDots({step,total=4}:{step:number; total?:number}){
    return (
      <div className="flex gap-2">
        {Array.from({length: total}).map((_,i)=>(
          <div key={i} className={`h-1.5 w-6 rounded-full ${i<step? "bg-gradient-to-r from-acc1 to-acc2" : "bg-white/15"}`}/>
        ))}
      </div>
    );
  }
  