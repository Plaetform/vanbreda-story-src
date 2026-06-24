import './style.css'
import './iphone-mockup.css'
import { startBiometricScan } from './biometric-scan'
import { signaleren, begrijpen, begeleiden, verbinden, beslissen, ondersteunen, herstellen } from './scenes'
import type { SceneModule } from './scenes'
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
        <div class="cp-dream__video">
          <video id="dream-video" src="/video/outtro-sophie.mp4" preload="auto" playsinline></video>
          <button class="cp-dream__play-btn" id="dream-video-btn" aria-label="Speel af">
            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M8 5v14l11-7z"/></svg>
          </button>
        </div>

        <div class="cp-dream__letter">
          <div class="cp-dream__letter-date">Brasschaat, september 2030</div>

          <div class="cp-dream__letter-body">
            <p>Lieve Vanbreda,</p>
            <p>Drie maanden geleden lag ik onverwacht in een ziekenhuis in Frankrijk.</p>
            <p>Nu ben ik weer thuis bij mijn gezin.</p>
            <p>Ik hoefde mijn verhaal maar één keer te vertellen. Ik wist waar ik aan toe was. En toen het echt nodig was, was er iemand die me begreep.</p>
            <p><strong>Mijn ervaring in 2030 begon met jullie keuzes in 2026.</strong></p>
            <p>Dank jullie wel!</p>
          </div>

          <div class="cp-dream__signature">Sophie De Winter</div>
        </div>
      </div>

      <div class="cp-dream__cta" style="text-align:center; margin-top:20px;">
        <a class="cp-cta cp-cta--primary" href="/vanbreda-healthcaroperatie.pdf" download>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="margin-right:8px;vertical-align:middle"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download onze visie — Health Care 2030
        </a>
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

// Desk assets cleared — clean background for the new story-driven experience
const deskAssets: DeskAsset[] = []


const deskDocAssets: DeskDocAsset[] = []

// ─── State ───
let viewerOpen = false
let currentViewerPage = 0
let zoomedAsset: string | null = null
let audioPlaying = false
let audioEl: HTMLAudioElement | null = null
let activeTimers: ReturnType<typeof setTimeout>[] = []
let targetScrollTop = 0
let currentScrollTop = 0
let scrollAnimationId = 0
let currentPageIndex = 0

// ─── Heartbeat Generator (Web Audio API) ───
class HeartbeatGenerator {
  private ctx: AudioContext | null = null
  private intervalId: any = null

  start() {
    if (this.ctx) return
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return
    this.ctx = new AudioContextClass()
    
    this.intervalId = setInterval(() => {
      this.playThump(0)
      this.playThump(0.15)
    }, 1200)
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    if (this.ctx) {
      this.ctx.close()
      this.ctx = null
    }
  }

  private playThump(delay: number) {
    if (!this.ctx) return
    const time = this.ctx.currentTime + delay
    
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    
    osc.type = 'sine'
    osc.frequency.setValueAtTime(55, time)
    osc.frequency.exponentialRampToValueAtTime(10, time + 0.2)
    
    gain.gain.setValueAtTime(0.6, time)
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.25)
    
    osc.connect(gain)
    gain.connect(this.ctx.destination)
    
    osc.start(time)
    osc.stop(time + 0.3)
  }
}

const heartbeat = new HeartbeatGenerator()

// ─── Voiceover Narrator ───
let voEl: HTMLAudioElement | null = null

// Narration clips keyed by page id. A clip plays when its page is shown and
// stops when the user navigates away. Pages without an entry stay silent.
const voMap: Record<string, string> = {
  'title-1': '/audio/vo/vo-01-title-1.mp3',
  'video-pain': '/audio/vo/vo-02-video-pain.mp3',
  'signaleren': '/audio/vo/vo-03-signaleren.mp3',
  'begrijpen': '/audio/vo/vo-04-begrijpen.mp3',
  'video-ambulance': '/audio/vo/vo-05-video-ambulance.mp3',
  'begeleiden': '/audio/vo/vo-06-begeleiden.mp3',
  'title-2': '/audio/vo/vo-07-title-2.mp3',
  'video-morning': '/audio/vo/vo-08-video-morning.mp3',
  'verbinden': '/audio/vo/vo-09-verbinden.mp3',
  'beslissen': '/audio/vo/vo-10-beslissen.mp3',
  'title-3': '/audio/vo/vo-11-title-3.mp3',
  'video-discharge': '/audio/vo/vo-12-video-discharge.mp3',
  'ondersteunen': '/audio/vo/vo-13-ondersteunen.mp3',
  'title-vision': '/audio/vo/vo-14-title-vision.mp3',
  'herstellen': '/audio/vo/vo-15-herstellen.mp3',
  // video-outtro: geen VO — Sophie spreekt zelf
}

