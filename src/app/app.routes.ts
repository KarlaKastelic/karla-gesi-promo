import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Routes } from '@angular/router';
import { AUDIENCES } from './data/site';

const audienceOf = (r: ActivatedRouteSnapshot) => AUDIENCES.find((a) => a.id === r.paramMap.get('skupina'));

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'igre',
    title: 'Igre',
    data: { description: '32 mirnih iger s slikami in 5 pripomočkov za težje dni – za besede, razumevanje, pozornost, spomin, sluh in računanje.' },
    loadComponent: () => import('./pages/games/games').then((m) => m.Games),
  },
  {
    path: 'preizkusi',
    title: 'Preizkusi',
    data: { description: 'Preizkusite igre Da ali ne? in Poišči, ploščo Povej mi in dihanje v Mirnem kotičku – kar v brskalniku.' },
    loadComponent: () => import('./pages/demo/demo').then((m) => m.Demo),
  },
  {
    path: 'za/:skupina',
    title: (r: ActivatedRouteSnapshot) => audienceOf(r)?.short ?? 'Za koga',
    resolve: {
      description: (r: ActivatedRouteSnapshot) => audienceOf(r)?.lead ?? '',
    },
    canActivate: [
      (r: ActivatedRouteSnapshot) => !!audienceOf(r) || inject(Router).parseUrl('/ni-najdeno'),
    ],
    loadComponent: () => import('./pages/audience/audience').then((m) => m.AudiencePage),
  },
  {
    path: 'zgodba',
    title: 'Zgodba',
    data: { description: 'GESI je nastal doma, za vsakodnevno vadbo po možganski kapi – iz potrebe in z ljubeznijo.' },
    loadComponent: () => import('./pages/story/story').then((m) => m.Story),
  },
  {
    path: 'kako-zaceti',
    title: 'Kako začeti',
    data: { description: 'Kako GESI odprete na tablici, ga prilagodite igralcu in ga varno uporabljate v ustanovi. Pogosta vprašanja.' },
    loadComponent: () => import('./pages/start/start').then((m) => m.Start),
  },
  {
    path: 'gradiva',
    title: 'Letaki za tisk',
    data: { description: 'Natisnite letak GESI s QR kodo za šolo, dom za starejše, ambulanto ali oglasno desko.' },
    loadComponent: () => import('./pages/materials/materials').then((m) => m.Materials),
  },
  {
    path: 'kontakt',
    title: 'Kontakt',
    data: { description: 'Zaprosite za dostop do GESI, predstavitev za vašo ustanovo ali nam pošljite predlog.' },
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'ni-najdeno',
    title: 'Stran ne obstaja',
    loadComponent: () => import('./pages/not-found').then((m) => m.NotFound),
  },
  {
    path: '**',
    title: 'Stran ne obstaja',
    loadComponent: () => import('./pages/not-found').then((m) => m.NotFound),
  },
];
