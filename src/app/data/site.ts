/**
 * All site copy and settings in one place.
 * Content is taken from the GESI user guide (navodila, oktober 2026).
 */

export const SITE = {
  name: 'GESI',
  tagline: 'Učimo se besede – igre s slikami',
  /** The GESI app itself. */
  appUrl: 'https://karla-gesi.netlify.app',
  appHost: 'karla-gesi.netlify.app',
  /**
   * Public address of THIS promo site – used for QR codes on printed flyers and for canonical links.
   * Change it once the site has its final address.
   */
  siteUrl: 'https://karla-gesi-promo.netlify.app',
  /** While the app asks for a password, visitors are told to request it. Set to false when it is removed. */
  passwordRequired: true,
  guideUrl: '/GESI-navodila.html',
} as const;

export interface Principle {
  icon: string;
  title: string;
  text: string;
}

export const PRINCIPLES: readonly Principle[] = [
  { icon: '⏳', title: 'Brez točk in brez štoparice', text: 'Nič ne teče, nič se ne sešteva. Igralec ima toliko časa, kot ga potrebuje.' },
  { icon: '🤍', title: 'Napaka ni kazen', text: 'Napačen odgovor se le nežno označi – »Poskusi še enkrat« – in igralec poskusi znova.' },
  { icon: '⏭️', title: 'Preskok brez slabe vesti', text: 'Vsako nalogo lahko preskočite. Aplikacija pokaže rešitev – »Nič hudega, poglejva« – in gre naprej.' },
  { icon: '🔊', title: 'Vse na glas', text: 'Vprašanja, imena in odgovore aplikacija prebere na glas, kadar želite.' },
  { icon: '👆', title: 'Velike slike in gumbi', text: 'Vsaka naloga je na enem zaslonu, brez pomikanja. Gumbe lahko še povečate.' },
  { icon: '🎚️', title: 'Težavnost po meri', text: 'Število slik, velike ali male črke, hitrost, skupine besed – vse nastavite sami.' },
];

export const STATS = [
  { value: '32', label: 'iger' },
  { value: '5', label: 'pripomočkov za težje dni' },
  { value: '~800', label: 'slik' },
  { value: '36', label: 'risanih prizorov' },
  { value: '55', label: 'zvokov' },
  { value: '5', label: 'jezikov' },
] as const;

export type SkillId = 'tezji-dnevi' | 'besede' | 'razumevanje' | 'misljenje' | 'pozornost' | 'sluh' | 'stevila' | 'osebno';

export interface SkillGroup {
  id: SkillId;
  icon: string;
  title: string;
  text: string;
}

export const SKILLS: readonly SkillGroup[] = [
  { id: 'tezji-dnevi', icon: '🌿', title: 'Za težje dni', text: 'Strani, ki niso igre: nič se ne sprašuje in nič ne more biti narobe.' },
  { id: 'besede', icon: '📖', title: 'Besede in branje', text: 'Poimenovanje, branje, glaskovanje, pisanje s prstom.' },
  { id: 'razumevanje', icon: '👉', title: 'Razumevanje', text: 'Slišim ali preberem – pokažem. Govoriti ni treba.' },
  { id: 'misljenje', icon: '🗂️', title: 'Mišljenje in razvrščanje', text: 'Kategorije, pomenske zveze, zaporedja, vzorci.' },
  { id: 'pozornost', icon: '👀', title: 'Pozornost in spomin', text: 'Vidno zaznavanje, primerjanje, kratkoročni spomin.' },
  { id: 'sluh', icon: '👂', title: 'Sluh', text: 'Prepoznavanje zvokov in pesmi iz mladosti.' },
  { id: 'stevila', icon: '🔢', title: 'Števila, svet in karte', text: 'Štetje in računanje, primerjanje števil, zastave in prave tarok karte.' },
  { id: 'osebno', icon: '👨‍👩‍👧', title: 'Osebno', text: 'Lastne fotografije družine, prijateljev in ljubljenčkov.' },
];

export type AudienceId = 'sole' | 'domovi' | 'rehabilitacija' | 'doma';

