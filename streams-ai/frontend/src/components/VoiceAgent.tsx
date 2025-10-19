import { useRef, useState } from "react";

export default function VoiceAgent({ onAccept, onReject }:{
  onAccept: ()=>void; onReject: ()=>void;
}){
  const [listening,setListening] = useState(false);
  const recogRef = useRef<any>(null);

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.03; u.pitch = 1.05;
    speechSynthesis.speak(u);
  };

  const start = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if(!SR){ speak("Voice not supported on this browser."); return; }
    const r = new SR(); r.continuous = false; r.interimResults = false; r.lang = "en-US";
    r.onresult = (e:any) => {
      const text = e.results[0][0].transcript.toLowerCase();
      if(text.includes("yes") || text.includes("accept")) onAccept();
      else if(text.includes("no") || text.includes("decline")) onReject();
      else speak("Please say yes or no.");
    };
    r.onend = () => setListening(false);
    r.start(); setListening(true); speak("Okay, I'm listening. Say yes to accept, or no to decline.");
    recogRef.current = r;
  };

  return (
    <div className="flex items-center gap-3">
      <button onClick={start} className="rounded-full px-4 py-2 bg-white/10 border border-white/20">
        🎙 Speak
      </button>
      <button onClick={()=> speak("Switch to annual now and save twenty percent. Say yes to accept, or no to decline.")}
        className="rounded-full px-4 py-2 bg-white/10 border border-white/20">
        🔊 Replay Offer
      </button>
    </div>
  );
}
