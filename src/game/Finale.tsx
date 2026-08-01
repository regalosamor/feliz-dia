import { useState } from "react";

const PETALS = ["🌸", "❤️", "✨", "💗", "🌷"];

export function Finale({ onReset }: { onReset: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-night px-6 py-14 text-center text-night-foreground">
      {/* Pétalos y corazones cayendo */}
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
        <p className="text-sm uppercase tracking-[0.3em] text-gold">
          Medidor de amor: 100%
        </p>

        <h2 className="mt-3 font-display text-[clamp(30px,7vw,54px)] leading-tight">
          Lo lograste, Mariescler ❤️
        </h2>

        <p className="mt-4 text-night-foreground/80">
          Cada nivel fue una excusa para decirte algo que siento todos los días:
          gracias por hacer mi vida más bonita.
        </p>

        {!open ? (
          <button
            onClick={() => setOpen(true)}
            className="mt-8 rounded-full bg-gold px-8 py-4 text-lg font-medium text-night shadow-xl transition-transform hover:scale-105"
            style={{ animation: "beat 1.8s infinite" }}
          >
            🎁 Abrir mi última sorpresa
          </button>
        ) : (
          <div
            className="mt-8 rounded-2xl border border-gold/40 bg-night-foreground/10 p-6 text-left backdrop-blur-sm"
            style={{ animation: "pop-in 0.5s ease-out" }}
          >
            <h3 className="text-center font-display text-3xl text-gold">
              💌 Para el amor de mi vida
            </h3>

            <p className="mt-6 text-night-foreground/90 leading-8">
              Mi hermosa{" "}
              <span className="font-semibold text-gold">
                Mariescler
              </span>,
            </p>

            <p className="mt-4 text-night-foreground/90 leading-8">
              Si llegaste hasta aquí quiero que sepas algo... este nunca fue solo
              un juego. Cada nivel, cada corazón escondido, cada detalle y cada
              línea de código fueron creados pensando únicamente en ti.
            </p>

            <p className="mt-4 text-night-foreground/90 leading-8">
              Desde aquel{" "}
              <span className="font-semibold text-gold">
                12 de febrero de 2023
              </span>{" "}
              mi vida cambió por completo. Sin buscarlo encontré a una persona
              increíble, alguien que logró hacer de los días normales momentos
              inolvidables.
            </p>

            <p className="mt-4 text-night-foreground/90 leading-8">
              Gracias por abrazarme cuando más lo necesito, por hacerme reír con
              las cosas más simples, por escucharme, por confiar en mí y por
              enseñarme que el amor verdadero no está en los regalos caros, sino
              en los pequeños detalles que nacen del corazón.
            </p>

            <p className="mt-4 text-night-foreground/90 leading-8">
              Quizá esta página no sea perfecta, pero cada segundo que pasé
              haciéndola estuvo lleno de ilusión. Mi único objetivo era regalarte
              una sonrisa y demostrarte que eres una de las personas más
              importantes de mi vida.
            </p>

            <p className="mt-4 text-night-foreground/90 leading-8">
              No importa cuántos niveles tenga la vida, cuántos desafíos
              aparezcan o cuántos caminos tengamos que recorrer. Mientras pueda
              caminar a tu lado, cualquier lugar será mi hogar.
            </p>

            <p className="mt-4 text-night-foreground/90 leading-8">
              Prometo seguir creando recuerdos contigo, seguir celebrando tus
              logros, apoyarte cuando lo necesites, hacerte reír cuando estés
              triste y elegirte una y otra vez, todos los días.
            </p>

            <p className="mt-4 text-night-foreground/90 leading-8">
              Gracias por existir. Gracias por ser tú. Gracias por permitirme ser
              parte de tu historia. Espero que cuando recuerdes este día también
              recuerdes cuánto te amo.
            </p>

            <p className="mt-6 text-center italic text-night-foreground/90">
              "Si pudiera volver a empezar mi vida, volvería a buscarte hasta
              encontrarte una y mil veces más."
            </p>

            <div className="mt-8 border-t border-gold/30 pt-6 text-center">
              <p className="font-display text-3xl text-gold">
                ❤️ Te amo infinitamente ❤️
              </p>

              <p className="mt-3 text-night-foreground/80">
                Gracias por convertirte en la mejor historia que la vida pudo
                escribir para mí.
              </p>

              <p className="mt-6 font-display text-2xl">
                ¿Seguimos escribiendo esta aventura juntos?
              </p>

              <p className="mt-4 text-3xl">
                💖 Sí, para toda la vida 💖
              </p>
            </div>
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
