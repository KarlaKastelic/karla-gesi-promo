import { Component, computed, inject, signal } from '@angular/core';
import { SpeechService } from '../../services/speech.service';

type Group = 'pocutje' | 'potrebujem' | 'pogovor';
type Speaker = 'on' | 'ona';

interface Phrase {
  icon: string;
  on: string;
  ona?: string;
}

const PHRASES: Record<Group, Phrase[]> = {
  pocutje: [
    { icon: '😠', on: 'Jezen sem.', ona: 'Jezna sem.' },
    { icon: '😢', on: 'Žalosten sem.', ona: 'Žalostna sem.' },
    { icon: '😴', on: 'Utrujen sem.', ona: 'Utrujena sem.' },
    { icon: '🤕', on: 'Boli me.' },
    { icon: '😨', on: 'Strah me je.' },
    { icon: '😕', on: 'Zmeden sem.', ona: 'Zmedena sem.' },
    { icon: '🤢', on: 'Slabo mi je.' },
    { icon: '😊', on: 'Dobro sem.' },
  ],
  potrebujem: [
    { icon: '🍽️', on: 'Lačen sem.', ona: 'Lačna sem.' },
    { icon: '🥤', on: 'Žejen sem.', ona: 'Žejna sem.' },
    { icon: '🚻', on: 'Moram na stranišče.' },
    { icon: '🛏️', on: 'Rad bi počival.', ona: 'Rada bi počivala.' },
    { icon: '🚪', on: 'Rad bi bil malo sam.', ona: 'Rada bi bila malo sama.' },
    { icon: '🌳', on: 'Greva ven.' },
    { icon: '🥶', on: 'Zebe me.' },
    { icon: '🥵', on: 'Vroče mi je.' },
    { icon: '🙋', on: 'Pomagaj mi.' },
    { icon: '🤗', on: 'Objemi me.' },
  ],
  pogovor: [
    { icon: '👍', on: 'Da.' },
    { icon: '👎', on: 'Ne.' },
    { icon: '🤷', on: 'Ne vem.' },
    { icon: '✋', on: 'Počakaj.' },
    { icon: '💭', on: 'Ne najdem besede.' },
    { icon: '❓', on: 'Ne razumem.' },
    { icon: '🐢', on: 'Počasneje.' },
    { icon: '🙏', on: 'Hvala.' },
    { icon: '😔', on: 'Oprosti.' },
    { icon: '❤️', on: 'Rad te imam.', ona: 'Rada te imam.' },
  ],
};

/** "Povej mi" – a picture board that speaks for you. */
@Component({
  selector: 'app-talk-board',
  template: `
    <div class="said" [class.said--empty]="!said()">
      @if (said(); as s) {
        <button type="button" class="said__btn" (click)="speak(s.text)" aria-label="Povej še enkrat">
          <span class="said__icon" aria-hidden="true">{{ s.icon }}</span>
          <span class="said__text" aria-live="polite">{{ s.text }}</span>
          <span class="said__speaker" aria-hidden="true">🔊</span>
        </button>
      } @else {
        <p>Tapnite sliko – aplikacija pove namesto vas.</p>
      }
    </div>

    <div class="tabs" role="tablist" aria-label="Skupine stavkov">
      @for (g of groups; track g.id) {
        <button type="button" role="tab" class="pill" [attr.aria-selected]="group() === g.id" (click)="group.set(g.id)">
          <span aria-hidden="true">{{ g.icon }}</span> {{ g.label }}
        </button>
      }
    </div>

    <ul class="board" role="tabpanel">
      @for (p of phrases(); track p.text) {
        <li>
          <button type="button" class="tile" [class.is-on]="said()?.text === p.text" (click)="choose(p.icon, p.text)">
            <span class="tile__icon" aria-hidden="true">{{ p.icon }}</span>
            <span class="tile__text">{{ p.text }}</span>
          </button>
        </li>
      }
    </ul>

    <div class="speaker" role="group" aria-label="Govorim kot">
      <span>Govorim kot</span>
      <button type="button" class="pill" [attr.aria-pressed]="speaker() === 'on'" (click)="speaker.set('on')">
        <span aria-hidden="true">👨</span> on
      </button>
      <button type="button" class="pill" [attr.aria-pressed]="speaker() === 'ona'" (click)="speaker.set('ona')">
        <span aria-hidden="true">👩</span> ona
      </button>
    </div>
  `,
  styles: `
    :host { display: block; }
    .said {
      display: grid;
      min-height: 6rem;
      margin-bottom: 1rem;
      background: var(--surface);
      border: 3px solid var(--line-strong);
      border-radius: var(--radius);
    }
    .said--empty { place-items: center; padding: 1rem; text-align: center; color: var(--muted); border-style: dashed; }
    .said--empty p { margin: 0; }
    .said__btn {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      text-align: left;
      background: none;
      border: 0;
      cursor: pointer;
    }
    .said__icon { font-size: 2.6rem; }
    .said__text { font-size: clamp(1.5rem, 1.1rem + 2vw, 2.3rem); font-weight: 800; text-transform: uppercase; line-height: 1.1; }
    .said__speaker { font-size: 1.5rem; opacity: 0.6; }
    .tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
    .board {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 10.5rem), 1fr));
      gap: 0.7rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .tile {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      width: 100%;
      min-height: 4.5rem;
      padding: 0.6rem 0.85rem;
      text-align: left;
      background: var(--surface);
      border: 3px solid var(--line);
      border-radius: 18px;
      cursor: pointer;
      transition: border-color 0.15s, transform 0.15s;
    }
    .tile:hover { border-color: var(--brand); transform: translateY(-1px); }
    .tile.is-on { border-color: var(--brand); background: var(--brand-soft); }
    .tile__icon { font-size: 1.9rem; flex: none; }
    .tile__text { font-weight: 800; text-transform: uppercase; font-size: 0.95rem; line-height: 1.2; }
    .speaker { display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 1.25rem; color: var(--muted); }
  `,
})
export class TalkBoard {
  private readonly speech = inject(SpeechService);

  protected readonly groups: { id: Group; icon: string; label: string }[] = [
    { id: 'pocutje', icon: '🙂', label: 'Počutje' },
    { id: 'potrebujem', icon: '🙋', label: 'Potrebujem' },
    { id: 'pogovor', icon: '💬', label: 'Pogovor' },
  ];
  protected readonly group = signal<Group>('pocutje');
  protected readonly speaker = signal<Speaker>('on');
  protected readonly said = signal<{ icon: string; text: string } | null>(null);

  protected readonly phrases = computed(() =>
    PHRASES[this.group()].map((p) => ({ icon: p.icon, text: this.speaker() === 'ona' && p.ona ? p.ona : p.on })),
  );

  protected choose(icon: string, text: string): void {
    this.said.set({ icon, text });
    this.speak(text);
  }

  /** Povej mi always speaks, even when automatic reading is off. */
  protected speak(text: string): void {
    this.speech.say(text);
  }
}
