import './style.css'
import { renderCover } from './pages/cover'
import { renderPersona } from './pages/persona'
import { renderCasus } from './pages/casus'
import { renderKeten } from './pages/keten'
import { renderDecisionRecord } from './pages/decision-record'
import { renderNotitie } from './pages/notitie'
import { renderCommunicatie } from './pages/communicatie'
import { renderControlRoom } from './pages/control-room'
import { renderFundamenten } from './pages/fundamenten'
import { renderOpenVragen } from './pages/open-vragen'
import { asset01, asset02, asset03, asset04, asset06, asset07, asset08, asset09, asset10, asset11 } from './pages/losse-assets'

// ─── Types ───
interface DeskAsset {
  id: string
  label: string
  sublabel: string
  image: string
  top: string
  left: string
  rotation: number
  width: string
  style: 'polaroid' | 'photo' | 'sketch' | 'document' | 'note'
  chapters: number[]
}

interface DeskDocAsset {
  id: string
  label: string
  sublabel: string
  icon: string
  top: string
  left: string
  rotation: number
  width: string
  docStyle: 'receipt' | 'letter' | 'postit' | 'card' | 'document'
  render: () => string
  chapters: number[]
}

// ─── Chapters (8 dossierpagina's) ───
const chapters = [
  { id: 'belofte', title: 'De belofte', question: 'Welke ervaring willen we Sophie bieden?' },
  { id: 'kracht', title: 'Wat al werkt', question: 'Welke bewezen capabilities vormen het vertrekpunt?' },
  { id: 'verbinding', title: 'Waar het nog breekt', question: 'Waarom leveren losse successen nog geen autonome organisatie op?' },
  { id: 'fundament', title: 'Het fundament', question: 'Wat moet verbonden en betrouwbaar worden?' },
  { id: 'mens', title: 'Mens & AI', question: 'Hoe werken mens en AI verantwoord samen?' },
  { id: 'operatie', title: 'De samenhangende operatie', question: 'Hoe gaan de onderdelen als één geheel samenwerken?' },
  { id: 'waarheid', title: 'Het moment van de waarheid', question: 'Werkt het ook wanneer het erop aankomt?' },
  { id: 'droom', title: 'De droom', question: '' },
]

