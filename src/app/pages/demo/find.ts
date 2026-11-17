import { Component, DestroyRef, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { SpeechService } from '../../services/speech.service';
import { DemoWord, byIds, imgOf, lower, pickWords, shuffle } from './words';

type State = 'ask' | 'right' | 'skipped';

/** "Poišči" – find the named picture among several. */
@Component({
  selector: 'app-find',
  templateUrl: './find.html',
  styleUrl: './game.scss',
})
export class FindGame {
  private readonly speech = inject(SpeechService);
  readonly upper = input(true);
  readonly count = input(4);

  protected readonly imgOf = imgOf;
  // Fixed first round so the prerendered page and the browser agree.
  protected readonly options = signal<DemoWord[]>(byIds(['radish', 'sailboat', 'hat', 'marmot']));
  protected readonly target = signal<DemoWord>(byIds(['sailboat'])[0]);
  protected readonly wrong = signal<ReadonlySet<string>>(new Set());
  protected readonly removed = signal<ReadonlySet<string>>(new Set());
  protected readonly state = signal<State>('ask');
  protected readonly lastWrongName = signal<string | null>(null);

  protected readonly question = computed(() => `Poišči: ${lower(this.target().sl)}.`);
  protected readonly canHelp = computed(
    () => this.state() === 'ask' && this.remainingWrong().length > 1,
  );

  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
    // New round whenever the number of pictures changes (after the first render).
    let first = true;
    effect(() => {
      this.count();
      if (first) {
        first = false;
        return;
      }
      untracked(() => this.next());
    });
  }

  protected readQuestion(): void {
    this.speech.say(this.question());
  }

  protected tap(w: DemoWord): void {
    if (this.state() !== 'ask' || this.removed().has(w.id) || this.wrong().has(w.id)) return;
    if (w.id === this.target().id) {
      this.state.set('right');
      this.lastWrongName.set(null);
      this.speech.auto('Odlično!');
      this.timer = setTimeout(() => this.next(), 2000);
    } else {
      this.wrong.update((s) => new Set(s).add(w.id));
      this.lastWrongName.set(w.sl);
      this.speech.auto(`To je ${lower(w.sl)}. Poskusi še enkrat.`);
    }
  }

  /** 💡 Pomoč – takes away one wrong picture, as in GESI. */
  protected help(): void {
    if (!this.canHelp()) return;
    const pick = this.remainingWrong()[0];
    this.removed.update((s) => new Set(s).add(pick.id));
  }

  protected skip(): void {
    if (this.state() !== 'ask') return;
    this.state.set('skipped');
    this.speech.auto(`Nič hudega, poglejva: to je ${lower(this.target().sl)}.`);
  }

  protected next(): void {
    clearTimeout(this.timer);
    const picks = pickWords(this.count(), new Set(this.options().map((o) => o.id)));
    this.options.set(picks);
    this.target.set(shuffle(picks)[0]);
    this.wrong.set(new Set());
    this.removed.set(new Set());
    this.lastWrongName.set(null);
    this.state.set('ask');
    this.speech.auto(this.question());
  }

  private remainingWrong(): DemoWord[] {
    return this.options().filter((o) => o.id !== this.target().id && !this.removed().has(o.id));
  }
}
