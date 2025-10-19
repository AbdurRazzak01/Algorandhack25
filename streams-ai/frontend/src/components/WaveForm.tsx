import { useEffect, useRef } from "react";
export default function Waveform({active}:{active:boolean}){
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const c = ref.current!; const x = c.getContext("2d")!;
    let t = 0, raf=0; c.width=260; c.height=60;
    const draw=()=>{
      x.clearRect(0,0,c.width,c.height);
      const mid=c.height/2;
      for(let i=0;i<c.width;i++){
        const amp = active? 18:8;
        const y = mid + Math.sin((i+t)/14)*amp * Math.sin((i+t)/35);
        x.fillStyle="rgba(124,77,255,.6)";
        x.fillRect(i,y,1,1.8);
      }
      t+=1; raf=requestAnimationFrame(draw);
    }; draw(); return ()=> cancelAnimationFrame(raf);
  },[active]);
  return <canvas ref={ref} className="opacity-90 rounded-md"/>;
}
