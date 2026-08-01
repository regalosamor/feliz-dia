import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type LevelId = "maze" | "puzzle" | "memory" | "stars";

export const LEVELS: { id: LevelId; title: string; subtitle: string; icon: string }[] = [
  { id: "maze", title: "El Laberinto del Amor", subtitle: "Encuentra los 3 corazones", icon: "🧭" },
  { id: "puzzle", title: "Reconstruye la Foto", subtitle: "Arma el rompecabezas", icon: "🧩" },
  { id: "memory", title: "Memoria", subtitle: "Encuentra las parejas", icon: "🃏" },
  { id: "stars", title: "Constelación", subtitle: "Une las estrellas", icon: "🌌" },
];

type State = {
  done: LevelId[];
  complete: (id: LevelId) => void;
  reset: () => void;
  love: number;
  isDone: (id: LevelId) => boolean;
  allDone: boolean;
};

const KEY = "nuestra-historia-progreso";
const Ctx = createContext<State | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState<LevelId[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as LevelId[];
        if (Array.isArray(parsed)) {
          setDone(parsed.filter((d) => LEVELS.some((l) => l.id === d)));
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((next: LevelId[]) => {
    setDone(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const complete = useCallback(
    (id: LevelId) => {
      setDone((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [],
  );

  const value: State = {
    done,
    complete,
    reset: () => persist([]),
    love: Math.round((done.length / LEVELS.length) * 100),
    isDone: (id) => done.includes(id),
    allDone: done.length === LEVELS.length,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useGame() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useGame debe usarse dentro de GameProvider");
  return ctx;
}
