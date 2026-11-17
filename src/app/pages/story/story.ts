import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaBand } from '../../shared/cta-band';

@Component({
  selector: 'app-story',
  imports: [RouterLink, CtaBand],
  templateUrl: './story.html',
  styleUrl: './story.scss',
})
export class Story {
  protected readonly places = [
    { img: 'img/journeys/smarna_gora.svg', name: 'Šmarna gora', text: 'V štirih letnih časih; na vrhu čaj in ričet ali klop s pogledom.' },
    { img: 'img/journeys/ljubljana_evening.svg', name: 'Ljubljana', text: 'Ob Ljubljanici do Tromostovja – tudi na zasnežen zimski večer s prazničnimi lučkami.' },
    { img: 'img/journeys/krvavec.svg', name: 'Krvavec', text: 'Turno smučanje ali z gorskim kolesom; na vrhu koča.' },
    { img: 'img/journeys/kranj.svg', name: 'Po Savi do Kranja', text: 'S kajakom od Trboj do Kranja; v ozadju žubori reka.' },
    { img: 'img/journeys/zizanj_night.svg', name: 'Žižanj', text: 'Po skalnatem otočku do kamnite hišice, ponoči pod zvezdami in utrinki.' },
    { img: 'img/journeys/sal.svg', name: 'Cabo Verde – Sal', text: 'Po beli plaži do pomola v Santa Marii.' },
  ];
}