// ─── Chapter Dossier Pages ───
const chapterPages = [
  {
    pageNum: 1,
    title: 'De belofte aan Sophie',
    subtitle: 'Eén vloeiende dienstverlening op een kwetsbaar moment',
    content: `
      <ul class="cp-list">
        <li>Sophie vertelt haar verhaal <strong>één keer</strong></li>
        <li>Ze weet steeds waar zij aan toe is</li>
        <li>Ze krijgt snel duidelijkheid over eenvoudige onderdelen</li>
        <li>Ze krijgt menselijke uitleg wanneer oordeel nodig is</li>
        <li>Ze hoeft niet zelf tussen werkgever, zorgverlener, verzekeraar en Vanbreda te coördineren</li>
      </ul>
      <div class="cp-flow">
        <div class="cp-flow__step">
          <div class="cp-flow__label">Ziek worden</div>
          <div class="cp-flow__need">Geruststelling</div>
        </div>
        <div class="cp-flow__arrow">→</div>
        <div class="cp-flow__step">
          <div class="cp-flow__label">Contact</div>
          <div class="cp-flow__need">Eenvoud</div>
        </div>
        <div class="cp-flow__arrow">→</div>
        <div class="cp-flow__step">
          <div class="cp-flow__label">Claim</div>
          <div class="cp-flow__need">Transparantie</div>
        </div>
        <div class="cp-flow__arrow">→</div>
        <div class="cp-flow__step">
          <div class="cp-flow__label">Beoordeling</div>
          <div class="cp-flow__need">Vertrouwen</div>
        </div>
        <div class="cp-flow__arrow">→</div>
        <div class="cp-flow__step">
          <div class="cp-flow__label">Duidelijkheid</div>
          <div class="cp-flow__need">Afronding</div>
        </div>
      </div>
      <div class="cp-pillars">
        <span class="cp-pillar cp-pillar--active">Claims</span>
        <span class="cp-pillar cp-pillar--active">Communicatie</span>
        <span class="cp-pillar cp-pillar--active">B2B/B2I</span>
      </div>`,
    footnote: 'Iedere ontwerpkeuze wordt uiteindelijk getoetst aan de ervaring van Sophie.',
  },
  {
    pageNum: 2,
    title: 'Vanbreda begint niet bij nul',
    subtitle: 'Er is al veel bewezen in productie',
    content: `
      <div class="cp-columns">
        <div class="cp-col">
          <div class="cp-col__title">Claims</div>
          <span class="cp-stat">55%</span>
          <span class="cp-stat-label">Volumegewogen STP</span>
          <ul class="cp-col__list">
            <li>Digitale intake</li>
            <li>OCR-capability</li>
            <li>±200.000 claims/maand</li>
          </ul>
          <div class="cp-miniflow">
            <span>Document</span>
            <span class="cp-miniflow__arrow">→</span>
            <span>Data</span>
            <span class="cp-miniflow__arrow">→</span>
            <span>Beoordeling</span>
          </div>
        </div>
        <div class="cp-col">
          <div class="cp-col__title">Communicatie</div>
          <span class="cp-stat">~80%</span>
          <span class="cp-stat-label">Calls via Voice AI</span>
          <ul class="cp-col__list">
            <li>±95% routeringsnauwkeurigheid</li>
            <li>Intentclassificatie</li>
            <li>Contextverrijking</li>
          </ul>
          <div class="cp-miniflow">
            <span>Contact</span>
            <span class="cp-miniflow__arrow">→</span>
            <span>Intent</span>
            <span class="cp-miniflow__arrow">→</span>
            <span>Antwoord</span>
          </div>
        </div>
        <div class="cp-col">
          <div class="cp-col__title">B2B / B2I</div>
          <span class="cp-stat">~87%</span>
          <span class="cp-stat-label">STP Aansluitingen</span>
          <ul class="cp-col__list">
            <li>Digitale interfaces</li>
            <li>Partner- en beheerprocessen</li>
          </ul>
          <div class="cp-miniflow">
            <span>Partner</span>
            <span class="cp-miniflow__arrow">→</span>
            <span>Validatie</span>
            <span class="cp-miniflow__arrow">→</span>
            <span>Integratie</span>
          </div>
        </div>
      </div>
      <div class="cp-connector">Bewezen capabilities — nog niet altijd één keten</div>
      <div class="cp-pillars">
        <span class="cp-pillar cp-pillar--active">Claims</span>
        <span class="cp-pillar cp-pillar--active">Communicatie</span>
        <span class="cp-pillar cp-pillar--active">B2B/B2I</span>
      </div>`,
    footnote: 'De volgende stap is niet opnieuw beginnen, maar verbinden wat al aantoonbaar waarde levert.',
  },
  {
    pageNum: 3,
    title: 'De waarde zit in de verbinding',
    subtitle: 'Mogelijke frictie tussen de onderdelen — te valideren met Vanbreda',
    content: `
      <ul class="cp-list">
        <li>Context reist niet altijd mee</li>
        <li>Informatie staat verspreid over systemen</li>
        <li>Uitzonderingen vragen handmatige coördinatie</li>
        <li>Besliskennis zit bij ervaren medewerkers</li>
        <li>Automatische stappen kunnen verborgen handwerk veroorzaken</li>
        <li>Lokale optimalisatie leidt niet automatisch tot <strong>end-to-end waarde</strong></li>
      </ul>
      <div class="cp-note">Hypothese — te onderzoeken</div>
      <div class="cp-flow">
        <div class="cp-flow__step"><div class="cp-flow__label">Intake</div></div>
        <div class="cp-flow__break">⚡<span class="cp-flow__break-label">overdracht</span></div>
        <div class="cp-flow__step"><div class="cp-flow__label">Classificatie</div></div>
        <div class="cp-flow__break">⚡<span class="cp-flow__break-label">ontbrekende data</span></div>
        <div class="cp-flow__step"><div class="cp-flow__label">Context</div></div>
        <div class="cp-flow__break">⚡<span class="cp-flow__break-label">menselijke correctie</span></div>
        <div class="cp-flow__step"><div class="cp-flow__label">Beslissing</div></div>
        <div class="cp-flow__break">⚡<span class="cp-flow__break-label">eigenaarschap</span></div>
        <div class="cp-flow__step"><div class="cp-flow__label">Uitvoering</div></div>
        <div class="cp-flow__break">⚡<span class="cp-flow__break-label">extra contact</span></div>
        <div class="cp-flow__step"><div class="cp-flow__label">Communicatie</div></div>
      </div>
      <div class="cp-pillars">
        <span class="cp-pillar cp-pillar--active">Claims</span>
        <span class="cp-pillar cp-pillar--active">Communicatie</span>
        <span class="cp-pillar cp-pillar--active">B2B/B2I</span>
      </div>`,
    footnote: 'De grootste frictie zit vaak niet in één taak, maar tussen teams, systemen en beslissingen.',
  },
  {
    pageNum: 4,
    title: 'De verbonden basis',
    subtitle: 'De ruggengraat van gecontroleerde autonomie',
    content: `
      <div class="cp-layers cp-layers--with-sidebar">
        <div class="cp-layer cp-layer--top">
          <div class="cp-layer__title">Ervaring</div>
          <div class="cp-layer__items">Verzekerde · Medewerker · Werkgever · Partner</div>
        </div>
        <div class="cp-layer">
          <div class="cp-layer__title">Processen</div>
          <div class="cp-layer__items">Claims · Communicatie · B2B/B2I</div>
        </div>
        <div class="cp-layer">
          <div class="cp-layer__title">Verbinding</div>
          <div class="cp-layer__items">Orkestratie · Case management · Beslisregels · Status</div>
        </div>
        <div class="cp-layer cp-layer--bottom">
          <div class="cp-layer__title">Fundament</div>
          <div class="cp-layer__items">Data · Masterdata · Identiteit · Integratie · Security</div>
        </div>
        <div class="cp-layers__sidebar">Governance & Auditability</div>
      </div>
      <div class="cp-pillars">
        <span class="cp-pillar cp-pillar--active">Claims</span>
        <span class="cp-pillar cp-pillar--active">Communicatie</span>
        <span class="cp-pillar cp-pillar--active">B2B/B2I</span>
      </div>`,
    footnote: 'Autonomie begint niet bij een agent, maar bij een betrouwbare en bestuurbare basis.',
  },
  {
    pageNum: 5,
    title: 'Menselijke regie',
    subtitle: 'AI draagt routine. Mensen maken het verschil.',
    content: `
      <div class="cp-levels">
        <div class="cp-level cp-level--1">
          <div class="cp-level__label">AI ondersteunt</div>
          <div class="cp-level__desc">Het systeem verzamelt context en stelt voor. De medewerker beslist.</div>
        </div>
        <div class="cp-level cp-level--2">
          <div class="cp-level__label">AI handelt binnen grenzen</div>
          <div class="cp-level__desc">Het systeem handelt zelfstandig. De medewerker monitort uitzonderingen.</div>
        </div>
        <div class="cp-level cp-level--3">
          <div class="cp-level__label">AI handelt autonoom</div>
          <div class="cp-level__desc">Het systeem voert uit. De mens bewaakt kwaliteit en beleid.</div>
        </div>
      </div>
      <div class="cp-level-note">Meer autonomie vraagt meer expliciete grenzen, monitoring en verantwoordelijkheid.</div>
      <div class="cp-role-groups">
        <div class="cp-role-group">
          <div class="cp-role-group__title">Klant & Case</div>
          <div class="cp-role-group__items">Customer advisor<br>Exception specialist</div>
        </div>
        <div class="cp-role-group">
          <div class="cp-role-group__title">Proces & Kennis</div>
          <div class="cp-role-group__items">Process owner<br>Knowledge owner</div>
        </div>
        <div class="cp-role-group">
          <div class="cp-role-group__title">Data & AI</div>
          <div class="cp-role-group__items">Data steward<br>Model steward</div>
        </div>
      </div>
      <div class="cp-pillars">
        <span class="cp-pillar cp-pillar--active">Claims</span>
        <span class="cp-pillar cp-pillar--active">Communicatie</span>
        <span class="cp-pillar cp-pillar--active">B2B/B2I</span>
      </div>`,
    footnote: 'Autonomie betekent niet minder verantwoordelijkheid, maar explicietere verantwoordelijkheid.',
  },
  {
    pageNum: 6,
    title: 'De samenhangende operatie',
    subtitle: 'Eén Health Care operating model over de drie pijlers heen',
    content: `
      <div class="cp-operating-model">
        <div class="cp-om__col">
          <div class="cp-om__col-title">Inkomende wereld</div>
          <div class="cp-om__item">Verzekerde</div>
          <div class="cp-om__item">Werkgever</div>
          <div class="cp-om__item">Zorgverlener</div>
          <div class="cp-om__item">Verzekeraar</div>
          <div class="cp-om__item">Partner</div>
        </div>
        <div class="cp-om__col">
          <div class="cp-om__col-title">HC Operating Model</div>
          <div class="cp-om__pillar">Claims</div>
          <div class="cp-om__pillar">Communicatie</div>
          <div class="cp-om__pillar">B2B / B2I</div>
          <div class="cp-om__connectors">
            <div class="cp-om__connector">Orkestratie</div>
            <div class="cp-om__connector">Gedeelde data & kennis</div>
            <div class="cp-om__connector">Expliciete beslisregels</div>
            <div class="cp-om__connector">Case management</div>
            <div class="cp-om__connector">Menselijke regie</div>
            <div class="cp-om__connector">Monitoring</div>
          </div>
        </div>
        <div class="cp-om__col">
          <div class="cp-om__col-title">Ervaren waarde</div>
          <div class="cp-om__item">Duidelijke status</div>
          <div class="cp-om__item">Snelle afhandeling</div>
          <div class="cp-om__item">Persoonlijke ondersteuning</div>
          <div class="cp-om__item">Correcte betaling</div>
          <div class="cp-om__item">Minder herhaling</div>
        </div>
      </div>
      <div class="cp-pillars">
        <span class="cp-pillar cp-pillar--active">Claims</span>
        <span class="cp-pillar cp-pillar--active">Communicatie</span>
        <span class="cp-pillar cp-pillar--active">B2B/B2I</span>
      </div>`,
    footnote: 'De klant ervaart één dienstverlening, ook wanneer achter de schermen meerdere systemen en partijen samenwerken.',
  },
  {
    pageNum: 7,
    title: 'Het moment van de waarheid',
    subtitle: 'Sophie\'s claim in 2030',
    content: `
      <ul class="cp-list cp-list--numbered">
        <li><strong>Opname</strong> — Sophie wordt onverwacht opgenomen tijdens een reis</li>
        <li><strong>Intake</strong> — documenten worden herkend, vertaald en gekoppeld</li>
        <li><strong>Context</strong> — polis, werkgever, claimhistorie en communicatie komen samen</li>
        <li><strong>Automatische verwerking</strong> — eenvoudige onderdelen worden goedgekeurd</li>
        <li><strong>Uitzondering</strong> — buitenlandse code en mogelijke dubbele factuur herkend</li>
        <li><strong>Menselijk oordeel</strong> — een claimspecialist beoordeelt de uitzondering</li>
        <li><strong>Communicatie</strong> — Sophie ontvangt één duidelijk, persoonlijk antwoord</li>
        <li><strong>Afronding</strong> — juiste betaling voorbereid, dubbele betaling voorkomen, feedback opgeslagen</li>
      </ul>
      <div class="cp-swimlanes">
        <div class="cp-swimlane">
          <div class="cp-swimlane__label">Sophie</div>
          <div class="cp-swimlane__steps">
            <div class="cp-swimlane__step cp-swimlane__step--m">Ziek</div>
            <span class="cp-swimlane__arrow">→</span>
            <div class="cp-swimlane__step cp-swimlane__step--a">Upload</div>
            <span class="cp-swimlane__arrow">→</span>
            <div class="cp-swimlane__step cp-swimlane__step--m">Vraag</div>
            <span class="cp-swimlane__arrow">→</span>
            <div class="cp-swimlane__step cp-swimlane__step--a">Update</div>
            <span class="cp-swimlane__arrow">→</span>
            <div class="cp-swimlane__step cp-swimlane__step--g">Duidelijkheid</div>
          </div>
        </div>
        <div class="cp-swimlane">
          <div class="cp-swimlane__label">Operatie</div>
          <div class="cp-swimlane__steps">
            <div class="cp-swimlane__step cp-swimlane__step--a">Herkennen</div>
            <span class="cp-swimlane__arrow">→</span>
            <div class="cp-swimlane__step cp-swimlane__step--a">Koppelen</div>
            <span class="cp-swimlane__arrow">→</span>
            <div class="cp-swimlane__step cp-swimlane__step--g">Beslissen</div>
            <span class="cp-swimlane__arrow">→</span>
            <div class="cp-swimlane__step cp-swimlane__step--m">Escaleren</div>
            <span class="cp-swimlane__arrow">→</span>
            <div class="cp-swimlane__step cp-swimlane__step--a">Communiceren</div>
          </div>
        </div>
        <div class="cp-swimlane">
          <div class="cp-swimlane__label">Expertise</div>
          <div class="cp-swimlane__steps">
            <div class="cp-swimlane__step cp-swimlane__step--m">Beoordelen</div>
            <span class="cp-swimlane__arrow">→</span>
            <div class="cp-swimlane__step cp-swimlane__step--m">Uitleggen</div>
            <span class="cp-swimlane__arrow">→</span>
            <div class="cp-swimlane__step cp-swimlane__step--m">Goedkeuren</div>
            <span class="cp-swimlane__arrow">→</span>
            <div class="cp-swimlane__step cp-swimlane__step--g">Leren</div>
          </div>
        </div>
      </div>
      <div class="cp-swimlane-legend">
        <span><span class="cp-swimlane-legend__dot cp-swimlane-legend__dot--a"></span> Autonoom</span>
        <span><span class="cp-swimlane-legend__dot cp-swimlane-legend__dot--g"></span> Gecontroleerd</span>
        <span><span class="cp-swimlane-legend__dot cp-swimlane-legend__dot--m"></span> Menselijk</span>
      </div>
      <div class="cp-pillars">
        <span class="cp-pillar cp-pillar--active">Claims</span>
        <span class="cp-pillar cp-pillar--active">Communicatie</span>
        <span class="cp-pillar">B2B/B2I</span>
      </div>`,
    footnote: 'Hier wordt zichtbaar of de organisatie werkelijk als één geheel werkt.',
  },
  {
    pageNum: 8,
    title: 'De droom',
    subtitle: 'Van afzonderlijke AI-successen naar één samenhangende Health Care-operatie',
    content: `
      <div class="cp-dream">
        <div class="cp-dream__letter">
          <div class="cp-dream__letter-date">Brasschaat, september 2030</div>

          <div class="cp-dream__letter-body">
            <p>Lieve Vanbreda,</p>
            <p>Drie maanden geleden schreef ik jullie vanuit een ziekenhuisbed in Lyon. Ik was bang en ver van huis.</p>
            <p>Nu zit ik weer thuis bij mijn gezin.</p>
          </div>

          <div class="cp-dream__hero">
            <img src="/img-sophie-family.png" alt="Sophie thuis bij haar gezin" class="cp-dream__hero-img" />
          </div>

          <div class="cp-dream__letter-body">
            <p>Ik hoefde mijn verhaal maar één keer te vertellen. Ik wist waar ik aan toe was. En toen het echt nodig was, was er iemand die me begreep.</p>
            <p><strong>Zo wil je geholpen worden wanneer je kwetsbaar bent.</strong></p>
            <p>Bedankt.</p>
          </div>

          <div class="cp-dream__signature">Sophie De Winter</div>
        </div>

        <div class="cp-dream__audio">
          <button class="cp-dream__play-btn" id="dream-audio-btn" aria-label="Luister naar Sophie">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <div class="cp-dream__audio-label">Luister naar Sophie</div>
          <audio id="dream-audio" src="/audio/outtro-sophie.mp3" preload="auto"></audio>
        </div>

        <div class="cp-dream__cta">
          <a class="cp-cta cp-cta--primary" href="/vanbreda-healthcaroperatie.pdf" download>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="margin-right:8px;vertical-align:middle"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download onze visie — Health Care 2030
          </a>
        </div>
      </div>`,
    footnote: 'Haar ervaring in 2030 begint met de keuzes die we vandaag maken.',
  },
]