function stopVO() {
  if (voEl) {
    voEl.onended = null
    voEl.pause()
    voEl = null
  }
  // Restore background music to its default level
  if (audioEl) audioEl.volume = 0.25
}

// Play the narration for a page id. Returns true if a clip exists.
// onEnded fires only when the clip finishes on its own (not when interrupted).
function playVO(pageId: string, onEnded?: () => void): boolean {
  stopVO()
  const src = voMap[pageId]
  if (!src) return false
  if (audioEl) audioEl.volume = 0.06 // duck background music under narration
  const a = new Audio(src)
  a.volume = 1.0
  voEl = a
  a.addEventListener('ended', () => {
    if (voEl === a) { voEl = null; if (audioEl) audioEl.volume = 0.25 }
    onEnded?.()
  })
  a.play().catch(() => {
    // Autoplay blocked (no user gesture yet) — undo ducking; a fallback timer advances.
    if (voEl === a) { voEl = null; if (audioEl) audioEl.volume = 0.25 }
  })
  return true
}

// ─── Pages Definition (Linear Story Flow) ───
interface Page {
  type: 'splash' | 'letter' | 'title' | 'video' | 'content'
  id: string
  label: string
  date?: string
  quote?: string
  videoSrc?: string
  subtitles?: Subtitle[]
  sceneIndex?: number
}

const pages: Page[] = [
  { type: 'splash', id: 'splash', label: 'Welkom' },
  { type: 'letter', id: 'letter', label: 'Een brief van Sophie' },
  { type: 'title', id: 'title-1', label: 'Het moment van pijn', date: '8 april 2030 · Lyon', quote: 'Ik kan het alleen, maar hou me vast als het nodig is.' },
  { type: 'video', id: 'video-pain', label: 'Het moment van pijn', videoSrc: '/video/Sophie_gets_stomach_pain_202606162156.mp4', subtitles: [] },
  { type: 'content', id: 'signaleren', label: 'Sophie vraagt om hulp', sceneIndex: 0 },
  { type: 'content', id: 'begrijpen', label: 'De keten komt in beweging', sceneIndex: 1 },
  { type: 'video', id: 'video-ambulance', label: 'Onderweg naar het ziekenhuis', videoSrc: '/video/Ambulance_arrives_at_hospital_202606162155.mp4', subtitles: [] },
  { type: 'content', id: 'begeleiden', label: 'Het ziekenhuis verwacht haar', sceneIndex: 2 },
  { type: 'title', id: 'title-2', label: 'De ochtend erna', date: '9 april 2030 · Hôpital Saint-Claire', quote: 'De spoedoperatie is achter de rug.' },
  { type: 'video', id: 'video-morning', label: 'De ochtend erna', videoSrc: '/video/Morning_after_surgery_202606162156.mp4', subtitles: [] },
  { type: 'content', id: 'verbinden', label: 'Wat gebeurt er nu?', sceneIndex: 3 },
  { type: 'content', id: 'beslissen', label: 'Sophie krijgt regie', sceneIndex: 4 },
  { type: 'title', id: 'title-3', label: 'Naar huis', date: '12 april 2030 · Hôpital Saint-Claire', quote: '4 dagen later.' },
  { type: 'video', id: 'video-discharge', label: 'Naar huis', videoSrc: '/video/Sophie_discharged_202606162242.mp4', subtitles: [] },
  { type: 'content', id: 'ondersteunen', label: 'Veilig naar huis', sceneIndex: 5 },
  { type: 'title', id: 'title-vision', label: 'De onzichtbare keten', date: '', quote: 'Ik hoefde mijn verhaal maar één keer te vertellen.' },
  { type: 'video', id: 'video-outtro', label: 'Drie maanden later', videoSrc: '/video/outtro-sophie.mp4', subtitles: [
    { t: 0, s: 'Drie maanden geleden lag ik onverwacht in een ziekenhuis in Frankrijk.' },
    { t: 5, s: 'Nu ben ik weer thuis bij mijn gezin.' },
    { t: 9, s: 'Ik hoefde mijn verhaal maar één keer te vertellen. Mijn assistent regelde alles — en Vanbreda stond klaar wanneer het erop aankwam.' },
    { t: 17, s: 'Wat voor mij in 2030 vanzelfsprekend voelde, begon bij wat ge in 2026 besloten hebt te bouwen.' },
    { t: 23, s: 'Dank u wel, Vanbreda en AE.' }
  ] },
  { type: 'content', id: 'herstellen', label: 'De onzichtbare keten van zorg', sceneIndex: 6 },
]