export interface Game {
  icon: string;
  name: string;
  skill: SkillId;
  tags: readonly string[];
  text: string;
  /** File name in /img/zasloni (without extension). */
  screen?: string;
  /** Who it is especially good for. */
  for: readonly AudienceId[];
}

export const GAMES: readonly Game[] = [
  // Za težje dni
  { icon: '🗣️', name: 'Povej mi', skill: 'tezji-dnevi', tags: ['sporazumevanje brez govora'], screen: 'povej-mi', for: ['sole', 'rehabilitacija', 'domovi'],
    text: 'Plošča stavkov s slikami. Tapnete sliko in aplikacija stavek pove na glas ter ga pokaže z velikimi črkami: »Utrujen sem«, »Žejen sem«, »Pomagaj mi«.' },
  { icon: '😌', name: 'Mirni kotiček', skill: 'tezji-dnevi', tags: ['umiritev', 'dihanje'], screen: 'mirni-koticek', for: ['sole', 'domovi', 'rehabilitacija', 'doma'],
    text: 'Mehak krog se počasi veča ob vdihu in manjša ob izdihu. V ozadju lahko tiho šumi morje, potok, dež ali gozd.' },
  { icon: '🥾', name: 'Izlet', skill: 'tezji-dnevi', tags: ['umiritev v gibanju', 'spomini', 'poimenovanje'], screen: 'izlet', for: ['domovi', 'rehabilitacija', 'doma', 'sole'],
    text: 'Korak za korakom na Šmarno goro, s kajakom po Savi ali po Ljubljani do Tromostovja. Ob poti se nabira gobe in jagode, boža muco – brez točk in brez napak.' },
  { icon: '🖍️', name: 'Pobarvanka', skill: 'tezji-dnevi', tags: ['umiritev', 'fina motorika', 'barve'], screen: 'pobarvanka', for: ['sole', 'domovi', 'doma'],
    text: 'Katera koli risba postane pobarvanka. Čarobni čopič pobarva vsak del v pravo barvo, zato slika vedno uspe.' },
  { icon: '🎶', name: 'Moja glasba', skill: 'tezji-dnevi', tags: ['čustva', 'spomini', 'motivacija'], for: ['domovi', 'rehabilitacija', 'doma'],
    text: 'Najljubše pesmi kot velike slike z naslovnicami plošč. En dotik pesem zaigra, drugi jo ustavi.' },
  // Besede in branje
  { icon: '📖', name: 'Beri', skill: 'besede', tags: ['poimenovanje', 'glasno branje'], screen: 'beri', for: ['rehabilitacija', 'sole', 'doma'],
    text: 'Slika in beseda pod njo za glasno branje. Lahko tudi z lastnim seznamom besed: imena domačih, »Dober dan!«, ime ulice.' },
  { icon: '❓', name: 'Ugani', skill: 'besede', tags: ['razumevanje prebranega', 'poimenovanje'], screen: 'ugani', for: ['rehabilitacija', 'sole', 'doma'],
    text: '»Kaj je to?« Slika in nekaj besed; igralec izbere pravo ime.' },
  { icon: '👍', name: 'Da ali ne?', skill: 'besede', tags: ['preverjanje besede', 'razumevanje'], screen: 'da-ali-ne', for: ['rehabilitacija', 'sole', 'domovi'],
    text: '»Je to vidra?« Odgovor z velikim gumbom Da ali Ne. Najlažja igra z besedami – tudi ko je govor težak.' },
  { icon: '🔤', name: 'Manjka črka', skill: 'besede', tags: ['glaskovanje', 'črke'], screen: 'manjka-crka', for: ['sole', 'rehabilitacija'],
    text: 'Beseda z luknjo, npr. HELIKOPTE_. Igralec izbere črko, ki manjka.' },
  { icon: '✍️', name: 'Piši s prstom', skill: 'besede', tags: ['fina motorika', 'črke in številke'], screen: 'pisi-s-prstom', for: ['sole', 'rehabilitacija'],
    text: 'Prst prevleče črto oblike, številke ali črke. Barva sledi le črti, zato je napisano vedno lepo – nič ni narobe.' },
  { icon: '🔗', name: 'Poveži', skill: 'besede', tags: ['branje', 'slika in beseda'], screen: 'povezi', for: ['sole', 'rehabilitacija'],
    text: 'Na eni strani slike, na drugi besede. Igralec poveže vsako sliko s pravo besedo.' },
  { icon: '💬', name: 'Stavki', skill: 'besede', tags: ['branje stavkov', 'slovnica'], screen: 'stavki', for: ['rehabilitacija', 'sole'],
    text: 'Kratek stavek s sliko, npr. »Pes teče.« – za glasno branje ali z manjkajočo besedo.' },
  // Razumevanje
  { icon: '🔎', name: 'Poišči', skill: 'razumevanje', tags: ['razumevanje besede'], screen: 'poisci', for: ['rehabilitacija', 'sole', 'domovi'],
    text: '»Poišči: ROŽA.« Igralec tapne pravo sliko med ponujenimi.' },
  { icon: '👉', name: 'Pokaži mi', skill: 'razumevanje', tags: ['razumevanje govora', 'igra za dva'], screen: 'pokazi-mi', for: ['rehabilitacija', 'sole', 'domovi'],
    text: 'Igra za dva: aplikacija pokaže ploščo slik, vi pa sprašujete – »Pokaži mi posteljo«, »Kaj od tega ješ?«.' },
  { icon: '🏞️', name: 'Kje je?', skill: 'razumevanje', tags: ['vidno iskanje', 'prostor'], screen: 'kje-je', for: ['sole', 'domovi', 'rehabilitacija', 'doma'],
    text: 'Velik risan prizor – kuhinja, park, kmetija, »Pri babici« – in navodilo »Pokaži: RACE«. Pri »Vrni na mesto« igralec manjkajoče dele vrne na pravo mesto, v porednem načinu pa vse, kar tapne, naredi kaj smešnega.' },
  { icon: '🙋', name: 'Vprašanja', skill: 'razumevanje', tags: ['pomen besed', 'splošno znanje'], screen: 'vprasanja', for: ['domovi', 'rehabilitacija', 'doma'],
    text: '»Katera žival živi v vodi?«, »S čim se lahko peljemo?« Igralec izbere pravo sliko.' },
  { icon: '🧺', name: 'Poišči vse', skill: 'razumevanje', tags: ['kategorije', 'pozornost'], screen: 'poisci-vse', for: ['sole', 'rehabilitacija'],
    text: '»Poišči vse: ŠPORT.« Ali barvne oblike in črke – kot preizkus prečrtovanja na papirju, le da se tapne.' },
  { icon: '📚', name: 'Katalog', skill: 'razumevanje', tags: ['za pogovor', 'poimenovanje'], for: ['domovi', 'rehabilitacija', 'sole', 'doma'],
    text: 'Vse slike aplikacije, po skupinah ali po abecedi, z iskanjem – za skupno listanje in pogovor. Dotik slike jo odpre čez cel zaslon in izgovori besedo.' },
  // Mišljenje
  { icon: '🗂️', name: 'Razvrsti', skill: 'misljenje', tags: ['kategorije'], screen: 'razvrsti', for: ['sole', 'rehabilitacija', 'domovi'],
    text: '»Kam spada?« Slika in nekaj skupin – hrana, oblačila, vozila, živali.' },
  { icon: '🚫', name: 'Kaj ne spada', skill: 'misljenje', tags: ['sklepanje'], screen: 'kaj-ne-spada', for: ['sole', 'domovi', 'doma'],
    text: 'Med slikami je ena, ki ne sodi zraven. Odlična iztočnica za pogovor: »Zakaj ne spada?«' },
  { icon: '↔️', name: 'Nasprotja', skill: 'misljenje', tags: ['pomen besed'], screen: 'nasprotja', for: ['rehabilitacija', 'doma', 'sole'],
    text: 'Beseda, npr. LAHEK, in nekaj odgovorov. Igralec izbere nasprotje.' },
  { icon: '🔢', name: 'Vrstni red', skill: 'misljenje', tags: ['zaporedje', 'načrtovanje'], screen: 'vrstni-red', for: ['sole', 'rehabilitacija'],
    text: 'Jajčece – gosenica – metulj. Tri slike je treba postaviti v pravi vrstni red.' },
  { icon: '🧹', name: 'Pospravi', skill: 'misljenje', tags: ['kategorije', 'vsakdanja opravila'], for: ['sole', 'domovi', 'rehabilitacija', 'doma'],
    text: '»Kaj kam spada?« Stvari je treba pospraviti na pravo mesto. Število mest, med katerimi igralec izbira, nastavite sami.' },
  { icon: '🔁', name: 'Vzorci', skill: 'misljenje', tags: ['sklepanje', 'brez besed'], screen: 'vzorci', for: ['sole', 'doma'],
    text: '»Kaj pride naslednje?« Za to igro ni treba ne brati ne govoriti.' },
  // Pozornost in spomin
  { icon: '🌓', name: 'Sence', skill: 'pozornost', tags: ['vidno zaznavanje'], screen: 'sence', for: ['sole', 'domovi'],
    text: '»Katera senca je prava?« Slika in nekaj senc; igralec izbere tisto, ki se ujema.' },
  { icon: '🧩', name: 'Košček', skill: 'pozornost', tags: ['celota in del'], screen: 'koscek', for: ['sole', 'doma'],
    text: 'Slika, ki ji manjka košček. Igralec izbere tistega, ki sodi na prazno mesto.' },
  { icon: '🃏', name: 'Pari', skill: 'pozornost', tags: ['primerjanje'], screen: 'pari', for: ['sole', 'domovi'],
    text: '»Poišči dve enaki sliki.« Vse karte so odkrite.' },
  { icon: '🧠', name: 'Spomin', skill: 'pozornost', tags: ['kratkoročni spomin'], screen: 'spomin', for: ['doma', 'domovi', 'sole'],
    text: 'Klasični spomin: karte so obrnjene, igralec išče pare.' },
  { icon: '🔍', name: 'Poišči razlike', skill: 'pozornost', tags: ['opazovanje'], screen: 'poisci-razlike', for: ['doma', 'domovi', 'sole'],
    text: 'Dve enaki risbi, le na drugi nekaj manjka. Najdena razlika se obkroži na obeh.' },
  { icon: '🔷', name: 'Vstavi', skill: 'pozornost', tags: ['oblike', 'vidno zaznavanje'], for: ['sole', 'rehabilitacija', 'domovi'],
    text: '»Katera oblika paše v luknjo?« Kot lesena igrača z oblikami – s preprostimi oblikami ali tudi s podobnimi, kot sta kvadrat in pravokotnik.' },
  { icon: '🎨', name: 'Barve', skill: 'pozornost', tags: ['barve'], screen: 'barve', for: ['sole', 'rehabilitacija'],
    text: '»Poišči vse, kar je roza.« Igralec poišče vse slike te barve.' },
  // Sluh
  { icon: '🔊', name: 'Kdo se oglaša', skill: 'sluh', tags: ['slušno prepoznavanje'], screen: 'kdo-se-oglasa', for: ['sole', 'domovi', 'rehabilitacija'],
    text: 'Pes, krava, zvonec, vlak, nevihta, morje … Igralec posluša in izbere, kdo ali kaj se oglaša.' },
  { icon: '🎵', name: 'Glasba', skill: 'sluh', tags: ['dolgoročni spomin', 'motivacija'], for: ['domovi', 'doma', 'rehabilitacija'],
    text: '»Kdo poje?« Zaigra odlomek pesmi, igralec izbere izvajalca – najbolje tiste, ki jih je rad poslušal v mladosti.' },
  // Števila in svet
  { icon: '🧮', name: 'Računanje', skill: 'stevila', tags: ['štetje', 'seštevanje in odštevanje'], for: ['sole', 'rehabilitacija', 'doma'],
    text: 'Seštevaj, odštevaj, štej: »Koliko jih je?« (🍎 preštej), 3 + 4 = ?, 3 + ? = 7 ali niz 5, 6, ?, 8. Po želji tudi množenje in deljenje, števila do meje, ki jo izberete.' },
  { icon: '⚖️', name: 'Večje – manjše', skill: 'stevila', tags: ['števila', 'primerjanje'], screen: 'vecje-manjse', for: ['sole', 'rehabilitacija'],
    text: '»Poišči manjše število od 4.« Obseg do 10, 20 ali 100.' },
  { icon: '🌍', name: 'Zastave', skill: 'stevila', tags: ['splošno znanje'], screen: 'zastave', for: ['doma', 'domovi', 'sole'],
    text: '»Katera država je to?« Evropa ali ves svet.' },
  { icon: '🂡', name: 'Tarok', skill: 'stevila', tags: ['pravila', 'dolgoročni spomin'], screen: 'tarok', for: ['domovi', 'doma'],
    text: 'Prave tarok karte: katera od ponujenih pobere karto na mizi? Za vse, ki so kdaj igrali tarok.' },
  // Osebno
  { icon: '👨‍👩‍👧', name: 'Kdo je to', skill: 'osebno', tags: ['prepoznavanje', 'osebni spomin'], for: ['domovi', 'rehabilitacija', 'doma'],
    text: 'Igra s svojimi fotografijami – družina, prijatelji, ljubljenček, domača hiša. Fotografije ostanejo samo na napravi.' },
];

