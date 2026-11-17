import { RenderMode, ServerRoute } from '@angular/ssr';
import { AUDIENCES } from './data/site';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'za/:skupina',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => AUDIENCES.map((a) => ({ skupina: a.id })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
