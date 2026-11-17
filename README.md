# GESI – promocijska stran

Static promo site for the GESI app (<https://karla-gesi.netlify.app>), built with Angular 22 and prerendered to plain HTML.

## Run and build

```bash
npm install
npm start          # dev server on http://localhost:4200
npm run build      # static site in dist/gesi-promo/browser
```

## Where things are

| What | File |
|---|---|
| All copy: games, audiences, principles, FAQ, settings | `src/app/data/site.ts` |
| **Site address (QR codes, canonical links)**, password note | `SITE` in `src/app/data/site.ts` |
| Words for the demo games | `src/app/data/demo-words.ts` (drawings in `public/img/slike`) |
| Pages | `src/app/pages/*` |
| Colours, fonts, buttons | `src/styles.scss` |
| Screenshots from the user guide | `public/img/zasloni` |
| User guide (downloadable) | `public/GESI-navodila.html` |

## Deploy (Netlify)

`netlify.toml` is ready: build command `npm run build`, publish folder `dist/gesi-promo/browser`.
The contact form uses **Netlify Forms** (form name `dostop`) – after the first deploy, turn on form
notifications in Netlify → Forms so messages arrive by e-mail.

When the app no longer needs a password, set `passwordRequired: false` in `src/app/data/site.ts`.
