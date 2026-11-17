import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { filter } from 'rxjs';
import { SITE } from '../data/site';

const DEFAULT_DESCRIPTION =
  'GESI – brezplačna spletna aplikacija z mirnimi igrami s slikami, besedami in zvoki. Brez točk, brez štoparice, napaka ni kazen. Za šole s prilagojenim programom, domove za starejše, rehabilitacijo po možganski kapi in vse, ki želijo ostati bistri.';

/** Keeps the meta description, Open Graph tags and canonical link in step with the route. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);
  private readonly router = inject(Router);

  init(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      let snap: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
      while (snap.firstChild) snap = snap.firstChild;
      const description: string = snap.data['description'] ?? DEFAULT_DESCRIPTION;
      const url = SITE.siteUrl + this.router.url.split(/[?#]/)[0];
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:url', content: url });
      this.setCanonical(url);
    });
  }

  private setCanonical(url: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = 'canonical';
      this.doc.head.appendChild(link);
    }
    link.href = url;
  }
}

/** "Igre · GESI" for inner pages, the full tagline on the home page. */
@Injectable({ providedIn: 'root' })
export class GesiTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const page = this.buildTitle(snapshot);
    const full = page ? `${page} · GESI` : 'GESI – igre s slikami, ki ne štejejo napak';
    this.title.setTitle(full);
    this.meta.updateTag({ property: 'og:title', content: full });
  }
}
