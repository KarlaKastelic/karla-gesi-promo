import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FAQ, SITE, START_STEPS, TRUST } from '../../data/site';
import { CtaBand } from '../../shared/cta-band';
import { PhoneFrame } from '../../shared/phone-frame';

@Component({
  selector: 'app-start',
  imports: [RouterLink, PhoneFrame, CtaBand],
  templateUrl: './start.html',
  styleUrl: './start.scss',
})
export class Start {
  protected readonly site = SITE;
  protected readonly steps = START_STEPS;
  protected readonly faq = FAQ;
  protected readonly trust = TRUST;

  protected readonly buttons = [
    { icon: '🏠', name: 'Domov', text: 'nazaj na začetni zaslon' },
    { icon: '⚙️', name: 'Hitre nastavitve', text: 'število slik ali govor kar med igro' },
    { icon: '🎮', name: 'Druga igra', text: 'seznam vseh iger in »Naključna igra«' },
    { icon: '🔊', name: 'Preberi', text: 'vprašanje prebere na glas' },
    { icon: '💡', name: 'Pomoč', text: 'en namig – navadno umakne en napačen odgovor' },
    { icon: '⏭️', name: 'Preskoči', text: 'pokaže rešitev in gre naprej, brez slabe vesti' },
  ];

  protected readonly settings = [
    ['Katere igre so na voljo', 'Izklopljena igra ni na začetnem zaslonu in je ne izbere niti Mešano.'],
    ['Kategorije', 'Katere skupine slik se pojavljajo: živali, hrana, dom, vozila, oblačila, narava, šport, čustva, družina, moje slike …'],
    ['Velike ali male črke', 'Velike tiskane črke so po možganski poškodbi pogosto najlažje berljive.'],
    ['Govor na glas', 'Aplikacija prebere imena; vprašanje »Ob odprtju« ali »Ob vsaki nalogi«, po želji tudi odgovore.'],
    ['Videz', 'Običajen, Topel, Morje, Visok kontrast (za slabši vid) ali Temen.'],
    ['Večji gumbi', 'Več prostora med gumbi – lažje za tresočo ali nerodno roko.'],
    ['Odgovori na dnu zaslona', 'Daleč od vprašanja, da prst ne zadene vprašanja namesto odgovora.'],
    ['Koliko časa do naslednje naloge', 'Hitro, Normalno, Počasi ali Na dotik.'],
    ['Moje slike in Moje besede', 'Lastne fotografije z imeni in lasten seznam besed. Ostanejo na tej napravi.'],
    ['Shranjene nastavitve', 'Nastavitve shranite pod imenom (»Jutro«, »Utrujen« ali ime igralca) in jih naložite z enim dotikom.'],
  ];

  protected readonly tips = [
    ['Začnite lahko', '»Najmanj« in hitrost »Na dotik«. Ko gre zlahka, dodajte eno sliko več.'],
    ['Raje večkrat na kratko', '10 do 15 minut je dovolj. Ko pade zbranost, nehajte, dokler je še prijetno.'],
    ['Igrajte skupaj', 'Pohvalite, pogovorite se o sliki: »Kdaj sva bila nazadnje na morju?«'],
    ['Manj je več', 'Skrijte igre in kategorije, ki niso zanimive ali so pretežke.'],
    ['Osebno je najmočnejše', 'Dodajte svoje fotografije, svoje besede in najljubše izvajalce.'],
    ['Ko je težko', 'Ne vztrajajte pri vajah. Odprite Povej mi, Mirni kotiček ali se odpravite na Izlet.'],
  ];
}