// ─── SVG icons per chapter ───
const chapterIcons = [
  // 1: Shield (belofte)
  `<svg viewBox="0 0 64 64" fill="none" stroke="#2C8C99" stroke-width="2"><path d="M32 8L10 18v16c0 12 10 20 22 24 12-4 22-12 22-24V18L32 8z"/><path d="M32 26c-3 0-6 3-6 6s3 6 6 6 6-3 6-6-3-6-6-6z" fill="#2C8C99" opacity=".15"/></svg>`,
  // 2: Building blocks (kracht)
  `<svg viewBox="0 0 64 64" fill="none" stroke="#2C8C99" stroke-width="2"><rect x="8" y="36" width="20" height="20" rx="2" fill="#2C8C99" opacity=".08"/><rect x="36" y="36" width="20" height="20" rx="2" fill="#2C8C99" opacity=".08"/><rect x="22" y="16" width="20" height="20" rx="2" fill="#2C8C99" opacity=".12"/></svg>`,
  // 3: Chain gap (verbinding)
  `<svg viewBox="0 0 64 64" fill="none" stroke="#2C8C99" stroke-width="2"><ellipse cx="20" cy="32" rx="12" ry="8"/><ellipse cx="44" cy="32" rx="12" ry="8"/><line x1="28" y1="28" x2="36" y2="28" stroke-dasharray="2 3"/><line x1="28" y1="36" x2="36" y2="36" stroke-dasharray="2 3"/></svg>`,
  // 4: Layers (fundament)
  `<svg viewBox="0 0 64 64" fill="none" stroke="#2C8C99" stroke-width="2"><path d="M8 40l24 12 24-12" fill="#2C8C99" opacity=".06"/><path d="M8 32l24 12 24-12" fill="#2C8C99" opacity=".08"/><path d="M8 24l24 12 24-12" fill="#2C8C99" opacity=".1"/><path d="M8 16l24 12 24-12"/></svg>`,
  // 5: People (mens)
  `<svg viewBox="0 0 64 64" fill="none" stroke="#2C8C99" stroke-width="2"><circle cx="22" cy="20" r="7"/><circle cx="42" cy="20" r="7"/><path d="M8 48c0-8 6-14 14-14s14 6 14 14" fill="#2C8C99" opacity=".08"/><path d="M28 48c0-8 6-14 14-14s14 6 14 14" fill="#2C8C99" opacity=".08"/></svg>`,
  // 6: Network (operatie)
  `<svg viewBox="0 0 64 64" fill="none" stroke="#2C8C99" stroke-width="2"><circle cx="32" cy="16" r="6" fill="#2C8C99" opacity=".1"/><circle cx="14" cy="44" r="6" fill="#2C8C99" opacity=".1"/><circle cx="50" cy="44" r="6" fill="#2C8C99" opacity=".1"/><line x1="32" y1="22" x2="14" y2="38"/><line x1="32" y1="22" x2="50" y2="38"/><line x1="20" y1="44" x2="44" y2="44"/></svg>`,
  // 8: Checkmark (waarheid)
  `<svg viewBox="0 0 64 64" fill="none" stroke="#2C8C99" stroke-width="2"><circle cx="32" cy="32" r="24"/><path d="M20 32l8 8 16-16" stroke-width="3" stroke-linecap="round"/></svg>`,
  // 8: Diamond (droom)
  `<svg viewBox="0 0 64 64" fill="none" stroke="#2C8C99" stroke-width="2"><path d="M32 6L58 32 32 58 6 32z" fill="#2C8C99" opacity=".06"/><path d="M32 16L48 32 32 48 16 32z" fill="#2C8C99" opacity=".1"/><circle cx="32" cy="32" r="4" fill="#2C8C99" opacity=".2"/></svg>`,
]

// ─── Data ───
const dossierPages = [
  { label: 'Cover',           render: renderCover },
  { label: 'Sophie',          render: renderPersona },
  { label: 'De Casus',        render: renderCasus },
  { label: 'De Keten',        render: renderKeten },
  { label: 'Beslissing',      render: renderDecisionRecord },
  { label: 'Notitie',         render: renderNotitie },
  { label: 'Communicatie',    render: renderCommunicatie },
  { label: 'Control Room',    render: renderControlRoom },
  { label: 'Fundamenten',     render: renderFundamenten },
  { label: 'Open Vragen',     render: renderOpenVragen },
]

