import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AUDIENCES, GAMES, PRINCIPLES, SITE, SKILLS, START_STEPS, STATS, TRUST } from '../../data/site';
import { CtaBand } from '../../shared/cta-band';
import { PhoneFrame } from '../../shared/phone-frame';

@Component({
  selector: 'app-home',
  imports: [RouterLink, PhoneFrame, CtaBand],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly site = SITE;
  protected readonly principles = PRINCIPLES;
  protected readonly stats = STATS;
  protected readonly audiences = AUDIENCES;
  protected readonly trust = TRUST;
  protected readonly steps = START_STEPS;
  protected readonly skills = SKILLS.filter((s) => s.id !== 'tezji-dnevi').map((s) => ({
    ...s,
    games: GAMES.filter((g) => g.skill === s.id).map((g) => g.name),
  }));
}