// ─── Page Navigation Helpers ───
function getContentPages(): { page: Page, globalIndex: number }[] {
  return pages
    .map((p, i) => ({ page: p, globalIndex: i }))
    .filter(x => x.page.type === 'content')
}

function getContentStepNumber(globalIndex: number): number {
  const contentPages = getContentPages()
  const idx = contentPages.findIndex(x => x.globalIndex === globalIndex)
  return idx >= 0 ? idx + 1 : 0
}

function getTotalContentSteps(): number {
  return getContentPages().length
}

// ─── Cutscene Player ───
interface Subtitle {
  t: number
  s: string
}

function playCutscene(
  videoSrc: string,
  subtitles: Subtitle[],
  onComplete: () => void,
  titleCard?: { date: string, title: string }
) {
  const player = document.getElementById('cutscene-player')
  const video = document.getElementById('cutscene-video') as HTMLVideoElement | null
  const subBox = document.getElementById('cutscene-subtitles')
  const skipBtn = document.getElementById('cutscene-skip-btn')
  const titleCardEl = document.getElementById('cutscene-title-card')
  const titleDateEl = document.getElementById('cutscene-date')
  const titleTextEl = document.getElementById('cutscene-title')
  
  if (!player || !video) {
    onComplete()
    return
  }

  clearActiveTimers()
  
  // Duck background music
  if (audioEl) audioEl.volume = 0.05
  
  // Setup subtitles box
  if (subBox) {
    subBox.style.display = subtitles.length > 0 ? 'block' : 'none'
    subBox.textContent = ''
  }

  // Setup video
  video.src = videoSrc
  video.load()
  
  player.classList.add('cutscene-player--visible')
  
  let subtitleInterval: any = null
  let titleTimeoutId: any = null
  let titleFadeTimeoutId: any = null
  
  const endCutscene = () => {
    if (subtitleInterval) clearInterval(subtitleInterval)
    if (titleTimeoutId) clearTimeout(titleTimeoutId)
    if (titleFadeTimeoutId) clearTimeout(titleFadeTimeoutId)
    
    video.pause()
    player.classList.remove('cutscene-player--visible')
    if (audioEl) audioEl.volume = 0.25
    
    if (titleCardEl) {
      titleCardEl.classList.remove('cutscene-title-card--visible')
      titleCardEl.style.display = 'none'
    }
    video.style.display = 'block'
    if (skipBtn) skipBtn.style.display = 'block'
    
    // Unbind listeners
    video.onended = null
    if (skipBtn) skipBtn.onclick = null
    
    onComplete()
  }

  video.onended = endCutscene
  if (skipBtn) skipBtn.onclick = endCutscene

  const startVideoPlayback = () => {
    video.play().then(() => {
      if (subtitles.length > 0) {
        subtitleInterval = setInterval(() => {
          const time = video.currentTime
          const activeSub = subtitles.slice().reverse().find(s => time >= s.t)
          if (subBox && activeSub) {
            subBox.textContent = activeSub.s
          }
        }, 200)
      }
    }).catch(() => {
      endCutscene()
    })
  }

  if (titleCard && titleCardEl && titleDateEl && titleTextEl) {
    // Hide video and skip button during title card
    video.style.display = 'none'
    if (skipBtn) skipBtn.style.display = 'none'

    titleDateEl.textContent = titleCard.date
    titleTextEl.textContent = titleCard.title
    titleCardEl.style.display = 'flex'

    // Force reflow and fade in
    titleFadeTimeoutId = setTimeout(() => {
      titleCardEl.classList.add('cutscene-title-card--visible')
    }, 50)

    // Wait 3.5 seconds, then fade out and play
    titleTimeoutId = setTimeout(() => {
      titleCardEl.classList.remove('cutscene-title-card--visible')
      titleFadeTimeoutId = setTimeout(() => {
        titleCardEl.style.display = 'none'
        video.style.display = 'block'
        if (skipBtn) skipBtn.style.display = 'block'
        startVideoPlayback()
      }, 800) // fade out duration
    }, 3500)
  } else {
    if (titleCardEl) titleCardEl.style.display = 'none'
    video.style.display = 'block'
    if (skipBtn) skipBtn.style.display = 'block'
    startVideoPlayback()
  }
}