export interface Audience {
  id: AudienceId;
  icon: string;
  short: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  why: readonly { title: string; text: string }[];
  scenario: { title: string; steps: readonly string[] };
  settings: readonly string[];
  favourites: readonly string[];
}

export const AUDIENCES: readonly Audience[] = [
  {
    id: 'sole',
    icon: '🎒',
    short: 'Šole in zavodi s prilagojenim programom',
    title: 'Za šole in zavode za otroke s posebnimi potrebami',
    lead: 'Mirne igre s slikami, besedami in zvoki, ki otroka ne preganjajo s časom in točkami. Učitelj jih prilagodi vsakemu posebej – od dveh velikih slik do vseh devetih.',
    image: '/img/scenes/park.svg',
    imageAlt: 'Risan prizor parka z ribnikom, racami, gugalnicami in deklico s psom',
    why: [
      { title: 'Uspeh namesto pritiska', text: 'Ni štoparice in ni točk. Napaka se le nežno označi, otrok pa poskusi znova – ali nalogo preskoči.' },
      { title: 'Pokaže, ne da bi moral govoriti', text: 'Igre »Poišči«, »Kje je?« in »Da ali ne?« so primerne tudi za otroke, ki (še) ne govorijo.' },
      { title: 'Povej mi – glas, kadar ga ni', text: 'Plošča stavkov, ki jih aplikacija pove na glas: »Moram na stranišče«, »Rad bi bil malo sam«, »Pomagaj mi«.' },
      { title: 'Roka in črke', text: '»Piši s prstom« vodi prst po črti oblik, številk in črk s Č, Š in Ž – in vedno je napisano lepo.' },
      { title: 'Za nemirne trenutke', text: 'Mirni kotiček z dihalnim krogom in Pobarvanka, kjer slika vedno uspe. Brez utripanja in hitrih bliskov.' },
      { title: 'Ena tablica, več učencev', text: 'Shranjene nastavitve po imenu učenca: en dotik in tablica je pripravljena za naslednjega.' },
    ],
    scenario: {
      title: 'Primer ure',
      steps: [
        'Ogrevanje roke: »Piši s prstom« – oblike in prve črke.',
        '10 minut »Mešano« z nastavitvijo »Najmanj«: igre se menjajo same.',
        '»Kje je?« v porednem načinu za smeh in nagrado.',
        'Za umiritev pred odmorom: Mirni kotiček, tri dolge izdihe.',
      ],
    },
    settings: [
      'Težavnost »Najmanj« in hitrost »Na dotik«',
      'VELIKE tiskane črke',
      'Skrijte igre, ki jih učenec ne potrebuje – manj kartic, manj zmede',
      'Shranjene nastavitve z imenom učenca',
    ],
    favourites: ['Povej mi', 'Piši s prstom', 'Kje je?', 'Poišči', 'Računanje', 'Mirni kotiček'],
  },
  {
    id: 'domovi',
    icon: '🏡',
    short: 'Domovi za starejše in dnevni centri',
    title: 'Za domove za starejše in dnevne centre',
    lead: 'Igre, ki odpirajo pogovor in spomine: tarok, pesmi iz mladosti, izlet na Šmarno goro, kuhinja pri babici. Za skupinske dejavnosti ali za tiho urico s tablico.',
    image: '/img/scenes/grandma_cottage.svg',
    imageAlt: 'Risan prizor koče pri babici, kjer je zbrana vsa družina',
    why: [
      { title: 'Spomini, ki jih poznajo', text: 'Izleti po znanih poteh – Šmarna gora, Krvavec, Sava, Ljubljana ob Tromostovju – in velik prizor »Pri babici«.' },
      { title: 'Pesmi iz mladosti', text: 'V igri »Glasba« izberete izvajalce, ki so jih stanovalci radi poslušali. Glasba odpira vrata, ki jih besede ne morejo.' },
      { title: 'Prave tarok karte', text: 'Katera karta pobere? Za vse, ki so kdaj igrali tarok – in radi povedo, kako je bilo.' },
      { title: 'Povod za pogovor', text: '»Pokaži mi«, »Kaj ne spada« in »Kje je?« niso preizkusi, temveč iztočnice: »Kdaj ste bili nazadnje na morju?«' },
      { title: 'Za tresočo roko in slabši vid', text: 'Večji gumbi, odgovori na dnu zaslona, visok kontrast in VELIKE črke. Vse prebere tudi na glas.' },
      { title: 'Ko je vsega preveč', text: 'Povej mi, Mirni kotiček in Izlet pomagajo, ko narašča nemir – stanovalcu in tudi zaposlenim.' },
    ],
    scenario: {
      title: 'Primer skupinske urice',
      steps: [
        'Tablica, povezana s televizorjem, in krog stanovalcev.',
        '»Kdo poje?« – pesmi izvajalcev, ki jih je skupina izbrala sama.',
        '»Kje je?« s prizorom »Pri babici« ali »Kmetija« – kdo prvi pokaže?',
        'Za konec skupni Izlet na Šmarno goro: vsak stanovalec naredi nekaj korakov.',
      ],
    },
    settings: [
      'Videz »Visok kontrast« in VELIKE črke',
      'Večji gumbi in odgovori na dnu zaslona',
      'Branje vprašanja »Ob vsaki nalogi« in »Preberi tudi odgovore«',
      'Shranjene nastavitve za vsakega stanovalca',
    ],
    favourites: ['Tarok', 'Glasba', 'Izlet', 'Kje je?', 'Vprašanja', 'Spomin'],
  },
  {
    id: 'rehabilitacija',
    icon: '🩺',
    short: 'Rehabilitacija in logopedija',
    title: 'Za rehabilitacijo po možganski kapi in logopedsko vadbo',
    lead: 'GESI je nastal za vsakodnevno vadbo odraslega po možganski kapi – za človeka, ki mu iskanje besed, branje in zbranost ne gredo več samoumevno. Preprosto, mirno in prijazno, a ne otročje.',
    image: '/img/scenes/kitchen.svg',
    imageAlt: 'Risan prizor domače kuhinje',
    why: [
      { title: 'Od »Da ali ne?« do stavkov', text: 'Lestev težavnosti: preverjanje besede, iskanje slike, izbira imena, branje, manjkajoča črka, stavki.' },
      { title: 'Vaja doma, med obiski', text: 'GESI ne nadomešča logopeda – lahko pa lepo dopolni delo med obiski. Pacient vadi doma, 10 do 15 minut na dan.' },
      { title: 'Napredek za terapevta', text: 'Koliko nalog je bilo rešenih danes, v zadnjem tednu in brez zmote. Med igro se ne vidi, da igralec ne čuti pritiska.' },
      { title: 'Lastne besede', text: '»Moje besede«: imena domačih, »Dober dan!«, ime ulice. Osebno je najmočnejša motivacija.' },
      { title: 'Sporazumevanje brez govora', text: '»Povej mi«: jezen, žalosten, boli me, žejen sem, ne najdem besede. Stavki se prilagodijo – »utrujen« ali »utrujena«.' },
      { title: 'Ena roka je dovolj', text: 'Velike tarče, gumbi na dnu zaslona, Izlet z enim velikim gumbom. Deluje tudi z levo roko.' },
    ],
    scenario: {
      title: 'Primer domače vadbe',
      steps: [
        'Začnite z »Najmanj« in hitrostjo »Na dotik«.',
        'Ko gre zlahka, dodajte eno sliko več. Uspeh motivira bolj kot izziv.',
        'Ko pade zbranost, nehajte – dokler je še prijetno.',
        'Ob obisku terapevt pogleda Napredek in predlaga nove igre.',
      ],
    },
    settings: [
      'VELIKE tiskane črke – po možganski poškodbi so pogosto najlažje berljive',
      'Branje vprašanja »Ob vsaki nalogi«',
      'Večji gumbi in odgovori na dnu zaslona',
      'Moje besede in Moje slike za osebno vadbo',
    ],
    favourites: ['Da ali ne?', 'Poišči', 'Ugani', 'Beri', 'Povej mi', 'Stavki'],
  },
  {
    id: 'doma',
    icon: '☕',
    short: 'Starejši doma in njihove družine',
    title: 'Za starejše, ki želijo ostati bistri – in za njihove vnuke',
    lead: 'Deset minut na dan za bister um in dobro voljo. Spomin, razlike, zastave, tarok in izlet na znani hrib – brezplačno, brez reklam, brez prijave in brez hitenja.',
    image: '/img/journeys/smarna_gora.svg',
    imageAlt: 'Risba Šmarne gore s cerkvijo na vrhu',
    why: [
      { title: 'Zabava, ne test', text: 'Ni točk in ni štoparice. Igre se v načinu »Mešano« menjajo same – ni treba izbirati.' },
      { title: 'Deluje na tablici, ki jo že imate', text: 'Odprite povezavo v brskalniku in GESI dodajte na začetni zaslon. Potem deluje tudi brez interneta.' },
      { title: 'Družinske fotografije', text: 'V igri »Kdo je to« vnuki dodajo slike družine. Fotografije ostanejo samo na tej napravi.' },
      { title: 'Prijazno do oči in prstov', text: 'Velike slike, večji gumbi, visok kontrast, vse lahko prebere na glas.' },
      { title: 'Skupaj je lepše', text: '»Pokaži mi«, »Kje je?« in »Kaj ne spada« so igre za dva – za babico in vnuka.' },
      { title: 'Brez prijave in zbiranja podatkov', text: 'Ni uporabniškega računa. Nastavitve in napredek ostanejo v brskalniku na vaši napravi.' },
    ],
    scenario: {
      title: 'Primer jutra',
      steps: [
        'Kava in deset minut »Mešano«.',
        'Ena partija »Tarok« ali »Zastave« za izziv.',
        'Izlet na Šmarno goro – na vrhu čaka čaj in ričet.',
        'Konec, dokler je še prijetno. Jutri spet.',
      ],
    },
    settings: [
      'Za začetek »Najmanj«, nato po meri',
      'Skrijte igre, ki vas ne zanimajo',
      'Glasba: dodajte svoje najljubše izvajalce',
      'Moje slike: družina, hiša, ljubljenček',
    ],
    favourites: ['Spomin', 'Poišči razlike', 'Tarok', 'Zastave', 'Izlet', 'Kdo je to'],
  },
];

