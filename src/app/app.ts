import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AUDIENCES, SITE } from './data/site';
import { DisplayService, TextSize } from './services/display.service';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: { '(document:keydown.escape)': 'closeMenus()' },
})
export class App {
  protected readonly display = inject(DisplayService);
  protected readonly site = SITE;
  protected readonly audiences = AUDIENCES;
  protected readonly year = new Date().getFullYear();

  protected readonly menuOpen = signal(false);
  protected readonly audienceOpen = signal(false);

  protected readonly sizes: { id: TextSize; label: string; name: string }[] = [
    { id: 'normal', label: 'A', name: 'Običajna velikost besedila' },
    { id: 'large', label: 'A+', name: 'Večje besedilo' },
    { id: 'xlarge', label: 'A++', name: 'Največje besedilo' },
  ];

  constructor() {
    inject(SeoService).init();
    inject(Router)
      .events.pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.closeMenus());
  }

  protected closeMenus(): void {
    this.menuOpen.set(false);
    this.audienceOpen.set(false);
  }
}
