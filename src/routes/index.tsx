import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import foto1 from "@/assets/foto1.jpeg";
import foto2 from "@/assets/foto2.jpeg";
import fondo from "@/assets/fondo.png";
import { Constellation } from "@/game/Constellation";
import { Finale } from "@/game/Finale";
import { Maze } from "@/game/Maze";
import { MemoryGame } from "@/game/MemoryGame";
import { MusicToggle } from "@/game/Music";
import { PhotoPuzzle } from "@/game/PhotoPuzzle";
import { Typewriter } from "@/game/Typewriter";
import { GameProvider, LEVELS, useGame, type LevelId } from "@/game/state";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Feliz Día de la Novia" },
      {
        name: "description",
        content:
          "Recuerda que eres una mujer increible y especial. Lo puedes todo amor.",
      },
      { property: "og:title", content: "Feliz Día de la Novia" },
      {
        property: "og:description",
        content: "Recuerda que eres una mujer increible y especial. Lo puedes todo amor.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <GameProvider>
      <Game />
    </GameProvider>
  ),
});

function LoveMeter({ value }: { value: number }) {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Medidor de amor</span>
        <span className="font-medium text-primary">{value}%</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full transition-[width] duration-700"
          style={{ width: `${value}%`, background: "var(--gradient-love)" }}
        />
      </div>
    </div>
  );
}

function Game() {
  const { love, isDone, complete, allDone, reset } = useGame();
  const [active, setActive] = useState<LevelId | null>(null);

  const finish = (id: LevelId) => {
    complete(id);
    setActive(null);
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--gradient-warm)" }}>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Nivel a nivel</p>
            <h1 className="mt-1 font-display text-[clamp(30px,7vw,52px)] leading-none">
              Nuestra Historia
            </h1>
          </div>
          <MusicToggle />
        </header>

        <section className="surface mt-8 flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          <img
            src={fondo}
            alt="Retrato de Mariescler"
            className="h-24 w-24 shrink-0 rounded-2xl object-cover"
            loading="lazy"
          />
          <Typewriter
            className="text-[15px] leading-relaxed text-muted-foreground"
            text="Mariescler, despertaste en un pequeño mundo hecho de niveles. Supera cada uno para llenar el medidor de amor y abrir el regalo final."
          />
        </section>

        <div className="surface mt-6 p-5">
          <LoveMeter value={love} />
        </div>

        {active === null && !allDone && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {LEVELS.map((level, i) => {
              const done = isDone(level.id);
              const locked = i > 0 && !isDone(LEVELS[i - 1]!.id);
              return (
                <button
                  key={level.id}
                  disabled={locked}
                  onClick={() => setActive(level.id)}
                  className={`surface flex items-center gap-4 p-5 text-left transition-transform ${
                    locked ? "opacity-50" : "hover:-translate-y-1"
                  }`}
                >
                  <span className="text-3xl" aria-hidden>
                    {locked ? "🔒" : done ? "✅" : level.icon}
                  </span>
                  <span>
                    <span className="block font-display text-xl">{level.title}</span>
                    <span className="block text-sm text-muted-foreground">
                      {locked ? "Termina el nivel anterior" : done ? "Completado — puedes repetirlo" : level.subtitle}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {active !== null && (
          <div className="surface mt-6 p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-2xl">{LEVELS.find((l) => l.id === active)!.title}</h2>
              <button onClick={() => setActive(null)} className="text-sm text-muted-foreground underline">
                Volver
              </button>
            </div>
            {active === "maze" && <Maze onWin={() => finish("maze")} />}
            {active === "puzzle" && <PhotoPuzzle image={foto1} onWin={() => finish("puzzle")} />}
            {active === "memory" && <MemoryGame onWin={() => finish("memory")} />}
            {active === "stars" && <Constellation name="MARIESCLER" onWin={() => finish("stars")} />}
          </div>
        )}

        {allDone && active === null && (
          <div className="mt-6">
            <Finale onReset={reset} />
            <img
              src={foto2}
              alt="Recuerdo desbloqueado"
              className="mt-6 w-full rounded-3xl object-cover"
              style={{ maxHeight: 420 }}
              loading="lazy"
            />
          </div>
        )}

        <footer className="mt-10 text-center text-xs text-muted-foreground">
          Te amo demasiado mi amor ❤️
        </footer>
      </div>
    </main>
  );
}
