export function StreamDial({ pct }: { pct:number }) {
    const R = 64, C = 2*Math.PI*R, dash = C*(1-pct);
    return (
      <svg width="160" height="160" className="drop-shadow-[0_0_30px_rgba(98,255,246,0.35)]">
        <circle cx="80" cy="80" r={R} stroke="rgba(255,255,255,0.15)" strokeWidth="10" fill="none"/>
        <circle cx="80" cy="80" r={R} stroke="url(#g)" strokeWidth="10" fill="none"
          strokeDasharray={C} strokeDashoffset={dash} strokeLinecap="round"
          style={{transition:"stroke-dashoffset 220ms ease"}}/>
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#62FFF6"/><stop offset="100%" stopColor="#7C4DFF"/>
          </linearGradient>
        </defs>
      </svg>
    );
  }

  