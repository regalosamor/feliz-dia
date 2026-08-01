import { useState } from "react";

const STARS = [
  { x: 12, y: 70 },
  { x: 26, y: 32 },
  { x: 42, y: 58 },
  { x: 55, y: 22 },
  { x: 70, y: 55 },
  { x: 86, y: 28 },
];

export function Constellation({ name, onWin }: { name: string; onWin: () => void }) {
  const [step, setStep] = useState(0);
  const done = step === STARS.length;

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-sm text-muted-foreground">
        Toca las estrellas en orden para dibujar la constelación ({step}/{STARS.length}).
      </p>

      <div className="relative w-[min(92vw,520px)] overflow-hidden rounded-2xl bg-night" style={{ aspectRatio: "16/10" }}>
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-night-foreground"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 61) % 100}%`,
              width: 2,
              height: 2,
              animation: `twinkle ${2 + (i % 4)}s ease-in-out infinite`,
            }}
          />
        ))}

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {STARS.slice(0, Math.max(step - 1, 0)).map((s, i) => {
            const n = STARS[i + 1]!;
            return (
              <line
                key={i}
                x1={s.x}
                y1={s.y}
                x2={n.x}
                y2={n.y}
                stroke="oklch(0.8 0.12 85)"
                strokeWidth="0.6"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {STARS.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep((v) => (v === i ? v + 1 : v))}
            className={`absolute -translate-x-1/2 -translate-y-1/2 text-2xl transition-transform ${
              i < step ? "scale-110 opacity-100" : i === step ? "opacity-90" : "opacity-40"
            }`}
            style={{ left: `${s.x}%`, top: `${s.y}%`, animation: i === step ? "beat 1.2s infinite" : undefined }}
            aria-label={`Estrella ${i + 1}`}
          >
            {i < step ? "✨" : "⭐"}
          </button>
        ))}

        {done && (
          <div
            className="absolute inset-x-0 bottom-6 text-center font-display text-[clamp(20px,5vw,34px)] text-gold"
            style={{ animation: "pop-in 0.5s ease-out" }}
          >
            {name} ❤️
          </div>
        )}
      </div>

      {done && (
        <button
          onClick={onWin}
          className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-lg"
        >
          Continuar
        </button>
      )}
    </div>
  );
}