const deskAssets: DeskAsset[] = [
  // ── Ch0: De belofte aan Sophie ──
  { id: 'klantbelofte', label: 'Sophie\'s Brief', sublabel: '"Ik wil mijn verhaal maar één keer hoeven vertellen."',
    image: '/img-klantbelofte.png', top: '8%', left: '8%', rotation: -3, width: '13vw', style: 'document', chapters: [0] },
  { id: 'sophie-persona', label: 'Persona Sophie', sublabel: '41 · Marketing Director · Pharma International',
    image: '/img-sophie-persona.png', top: '55%', left: '74%', rotation: 4, width: '12vw', style: 'document', chapters: [0] },
  { id: 'zakenreis', label: 'De Zakenreis', sublabel: 'Lyon, dag één — alles nog normaal.',
    image: '/img-zakenreis.png', top: '8%', left: '72%', rotation: 5, width: '12vw', style: 'photo', chapters: [0] },
  { id: 'klantvragen', label: 'Klantvragen', sublabel: 'De eerste vragen die Sophie zich stelt.',
    image: '/img-klantvragen.png', top: '55%', left: '6%', rotation: -5, width: '10vw', style: 'sketch', chapters: [0] },
  { id: 'napkin', label: 'Klantreisschets', sublabel: 'De eerste schets vanuit Sophie\'s ervaring.',
    image: '/img-napkin.png', top: '30%', left: '4%', rotation: 3, width: '11vw', style: 'sketch', chapters: [0] },

  // ── Ch1: Vanbreda begint niet bij nul ──
  { id: 'voice-ai-stats', label: 'Voice AI Stats', sublabel: '~80% calls via Voice AI · 95% routering',
    image: '/img-voice-ai-stats.png', top: '8%', left: '8%', rotation: -4, width: '12vw', style: 'document', chapters: [1] },
  { id: 'claims-stp', label: 'Claims STP', sublabel: '55% volumegewogen STP · 200K claims/maand',
    image: '/img-claims-stp.png', top: '8%', left: '72%', rotation: 3, width: '12vw', style: 'document', chapters: [1] },
  { id: 'b2b-stp', label: 'B2B/B2I Stats', sublabel: '~87% STP bij aansluitingen',
    image: '/img-b2b-stp.png', top: '55%', left: '74%', rotation: -3, width: '11vw', style: 'document', chapters: [1] },
  { id: 'intent-classifier', label: 'Intentclassificatie', sublabel: 'Inkomende vraag → herkende intent → routing',
    image: '/img-intent-classifier.png', top: '55%', left: '6%', rotation: 5, width: '12vw', style: 'document', chapters: [1] },
  { id: 'rpa-schets', label: 'Integratieschets', sublabel: 'Voice AI → Classifier → RPA → Kernapplicatie',
    image: '/img-rpa-schets.png', top: '30%', left: '4%', rotation: -2, width: '11vw', style: 'sketch', chapters: [1] },

  // ── Ch2: De waarde zit in de verbinding ──
  { id: 'value-leakage', label: 'Value Leakage', sublabel: 'Waar lekt de waarde weg? Hypothese — te valideren.',
    image: '/img-value-leakage.png', top: '8%', left: '8%', rotation: -3, width: '13vw', style: 'document', chapters: [2] },
  { id: 'pizza', label: 'Werksessie', sublabel: 'Samen de keten onderzoeken — co-creatie.',
    image: '/img-pizza-bw.png', top: '55%', left: '74%', rotation: 4, width: '12vw', style: 'polaroid', chapters: [2] },
  { id: 'postit', label: 'Knelpunten', sublabel: '"klant vertelt verhaal opnieuw" · "wie is eigenaar?"',
    image: '/img-postit-wall.png', top: '8%', left: '72%', rotation: 3, width: '12vw', style: 'photo', chapters: [2] },
  { id: 'papieren-dossier', label: 'Versnipperd', sublabel: 'De fysieke manifestatie van data-silo\'s.',
    image: '/img-papieren-dossier.png', top: '55%', left: '6%', rotation: -5, width: '11vw', style: 'photo', chapters: [2] },
  { id: 'observatie', label: 'Observatie', sublabel: '"Automatisch verwerkt ≠ automatisch zonder handwerk."',
    image: '/img-observatie-notitie.png', top: '30%', left: '4%', rotation: 2, width: '10vw', style: 'sketch', chapters: [2] },

  // ── Ch3: De verbonden basis ──
  { id: 'architecture', label: 'Architectuurschets', sublabel: 'Lagen: ervaring, processen, orkestratie, data.',
    image: '/img-architecture.png', top: '8%', left: '8%', rotation: -4, width: '12vw', style: 'sketch', chapters: [3] },
  { id: 'golden-record', label: 'Golden Record', sublabel: 'Sophie als single source of truth — alles verbonden.',
    image: '/img-golden-record.png', top: '8%', left: '72%', rotation: 3, width: '13vw', style: 'document', chapters: [3] },
  { id: 'beslisregel', label: 'Beslisregel', sublabel: 'Buitenlandse spoedopname → automatisch voorstel.',
    image: '/img-beslisregel.png', top: '55%', left: '6%', rotation: 5, width: '12vw', style: 'document', chapters: [3] },
  { id: 'blueprint', label: 'Integratiekaart', sublabel: 'Werkgever · Zorgverlener · Vanbreda · Verzekeraar.',
    image: '/img-blueprint-flow.png', top: '55%', left: '74%', rotation: -3, width: '12vw', style: 'document', chapters: [3] },
  { id: 'audit-trail', label: 'Audit Trail', sublabel: 'Document ontvangen → beoordeeld → gecommuniceerd.',
    image: '/img-audit-trail.png', top: '30%', left: '76%', rotation: 2, width: '11vw', style: 'document', chapters: [3] },

  // ── Ch4: Menselijke regie ──
  { id: 'trainingskaart', label: 'Besliskaart', sublabel: 'Wanneer grijp ik in? Een beslisboom voor mens en AI.',
    image: '/img-trainingskaart.png', top: '8%', left: '8%', rotation: -3, width: '12vw', style: 'document', chapters: [4] },
  { id: 'rolkaart-exception', label: 'Exception Specialist', sublabel: 'Beoordeelt uitzonderingen · valideert onzekerheid.',
    image: '/img-rolkaart-exception.png', top: '8%', left: '72%', rotation: 4, width: '12vw', style: 'document', chapters: [4] },
  { id: 'rolkaart-steward', label: 'Data & Model Steward', sublabel: 'Bewaakt datakwaliteit · monitort modelprestaties.',
    image: '/img-rolkaart-steward.png', top: '55%', left: '74%', rotation: -4, width: '11vw', style: 'document', chapters: [4] },
  { id: 'memo-medewerker', label: 'Quote Thomas V.', sublabel: '"Ik kan me richten op de beslissing die echt mijn oordeel vraagt."',
    image: '/img-memo-medewerker.png', top: '55%', left: '6%', rotation: 5, width: '12vw', style: 'document', chapters: [4] },
  { id: 'leiderschap-memo', label: 'Leiderschapsmemo', sublabel: '"Eigenaarschap en kwaliteit blijven menselijk belegd."',
    image: '/img-leiderschap-memo.png', top: '30%', left: '4%', rotation: -2, width: '11vw', style: 'document', chapters: [4] },

  // ── Ch5: De samenhangende operatie ──
  { id: 'cross-pillar', label: 'Cross-pillar Case', sublabel: 'Eén case doorloopt Claims · Communicatie · B2B/B2I.',
    image: '/img-cross-pillar.png', top: '8%', left: '8%', rotation: -4, width: '13vw', style: 'sketch', chapters: [5] },
  { id: 'control-room', label: 'Control Room', sublabel: '847 claims verwerkt, STP 82%, doorlooptijd 1u42m.',
    image: '/img-control-room.png', top: '8%', left: '72%', rotation: 3, width: '12vw', style: 'document', chapters: [5] },
  { id: 'case-timeline', label: 'Case Timeline', sublabel: 'Document binnen → identiteit → polis → expert → klant.',
    image: '/img-case-timeline.png', top: '55%', left: '6%', rotation: 5, width: '12vw', style: 'document', chapters: [5] },
  { id: 'orchestratie', label: 'Orkestratie', sublabel: 'Case coordinator verbindt systemen, AI, mens en partners.',
    image: '/img-orchestratie.png', top: '55%', left: '74%', rotation: -3, width: '11vw', style: 'sketch', chapters: [5] },
  { id: 'feedbackloop', label: 'Feedbackloop', sublabel: 'Uitkomst → correctie → analyse → verbeteren → meten.',
    image: '/img-feedbackloop.png', top: '30%', left: '76%', rotation: 2, width: '11vw', style: 'document', chapters: [5] },

  // ── Ch6: Het moment van de waarheid ──
  { id: 'ziekenhuis-factuur', label: 'Ziekenhuisfactuur', sublabel: 'Hôpital Édouard Herriot · Lyon · €4.847,50',
    image: '/img-ziekenhuis-factuur.png', top: '6%', left: '6%', rotation: -3, width: '12vw', style: 'document', chapters: [6] },
  { id: 'ontslagverslag', label: 'Ontslagverslag', sublabel: 'Compte rendu de sortie — Franstalig met markering.',
    image: '/img-ontslagverslag.png', top: '6%', left: '72%', rotation: 4, width: '11vw', style: 'document', chapters: [6] },
  { id: 'telefoon-transcript', label: 'Transcript', sublabel: 'Sophie belt · Voice AI herkent intent · overdracht.',
    image: '/img-telefoon-transcript.png', top: '25%', left: '76%', rotation: -2, width: '11vw', style: 'document', chapters: [6] },
  { id: 'faxbericht', label: 'AI Decision Record', sublabel: 'Voorstel · confidence 87% · escalatie vereist.',
    image: '/img-faxbericht.png', top: '50%', left: '74%', rotation: 5, width: '11vw', style: 'document', chapters: [6] },
  { id: 'interne-nota', label: 'Notitie Specialist', sublabel: 'Spoedopname gedekt. Comfortkost uitgesloten.',
    image: '/img-interne-nota.png', top: '55%', left: '6%', rotation: -4, width: '12vw', style: 'document', chapters: [6] },
  { id: 'duplicaat-alert', label: 'Duplicaatwaarschuwing', sublabel: '99,3% overeenkomst — actie vereist.',
    image: '/img-duplicaat-alert.png', top: '30%', left: '4%', rotation: 3, width: '10vw', style: 'document', chapters: [6] },
  { id: 'klantbericht', label: 'Klantbericht', sublabel: '"U hoeft voorlopig niets te doen."',
    image: '/img-klantbericht.png', top: '70%', left: '22%', rotation: -2, width: '10vw', style: 'document', chapters: [6] },
  { id: 'betalingsoverzicht', label: 'Betalingsoverzicht', sublabel: 'Goedgekeurd · afgewezen · gereserveerd.',
    image: '/img-betalingsoverzicht.png', top: '70%', left: '55%', rotation: 4, width: '11vw', style: 'document', chapters: [6] },

  // ── Ch7: De droom ──
  { id: 'sophie-family', label: 'Thuis', sublabel: 'Sophie met haar gezin, drie maanden later.',
    image: '/img-sophie-family.png', top: '6%', left: '6%', rotation: -4, width: '13vw', style: 'polaroid', chapters: [7] },
  { id: 'sophie-business', label: 'Op kantoor', sublabel: 'Terug in haar element als Marketing Director.',
    image: '/img-sophie-business.png', top: '6%', left: '74%', rotation: 5, width: '12vw', style: 'polaroid', chapters: [7] },
  { id: 'sophie-travel', label: 'Onderweg', sublabel: 'Weer op zakenreis — zonder zorgen.',
    image: '/img-sophie-travel.png', top: '55%', left: '4%', rotation: 3, width: '11vw', style: 'polaroid', chapters: [7] },
  { id: 'sophie-cafe', label: 'Even pauze', sublabel: 'Een moment voor zichzelf.',
    image: '/img-sophie-cafe.png', top: '40%', left: '78%', rotation: -3, width: '11vw', style: 'polaroid', chapters: [7] },
  { id: 'sophie-garden', label: 'In de tuin', sublabel: 'Gewoon thuis, gewoon gelukkig.',
    image: '/img-sophie-garden.png', top: '65%', left: '72%', rotation: 6, width: '11vw', style: 'polaroid', chapters: [7] },
]


const deskDocAssets: DeskDocAsset[] = []

