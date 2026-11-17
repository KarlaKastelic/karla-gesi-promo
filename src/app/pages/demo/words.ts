import { DEMO_WORDS, DemoWord } from '../../data/demo-words';

export type { DemoWord };

export const imgOf = (w: DemoWord) => `img/slike/${w.id}.svg`;
export const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Picks `n` distinct words, avoiding the ids in `exclude`. */
export function pickWords(n: number, exclude: ReadonlySet<string> = new Set(), pool: readonly DemoWord[] = DEMO_WORDS): DemoWord[] {
  return shuffle(pool.filter((w) => !exclude.has(w.id))).slice(0, n);
}

/** A fixed, friendly first round so the server-rendered page and the browser agree. */
export function byIds(ids: readonly string[]): DemoWord[] {
  return ids.map((id) => DEMO_WORDS.find((w) => w.id === id)!).filter(Boolean);
}

export { DEMO_WORDS };
