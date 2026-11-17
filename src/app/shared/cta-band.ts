import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../data/site';

/** Closing call to action used at the bottom of most pages. */
@Component({
  selector: 'app-cta-band',
  imports: [RouterLink],
  template: `
    <section class="section section--tight">
      <div class="container">
        <div class="band">
          <div class="band__text">
            <h2>{{ title() }}</h2>
            <p class="lead">{{ text() }}</p>
          </div>
          <div class="btn-row band__actions">
            <a routerLink="/kontakt" class="btn btn--primary">
              {{ site.passwordRequired ? 'Zaprosi za dostop' : 'Pišite nam' }}
            </a>
            <a routerLink="/preizkusi" class="btn">Preizkusi kar tukaj</a>
          </div>
          <img class="band__art band__art--1" src="img/slike/hazelnuts.svg" alt="" width="96" height="96" loading="lazy" />
          <img class="band__art band__art--2" src="img/slike/kitten.svg" alt="" width="96" height="96" loading="lazy" />
        </div>
      </div>
    </section>
  `,
  styles: `
    .band {
      position: relative;
      overflow: hidden;
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 1.5rem 2.5rem;
      padding: clamp(1.75rem, 5vw, 3.25rem);
      background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #dcfce7 100%);
      border: var(--border-w) solid var(--line-strong);
      border-radius: calc(var(--radius) + 8px);
    }
    :host-context([data-contrast='high']) .band { background: #fff; }
    .band__text { position: relative; z-index: 1; max-width: 38rem; }
    .band__text .lead { margin: 0; }
    .band__actions { position: relative; z-index: 1; }
    .band__art { position: absolute; opacity: 0.9; pointer-events: none; }
    .band__art--1 { width: 5.5rem; right: 1.25rem; top: -1rem; transform: rotate(14deg); }
    .band__art--2 { width: 6rem; right: 34%; bottom: -1.75rem; transform: rotate(-8deg); }
    @media (max-width: 820px) {
      .band { grid-template-columns: 1fr; }
      .band__art--2 { display: none; }
      .band__art--1 { width: 4rem; top: -0.5rem; right: 0.5rem; }
    }
  `,
})
export class CtaBand {
  protected readonly site = SITE;
  readonly title = input('Bi GESI radi uporabljali pri sebi?');
  readonly text = input(
    'Pišite nam – z veseljem pošljemo dostop, odgovorimo na vprašanja ali pridemo predstavit aplikacijo v živo.',
  );
}