// ─── State ───
let dossierOpen = false
let currentPage = 0
let currentChapter = 0
let zoomedAsset: string | null = null
let audioPlaying = false
let audioEl: HTMLAudioElement | null = null
let droppedPerChapter = [0, 0, 0, 0, 0, 0, 0, 0]
let pageMinimized = false
let celebrationShown = false

// Drops required per chapter: 3 = full onboarding, 1 = pattern, 0 = auto-reveal
const requiredDrops = [3, 1, 0, 0, 0, 0, 0, 0]


// ─── Folder HTML helper ───
function renderFolderHTML(hint = 'Klik om het dossier te openen'): string {
  return `
    <div class="desk-folder" id="desk-folder">
      <div class="desk-folder__front">
        <div class="desk-folder__stamp">HEALTH CARE 2030</div>
        <div class="desk-folder__title">AE × Vanbreda</div>
        <div class="desk-folder__sub">Status: in reconstructie</div>
        <div class="desk-folder__label">VERTROUWELIJK</div>
        <div class="desk-folder__logos">
          <img src="/ae-logo.png" alt="AE">
          <img src="/vanbreda-logo.svg" alt="Vanbreda">
        </div>
      </div>
      <div class="desk-folder__hint">${hint}</div>
    </div>`
}

// ─── Page HTML helper ───
function renderPageHTML(n: number): string {
  const ch = chapters[n]
  const cp = chapterPages[n]
  const drops = droppedPerChapter[n]
  const needed = requiredDrops[n]
  const isAutoReveal = needed === 0
  const isLastPage = n === chapters.length - 1

  // For auto-reveal pages or completed pages, show all content
  const effectiveDrops = isAutoReveal || (drops >= needed) ? 3 : drops
  const stepClass = `desk-page__paper--step-${Math.min(effectiveDrops, 3)}`
  const isComplete = effectiveDrops >= needed && needed > 0
  const completeClass = isComplete ? 'desk-page__paper--complete' : ''
  const autoClass = isAutoReveal ? 'desk-page__paper--auto' : ''

  // Show drop zone only when drops still needed
  const showDrop = needed > 0 && drops < needed
  const dropHTML = showDrop
    ? `<div class="desk-page__drop" id="page-drop">
         <div class="desk-page__drop-hint">↓ Sleep bewijsstukken hierheen · ${drops}/${needed}</div>
       </div>`
    : ''

  // Show nav sidebar when page has content visible
  const showNav = effectiveDrops >= needed || isAutoReveal
  const prevDisabled = n === 0 ? ' desk-page__nav-btn--disabled' : ''
  const nextDisabled = n === chapters.length - 1 ? ' desk-page__nav-btn--disabled' : ''
  const navHTML = showNav
    ? `<div class="desk-page__nav-sidebar">
         <button class="desk-page__nav-btn${prevDisabled}" id="page-prev" title="Vorig hoofdstuk">‹</button>
         <div class="desk-page__nav-counter">${n + 1}<span>/</span>${chapters.length}</div>
         <button class="desk-page__nav-btn${nextDisabled}" id="page-next-ch" title="Volgend hoofdstuk">›</button>
       </div>`
    : ''

  return `
    <div class="desk-page" id="desk-page">
      ${ch.question ? `<div class="desk-page__question">${ch.question}</div>` : ''}
      <div class="desk-page__paper ${stepClass} ${completeClass} ${autoClass}" id="desk-paper">
        <button class="desk-page__close" id="page-close" title="Sluit pagina">✕</button>
        <div class="desk-page__pagenum">${cp.pageNum} / 8</div>
        <div class="desk-page__reveal desk-page__reveal--1">
          <div class="desk-page__graphic">${chapterIcons[n]}</div>
          <div class="desk-page__header">
            <div class="desk-page__number">Pagina ${cp.pageNum} van 8</div>
            <div class="desk-page__title">${cp.title}</div>
            <div class="desk-page__subtitle">${cp.subtitle}</div>
          </div>
        </div>
        <div class="desk-page__reveal desk-page__reveal--2">
          <div class="desk-page__body">${cp.content}</div>
        </div>
        <div class="desk-page__reveal desk-page__reveal--3">
          <div class="desk-page__footnote">${cp.footnote}</div>
        </div>
        ${dropHTML}
      </div>
      ${navHTML}
    </div>`
}

// ─── Render ───
function render() {
  const app = document.querySelector<HTMLDivElement>('#app')!
  app.innerHTML = renderDesk()
  bindEvents()
  initAudio()
}

