import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AUDIENCES, GAMES, TRUST } from '../../data/site';
import { CtaBand } from '../../shared/cta-band';
import { PhoneFrame } from '../../shared/phone-frame';

@Component({
  selector: 'app-audience',
  imports: [RouterLink, PhoneFrame, CtaBand],
  templateUrl: './audience.html',
  styleUrl: './audience.scss',
})
export class AudiencePage {
  /** Bound from the :skupina route parameter. */
  readonly skupina = input.required<string>();

  protected readonly trust = TRUST;
  protected readonly audience = computed(() => AUDIENCES.find((a) => a.id === this.skupina()) ?? AUDIENCES[0]);
  protected readonly others = computed(() => AUDIENCES.filter((a) => a.id !== this.audience().id));
  protected readonly favourites = computed(() =>
    this.audience()
      .favourites.map((name) => GAMES.find((g) => g.name === name))
      .filter((g) => !!g),
  );
  protected readonly phones = computed(() => this.favourites().filter((g) => g.screen).slice(0, 3));
}
