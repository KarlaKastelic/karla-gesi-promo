import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Reads text aloud in Slovene with the browser's built-in voices. */
@Injectable({ providedIn: 'root' })
export class SpeechService {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private voice: SpeechSynthesisVoice | null = null;

  /** Whether the demo games read questions aloud on their own. */
  readonly autoRead = signal(true);
  readonly supported = signal(false);
  readonly hasSlovene = signal(false);

  constructor() {
    if (!this.browser || !('speechSynthesis' in window)) return;
    this.supported.set(true);
    const pick = () => {
      const voices = speechSynthesis.getVoices();
      this.voice = voices.find((v) => v.lang.toLowerCase().startsWith('sl')) ?? null;
      this.hasSlovene.set(!!this.voice);
    };
    pick();
    speechSynthesis.addEventListener('voiceschanged', pick);
  }

  say(text: string): void {
    if (!this.supported()) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'sl-SI';
    if (this.voice) u.voice = this.voice;
    u.rate = 0.9;
    speechSynthesis.speak(u);
  }

  /** Speak only when automatic reading is on. */
  auto(text: string): void {
    if (this.autoRead()) this.say(text);
  }

  stop(): void {
    if (this.supported()) speechSynthesis.cancel();
  }
}