// ─── Scene Modules (indexed by sceneIndex) ───
const sceneModules: SceneModule[] = [
  signaleren,  // 0
  begrijpen,   // 1
  begeleiden,  // 2
  verbinden,   // 3
  beslissen,   // 4
  ondersteunen,// 5
  herstellen   // 6
]

// ─── Scene HTML Renderers ───
function renderSceneHTML(index: number): string {
  return sceneModules[index]?.render() ?? ''
}

// ─── Scene Interactions & Timers ───
function clearActiveTimers() {
  activeTimers.forEach(t => clearTimeout(t))
  activeTimers = []
  // Stop any narration tied to the page we're leaving
  stopVO()
  // Cleanup any scene-specific resources (audio, etc.)
  sceneModules.forEach(m => m.cleanup?.())
}

function bindSceneEvents(index: number) {
  clearActiveTimers()
  const mod = sceneModules[index]
  if (!mod) return

  // Scene 6 (herstellen) needs extra callbacks for viewer + reset
  if (index === 6) {
    mod.bind(() => navigateForward(), activeTimers, {
      openViewer: () => {
        viewerOpen = true
        currentViewerPage = 0
        updateViewer()
        document.getElementById('viewer')?.classList.add('viewer--open')
      },
      resetToSplash: () => {
        currentPageIndex = 0
        showPage(0)
      }
    })
  } else {
    mod.bind(() => navigateForward(), activeTimers)
  }
}
// ─── Page-Based Navigation ───
function navigateForward() {
  if (currentPageIndex >= pages.length - 1) return
  currentPageIndex++
  showPage(currentPageIndex)
}

function navigateBack() {
  if (currentPageIndex <= 0) return
  // Skip video/title pages when going back — jump to previous content/letter/splash
  let target = currentPageIndex - 1
  while (target > 0 && (pages[target].type === 'video' || pages[target].type === 'title')) {
    target--
  }
  currentPageIndex = target
  showPage(currentPageIndex)
}

