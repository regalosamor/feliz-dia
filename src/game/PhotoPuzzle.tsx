import { useMemo, useState } from "react";

const N = 3;

function shuffled(): number[] {
  const arr = Array.from({ length: N * N }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr.every((v, i) => v === i) ? shuffled() : arr;
}

export function PhotoPuzzle({ image, onWin }: { image: string; onWin: () => void }) {
  const [tiles, setTiles] = useState<number[]>(() => shuffled());
  const [picked, setPicked] = useState<number | null>(null);
  const solved = useMemo(() => tiles.every((v, i) => v === i), [tiles]);

  const click = (index: number) => {
    if (solved) return;
    if (picked === null) {
      setPicked(index);
      return;
    }
    if (picked === index) {
      setPicked(null);
      return;
    }
    const next = [...tiles];
    [next[picked], next[index]] = [next[index]!, next[picked]!];
    setTiles(next);
    setPicked(null);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-sm text-muted-foreground">
        Toca dos piezas para intercambiarlas hasta formar la foto.
      </p>

      <div
        className="grid w-[min(88vw,380px)] gap-[3px] overflow-hidden rounded-2xl bg-secondary p-[3px]"
        style={{ gridTemplateColumns: `repeat(${N}, minmax(0,1fr))` }}
      >
        {tiles.map((tile, i) => {
          const row = Math.floor(tile / N);
          const col = tile % N;
          return (
            <button
              key={i}
              onClick={() => click(i)}
              className={`aspect-square rounded-md bg-cover transition-transform ${
                picked === i ? "scale-95 ring-4 ring-primary" : ""
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: `${N * 100}% ${N * 100}%`,
                backgroundPosition: `${(col * 100) / (N - 1)}% ${(row * 100) / (N - 1)}%`,
              }}
              aria-label={`Pieza ${i + 1}`}
            />
          );
        })}
      </div>

      {solved && (
        <div className="flex flex-col items-center gap-3" style={{ animation: "pop-in 0.4s ease-out" }}>
          <p className="font-display text-2xl text-primary">La foto está completa ✨</p>
          <button
            onClick={onWin}
            className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-lg"
          >
            Continuar
          </button>
        </div>
      )}
    </div>
  );
}
