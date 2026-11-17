import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="section">
      <div class="container nf">
        <img src="img/slike/marmot.svg" alt="" width="200" height="200" />
        <h1>Te strani ni</h1>
        <p class="lead">Nič hudega, poglejva drugam.</p>
        <div class="btn-row">
          <a routerLink="/" class="btn btn--primary">Na začetek</a>
          <a routerLink="/igre" class="btn">Vse igre</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .nf { max-width: 36rem; text-align: center; }
    .nf img { width: 9rem; margin: 0 auto 1.5rem; }
    .btn-row { justify-content: center; }
  `,
})
export class NotFound {}