function showPage(index: number, fromPopState = false) {
  const page = pages[index]
  if (!page) return

  // Push browser history for content, letter, and splash pages (not auto-advancing title/video)
  if (!fromPopState && (page.type === 'content' || page.type === 'letter' || page.type === 'splash')) {
    history.pushState({ pageIndex: index }, '', `#${page.id}`)
  }

  clearActiveTimers()
  
  const nav = document.getElementById('chapter-nav')
  const center = document.getElementById('desk-center')
  const splash = document.getElementById('splash')
  const letterOverlay = document.getElementById('letter-overlay')


  // Hide scene background for non-content pages
  const sceneBgEl = document.getElementById('scene-background')
  if (page.type !== 'content' && sceneBgEl) {
    sceneBgEl.classList.remove('scene-background--visible')
  }

  switch (page.type) {
    case 'splash': {
      // Show splash, hide everything else
      if (nav) nav.style.display = 'none'
      if (center) center.innerHTML = ''
      if (splash) {
        splash.classList.remove('splash--hidden')
        splash.style.display = ''
      }
      if (letterOverlay) letterOverlay.classList.remove('letter-overlay--visible')
      break
    }

    case 'letter': {
      // Open the letter overlay
      if (nav) nav.style.display = 'none'
      if (center) center.innerHTML = ''
      // Trigger openLetter via click on desk-brief (it handles the overlay)
      document.getElementById('desk-brief')?.click()
      break
    }

    case 'title': {
      // Show title card full-screen, then auto-advance
      if (nav) nav.style.display = 'none'
      if (letterOverlay) letterOverlay.classList.remove('letter-overlay--visible')

      const player = document.getElementById('cutscene-player')
      const titleCardEl = document.getElementById('cutscene-title-card')
      const titleDateEl = document.getElementById('cutscene-date')
      const titleTextEl = document.getElementById('cutscene-title')
      const video = document.getElementById('cutscene-video') as HTMLVideoElement | null
      const skipBtn = document.getElementById('cutscene-skip-btn')

      if (player && titleCardEl && titleDateEl && titleTextEl) {
        // Hide video elements, show title card
        if (video) video.style.display = 'none'
        if (skipBtn) skipBtn.style.display = 'none'

        titleDateEl.textContent = page.date || page.label || ''
        titleTextEl.textContent = page.quote || ''
        titleCardEl.style.display = 'flex'

        if (audioEl) audioEl.volume = 0.05
        player.classList.add('cutscene-player--visible')

        // Fade in after reflow
        activeTimers.push(setTimeout(() => {
          titleCardEl.classList.add('cutscene-title-card--visible')
        }, 50))

        // Narration drives how long the card holds; advance when it ends.
        let titleAdvanced = false
        const advanceTitle = () => {
          if (titleAdvanced) return
          titleAdvanced = true
          titleCardEl.classList.remove('cutscene-title-card--visible')
          activeTimers.push(setTimeout(() => {
            titleCardEl.style.display = 'none'
            player.classList.remove('cutscene-player--visible')
            if (audioEl) audioEl.volume = 0.25
            navigateForward()
          }, 800))
        }
        const titleHasVO = playVO(page.id, advanceTitle)
        // Fallback: hold ~4.5s with no clip, or a safe ceiling past the clip length.
        activeTimers.push(setTimeout(advanceTitle, titleHasVO ? 13000 : 4500))
      } else {
        // Fallback: skip title
        navigateForward()
      }
      break
    }

    case 'video': {
      // Play video cutscene full-screen, then auto-advance
      if (nav) nav.style.display = 'none'
      if (letterOverlay) letterOverlay.classList.remove('letter-overlay--visible')

      // For outtro: show family photos floating around the video
      const isOuttro = page.id === 'video-outtro'

      playCutscene(
        page.videoSrc || '',
        page.subtitles || [],
        () => {
          // Remove polaroids before navigating
          document.querySelectorAll('.outtro-polaroid').forEach(el => el.remove())
          // If narration runs slightly past the clip, let its tail finish first
          const a = voEl
          if (a && !a.paused && isFinite(a.duration)) {
            const remaining = a.duration - a.currentTime
            if (remaining > 0.3 && remaining < 3) {
              let advanced = false
              const go = () => { if (!advanced) { advanced = true; navigateForward() } }
              a.addEventListener('ended', go, { once: true })
              activeTimers.push(setTimeout(go, (remaining + 0.5) * 1000))
              return
            }
          }
          navigateForward()
        }
      )

      // Mute the clip's own audio only when narration plays over it
      // (keeps Sophie's own voice on the outtro).
      const cutsceneVideo = document.getElementById('cutscene-video') as HTMLVideoElement | null
      if (cutsceneVideo) cutsceneVideo.volume = voMap[page.id] ? 0 : 1
      playVO(page.id)

      if (isOuttro) {
        const photos = [
          { src: '/img-sophie-family.png', delay: 3, x: '5%', y: '8%', rot: -8 },
          { src: '/img-sophie-garden.png', delay: 7, x: '72%', y: '6%', rot: 5 },
          { src: '/img-sophie-happy.png', delay: 11, x: '3%', y: '58%', rot: 6 },
          { src: '/img-sophie-travel.png', delay: 16, x: '74%', y: '55%', rot: -4 },
          { src: '/img-sophie-cafe.png', delay: 20, x: '38%', y: '3%', rot: 3 },
        ]
        const cutscenePlayer = document.getElementById('cutscene-player')
        photos.forEach(p => {
          activeTimers.push(setTimeout(() => {
            if (!cutscenePlayer) return
            const polaroid = document.createElement('div')
            polaroid.className = 'outtro-polaroid'
            polaroid.style.cssText = `left:${p.x}; top:${p.y}; --rot:${p.rot}deg;`
            polaroid.innerHTML = `<img src="${p.src}" alt="" />`
            cutscenePlayer.appendChild(polaroid)
          }, p.delay * 1000))
        })
      }
      break
    }

    case 'content': {
      // Render the scene content and show bottom nav
      if (nav) nav.style.display = 'flex'
      if (letterOverlay) letterOverlay.classList.remove('letter-overlay--visible')

      const sceneIdx = page.sceneIndex ?? 0
      const sceneBackgrounds = [
        '/bg-signaleren.png',   // 0
        '/bg-begrijpen.png',    // 1
        '/bg-begeleiden.png',   // 2
        '/bg-verbinden.png',    // 3
        '/bg-beslissen.png',    // 4
        '/bg-ondersteunen.png', // 5
        '/bg-herstellen.png',   // 6
      ]

      if (sceneIdx !== 0) {
        heartbeat.stop()
      }

      // Set scene background
      const sceneBg = document.getElementById('scene-background')
      if (sceneBg) {
        sceneBg.style.backgroundImage = `url('${sceneBackgrounds[sceneIdx] || ''}')`
        sceneBg.classList.add('scene-background--visible')
      }

      if (center) {
        center.style.opacity = '0'
        setTimeout(() => {
          center.innerHTML = renderSceneHTML(sceneIdx)
          center.style.opacity = '1'
          bindSceneEvents(sceneIdx)
          // Narration for this scene (no-op if none). After bindSceneEvents so its
          // own clearActiveTimers() doesn't immediately stop the clip.
          playVO(page.id)
        }, 200)
      }

      updateBottomNav(index)
      break
    }
  }
}