export const START_STEPS = [
  { title: 'Odprite povezavo', text: 'V brskalniku (Chrome, Edge ali Safari) odprite karla-gesi.netlify.app. Najbolj priročna je tablica – slike so velike, prst ima dovolj prostora.' },
  { title: 'Vpišite geslo', text: 'Ob prvem odprtju aplikacija vpraša za geslo. Naprava si ga zapomni.' },
  { title: 'Dodajte na začetni zaslon', text: 'V meniju brskalnika izberite »Dodaj na začetni zaslon« ali »Namesti aplikacijo«. GESI se odpira kot prava aplikacija in deluje tudi brez interneta.' },
  { title: 'Preverite glas in izberite težavnost', text: 'V Nastavitvah pritisnite »Preizkusi glas«. Za začetek izberite težavnost »Najmanj«.' },
] as const;

export const TRUST = [
  { icon: '🔒', title: 'Brez prijave', text: 'Ni uporabniškega računa in aplikacija ne zbira podatkov o igralcu.' },
  { icon: '📱', title: 'Podatki ostanejo na napravi', text: 'Nastavitve, lastne fotografije, besede in napredek so shranjeni samo v brskalniku na tej napravi.' },
  { icon: '📶', title: 'Deluje brez interneta', text: 'Ko se enkrat naloži, internet potrebujeta le igri z glasbo.' },
  { icon: '🌙', title: 'Nič ne utripa', text: 'Vse se premika počasi in mehko, brez hitrih bliskov svetlobe – pomembno pri epilepsiji.' },
  { icon: '🌍', title: 'Pet jezikov', text: 'Slovenščina in angleščina, pa tudi hrvaščina, španščina in portugalščina.' },
  { icon: '🎁', title: 'Brezplačno', text: 'GESI je brezplačen – za posameznike, družine in ustanove. Brez oglasov in brez naročnine.' },
] as const;

