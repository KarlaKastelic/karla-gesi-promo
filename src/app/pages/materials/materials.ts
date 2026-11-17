import { Component, DOCUMENT, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { AUDIENCES, AudienceId, GAMES, PRINCIPLES, SITE } from '../../data/site';
import { QrCode } from '../../shared/qr-code';

@Component({
  selector: 'app-materials',
  imports: [RouterLink, QrCode],
  templateUrl: './materials.html',
  styleUrl: './materials.scss',
})
export class Materials {
  private readonly doc = inject(DOCUMENT);
  protected readonly site = SITE;
  protected readonly audiences = AUDIENCES;
  protected readonly principles = PRINCIPLES.slice(0, 4);

  private readonly fromUrl = toSignal(
    inject(ActivatedRoute).queryParamMap.pipe(map((p) => p.get('za'))),
    { initialValue: null },
  );
  private readonly picked = signal<AudienceId | null>(null);

  protected readonly selected = computed<AudienceId>(() => {
    const id = this.picked() ?? this.fromUrl();
    return AUDIENCES.some((a) => a.id === id) ? (id as AudienceId) : 'domovi';
  });
  protected readonly audience = computed(() => AUDIENCES.find((a) => a.id === this.selected())!);
  protected readonly link = computed(() => `${SITE.siteUrl}/za/${this.selected()}`);
  protected readonly linkText = computed(() => this.link().replace(/^https?:\/\//, ''));
  protected readonly shots = computed(() =>
    this.audience()
      .favourites.map((n) => GAMES.find((g) => g.name === n))
      .filter((g) => !!g?.screen)
      .slice(0, 3)
      .map((g) => g!),
  );

  protected pick(id: AudienceId): void {
    this.picked.set(id);
  }

  protected print(): void {
    this.doc.defaultView?.print();
  }
}
