import { Component, input } from '@angular/core';

/** A real GESI screenshot shown inside a simple phone outline. */
@Component({
  selector: 'app-phone',
  template: `
    <figure class="phone" [class.phone--small]="size() === 'small'">
      <div class="phone__screen">
        <img
          [src]="'img/zasloni/' + screen() + '.jpg'"
          [alt]="alt()"
          width="390"
          height="800"
          [attr.loading]="eager() ? 'eager' : 'lazy'"
          decoding="async"
        />
      </div>
      @if (caption()) {
        <figcaption>{{ caption() }}</figcaption>
      }
    </figure>
  `,
  styles: `
    :host { display: block; }
    .phone { margin: 0; width: 100%; max-width: 17rem; }
    .phone--small { max-width: 13rem; }
    .phone__screen {
      padding: 0.55rem;
      background: #0f172a;
      border-radius: 2.2rem;
      box-shadow: 0 2px 6px rgb(15 23 42 / 20%), 0 24px 48px -12px rgb(37 99 235 / 35%);
    }
    .phone--small .phone__screen { border-radius: 1.8rem; padding: 0.45rem; }
    img { width: 100%; border-radius: 1.75rem; background: #eef2ff; }
    .phone--small img { border-radius: 1.4rem; }
    figcaption { margin-top: 0.75rem; text-align: center; font-weight: 700; font-size: 0.95rem; color: var(--ink-2); }
  `,
})
export class PhoneFrame {
  readonly screen = input.required<string>();
  readonly alt = input.required<string>();
  readonly caption = input<string>();
  readonly size = input<'normal' | 'small'>('normal');
  readonly eager = input(false);
}