export const FAQ = [
  { q: 'Koliko stane GESI?', a: 'Nič. GESI je brezplačen – za posameznike, družine, šole, domove in vse druge ustanove. V aplikaciji ni oglasov in ni naročnine.' },
  { q: 'Ali je GESI medicinski pripomoček?', a: 'Ne. GESI je pripomoček za vadbo in ne nadomešča dela logopeda, terapevta ali specialnega pedagoga – lahko pa ga lepo dopolni med obiski.' },
  { q: 'Kaj potrebujem?', a: 'Tablico, telefon ali računalnik s sodobnim brskalnikom (Chrome, Edge, Safari, Firefox). Najbolj priročna je tablica.' },
  { q: 'Ali lahko eno tablico uporablja več ljudi?', a: 'Da. Nastavitve shranite pod imenom (npr. »Jutro«, »Utrujen« ali ime igralca) in jih kasneje naložite z enim dotikom. Napredek pa se beleži za napravo kot celoto.' },
  { q: 'Kam gredo naše fotografije?', a: 'Nikamor. Lastne fotografije in besede ostanejo v brskalniku na tej napravi. Na drugi napravi začnete na novo. V ustanovah priporočamo, da za fotografije oseb pridobite soglasje, kot pri vsakem drugem gradivu.' },
  { q: 'Aplikacija ne govori. Kaj naj naredim?', a: 'V Nastavitvah pod »Govor na glas« pritisnite »Preizkusi glas«. Na Androidu v nastavitvah telefona izberite Googlov pogon za pretvorbo besedila v govor in prenesite slovenski glas. Na računalniku z Windows slovenski glas običajno takoj deluje v brskalniku Microsoft Edge.' },
  { q: 'Je pretežko ali prelahko?', a: 'Število slik spremenite z ⚙️ kar med igro, v Nastavitvah pa izberete »Najmanj«, »Največ« ali »Po meri«. Igre, ki niso zanimive, preprosto skrijete.' },
  { q: 'Ali je v aplikaciji oglaševanje?', a: 'Ne. Le gumb »Cela pesem« v Moji glasbi odpre YouTube, ki je zunanja stran z oglasi.' },
  { q: 'Ali lahko predlagam novo igro ali sliko?', a: 'Seveda. GESI nastaja doma, iz potrebe in z ljubeznijo. Predlogi in ideje so vedno dobrodošli – pišite nam prek obrazca.' },
] as const;
