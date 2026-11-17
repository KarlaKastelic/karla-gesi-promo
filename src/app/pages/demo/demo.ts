import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../data/site';
import { SpeechService } from '../../services/speech.service';
import { CtaBand } from '../../shared/cta-band';
import { Breathe } from './breathe';
import { FindGame } from './find';
import { TalkBoard } from './talk-board';
import { YesNoGame } from './yes-no';

type DemoId = 'da-ne' | 'poisci' | 'povej' | 'dihanje';

interface DemoInfo {
  id: DemoId;
  icon: string;
  name: string;
  trains: string;
  text: string;
  inApp: string;
}

@Component({
  selector: 'app-demo',
  imports: [RouterLink, YesNoGame, FindGame, TalkBoard, Breathe, CtaBand],
  templateUrl: './demo.html',
  styleUrl: './demo.scss',
})
export class Demo {
  protected readonly speech = inject(SpeechService);
  protected readonly site = SITE;

  protected readonly demos: DemoInfo[] = [
    {
      id: 'da-ne',
      icon: '👍',
      name: 'Da ali ne?',
      trains: 'preverjanje besede · razumevanje',
      text: 'Najlažja igra z besedami – primerna, ko je izbiranje med več besedami še pretežko ali ko igralec težko govori. Kadar je odgovor »ne«, aplikacija pove, kaj je res na sliki.',
      inApp: 'V aplikaciji izbirate še skupine slik (živali, hrana, vozila, moje slike …) in hitrost do naslednje naloge.',
    },
    {
      id: 'poisci',
      icon: '🔎',
      name: 'Poišči',
      trains: 'razumevanje besede',
      text: 'Igralec ne rabi govoriti, le pokazati. Ob napačni sliki aplikacija pove, kaj je to, in igralec poskusi znova. 💡 Pomoč umakne eno napačno sliko.',
      inApp: 'V aplikaciji je lahko od 2 do 9 slik, odgovori so lahko na dnu zaslona, gumbi pa še večji.',
    },
    {
      id: 'povej',
      icon: '🗣️',
      name: 'Povej mi',
      trains: 'sporazumevanje brez govora',
      text: 'Plošča stavkov s slikami. Tapnete sliko in aplikacija stavek pove na glas – vedno, tudi če je govor v igrah izklopljen – ter ga pokaže z velikimi črkami, da ga sliši in prebere vsak v sobi.',
      inApp: 'Pripomoček za težje dni: nič se ne sprašuje, nič ne more biti narobe in nič se ne šteje.',
    },
    {
      id: 'dihanje',
      icon: '😌',
      name: 'Mirni kotiček',
      trains: 'umiritev · dihanje',
      text: 'Mehak turkizen krog se počasi veča ob vdihu in manjša ob izdihu. Daljši izdih umirja.',
      inApp: 'V aplikaciji lahko v ozadju tiho šumi morje, potok, dež ali gozd, zaslon pa med dihanjem ne ugasne.',
    },
  ];

  protected readonly active = signal<DemoId>('da-ne');
  protected readonly info = computed(() => this.demos.find((d) => d.id === this.active())!);
  protected readonly upper = signal(true);
  protected readonly pictures = signal(4);
}