function updateBottomNav(pageIndex: number) {
  const prevBtn = document.getElementById('chapter-nav-prev') as HTMLButtonElement | null
  const nextBtn = document.getElementById('chapter-nav-next') as HTMLButtonElement | null
  const statusEl = document.getElementById('chapter-nav-status')

  const page = pages[pageIndex]

  if (prevBtn) {
    // Always allow going back (will go to letter or splash)
    prevBtn.removeAttribute('disabled')
  }

  if (nextBtn) {
    if (pageIndex >= pages.length - 1) {
      nextBtn.setAttribute('disabled', 'true')
    } else {
      nextBtn.removeAttribute('disabled')
    }
  }

  if (statusEl && page) {
    statusEl.textContent = `${page.label}`
  }
}

// ─── Render Dossier Detail Viewer (Deep Dive) ───

function navigateViewerPage(dir: number) {
  const next = currentViewerPage + dir
  if (next < 0 || next >= dossierPages.length) return
  currentViewerPage = next
  updateViewer()
}

function updateViewer() {
  const content = document.getElementById('viewer-content')
  if (content) {
    content.style.opacity = '0'
    setTimeout(() => {
      content.innerHTML = dossierPages[currentViewerPage].render()
      content.style.opacity = '1'
    }, 200)
  }

  // Update dots
  document.querySelectorAll('.viewer__dot').forEach((dot, i) => {
    dot.classList.toggle('viewer__dot--active', i === currentViewerPage)
  })

  // Update counter
  const counter = document.querySelector('.viewer__counter')
  if (counter) counter.textContent = `${dossierPages[currentViewerPage].label} · ${currentViewerPage + 1} / ${dossierPages.length}`

  // Update nav buttons
  document.getElementById('viewer-prev')?.classList.toggle('viewer__nav--disabled', currentViewerPage === 0)
  document.getElementById('viewer-next')?.classList.toggle('viewer__nav--disabled', currentViewerPage === dossierPages.length - 1)
}

function closeDossier() {
  viewerOpen = false
  document.getElementById('viewer')?.classList.remove('viewer--open')
}

// ─── Render Desk ───
function render() {
  const app = document.querySelector<HTMLDivElement>('#app')!
  app.innerHTML = renderDesk()
  bindEvents()
  initAudio()
}

