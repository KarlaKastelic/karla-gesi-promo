import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { SpeechService } from '../../services/speech.service';

type Phase = 'vdih' | 'izdih';

/** "Mirni kotiček" – breathe with a slowly growing and shrinking circle. */
@Component({
  selector: 'app-breathe',
  template: `
    <div class="stage">
      <div
        class="circle"
        [class.circle--in]="running() && phase() === 'vdih'"
        [style.transition-duration.s]="running() ? seconds() : 1.2"
      >
        <span class="circle__label" aria-live="polite">{{ running() ? (phase() === 'vdih' ? 'Vdih' : 'Izdih') : 'Pripravljeni?' }}</span>
      </div>
    </div>

    <div class="controls">
      <button type="button" class="btn" [class.btn--mint]="!running()" (click)="toggle()">
        {{ running() ? '■ Ustavi' : '▶ Začni dihati' }}
      </button>
    </div>

    <div class="options" role="group" aria-label="Možnosti">
      <button type="button" class="pill" [attr.aria-pressed]="!slow()" (click)="slow.set(false)">Običajno (4 + 6 s)</button>
      <button type="button" class="pill" [attr.aria-pressed]="slow()" (click)="slow.set(true)">Počasneje (5 + 7 s)</button>
      <button type="button" class="pill" [attr.aria-pressed]="voice()" (click)="voice.set(!voice())">
        <span aria-hidden="true">🗣️</span> Glas
      </button>
    </div>
    @if (breaths() > 0) {
      <p class="count">Vdihov: {{ breaths() }}</p>
    }
    <p class="hint">Daljši izdih umirja. Dihajta skupaj s krogom, dokler je prijetno.</p>
  `,
  styles: `
    :host { display: block; text-align: center; }
    .stage { display: grid; place-items: center; height: clamp(16rem, 52vw, 21rem); }
    .circle {
      display: grid;
      place-items: center;
      width: clamp(15rem, 48vw, 20rem);
      aspect-ratio: 1;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #a7f3d0 0%, #5eead4 35%, #22b8c8 100%);
      box-shadow: 0 0 0 1.25rem rgb(94 234 212 / 18%), 0 20px 50px rgb(13 148 136 / 25%);
      transform: scale(0.62);
      transition-property: transform;
      transition-timing-function: ease-in-out;
    }
    .circle--in { transform: scale(1); }
    .circle__label { font-size: clamp(1.4rem, 1rem + 2vw, 2.2rem); font-weight: 800; letter-spacing: 0.06em; color: #134e4a; text-transform: uppercase; }
    :host-context([data-contrast='high']) .circle { background: #fff; border: 6px solid #000; box-shadow: none; }
    :host-context([data-contrast='high']) .circle__label { color: #000; }
    .controls { margin-block: 0.75rem 1rem; }
    .options { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; }
    .count { margin: 1rem 0 0; font-weight: 700; color: var(--ink-2); }
    .hint { margin: 1rem auto 0; max-width: 28rem; color: var(--muted); }
    @media (prefers-reduced-motion: reduce) {
      .circle { transition: none !important; }
    }
  `,
})
export class Breathe {
  private readonly speech = inject(SpeechService);

  protected readonly running = signal(false);
  protected readonly phase = signal<Phase>('izdih');
  protected readonly slow = signal(false);
  protected readonly voice = signal(false);
  protected readonly breaths = signal(0);

  protected readonly seconds = computed(() => {
    const inhale = this.slow() ? 5 : 4;
    const exhale = this.slow() ? 7 : 6;
    return this.phase() === 'vdih' ? inhale : exhale;
  });

  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  protected toggle(): void {
    if (this.running()) {
      this.stop();
    } else {
      this.running.set(true);
      this.breaths.set(0);
      this.step('vdih');
    }
  }

  private step(phase: Phase): void {
    this.phase.set(phase);
    if (phase === 'vdih') this.breaths.update((n) => n + 1);
    if (this.voice()) this.speech.say(phase);
    this.timer = setTimeout(() => this.step(phase === 'vdih' ? 'izdih' : 'vdih'), this.seconds() * 1000);
  }

  private stop(): void {
    clearTimeout(this.timer);
    this.running.set(false);
    this.phase.set('izdih');
    this.speech.stop();
  }
}