function renderDesk(): string {
  const assets = deskAssets.map(a => `
    <div class="desk-asset desk-asset--${a.style}" 
         id="asset-${a.id}"
         data-asset="${a.id}"
         data-chapters="${a.chapters.join(',')}"
         data-orig-top="${a.top}"
         data-orig-left="${a.left}"
         draggable="true"
         style="top:${a.top}; left:${a.left}; transform:rotate(${a.rotation}deg); width:${a.width}; ${a.chapters.includes(currentChapter) ? '' : 'opacity:0; pointer-events:none;'}"
         title="${a.label}">
      <img src="${a.image}" alt="${a.label}" draggable="false">
      <div class="desk-asset__tooltip">${a.label}</div>
    </div>
  `).join('')

  const docItems = deskDocAssets.map(d => `
    <div class="desk-doc desk-doc--${d.docStyle}"
         id="doc-${d.id}"
         data-doc="${d.id}"
         data-chapters="${d.chapters.join(',')}"
         style="top:${d.top}; left:${d.left}; transform:rotate(${d.rotation}deg); width:${d.width}; ${d.chapters.includes(currentChapter) ? '' : 'opacity:0; pointer-events:none;'}"
         title="${d.label}">
      <div class="desk-doc__mini">
        <div class="desk-doc__mini-title">${d.label}</div>
        <div class="desk-doc__mini-lines"></div>
      </div>
      <div class="desk-doc__tooltip">${d.sublabel}</div>
    </div>
  `).join('')

  const chapterNav = chapters.map((ch, i) => `
    <button class="chapter-nav__dot ${i === currentChapter ? 'chapter-nav__dot--active' : ''}" data-chapter="${i}">
      <span class="chapter-nav__num">${i + 1}</span>
      <span class="chapter-nav__label">${ch.title}</span>
    </button>
  `).join('')

  const ch = chapters[currentChapter]
  const cp = chapterPages[currentChapter]

  const pageDots = dossierPages.map((_, i) =>
    `<div class="viewer__dot ${i === currentPage ? 'viewer__dot--active' : ''}" data-page="${i}"></div>`
  ).join('')

  return `
<div class="splash" id="splash">
  <div class="splash__content">
    <div class="splash__logos">
      <img src="/ae-logo.png" alt="AE" class="splash__logo splash__logo--ae">
      <span class="splash__x">×</span>
      <img src="/vanbreda-logo-white.svg" alt="Vanbreda" class="splash__logo splash__logo--vb">
    </div>
    <div class="splash__divider"></div>
    <div class="splash__label">VERTROUWELIJK DOSSIER</div>
    <div class="splash__title">AFKOMSTIG UIT 2030</div>
    <div class="splash__subtitle">Open alleen als je bereid bent de toekomst te veranderen.</div>
    <div class="splash__sound-notice" id="splash-sound">🔊 Zet je geluid aan voor de volledige ervaring</div>
    <button class="splash__btn" id="splash-btn">Maak kennis met Sophie →</button>
  </div>
</div>

<div class="desk" id="desk">
  <div class="desk__bg"></div>
  <div class="desk__vignette"></div>
  ${assets}
  ${docItems}
  <div class="desk-peek desk-peek--1" style="top:42%;left:47%;transform:rotate(-12deg);"></div>
  <div class="desk-peek desk-peek--2" style="top:44%;left:54%;transform:rotate(8deg);"></div>
  <div class="desk-peek desk-peek--3" style="top:58%;left:46%;transform:rotate(14deg);"></div>

  <!-- Central dossier: closed folder OR open page -->
  <div class="desk-center" id="desk-center">
    ${dossierOpen ? (pageMinimized ? renderFolderHTML('Klik om te openen') : renderPageHTML(currentChapter)) : renderFolderHTML()}
  </div>

  <div class="desk-brief" id="desk-brief">
    <div class="desk-brief__envelope">
      <div class="desk-brief__to">Sophie De Winter</div>
      <div class="desk-brief__subtitle">Brief · 17 april 2030</div>
    </div>
  </div>
  <button class="desk__audio" id="btn-audio" title="Muziek aan/uit">🔊</button>
  <audio id="bg-audio" loop preload="auto">
    <source src="/audio/Yair Cohen - Rise Within.mp3" type="audio/mpeg">
  </audio>
</div>

<div class="chapter-nav" id="chapter-nav">
  ${chapterNav}
</div>

<!-- Footer (always visible, above overlays) -->
<div class="desk__footer" id="global-footer">
  <span class="desk__footer-text">Gemaakt door</span>
  <img src="/ae-logo.png" alt="AE" class="desk__footer-logo desk__footer-logo--ae">
  <span class="desk__footer-text">voor</span>
  <img src="/vanbreda-logo-white.svg" alt="Vanbreda" class="desk__footer-logo desk__footer-logo--vb">
</div>

<div class="viewer ${dossierOpen ? 'viewer--open' : ''}" id="viewer">
  <div class="viewer__backdrop" id="viewer-backdrop"></div>
  <div class="viewer__container">
    <button class="viewer__close" id="viewer-close" title="Sluiten">✕</button>
    <button class="viewer__nav viewer__nav--prev ${currentPage === 0 ? 'viewer__nav--disabled' : ''}" id="viewer-prev">‹</button>
    <button class="viewer__nav viewer__nav--next ${currentPage === dossierPages.length - 1 ? 'viewer__nav--disabled' : ''}" id="viewer-next">›</button>
    <div class="viewer__content" id="viewer-content">${dossierPages[currentPage].render()}</div>
    <div class="viewer__footer">
      <div class="viewer__dots">${pageDots}</div>
      <div class="viewer__counter">${dossierPages[currentPage].label} · ${currentPage + 1} / ${dossierPages.length}</div>
    </div>
  </div>
</div>

<div class="zoom ${zoomedAsset ? 'zoom--open' : ''}" id="zoom">
  <div class="zoom__backdrop" id="zoom-backdrop"></div>
  <div class="zoom__container" id="zoom-container">
    <button class="zoom__close" id="zoom-close">✕</button>
    <div class="zoom__content" id="zoom-content"></div>
    <div class="zoom__label" id="zoom-label"></div>
  </div>
</div>

<div class="video-modal" id="video-modal">
  <div class="video-modal__backdrop" id="video-modal-backdrop"></div>
  <div class="video-modal__container">
    <button class="video-modal__close" id="video-modal-close">✕</button>
    <video id="sophie-video" poster="/img-sophie-portrait.png" controls preload="none">
      <source src="/video/sophie.mp4" type="video/mp4">
    </video>
    <div class="video-modal__caption">Sophie De Winter — haar boodschap aan het team</div>
  </div>
</div>

<div class="letter-overlay" id="letter-overlay">
  <div class="letter-overlay__bg"></div>
  <div class="letter-overlay__inner">
    <div class="letter__left">
      <div class="letter__paper">
        <div class="letter__audio-btn" id="letter-audio-btn" title="Sophie's stem afspelen">
          <span id="letter-audio-icon">▶</span>
        </div>
        <div class="letter__date">17 april 2030</div>
        <div class="letter__body">
          <p>Hallo.</p>
          <p>Mijn naam is Sophie De Winter. En voor jullie is het nu 2026.</p>
          <p>Voor mij is het 17 april 2030.</p>
          <p>Vorige week was ik voor mijn werk in Frankrijk. Wat een gewone zakenreis had moeten worden, eindigde onverwacht in het ziekenhuis. Hevige pijn, onderzoeken en uiteindelijk een spoedoperatie.</p>
          <p>Ik was alleen, in een ander land, en ik wist niet wat mijn verzekering zou dekken. Welke documenten ik moest opsturen. Wie ik moest bellen. Of ik zelf duizenden euro's zou moeten betalen.</p>
          <p>Jullie hebben mijn dossier voor je.</p>
          <p>Voor jullie is het een toekomstscenario. Voor mij is het op dit moment heel echt.</p>
          <p>De komende jaren gaan Vanbreda en AE keuzes maken over processen, data, technologie en AI. Maar wanneer het erop aankomt, gaat die samenwerking niet over systemen. Ze gaat over mensen zoals ik.</p>
          <p>Ik vraag jullie daarom om goed voor mij te zorgen.</p>
          <p>Zorg dat ik mijn verhaal maar één keer hoef te vertellen. Dat mijn documenten en gegevens op de juiste plek terechtkomen. Dat eenvoudige stappen snel en automatisch verlopen. En dat er een mens voor mij klaarstaat wanneer oordeel, uitleg of empathie nodig is.</p>
          <p>De beslissingen die jullie in 2026 nemen, bepalen welke ervaring ik in 2030 heb.</p>
          <p class="letter__closing">Ik vertrouw op jullie.</p>
          <div class="letter__signature">Sophie</div>
        </div>
      </div>
      <button class="letter__continue" id="letter-continue">Open het dossier →</button>
    </div>
    <div class="letter__right">
      <div class="letter__side-photo letter__side-photo--hidden" id="letter-photo-1" style="transform:rotate(-4deg) translateX(-15px);">
        <img src="/img-sophie-portrait.png" alt="Sophie De Winter">
        <div class="letter__side-caption">Sophie De Winter</div>
      </div>
      <div class="letter__side-photo letter__side-photo--hidden" id="letter-photo-2" style="transform:rotate(3.5deg) translateX(20px);">
        <img src="/img-sophie-hospital.png" alt="Lyon">
        <div class="letter__side-caption">Lyon · april 2030</div>
      </div>
      <div class="letter__side-photo letter__side-photo--hidden" id="letter-photo-3" style="transform:rotate(-2deg) translateX(-10px);">
        <img src="/img-sophie-worry.png" alt="Onzekerheid">
        <div class="letter__side-caption">Wie moet ik bellen?</div>
      </div>
      <div class="letter__side-photo letter__side-photo--hidden" id="letter-photo-4" style="transform:rotate(4deg) translateX(12px);">
        <img src="/img-sophie-happy.png" alt="Zomer 2030">
        <div class="letter__side-caption">Zomer 2030 · Alles kwam goed.</div>
      </div>
    </div>
    <button class="letter__close" id="letter-close">✕</button>
  </div>
  <audio id="letter-audio" preload="auto">
    <source src="/audio/brief-sophie.mp3" type="audio/mpeg">
  </audio>
</div>

<div class="celebrate" id="celebrate">
  <canvas id="confetti-canvas"></canvas>
  <div class="celebrate__content">
    <div class="celebrate__emoji">🎉</div>
    <div class="celebrate__title">Alles staat klaar.</div>
    <div class="celebrate__text">Het is 1 dag voordat Sophie ziek wordt.</div>
    <div class="celebrate__sub">Alle systemen, processen en mensen zijn voorbereid.<br>De vraag is: zijn we werkelijk klaar voor haar?</div>
    <button class="celebrate__btn" id="celebrate-btn">Ontdek het moment van de waarheid →</button>
  </div>
</div>

<div class="print-only">
  ${dossierPages.map(p => p.render()).join('\n')}
</div>
`
}


