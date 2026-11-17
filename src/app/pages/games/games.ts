import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { AUDIENCES, AudienceId, GAMES, SKILLS, SkillId } from '../../data/site';
import { CtaBand } from '../../shared/cta-band';

@Component({
  selector: 'app-games',
  imports: [RouterLink, CtaBand],
  templateUrl: './games.html',
  styleUrl: './games.scss',
})
export class Games {
  private readonly router = inject(Router);
  private readonly params = toSignal(inject(ActivatedRoute).queryParamMap, { requireSync: true });

  protected readonly skills = SKILLS;
  protected readonly audiences = AUDIENCES;
  private readonly audienceIcons = new Map(AUDIENCES.map((a) => [a.id, a]));

  protected readonly skill = computed(() => {
    const v = this.params().get('vadi');
    return SKILLS.some((s) => s.id === v) ? (v as SkillId) : null;
  });
  protected readonly audience = computed(() => {
    const v = this.params().get('za');
    return AUDIENCES.some((a) => a.id === v) ? (v as AudienceId) : null;
  });

  protected readonly groups = computed(() => {
    const skill = this.skill();
    const audience = this.audience();
    return SKILLS.filter((s) => !skill || s.id === skill)
      .map((s) => ({
        ...s,
        games: GAMES.filter((g) => g.skill === s.id && (!audience || g.for.includes(audience))).map((g) => ({
          ...g,
          audiences: g.for.map((id) => this.audienceIcons.get(id)!),
        })),
      }))
      .filter((s) => s.games.length > 0);
  });

  protected readonly count = computed(() => this.groups().reduce((n, g) => n + g.games.length, 0));

  protected clearFilters(): void {
    void this.router.navigate([], { queryParams: {}, replaceUrl: true });
  }

  protected setFilter(key: 'vadi' | 'za', value: string | null): void {
    void this.router.navigate([], {
      queryParams: { [key]: value },
      queryParamsHandling: 'merge',
      replaceUrl: true,
      preserveFragment: false,
    });
  }
}
