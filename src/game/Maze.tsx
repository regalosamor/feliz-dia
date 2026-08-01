import { useCallback, useEffect, useRef, useState } from "react";

const MAP = [
  "###############",
  "#.....#.......#",
  "#.###.#.#####.#",
  "#.#...#.....#.#",
  "#.#.#######.#.#",
  "#...#.....#...#",
  "###.#.###.#.###",
  "#...#.#...#...#",
  "#.###.#.#####.#",
  "#.............#",
  "###############",
];

const HEARTS: [number, number][] = [
  [3, 3],
  [7, 7],
  [9, 13],
];

const PHRASES = [
  "Aquí empieza el camino ❤️",
  "Sigue explorando, no hay prisa",
  "Cada paso cuenta",
  "Te falta poco",
];

type Pos = { r: number; c: number };

export function Maze({ onWin }: { onWin: () => void }) {
  const [pos, setPos] = useState<Pos>({ r: 1, c: 1 });
  const [found, setFound] = useState<number[]>([]);
  const [phrase, setPhrase] = useState<string | null>(null);
  const [keyReady, setKeyReady] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  const move = useCallback((dr: number, dc: number) => {
    setPos((p) => {
      const r = p.r + dr;
      const c = p.c + dc;
      if (MAP[r]?.[c] !== ".") return p;
      return { r, c };
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const map: Record<string, [number, number]> = {
        w: [-1, 0],
        arrowup: [-1, 0],
        s: [1, 0],
        arrowdown: [1, 0],
        a: [0, -1],
        arrowleft: [0, -1],
        d: [0, 1],
        arrowright: [0, 1],
      };
      const m = map[k];
      if (m) {
        e.preventDefault();
        move(m[0], m[1]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  useEffect(() => {
    const idx = HEARTS.findIndex(([r, c]) => r === pos.r && c === pos.c);
    if (idx >= 0 && !found.includes(idx)) {
      const next = [...found, idx];
      setFound(next);
      setPhrase(PHRASES[next.length - 1] ?? PHRASES[0]!);
      if (next.length === HEARTS.length) setKeyReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos]);

  useEffect(() => {
    if (!phrase) return;
    const t = setTimeout(() => setPhrase(null), 2200);
    return () => clearTimeout(t);
  }, [phrase]);

  const dir = (dr: number, dc: number, label: string) => (
    <button
      onPointerDown={(e) => {
        e.preventDefault();
        move(dr, dc);
      }}
      className="h-14 w-14 rounded-xl bg-secondary text-xl text-secondary-foreground shadow-sm active:scale-95"
      aria-label={label}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-sm text-muted-foreground">
        Muévete con WASD, flechas o los botones. Corazones: {found.length}/3
      </p>

      <div ref={boardRef} className="relative">
        <div
          className="grid gap-[2px] rounded-2xl bg-night p-2"
          style={{ gridTemplateColumns: `repeat(${MAP[0]!.length}, minmax(0,1fr))` }}
        >
          {MAP.flatMap((row, r) =>
            row.split("").map((cell, c) => {
              const heartIdx = HEARTS.findIndex(([hr, hc]) => hr === r && hc === c);
              const isPlayer = pos.r === r && pos.c === c;
              return (
                <div
                  key={`${r}-${c}`}
                  className={`flex aspect-square w-[clamp(16px,4.4vw,34px)] items-center justify-center rounded-[3px] text-[clamp(9px,2.6vw,18px)] ${
                    cell === "#" ? "bg-secondary-foreground/70" : "bg-night-foreground/10"
                  }`}
                >
                  {isPlayer ? (
                    <span style={{ animation: "beat 1s infinite" }}>🧍‍♀️</span>
                  ) : heartIdx >= 0 && !found.includes(heartIdx) ? (
                    <span>❤️</span>
                  ) : null}
                </div>
              );
            }),
          )}
        </div>
        {phrase && (
          <div
            className="pointer-events-none absolute inset-x-0 top-1/3 text-center font-display text-2xl text-primary-foreground"
            style={{ animation: "float-up 2.2s ease-out forwards" }}
          >
            {phrase}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 sm:hidden">
        <div />
        {dir(-1, 0, "↑")}
        <div />
        {dir(0, -1, "←")}
        {dir(1, 0, "↓")}
        {dir(0, 1, "→")}
      </div>

      {keyReady && (
        <button
          onClick={onWin}
          style={{ animation: "pop-in 0.3s ease-out" }}
          className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-lg"
        >
          🔑 Tomar la llave y avanzar
        </button>
      )}
    </div>
  );
}
