import { useState } from "react";

const PETALS = ["🌸", "❤️", "✨", "💗", "🌷"];

export function Finale({ onReset }: { onReset: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-night px-6 py-14 text-center text-night-foreground">
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-xl"
            style={{
              left: `${(i * 17) % 100}%`,
              animation: `fall ${6 + (i % 5)}s linear ${i * 0.3}s infinite`,
            }}
          >
            {PETALS[i % PETALS.length]}
          </span>
        ))}
      </div>

      <div className="relative mx-auto max-w-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">Medidor de amor: 100%</p>
        <h2 className="mt-3 font-display text-[clamp(30px,7vw,54px)] leading-tight">
          Lo lograste, Mariescler
        </h2>
        <p className="mt-4 text-night-foreground/80">
          Cada nivel fue una excusa para decirte algo simple: me gusta caminar contigo, y quiero
          seguir haciéndolo.
        </p>

        {!open ? (
          <button
            onClick={() => setOpen(true)}
            className="mt-8 rounded-full bg-gold px-8 py-4 text-lg font-medium text-night shadow-xl transition-transform hover:scale-105"
            style={{ animation: "beat 1.8s infinite" }}
          >
            🎁 Abrir mi regalo
          </button>
        ) : (
          <div
            className="mt-8 rounded-2xl border border-gold/40 bg-night-foreground/10 p-6 text-left"
            style={{ animation: "pop-in 0.5s ease-out" }}
          >
            <h3 className="font-display text-2xl text-gold">Para ti</h3>
            <p className="mt-3 text-night-foreground/90">
              Gracias por existir. Gracias por tu risa, por tu paciencia y por las cosas pequeñas que
              haces sin darte cuenta.
            </p>
            <p className="mt-3 text-night-foreground/90">
              ¿Seguimos escribiendo esta historia, nivel por nivel?
            </p>
            <p className="mt-4 font-display text-xl">Sí ❤️ / Obvio que sí ❤️</p>
          </div>
        )}

        <button
          onClick={onReset}
          className="mt-8 block w-full text-sm text-night-foreground/60 underline underline-offset-4"
        >
          Volver a jugar desde el inicio
        </button>
      </div>
    </section>
  );
}