function renderDesk(): string {
  const chapterNavHTML = `
    <button class="chapter-nav__btn chapter-nav__btn--prev" id="chapter-nav-prev">
      ← Terug
    </button>
    <div class="chapter-nav__status" id="chapter-nav-status"></div>
    <button class="chapter-nav__btn chapter-nav__btn--next" id="chapter-nav-next">
      Vervolg →
    </button>
  `

  const pageDots = dossierPages.map((_, i) =>
    `<div class="viewer__dot ${i === currentViewerPage ? 'viewer__dot--active' : ''}" data-page="${i}"></div>`
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
    <div class="splash__sound-notice" id="splash-sound">🎧 beste ervaring met geluid</div>
    <button class="splash__btn" id="splash-btn">Maak kennis met Sophie →</button>
  </div>
</div>

<div class="desk" id="desk">
  <!-- Scene background (before desk so CSS ~ selector works) -->
  <div class="scene-background" id="scene-background"></div>

  <div class="desk__bg"></div>
  <div class="desk__vignette"></div>

  <!-- Central content container -->
  <div class="desk-center" id="desk-center"></div>

  <div class="desk-brief" id="desk-brief" style="opacity: 0.8; display: none;">
    <div class="desk-brief__envelope">
      <div class="desk-brief__to">Sophie De Winter</div>
      <div class="desk-brief__subtitle">Brief van Sophie</div>
    </div>
  </div>
  
  <button class="desk__audio" id="btn-audio" title="Muziek aan/uit">🔊</button>
  <audio id="bg-audio" loop preload="auto">
    <source src="/audio/Yair Cohen - Rise Within.mp3" type="audio/mpeg">
  </audio>
</div>

<div class="chapter-nav" id="chapter-nav" style="display:none;">
  ${chapterNavHTML}
</div>

<!-- Footer -->
<div class="desk__footer" id="global-footer">
  <span class="desk__footer-text">Gemaakt door</span>
  <img src="/ae-logo.png" alt="AE" class="desk__footer-logo desk__footer-logo--ae">
  <span class="desk__footer-text">voor</span>
  <img src="/vanbreda-logo-white.svg" alt="Vanbreda" class="desk__footer-logo desk__footer-logo--vb">
</div>

<!-- Deep Dive Viewer Overlay -->
<div class="viewer ${viewerOpen ? 'viewer--open' : ''}" id="viewer">
  <div class="viewer__backdrop" id="viewer-backdrop"></div>
  <div class="viewer__container">
    <button class="viewer__close" id="viewer-close" title="Sluiten">✕</button>
    <button class="viewer__nav viewer__nav--prev ${currentViewerPage === 0 ? 'viewer__nav--disabled' : ''}" id="viewer-prev">‹</button>
    <button class="viewer__nav viewer__nav--next ${currentViewerPage === dossierPages.length - 1 ? 'viewer__nav--disabled' : ''}" id="viewer-next">›</button>
    <div class="viewer__content" id="viewer-content">${dossierPages[currentViewerPage].render()}</div>
    <div class="viewer__footer">
      <div class="viewer__dots">${pageDots}</div>
      <div class="viewer__counter">${dossierPages[currentViewerPage].label} · ${currentViewerPage + 1} / ${dossierPages.length}</div>
    </div>
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
        <div class="letter__scroller" id="letter-scroller">
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
      </div>
      <button class="letter__continue" id="letter-continue">Start mijn reis →</button>
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

<div class="cutscene-player" id="cutscene-player">
  <div class="cutscene-title-card" id="cutscene-title-card" style="display:none;">
    <div class="cutscene-date-label" id="cutscene-date"></div>
    <div class="cutscene-title-line"></div>
    <div class="cutscene-title-text" id="cutscene-title"></div>
  </div>
  <video id="cutscene-video" playsinline></video>
  <div class="cutscene-subtitles" id="cutscene-subtitles" style="display:none;"></div>
  <button class="cutscene-skip-btn" id="cutscene-skip-btn">Sla video over ➔</button>
</div>
`
}



// ─── Event Bindings ───
function bindEvents() {
  const letterAudio = document.getElementById('letter-audio') as HTMLAudioElement | null
  let letterAudioPlaying = false
  let photoTimers: ReturnType<typeof setTimeout>[] = []
  let trustLocked = false

  document.getElementById('desk-brief')?.addEventListener('click', () => openLetter())

  function openLetter() {
    const overlay = document.getElementById('letter-overlay')
    overlay?.classList.add('letter-overlay--visible')
    
    // Reset photos
    for (let i = 1; i <= 4; i++) {
      document.getElementById(`letter-photo-${i}`)?.classList.add('letter__side-photo--hidden')
    }
    
    photoTimers.push(setTimeout(() => {
      document.getElementById('letter-photo-1')?.classList.remove('letter__side-photo--hidden')
    }, 1000))
    photoTimers.push(setTimeout(() => {
      document.getElementById('letter-photo-2')?.classList.remove('letter__side-photo--hidden')
    }, 8000))
    photoTimers.push(setTimeout(() => {
      document.getElementById('letter-photo-3')?.classList.remove('letter__side-photo--hidden')
    }, 16000))
    photoTimers.push(setTimeout(() => {
      document.getElementById('letter-photo-4')?.classList.remove('letter__side-photo--hidden')
      trustLocked = true
      overlay?.classList.add('letter-overlay--trust')
    }, 24000))

    const scroller = document.getElementById('letter-scroller')
    if (scroller) scroller.scrollTop = 0

    if (letterAudio) {
      letterAudio.currentTime = 0
      letterAudio.volume = 0.8
      letterAudio.play().catch(() => {})
      letterAudioPlaying = true
      const icon = document.getElementById('letter-audio-icon')
      if (icon) icon.textContent = '⏸'
    }
    if (audioEl) audioEl.volume = 0.15
  }

  function closeLetter() {
    const overlay = document.getElementById('letter-overlay')
    overlay?.classList.remove('letter-overlay--visible')
    overlay?.classList.remove('letter-overlay--trust')
    
    const scroller = document.getElementById('letter-scroller')
    if (scroller) scroller.scrollTop = 0

    if (letterAudio && letterAudioPlaying) {
      letterAudio.pause()
      letterAudio.currentTime = 0
      letterAudioPlaying = false
      const icon = document.getElementById('letter-audio-icon')
      if (icon) icon.textContent = '▶'
    }
    
    photoTimers.forEach(t => clearTimeout(t))
    photoTimers = []
    if (audioEl) audioEl.volume = 0.25
  }

  document.getElementById('letter-close')?.addEventListener('click', () => {
    closeLetter()
    setTimeout(() => {
      // Kruisje gaat naar "Start mijn reis" (title card)
      currentPageIndex = 2
      showPage(currentPageIndex)
    }, 400)
  })

  document.getElementById('letter-continue')?.addEventListener('click', () => {
    closeLetter()
    setTimeout(() => {
      // Advance to the next page after the letter (title card)
      currentPageIndex = 2 // title card page
      showPage(currentPageIndex)
    }, 400)
  })

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

  letterAudio?.addEventListener('ended', () => {
    letterAudioPlaying = false
    const icon = document.getElementById('letter-audio-icon')
    if (icon) icon.textContent = '▶'
  })



  // Bottom navigation buttons
  document.getElementById('chapter-nav-prev')?.addEventListener('click', () => {
    navigateBack()
  })

  document.getElementById('chapter-nav-next')?.addEventListener('click', () => {
    navigateForward()
  })

  // Deep Dive Viewer nav
  document.getElementById('viewer-close')?.addEventListener('click', closeDossier)
  document.getElementById('viewer-backdrop')?.addEventListener('click', closeDossier)
  document.getElementById('viewer-prev')?.addEventListener('click', () => navigateViewerPage(-1))
  document.getElementById('viewer-next')?.addEventListener('click', () => navigateViewerPage(1))

  document.querySelectorAll('.viewer__dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const pg = parseInt(dot.getAttribute('data-page') || '0')
      currentViewerPage = pg
      updateViewer()
    })
  })

  document.getElementById('btn-audio')?.addEventListener('click', toggleAudio)

  // Keyboard navigation
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (document.getElementById('letter-overlay')?.classList.contains('letter-overlay--visible')) {
        closeLetter()
      } else if (viewerOpen) {
        closeDossier()
      }
    }
  })
}

// ─── Audio ───
function initAudio() {
  audioEl = document.getElementById('bg-audio') as HTMLAudioElement
  if (audioEl) {
    audioEl.volume = 0.25
  }

  const splash = document.getElementById('splash')
  const splashBtn = document.getElementById('splash-btn')

  const startExperience = () => {
    document.documentElement.requestFullscreen?.().catch(() => {})
    splash?.classList.add('splash--hidden')

    // Opening narration over the clearance scan (after the click, so audio is allowed;
    // it finishes well before Sophie's letter, so it never overlaps her own voice).
    stopVO()
    const opener = new Audio('/audio/vo/vo-00-opener.mp3')
    opener.volume = 1.0
    voEl = opener
    opener.addEventListener('ended', () => { if (voEl === opener) voEl = null })
    opener.play().catch(() => { if (voEl === opener) voEl = null })

    // Launch biometric clearance scan
    startBiometricScan(() => {
      // Scan complete → start music and show Sophie's letter
      if (audioEl) {
        audioEl.play().catch(() => {})
        audioPlaying = true
      }
      currentPageIndex = 1
      showPage(currentPageIndex)
    })
  }

  splashBtn?.addEventListener('click', startExperience)
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

// Let scenes stop the narrator when their own audio takes over (e.g. the Thomas call)
document.addEventListener('vo-stop', stopVO)

// Set initial history state
history.replaceState({ pageIndex: 0 }, '', '#splash')

// Browser back/forward button support
window.addEventListener('popstate', (e) => {
  if (e.state && typeof e.state.pageIndex === 'number') {
    currentPageIndex = e.state.pageIndex
    showPage(currentPageIndex, true)
  }
})