// ─── Events ───
function bindEvents() {
  const letterAudio = document.getElementById('letter-audio') as HTMLAudioElement
  let letterAudioPlaying = false
  let photoTimers: ReturnType<typeof setTimeout>[] = []
  let trustLocked = false

  // --- Open letter from desk ---
  document.getElementById('desk-brief')?.addEventListener('click', () => openLetter())

  // --- Draggable assets ---
  document.querySelectorAll('.desk-asset[draggable]').forEach(el => {
    el.addEventListener('dragstart', (e) => {
      (e as DragEvent).dataTransfer?.setData('text/plain', el.id)
    })
  })

  // --- Bind page drop/close events ---
  bindPageEvents()

  function openLetter() {
    const overlay = document.getElementById('letter-overlay')
    overlay?.classList.add('letter-overlay--visible')
    // Reset photos to hidden
    for (let i = 1; i <= 4; i++) {
      document.getElementById(`letter-photo-${i}`)?.classList.add('letter__side-photo--hidden')
    }
    // Schedule timed reveals
    photoTimers.push(setTimeout(() => {
      document.getElementById('letter-photo-1')?.classList.remove('letter__side-photo--hidden')
    }, 2000))
    photoTimers.push(setTimeout(() => {
      document.getElementById('letter-photo-2')?.classList.remove('letter__side-photo--hidden')
    }, 22000))
    photoTimers.push(setTimeout(() => {
      document.getElementById('letter-photo-3')?.classList.remove('letter__side-photo--hidden')
    }, 40000))
    photoTimers.push(setTimeout(() => {
      document.getElementById('letter-photo-4')?.classList.remove('letter__side-photo--hidden')
    }, 58000))
    // "Ik vertrouw op jullie" — trust moment at ~85s
    photoTimers.push(setTimeout(() => {
      trustLocked = true
      overlay?.classList.add('letter-overlay--trust')
    }, 85000))
    // Auto-play Sophie's voice
    if (letterAudio) {
      letterAudio.currentTime = 0
      letterAudio.volume = 0.8
      letterAudio.play().catch(() => {})
      letterAudioPlaying = true
      const icon = document.getElementById('letter-audio-icon')
      if (icon) icon.textContent = '⏸'
    }
    // Lower background music
    if (audioEl) audioEl.volume = 0.15
  }

  function closeLetter() {
    const overlay = document.getElementById('letter-overlay')
    overlay?.classList.remove('letter-overlay--visible')
    overlay?.classList.remove('letter-overlay--trust')
    // Stop letter audio
    if (letterAudio && letterAudioPlaying) {
      letterAudio.pause()
      letterAudio.currentTime = 0
      letterAudioPlaying = false
      const icon = document.getElementById('letter-audio-icon')
      if (icon) icon.textContent = '▶'
    }
    // Clear photo timers
    photoTimers.forEach(t => clearTimeout(t))
    photoTimers = []
    // Restore background music volume
    if (audioEl) audioEl.volume = 0.4
  }

  // Close letter
  document.getElementById('letter-close')?.addEventListener('click', closeLetter)

  // Hover on continue → trigger trust warmth
  document.getElementById('letter-continue')?.addEventListener('mouseenter', () => {
    document.getElementById('letter-overlay')?.classList.add('letter-overlay--trust')
  })
  document.getElementById('letter-continue')?.addEventListener('mouseleave', () => {
    if (!trustLocked) {
      document.getElementById('letter-overlay')?.classList.remove('letter-overlay--trust')
    }
  })

  // Letter continue → close letter, open dossier inline
  document.getElementById('letter-continue')?.addEventListener('click', () => {
    closeLetter()
    setTimeout(() => {
      dossierOpen = true
      switchChapter(0)
    }, 400)
  })

  // Letter audio play/pause
  document.getElementById('letter-audio-btn')?.addEventListener('click', () => {
    if (!letterAudio) return
    const icon = document.getElementById('letter-audio-icon')
    if (letterAudioPlaying) {
      letterAudio.pause()
      letterAudioPlaying = false
      if (icon) icon.textContent = '▶'
    } else {
      letterAudio.volume = 0.8
      letterAudio.play().catch(() => {})
      letterAudioPlaying = true
      if (icon) icon.textContent = '⏸'
    }
  })

  // Auto-stop letter audio when it ends
  letterAudio?.addEventListener('ended', () => {
    letterAudioPlaying = false
    const icon = document.getElementById('letter-audio-icon')
    if (icon) icon.textContent = '▶'
  })

  // Chapter navigation
  document.querySelectorAll('.chapter-nav__dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const ch = parseInt(dot.getAttribute('data-chapter') || '0')
      switchChapter(ch)
    })
  })

  // Open dossier (first click on closed folder)
  document.getElementById('desk-folder')?.addEventListener('click', () => {
    dossierOpen = true
    switchChapter(currentChapter)
  })

  // Close dossier
  document.getElementById('viewer-close')?.addEventListener('click', closeDossier)
  document.getElementById('viewer-backdrop')?.addEventListener('click', closeDossier)

  // Dossier navigation
  document.getElementById('viewer-prev')?.addEventListener('click', () => navigatePage(-1))
  document.getElementById('viewer-next')?.addEventListener('click', () => navigatePage(1))

  // Page dots
  document.querySelectorAll('.viewer__dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const page = parseInt(dot.getAttribute('data-page') || '0')
      currentPage = page
      updateViewer()
    })
  })

  // Asset clicks
  document.querySelectorAll('.desk-asset').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-asset')
      if (id) openAssetZoom(id)
    })
  })

  // Document asset clicks
  document.querySelectorAll('.desk-doc').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-doc')
      if (!id) return
      const doc = deskDocAssets.find(d => d.id === id)
      if (!doc) return
      openDocZoom(doc)
    })
  })

  // Asset zoom close
  document.getElementById('zoom-close')?.addEventListener('click', closeAssetZoom)
  document.getElementById('zoom-backdrop')?.addEventListener('click', closeAssetZoom)

  // Video
  document.getElementById('desk-video')?.addEventListener('click', openVideo)
  document.getElementById('video-modal-close')?.addEventListener('click', closeVideo)
  document.getElementById('video-modal-backdrop')?.addEventListener('click', closeVideo)

  // Audio (bg music)
  document.getElementById('btn-audio')?.addEventListener('click', toggleAudio)

  // Dream page audio player
  document.getElementById('dream-audio-btn')?.addEventListener('click', () => {
    const audio = document.getElementById('dream-audio') as HTMLAudioElement | null
    const btn = document.getElementById('dream-audio-btn')
    if (!audio || !btn) return
    if (audio.paused) {
      audio.play()
      btn.classList.add('playing')
      btn.querySelector('.cp-dream__audio-label')
      const label = btn.nextElementSibling as HTMLElement | null
      if (label) label.textContent = 'Nu aan het luisteren...'
    } else {
      audio.pause()
      btn.classList.remove('playing')
      const label = btn.nextElementSibling as HTMLElement | null
      if (label) label.textContent = 'Luister naar Sophie'
    }
    audio.addEventListener('ended', () => {
      btn.classList.remove('playing')
      const label = btn.nextElementSibling as HTMLElement | null
      if (label) label.textContent = 'Luister naar Sophie'
    }, { once: true })
  })

  // Celebration
  document.getElementById('celebrate-btn')?.addEventListener('click', closeCelebration)

  // Keyboard
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (document.getElementById('letter-overlay')?.classList.contains('letter-overlay--visible')) {
        closeLetter()
      } else if (document.getElementById('video-modal')?.classList.contains('video-modal--open')) {
        closeVideo()
      } else if (zoomedAsset) {
        closeAssetZoom()
      } else if (dossierOpen) {
        closeDossier()
      }
    }
    if (dossierOpen) {
      if (e.key === 'ArrowRight') navigatePage(1)
      if (e.key === 'ArrowLeft') navigatePage(-1)
    }
  })

  // Touch swipe on viewer
  let touchStartX = 0
  const viewerContent = document.getElementById('viewer-content')
  viewerContent?.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX
  })
  viewerContent?.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 60) {
      navigatePage(diff > 0 ? 1 : -1)
    }
  })
}



// ─── Dossier Viewer ───
function navigatePage(dir: number) {
  const next = currentPage + dir
  if (next < 0 || next >= dossierPages.length) return
  currentPage = next
  updateViewer()
}

function updateViewer() {
  const content = document.getElementById('viewer-content')
  if (!content) return

  // Animate out
  content.classList.add('viewer__content--exit')
  setTimeout(() => {
    content.innerHTML = dossierPages[currentPage].render()
    content.classList.remove('viewer__content--exit')
    content.classList.add('viewer__content--enter')
    content.scrollTop = 0
    setTimeout(() => content.classList.remove('viewer__content--enter'), 300)
  }, 150)

  // Update dots
  document.querySelectorAll('.viewer__dot').forEach((dot, i) => {
    dot.classList.toggle('viewer__dot--active', i === currentPage)
  })

  // Update counter
  const counter = document.querySelector('.viewer__counter')
  if (counter) counter.textContent = `${dossierPages[currentPage].label} · ${currentPage + 1} / ${dossierPages.length}`

  // Update nav buttons
  document.getElementById('viewer-prev')?.classList.toggle('viewer__nav--disabled', currentPage === 0)
  document.getElementById('viewer-next')?.classList.toggle('viewer__nav--disabled', currentPage === dossierPages.length - 1)
}

function closeDossier() {
  dossierOpen = false
  document.getElementById('viewer')?.classList.remove('viewer--open')
  document.getElementById('desk-folder')?.classList.remove('desk-folder--hidden')
}

// ─── Asset Zoom ───
function openAssetZoom(id: string) {
  const asset = deskAssets.find(a => a.id === id)
  if (!asset) return
  zoomedAsset = id

  const content = document.getElementById('zoom-content')
  const label = document.getElementById('zoom-label')
  const container = document.getElementById('zoom-container')

  // Style the zoom container based on asset type
  container?.classList.remove('zoom__container--polaroid', 'zoom__container--document', 'zoom__container--sketch')

  if (asset.style === 'polaroid') {
    container?.classList.add('zoom__container--polaroid')
    if (content) content.innerHTML = `
      <div class="zoom-polaroid">
        <img src="${asset.image}" alt="${asset.label}">
        <div class="zoom-polaroid__caption">${asset.label}</div>
      </div>`
    if (label) label.innerHTML = `<span class="zoom__sublabel">${asset.sublabel}</span>`
  } else if (asset.style === 'photo') {
    if (content) content.innerHTML = `
      <div class="zoom-photo">
        <img src="${asset.image}" alt="${asset.label}">
      </div>`
    if (label) label.innerHTML = `<strong>${asset.label}</strong><br><span class="zoom__sublabel">${asset.sublabel}</span>`
  } else {
    if (content) content.innerHTML = `<img src="${asset.image}" alt="${asset.label}">`
    if (label) label.innerHTML = `<strong>${asset.label}</strong><br><span class="zoom__sublabel">${asset.sublabel}</span>`
  }

  document.getElementById('zoom')?.classList.add('zoom--open')
}

function openDocZoom(doc: DeskDocAsset) {
  zoomedAsset = doc.id
  const content = document.getElementById('zoom-content')
  const label = document.getElementById('zoom-label')
  if (content) content.innerHTML = `<div class="zoom-doc">${doc.render()}</div>`
  if (label) label.innerHTML = `<strong>${doc.label}</strong><br><span class="zoom__sublabel">${doc.sublabel}</span>`
  document.getElementById('zoom')?.classList.add('zoom--open')
}

