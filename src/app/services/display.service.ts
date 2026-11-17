import { DOCUMENT, Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type TextSize = 'normal' | 'large' | 'xlarge';

const KEY = 'gesi-promo-display';

/** Visitor display preferences: text size and high contrast. Kept in this browser only. */
@Injectable({ providedIn: 'root' })
export class DisplayService {
  private readonly doc = inject(DOCUMENT);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly textSize = signal<TextSize>('normal');
  readonly highContrast = signal(false);

  constructor() {
    if (this.browser) {
      try {
        const saved = JSON.parse(localStorage.getItem(KEY) ?? 'null');
        if (saved?.textSize) this.textSize.set(saved.textSize);
        if (typeof saved?.highContrast === 'boolean') this.highContrast.set(saved.highContrast);
      } catch {
        /* storage unavailable – defaults are fine */
      }
    }

    effect(() => {
      const root = this.doc.documentElement;
      // setAttribute (not dataset) so this also works in the server-side DOM during prerendering.
      root.setAttribute('data-text', this.textSize());
      root.setAttribute('data-contrast', this.highContrast() ? 'high' : 'normal');
      if (this.browser) {
        try {
          localStorage.setItem(KEY, JSON.stringify({ textSize: this.textSize(), highContrast: this.highContrast() }));
        } catch {
          /* ignore */
        }
      }
    });
  }
}
