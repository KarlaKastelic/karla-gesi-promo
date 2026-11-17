import { Component, DestroyRef, computed, inject, input, signal } from '@angular/core';
import { SpeechService } from '../../services/speech.service';
import { DEMO_WORDS, DemoWord, byIds, imgOf, lower, pickWords } from './words';

type Answer = 'da' | 'ne';
type State = 'ask' | 'right' | 'skipped';

interface Round {
  shown: DemoWord;
  asked: DemoWord;
}

/** "Da ali ne?" – the easiest word game in GESI. */
@Component({
  selector: 'app-yes-no',
  templateUrl: './yes-no.html',
  styleUrl: './game.scss',
})
export class YesNoGame {
  private readonly speech = inject(SpeechService);
  readonly upper = input(true);

  protected readonly imgOf = imgOf;
  protected readonly round = signal<Round>(this.firstRound());
  protected readonly state = signal<State>('ask');
  protected readonly wrong = signal<Answer | null>(null);
  protected readonly solved = signal(0);

  protected readonly question = computed(() => `Je to ${lower(this.round().asked.sl)}?`);
  protected readonly truth = computed<Answer>(() => (this.round().shown.id === this.round().asked.id ? 'da' : 'ne'));

  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected readQuestion(): void {
    this.speech.say(this.question());
  }

  protected answer(a: Answer): void {
    if (this.state() !== 'ask') return;
    if (a === this.truth()) {
      this.state.set('right');
      this.wrong.set(null);
      this.solved.update((n) => n + 1);
      const extra = this.truth() === 'ne' ? ` To je ${lower(this.round().shown.sl)}.` : '';
      this.speech.auto('Odlično!' + extra);
      this.timer = setTimeout(() => this.next(), this.truth() === 'ne' ? 3200 : 2200);
    } else {
      this.wrong.set(a);
      this.speech.auto('Poskusi še enkrat.');
    }
  }

  protected skip(): void {
    if (this.state() !== 'ask') return;
    this.state.set('skipped');
    this.wrong.set(null);
    this.speech.auto(`Nič hudega, poglejva: to je ${lower(this.round().shown.sl)}.`);
  }

  protected next(): void {
    clearTimeout(this.timer);
    const prev = this.round().shown;
    const pool = DEMO_WORDS.filter((w) => w.id !== prev.id);
    const [shown] = pickWords(1, new Set(), pool);
    let asked = shown;
    if (Math.random() < 0.5) {
      const sameKind = pool.filter((w) => w.category === shown.category && w.id !== shown.id);
      [asked] = pickWords(1, new Set(), sameKind.length ? sameKind : pool.filter((w) => w.id !== shown.id));
    }
    this.round.set({ shown, asked });
    this.state.set('ask');
    this.wrong.set(null);
    this.speech.auto(this.question());
  }

  private firstRound(): Round {
    const [shown] = byIds(['lipizzaner']);
    return { shown, asked: shown };
  }
}