// ─── Page Events (drag, close, minimize) ───
function bindPageEvents() {
  const paper = document.getElementById('desk-paper')
  
  // Close button → show folder again
  document.getElementById('page-close')?.addEventListener('click', () => {
    pageMinimized = true
    restoreAssetPositions()
    const center = document.getElementById('desk-center')
    if (center) {
      center.innerHTML = renderFolderHTML('Klik om te openen')
      document.getElementById('desk-folder')?.addEventListener('click', () => {
        pageMinimized = false
        switchChapter(currentChapter)
      })
    }
  })

  // Drag over
  paper?.addEventListener('dragover', (e) => {
    e.preventDefault()
    paper.classList.add('desk-page__paper--dragover')
  })
  paper?.addEventListener('dragleave', () => {
    paper.classList.remove('desk-page__paper--dragover')
  })

  // Drop
  paper?.addEventListener('drop', (e) => {
    e.preventDefault()
    paper.classList.remove('desk-page__paper--dragover')
    const assetId = (e as DragEvent).dataTransfer?.getData('text/plain')
    const needed = requiredDrops[currentChapter]
    if (!assetId || needed === 0 || droppedPerChapter[currentChapter] >= needed) return
    
    const prevDrops = droppedPerChapter[currentChapter]
    droppedPerChapter[currentChapter]++
    const newDrops = droppedPerChapter[currentChapter]
    
    // Map drops to step classes (scale to 3 steps)
    const prevStep = Math.min(Math.floor((prevDrops / needed) * 3), 3)
    const newStep = Math.min(Math.floor((newDrops / needed) * 3), 3)
    
    // Animate the dragged asset shrinking
    const dragged = document.getElementById(assetId)
    if (dragged) {
      dragged.style.transition = 'all .5s ease'
      dragged.style.opacity = '0.2'
      dragged.style.transform += ' scale(0.7)'
    }

    // Update step class for progressive reveal
    paper.classList.remove(`desk-page__paper--step-${prevStep}`)
    paper.classList.add(`desk-page__paper--step-${newStep}`)

    // Update "added" label
    const addedLabel = paper.closest('.desk-page')?.querySelector('.desk-page__added') as HTMLElement
    if (addedLabel && newDrops >= needed) {
      addedLabel.textContent = 'Toegevoegd aan het dossier'
    }

    // Update drop zone
    const dropZone = document.getElementById('page-drop')
    if (dropZone) {
      if (newDrops >= needed) {
        // Hide drop zone, show nav sidebar
        dropZone.style.display = 'none'
        paper.classList.add('desk-page__paper--complete')
        
        // Inject nav sidebar
        const page = paper.closest('.desk-page')
        if (page && !page.querySelector('.desk-page__nav-sidebar')) {
          const prevDis = currentChapter === 0 ? ' desk-page__nav-btn--disabled' : ''
          const nextDis = currentChapter === chapters.length - 1 ? ' desk-page__nav-btn--disabled' : ''
          page.insertAdjacentHTML('beforeend', `
            <div class="desk-page__nav-sidebar">
              <button class="desk-page__nav-btn${prevDis}" id="page-prev" title="Vorig hoofdstuk">‹</button>
              <div class="desk-page__nav-counter">${currentChapter + 1}<span>/</span>${chapters.length}</div>
              <button class="desk-page__nav-btn${nextDis}" id="page-next-ch" title="Volgend hoofdstuk">›</button>
            </div>`)
          document.getElementById('page-prev')?.addEventListener('click', () => switchChapter(currentChapter - 1))
          document.getElementById('page-next-ch')?.addEventListener('click', () => switchChapter(currentChapter + 1))
        }
      } else {
        dropZone.innerHTML = `<div class="desk-page__drop-hint">↓ Sleep bewijsstukken hierheen · ${newDrops}/${needed}</div>`
      }
    }
  })

  // Nav sidebar buttons (when rendered from template)
  document.getElementById('page-prev')?.addEventListener('click', () => switchChapter(currentChapter - 1))
  document.getElementById('page-next-ch')?.addEventListener('click', () => switchChapter(currentChapter + 1))
}

// ─── Chapter Switching ───
function switchChapter(n: number) {
  if (n < 0 || n >= chapters.length) return
  
  // Intercept: show celebration before reveal (once)
  if (n === 7 && !celebrationShown) {
    celebrationShown = true
    showCelebration()
    return
  }
  
  currentChapter = n

  // Open dossier if still closed
  if (!dossierOpen) {
    dossierOpen = true
  }

  // Update central dossier page
  pageMinimized = false
  const center = document.getElementById('desk-center')
  if (center) {
    center.style.opacity = '0'
    setTimeout(() => {
      center.innerHTML = renderPageHTML(n)
      center.style.opacity = '1'
      bindPageEvents()

      // Auto-play dream audio on page 8 (chapter index 7)
      if (n === 7) {
        setTimeout(() => {
          const dreamAudio = document.getElementById('dream-audio') as HTMLAudioElement | null
          const dreamBtn = document.getElementById('dream-audio-btn')
          if (dreamAudio && dreamBtn) {
            // Duck background music to 75%
            if (audioEl) audioEl.volume = 0.75

            dreamAudio.play().then(() => {
              dreamBtn.classList.add('playing')
              const label = dreamBtn.nextElementSibling as HTMLElement | null
              if (label) label.textContent = 'Nu aan het luisteren...'
            }).catch(() => {}) // Autoplay might be blocked

            dreamAudio.addEventListener('ended', () => {
              dreamBtn.classList.remove('playing')
              const label = dreamBtn.nextElementSibling as HTMLElement | null
              if (label) label.textContent = 'Luister naar Sophie'
              // Restore background music volume
              if (audioEl) audioEl.volume = 1.0
            }, { once: true })
          }
        }, 600)
      }
    }, 300)
  }

  // Update nav dots
  document.querySelectorAll('.chapter-nav__dot').forEach((dot, i) => {
    dot.classList.toggle('chapter-nav__dot--active', i === n)
  })

  // Fade assets in/out + smoothly push aside
  document.querySelectorAll('.desk-asset[data-chapters]').forEach(el => {
    const chs = (el.getAttribute('data-chapters') || '').split(',').map(Number)
    const htmlEl = el as HTMLElement
    if (chs.includes(n)) {
      htmlEl.style.opacity = '1'
      htmlEl.style.pointerEvents = 'auto'

      // Smoothly push to sides (CSS transition handles the animation)
      const origLeft = el.getAttribute('data-orig-left')
      if (origLeft) {
        const leftVal = parseFloat(origLeft)
        if (leftVal < 35) {
          htmlEl.style.left = `${Math.max(1, leftVal - 14)}%`
        } else {
          htmlEl.style.left = `${Math.min(90, leftVal + 10)}%`
        }
      }
    } else {
      htmlEl.style.opacity = '0'
      htmlEl.style.pointerEvents = 'none'
    }
  })

  // Also handle doc assets
  document.querySelectorAll('.desk-doc[data-chapters]').forEach(el => {
    const chs = (el.getAttribute('data-chapters') || '').split(',').map(Number)
    const htmlEl = el as HTMLElement
    htmlEl.style.opacity = chs.includes(n) ? '1' : '0'
    htmlEl.style.pointerEvents = chs.includes(n) ? 'auto' : 'none'
  })
}

// Restore asset positions when page is minimized
function restoreAssetPositions() {
  document.querySelectorAll('.desk-asset[data-orig-left]').forEach(el => {
    const htmlEl = el as HTMLElement
    const origLeft = el.getAttribute('data-orig-left')
    if (origLeft) htmlEl.style.left = origLeft
  })
}

// ─── Celebration / Confetti ───
function showCelebration() {
  const el = document.getElementById('celebrate')
  el?.classList.add('celebrate--visible')
  
  const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles: { x: number; y: number; vx: number; vy: number; color: string; size: number; rotation: number; rv: number }[] = []
  const colors = ['#FFD700', '#FF6B35', '#2C8C99', '#FF4E6A', '#7B68EE', '#00D4AA', '#FFF']
  
  for (let i = 0; i < 200; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - .5) * 200,
      y: canvas.height / 2,
      vx: (Math.random() - .5) * 16,
      vy: Math.random() * -18 - 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 3,
      rotation: Math.random() * 360,
      rv: (Math.random() - .5) * 12,
    })
  }

  let frame = 0
  function animate() {
    if (!ctx || frame > 180) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.25
      p.vx *= 0.99
      p.rotation += p.rv
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation * Math.PI / 180)
      ctx.fillStyle = p.color
      ctx.globalAlpha = Math.max(0, 1 - frame / 180)
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
      ctx.restore()
    })
    frame++
    requestAnimationFrame(animate)
  }
  animate()
}

function closeCelebration() {
  const el = document.getElementById('celebrate')
  el?.classList.remove('celebrate--visible')
  switchChapter(7)
}

function closeAssetZoom() {
  zoomedAsset = null
  document.getElementById('zoom')?.classList.remove('zoom--open')
}

// ─── Video ───
function openVideo() {
  document.getElementById('video-modal')?.classList.add('video-modal--open')
}

function closeVideo() {
  document.getElementById('video-modal')?.classList.remove('video-modal--open')
  const video = document.getElementById('sophie-video') as HTMLVideoElement
  if (video) video.pause()
}

// ─── Audio ───
function initAudio() {
  audioEl = document.getElementById('bg-audio') as HTMLAudioElement
  if (audioEl) {
    audioEl.volume = 0.25
  }

  // Splash screen → click starts music + fades splash
  const splash = document.getElementById('splash')
  const splashBtn = document.getElementById('splash-btn')

  const startExperience = () => {
    // Go fullscreen
    document.documentElement.requestFullscreen?.().catch(() => {})
    // Start background music
    if (audioEl) {
      audioEl.play().catch(() => {})
      audioPlaying = true
    }
    // Fade out splash
    splash?.classList.add('splash--hidden')
    setTimeout(() => {
      splash?.remove()
      // Auto-open Sophie's letter
      document.getElementById('desk-brief')?.click()
    }, 1200)
  }

  splashBtn?.addEventListener('click', startExperience)
  // Also allow clicking anywhere on splash
  splash?.addEventListener('click', (e) => {
    if (e.target === splash) startExperience()
  })
}

function toggleAudio() {
  if (!audioEl) return
  if (audioPlaying) {
    audioEl.pause()
  } else {
    audioEl.play().catch(() => {})
  }
  audioPlaying = !audioPlaying
  const btn = document.getElementById('btn-audio')
  if (btn) btn.textContent = audioPlaying ? '🔊' : '🔇'
}

// ─── Init ───
render()
