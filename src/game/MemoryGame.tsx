import { useEffect, useState } from "react";

const PAIRS = [
  { icon: "🎧", label: "Música" },
  { icon: "🍦", label: "Antojos" },
  { icon: "📷", label: "Fotos" },
  { icon: "🌙", label: "Noches largas" },
  { icon: "☕", label: "Charlas" },
  { icon: "🎁", label: "Sorpresas" },
];

type Card = { id: number; icon: string; label: string };

function build(): Card[] {
  const cards = PAIRS.flatMap((p, i) => [
    { id: i * 2, ...p },
    { id: i * 2 + 1, ...p },
  ]);
  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j]!, cards[i]!];
  }
  return cards;
}

export function MemoryGame({ onWin }: { onWin: () => void }) {
  const [cards] = useState<Card[]>(build);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    if (flipped.length !== 2) return;
    setLock(true);
    const [a, b] = flipped.map((i) => cards[i]!);
    const t = setTimeout(() => {
      if (a!.icon === b!.icon) setMatched((m) => [...m, a!.icon]);
      setFlipped([]);
      setLock(false);
    }, 750);
    return () => clearTimeout(t);
  }, [flipped, cards]);

  const done = matched.length === PAIRS.length;

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-sm text-muted-foreground">
        Encuentra las {PAIRS.length} parejas. Halladas: {matched.length}/{PAIRS.length}
      </p>

      <div className="grid w-[min(92vw,420px)] grid-cols-4 gap-2">
        {cards.map((card, i) => {
          const open = flipped.includes(i) || matched.includes(card.icon);
          return (
            <button
              key={card.id}
              disabled={lock || open}
              onClick={() => setFlipped((f) => (f.length < 2 ? [...f, i] : f))}
              className={`flex aspect-[3/4] flex-col items-center justify-center gap-1 rounded-xl border text-center transition-all ${
                open ? "bg-card" : "bg-gradient-to-br from-primary to-accent"
              }`}
              aria-label={open ? card.label : "Carta oculta"}
            >
              {open ? (
                <>
                  <span className="text-2xl">{card.icon}</span>
                  <span className="px-1 text-[10px] leading-tight text-muted-foreground">{card.label}</span>
                </>
              ) : (
                <span className="text-xl text-primary-foreground">❦</span>
              )}
            </button>
          );
        })}
      </div>

      {done && (
        <button
          onClick={onWin}
          style={{ animation: "pop-in 0.3s ease-out" }}
          className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-lg"
        >
          Continuar
        </button>
      )}
    </div>
  );
}
