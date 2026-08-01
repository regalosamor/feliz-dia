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
<h3 className="text-center font-display text-3xl text-gold">
  💌 Para el amor de mi vida
</h3>

<p className="mt-6 text-night-foreground/90 leading-8">
  Mi hermosa <span className="text-gold font-semibold">Mariescler</span>,
</p>
    <p className="mt-4 text-night-foreground/90 leading-8">
    Si llegaste hasta aquí es porque recorriste cada rincón de este pequeño
    mundo que preparé para ti. Pero la verdad es que este juego nunca fue sobre
    encontrar corazones, resolver acertijos o completar niveles. Siempre fue
    sobre nosotros.
  </p>

  <p className="mt-4 text-night-foreground/90 leading-8">
    Desde aquel <span className="text-gold font-semibold">12 de febrero de 2023</span>,
    mi vida cambió de una manera que jamás imaginé. Sin darme cuenta te
    convertiste en mi lugar seguro, en la persona con la que quiero compartir
    mis alegrías, mis sueños, mis miedos y cada pequeño momento que la vida nos
    regale.
  </p>

  <p className="mt-4 text-night-foreground/90 leading-8">
    Gracias por abrazarme cuando más lo necesito, por hacerme reír incluso en
    los días difíciles, por creer en mí cuando ni yo mismo lo hacía y por
    demostrarme todos los días que el amor también vive en los detalles más
    pequeños.
  </p>

  <p className="mt-4 text-night-foreground/90 leading-8">
    Ojalá pudiera regalarte el universo entero, pero mientras tanto hice esto
    con lo más valioso que tengo: mi tiempo, mis recuerdos y todo el amor que
    siento por ti. Porque si existe alguien que merece algo especial, esa eres
    tú.
  </p>

  <p className="mt-4 text-night-foreground/90 leading-8">
    Prometo seguir creando recuerdos contigo, seguir haciéndote sonreír, seguir
    apoyándote en cada paso y seguir eligiéndote una y otra vez, todos los días.
  </p>

  <p className="mt-6 text-center text-night-foreground/90 text-lg italic">
    "Si pudiera volver a empezar mi vida, volvería a buscarte hasta encontrarte
    de nuevo."
  </p>

  <div className="mt-8 border-t border-gold/30 pt-6 text-center">
    <p className="font-display text-3xl text-gold">
      Te amo infinitamente ❤️
    </p>

    <p className="mt-2 text-night-foreground/80">
      Gracias por ser la mejor parte de mi historia.
    </p>

    <p className="mt-6 font-display text-2xl">
      ¿Seguimos escribiendo esta aventura juntos?
    </p>

    <p className="mt-4 text-3xl">
      💖 Sí, para toda la vida 💖
    </p>
        )}
  </div> {/* Cierra el div del borde */}

</div> {/* Cierra el div principal de la carta */}
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
