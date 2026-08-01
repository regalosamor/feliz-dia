import { useEffect, useRef, useState } from "react";

const MELODY = [523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 493.88, 523.25];

/** Música suave generada con WebAudio (sin archivos externos). */
export function MusicToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepRef = useRef(0);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      void ctxRef.current?.close();
    };
  }, []);

  const playNote = (ctx: AudioContext, freq: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    const t = ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.08, t + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 1.7);
  };

  const toggle = async () => {
    if (on) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      setOn(false);
      return;
    }
    const AudioCtor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;
    const ctx = ctxRef.current ?? new AudioCtor();
    ctxRef.current = ctx;
    await ctx.resume();
    playNote(ctx, MELODY[stepRef.current % MELODY.length]!);
    timerRef.current = setInterval(() => {
      stepRef.current += 1;
      playNote(ctx, MELODY[stepRef.current % MELODY.length]!);
    }, 1400);
    setOn(true);
  };

  return (
    <button
      onClick={toggle}
      aria-label={on ? "Apagar música" : "Encender música"}
      className="surface flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <span aria-hidden>{on ? "🔊" : "🔈"}</span>
      <span className="hidden sm:inline">{on ? "Música encendida" : "Música apagada"}</span>
    </button>
  );
}
