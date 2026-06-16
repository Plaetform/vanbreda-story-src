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
    title: 'De klantbelofte',
    subtitle: 'Eén vloeiende dienstverlening op een kwetsbaar moment',
    content: `
      <ul class="cp-list">
        <li>Sophie vertelt haar verhaal <strong>één keer</strong></li>
        <li>Ze weet steeds waar zij aan toe is</li>
        <li>Ze krijgt snel duidelijkheid over eenvoudige onderdelen</li>
        <li>Ze krijgt menselijke uitleg wanneer oordeel nodig is</li>
        <li>Ze hoeft niet zelf tussen Vanbreda, werkgever, verzekeraar en zorgverlener te coördineren</li>
      </ul>
      <div class="cp-flow">
        <div class="cp-flow__step">
          <div class="cp-flow__label">Ziekte</div>
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
      </div>`,
    footnote: 'Iedere ontwerpkeuze moet aantoonbaar bijdragen aan de ervaring van Sophie.',
  },
  {
    pageNum: 2,
    title: 'Vanbreda begint niet bij nul',
    subtitle: 'De bestaande kracht',
    content: `
      <div class="cp-columns">
        <div class="cp-col">
          <div class="cp-col__title">Claims</div>
          <ul class="cp-col__list">
            <li>55% volumegewogen STP</li>
            <li>Digitale intake</li>
            <li>OCR-capability</li>
            <li>±200.000 claims/maand</li>
          </ul>
        </div>
        <div class="cp-col">
          <div class="cp-col__title">Communicatie</div>
          <ul class="cp-col__list">
            <li>±80% calls via Voice AI</li>
            <li>±95% routeringsnauwkeurigheid</li>
            <li>Intentclassificatie</li>
            <li>Contextverrijking</li>
            <li>Conceptantwoorden</li>
          </ul>
        </div>
        <div class="cp-col">
          <div class="cp-col__title">B2B / B2I</div>
          <ul class="cp-col__list">
            <li>±87% STP aansluitingen</li>
            <li>Digitale interfaces</li>
            <li>Partner- en beheerprocessen</li>
          </ul>
        </div>
      </div>`,
    footnote: 'De volgende stap is niet opnieuw beginnen, maar verbinden wat al waarde levert.',
  },
  {
    pageNum: 3,
    title: 'De waarde zit in de verbinding',
    subtitle: 'Mogelijke frictie tussen de onderdelen',
    content: `
      <div class="cp-note">Te valideren met Vanbreda</div>
      <ul class="cp-list">
        <li>Context reist niet altijd mee</li>
        <li>Informatie staat verspreid over systemen</li>
        <li>Uitzonderingen vragen handmatige coördinatie</li>
        <li>Besliskennis zit bij ervaren medewerkers</li>
        <li>Automatische stappen kunnen verborgen handwerk veroorzaken</li>
        <li>Lokale optimalisatie leidt niet automatisch tot <strong>end-to-end waarde</strong></li>
      </ul>
      <div class="cp-flow">
        <div class="cp-flow__step">
          <div class="cp-flow__label">Intake</div>
        </div>
        <div class="cp-flow__break">⚡</div>
        <div class="cp-flow__step">
          <div class="cp-flow__label">Classificatie</div>
        </div>
        <div class="cp-flow__break">⚡</div>
        <div class="cp-flow__step">
          <div class="cp-flow__label">Context</div>
        </div>
        <div class="cp-flow__break">⚡</div>
        <div class="cp-flow__step">
          <div class="cp-flow__label">Beslissing</div>
        </div>
        <div class="cp-flow__break">⚡</div>
        <div class="cp-flow__step">
          <div class="cp-flow__label">Uitvoering</div>
        </div>
        <div class="cp-flow__break">⚡</div>
        <div class="cp-flow__step">
          <div class="cp-flow__label">Communicatie</div>
        </div>
      </div>`,
    footnote: 'De grootste frictie zit vaak niet in één taak, maar tussen teams, systemen en beslissingen.',
  },
  {
    pageNum: 4,
    title: 'De verbonden basis',
    subtitle: 'De ruggengraat van gecontroleerde autonomie',
    content: `
      <div class="cp-note">Nodig over de drie pijlers heen</div>
      <div class="cp-grid">
        <div class="cp-grid__item">Gedeelde data</div>
        <div class="cp-grid__item">Consistente identiteit</div>
        <div class="cp-grid__item">Expliciete beslisregels</div>
        <div class="cp-grid__item">Modulaire integraties</div>
        <div class="cp-grid__item">Workflow & case mgmt</div>
        <div class="cp-grid__item">End-to-end status</div>
        <div class="cp-grid__item">Bronverwijzingen</div>
        <div class="cp-grid__item">Toegangsbeheer</div>
        <div class="cp-grid__item">Exception handling</div>
      </div>
      <div class="cp-layers">
        <div class="cp-layer cp-layer--top">
          <div class="cp-layer__title">Ervaring</div>
          <div class="cp-layer__items">Verzekerde · Medewerker · Werkgever · Partner</div>
        </div>
        <div class="cp-layer">
          <div class="cp-layer__title">Proces</div>
          <div class="cp-layer__items">Claims · Communicatie · B2B/B2I</div>
        </div>
        <div class="cp-layer">
          <div class="cp-layer__title">Verbinding</div>
          <div class="cp-layer__items">Orkestratie · Case management · Beslisregels</div>
        </div>
        <div class="cp-layer cp-layer--bottom">
          <div class="cp-layer__title">Fundament</div>
          <div class="cp-layer__items">Data · Masterdata · Identiteit · Integratie · Security</div>
        </div>
      </div>`,
    footnote: 'Autonomie begint niet bij een agent, maar bij een betrouwbare ruggengraat.',
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
      <div class="cp-note">Veranderende rollen</div>
      <ul class="cp-list">
        <li>Van verwerker naar <strong>exception specialist</strong></li>
        <li>Van data-invoerder naar <strong>data steward</strong></li>
        <li>Van teammanager naar <strong>end-to-end proceseigenaar</strong></li>
        <li>Van modelgebruiker naar <strong>actieve feedbackgever</strong></li>
        <li>Van standaardcontact naar <strong>empathisch klantadviseur</strong></li>
      </ul>`,
    footnote: 'Autonomie betekent niet minder verantwoordelijkheid, maar explicietere verantwoordelijkheid.',
  },
  {
    pageNum: 6,
    title: 'De samenhangende operatie',
    subtitle: 'Eén Health Care operating model',
    content: `
      <div class="cp-note">Wat de organisatie in 2030 kan</div>
      <ul class="cp-list">
        <li>Eén case over de volledige keten volgen</li>
        <li>Context automatisch beschikbaar maken</li>
        <li>Routinewerk gecontroleerd automatiseren</li>
        <li>Onzekerheid <strong>herkennen</strong></li>
        <li>De juiste expert inschakelen</li>
        <li>Klant en medewerker dezelfde status tonen</li>
        <li>Elke beslissing herleiden</li>
        <li>Correcties als leersignaal gebruiken</li>
        <li>Prestaties, risico's en uitzonderingen bewaken</li>
      </ul>`,
    footnote: 'De klant ervaart één dienstverlening, ook wanneer achter de schermen meerdere systemen en partijen samenwerken.',
  },
  {
    pageNum: 7,
    title: 'Het moment van de waarheid',
    subtitle: 'Sophie\'s claim in 2030',
    content: `
      <ul class="cp-list cp-list--numbered">
        <li><strong>Sophie wordt opgenomen</strong> — buitenlandse spoedopname, onzekerheid over dekking</li>
        <li><strong>Intake</strong> — documenten worden herkend, vertaald en gekoppeld</li>
        <li><strong>Context</strong> — polis, werkgever, claimhistorie en communicatie komen samen</li>
        <li><strong>Automatische verwerking</strong> — eenvoudige onderdelen worden goedgekeurd</li>
        <li><strong>Uitzondering</strong> — buitenlandse code en mogelijke dubbele factuur herkend</li>
        <li><strong>Menselijk oordeel</strong> — een claimspecialist beoordeelt de uitzondering</li>
        <li><strong>Communicatie</strong> — Sophie ontvangt één duidelijk, persoonlijk antwoord</li>
        <li><strong>Afronding</strong> — juiste betaling voorbereid, dubbele betaling voorkomen, feedback opgeslagen</li>
      </ul>`,
    footnote: 'Niet een demo. Niet een pilot. Dit is hoe het werkt als alles samenkomt.',
  },
  {
    pageNum: 8,
    title: 'Onze droom voor Vanbreda',
    subtitle: 'Health Care 2030',
    content: `
      <div class="cp-reveal">
        <div class="cp-reveal__stamp">DOSSIER HC-2030-004781 — AFGEROND</div>
        <div class="cp-reveal__verdict">Sophie werd geholpen zoals we haar hadden beloofd.</div>
        <div class="cp-reveal__intro">
          Niet omdat één tool alles oploste.<br>
          Maar omdat processen, data, AI, mensen en partners als één samenhangende Health Care-operatie samenwerkten.
        </div>

        <div class="cp-reveal__heading">Eén samenhangend Health Care operating model</div>
        <ul class="cp-reveal__list">
          <li>AI het routinewerk draagt</li>
          <li>processen en informatie als één keten samenwerken</li>
          <li>onzekerheid wordt herkend</li>
          <li>menselijk oordeel beschikbaar is waar het verschil maakt</li>
          <li>iedere interactie bijdraagt aan verbetering</li>
        </ul>

        <div class="cp-reveal__fanout">
          <div class="cp-reveal__petal cp-reveal__petal--1">Klantbelofte</div>
          <div class="cp-reveal__petal cp-reveal__petal--2">Bestaande kracht</div>
          <div class="cp-reveal__petal cp-reveal__petal--3">Verbinding</div>
          <div class="cp-reveal__center">
            <div class="cp-reveal__center-name">Sophie</div>
          </div>
          <div class="cp-reveal__petal cp-reveal__petal--4">Fundament</div>
          <div class="cp-reveal__petal cp-reveal__petal--5">Menselijke regie</div>
          <div class="cp-reveal__petal cp-reveal__petal--6">Besturing</div>
          <div class="cp-reveal__fanout-label">Health Care 2030</div>
        </div>

        <div class="cp-reveal__principles">
          <div class="cp-reveal__principle">
            <span class="cp-reveal__icon">◈</span>
            <span><strong>Eén ervaring</strong> — voor verzekerde, medewerker en partner</span>
          </div>
          <div class="cp-reveal__principle">
            <span class="cp-reveal__icon">◈</span>
            <span><strong>Eén verbonden operatie</strong> — over Claims, Communicatie en B2B/B2I heen</span>
          </div>
          <div class="cp-reveal__principle">
            <span class="cp-reveal__icon">◈</span>
            <span><strong>Menselijk waar het telt</strong> — bij uitzonderingen, interpretatie en empathie</span>
          </div>
        </div>
      </div>`,
    footnote: 'De roadmap, architectuur, businesscase en aanpak die deze droom uitvoerbaar maken, zijn opgenomen in onze formele RFI-beantwoording.',
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
  // ── Ch0: De Belofte ──
  { id: 'napkin', label: 'De Napkin', sublabel: 'De eerste versie van de customer journey — geschetst op een servet.',
    image: '/img-napkin.png', top: '8%', left: '8%', rotation: 5, width: '12vw', style: 'sketch', chapters: [0] },
  { id: 'hand-sketch', label: 'Eerste Schets', sublabel: 'De allereerste schets van het proces — op een kladblok.',
    image: '/img-hand-sketch.png', top: '55%', left: '6%', rotation: -3, width: '11vw', style: 'sketch', chapters: [0] },
  { id: 'droomkaart', label: 'Droomkaart 2030', sublabel: 'De ideale klantbeleving in één customer journey map.',
    image: '/img-droomkaart.png', top: '8%', left: '72%', rotation: -4, width: '13vw', style: 'document', chapters: [0] },
  { id: 'klantbelofte', label: 'Klantbelofte', sublabel: 'Vijf principes die we onszelf opleggen — voor Sophie.',
    image: '/img-klantbelofte.png', top: '55%', left: '74%', rotation: 5, width: '11vw', style: 'document', chapters: [0] },

  // ── Ch1: De Werkelijkheid ──
  { id: 'bierviltje', label: 'Het Bierviltje', sublabel: 'Na het eerste gesprek schreven we het kernidee op een bierviltje.',
    image: '/img-bierviltje.png', top: '8%', left: '6%', rotation: -5, width: '12vw', style: 'sketch', chapters: [1] },
  { id: 'pizza', label: 'Pizza & Pixels', sublabel: '14 juni · ±23:47 — de avond dat het idee vorm kreeg.',
    image: '/img-pizza-bw.png', top: '55%', left: '74%', rotation: 4, width: '12vw', style: 'polaroid', chapters: [1] },
  { id: 'postit', label: 'Brainstorm', sublabel: 'Alles op post-its tegen de muur. Hier werd de scope helder.',
    image: '/img-postit-wall.png', top: '6%', left: '74%', rotation: 3, width: '12vw', style: 'photo', chapters: [1] },
  { id: 'zo-nooit-meer', label: 'Zo Nooit Meer', sublabel: 'Het moment: "dit moeten we anders doen." De trigger.',
    image: '/img-zo-nooit-meer.png', top: '55%', left: '6%', rotation: -6, width: '11vw', style: 'photo', chapters: [1] },
  { id: 'servet', label: 'Het Servet', sublabel: 'Sophie\'s reis van Lyon tot terugbetaling — in één avond geschetst.',
    image: '/img-servet.png', top: '30%', left: '4%', rotation: 3, width: '12vw', style: 'sketch', chapters: [1] },
  { id: 'value-leakage', label: 'Value Leakage', sublabel: 'Waar lekt de waarde weg? Rode cirkels markeren de pijnpunten.',
    image: '/img-value-leakage.png', top: '10%', left: '20%', rotation: -2, width: '13vw', style: 'document', chapters: [1] },
  { id: 'interview-notes', label: 'Interview Notities', sublabel: 'Medewerker Claims vertelt waar het systeem faalt.',
    image: '/img-interview-notes.png', top: '60%', left: '22%', rotation: 4, width: '11vw', style: 'document', chapters: [1] },

  // ── Ch2: Het Eerste Bewijs ──
  { id: 'whiteboard', label: 'Het Whiteboard', sublabel: 'Drie uur brainstormen, twintig post-its, één conclusie.',
    image: '/img-whiteboard.png', top: '8%', left: '8%', rotation: -4, width: '12vw', style: 'photo', chapters: [2] },
  { id: 'experimentkaart', label: 'Experiment #1', sublabel: 'Hypothese, use-case, resultaat — bewezen met een rode stempel.',
    image: '/img-experimentkaart.png', top: '8%', left: '72%', rotation: 3, width: '13vw', style: 'document', chapters: [2] },
  { id: 'klantfeedback', label: 'Klantfeedback', sublabel: 'De eerste reacties uit de pilot — "dit voelt anders."',
    image: '/img-klantfeedback.png', top: '55%', left: '72%', rotation: -4, width: '12vw', style: 'document', chapters: [2] },
  { id: 'sketch', label: 'Prototype', sublabel: 'De eerste werkende schets — nog ruw, maar het bewees het idee.',
    image: '/img-sketch.png', top: '55%', left: '6%', rotation: 5, width: '11vw', style: 'sketch', chapters: [2] },

  // ── Ch3: Het Fundament ──
  { id: 'architecture', label: 'Systeemontwerp', sublabel: 'De architectuur — hoe data, AI en mens samenwerken.',
    image: '/img-architecture.png', top: '8%', left: '74%', rotation: -4, width: '12vw', style: 'document', chapters: [3] },
  { id: 'blueprint', label: 'De Blauwdruk', sublabel: 'De architectuur die alles verbindt.',
    image: '/img-blueprint-flow.png', top: '8%', left: '8%', rotation: -6, width: '12vw', style: 'document', chapters: [3] },
  { id: 'golden-record', label: 'Golden Record', sublabel: 'Sophie De Winter als single source of truth — alles verbonden.',
    image: '/img-golden-record.png', top: '55%', left: '72%', rotation: 4, width: '13vw', style: 'document', chapters: [3] },

  // ── Ch4: Mens & AI ──
  { id: 'polaroid-wb', label: 'Eerste Sessie', sublabel: 'De sessie waar AE en Vanbreda elkaars taal leerden.',
    image: '/img-polaroid.png', top: '8%', left: '8%', rotation: 3, width: '12vw', style: 'polaroid', chapters: [4] },
  { id: 'koffie', label: 'Doorgewerkte Nacht', sublabel: 'De nacht dat we doorwerkten — koffieringen als bewijs.',
    image: '/img-koffie.png', top: '55%', left: '6%', rotation: -2, width: '11vw', style: 'photo', chapters: [4] },
  { id: 'memo-medewerker', label: 'Memo Thomas V.', sublabel: 'Zorgen over veranderende rollen — maar ook voorzichtig optimisme.',
    image: '/img-memo-medewerker.png', top: '8%', left: '72%', rotation: -3, width: '12vw', style: 'document', chapters: [4] },
  { id: 'trainingskaart', label: 'Besliskaart', sublabel: 'Wanneer grijp ik in? Een beslisboom voor mens en AI.',
    image: '/img-trainingskaart.png', top: '55%', left: '74%', rotation: 5, width: '11vw', style: 'document', chapters: [4] },

  // ── Ch5: Schaal ──
  { id: 'control-room', label: 'Control Room', sublabel: '847 claims verwerkt, STP 82%, doorlooptijd 1u42m.',
    image: '/img-control-room.png', top: '8%', left: '8%', rotation: -3, width: '13vw', style: 'document', chapters: [5] },
  { id: 'incident-report', label: 'Incident Rapport', sublabel: 'De eerste fout — en hoe die werd gecorrigeerd. Opgelost.',
    image: '/img-incident-report.png', top: '8%', left: '72%', rotation: 4, width: '12vw', style: 'document', chapters: [5] },
  { id: 'go-nogo', label: 'Go/No-Go Besluit', sublabel: 'Alle criteria gehaald. Eén voorwaardelijk. GO gestempeld.',
    image: '/img-go-nogo.png', top: '55%', left: '6%', rotation: -4, width: '12vw', style: 'document', chapters: [5] },
  { id: 'annotations', label: 'Feedback', sublabel: 'Handgeschreven opmerkingen — "dit moet beter, dit kan slimmer."',
    image: '/img-annotations.png', top: '55%', left: '74%', rotation: 6, width: '11vw', style: 'document', chapters: [5] },

  // ── Ch6: Sophie ──
  { id: 'sophie', label: 'Sophie De Winter', sublabel: '41 · Brasschaat — voor haar bouwen we dit.',
    image: '/img-cover-sophie.png', top: '55%', left: '55%', rotation: -2, width: '12vw', style: 'polaroid', chapters: [6] },
]

const deskDocAssets: DeskDocAsset[] = [
  // Ch3: Fundament
  { id: 'doc-routekaart', label: 'Routekaart', sublabel: '9 stappen — met stempels voor autonomie.',
    icon: '🗺️', top: '55%', left: '8%', rotation: 3, width: '7vw', docStyle: 'document', render: asset06, chapters: [3] },
  { id: 'doc-fundamenten', label: 'Fundamenten', sublabel: 'Wat moest hiervoor waar zijn?',
    icon: '✅', top: '75%', left: '74%', rotation: 4, width: '7vw', docStyle: 'card', render: asset08, chapters: [3] },

  // Ch4: Mens & AI
  { id: 'doc-postit', label: 'Post-its', sublabel: 'Radiologiefactuur: patiënt-ID ontbreekt. Handmatig nakijken.',
    icon: '📝', top: '75%', left: '45%', rotation: -3, width: '6.5vw', docStyle: 'postit', render: asset04, chapters: [4] },

  // Ch5: Schaal
  { id: 'doc-factuur', label: 'AI Factuur', sublabel: 'Eén dossier, €0,86 aan AI-kosten.',
    icon: '💶', top: '75%', left: '45%', rotation: -5, width: '7vw', docStyle: 'document', render: asset11, chapters: [5] },

  // Ch6: Sophie
  { id: 'doc-faxbericht', label: 'Faxbericht', sublabel: 'AI-beslissing & escalatie — menselijke review vereist.',
    icon: '📠', top: '8%', left: '76%', rotation: -4, width: '7vw', docStyle: 'document', render: asset02, chapters: [6] },
  { id: 'doc-claimbrief', label: 'Claimbrief', sublabel: 'Aan Sophie — goedgekeurd, met één uitzondering.',
    icon: '✉️', top: '25%', left: '78%', rotation: 4, width: '7vw', docStyle: 'letter', render: asset03, chapters: [6] },
  { id: 'doc-nota', label: 'Interne Nota', sublabel: 'Open vragen — wat we samen moeten begrijpen.',
    icon: '📄', top: '75%', left: '8%', rotation: 5, width: '7vw', docStyle: 'document', render: asset09, chapters: [6] },
  { id: 'doc-indexkaart', label: 'Indexkaart', sublabel: 'De casus op één fiche — wie, wat, waar, en waarom.',
    icon: '📋', top: '75%', left: '25%', rotation: -3, width: '7vw', docStyle: 'card', render: asset01, chapters: [6] },
]

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

// ─── Page HTML helper ───
function renderPageHTML(n: number): string {
  const ch = chapters[n]
  const cp = chapterPages[n]
  const drops = droppedPerChapter[n]
  const needed = requiredDrops[n]
  const isAutoReveal = needed === 0
  const isLastPage = n === chapters.length - 1

  // For auto-reveal pages, content is always fully shown
  const effectiveDrops = isAutoReveal ? 3 : drops
  const stepClass = `desk-page__paper--step-${Math.min(effectiveDrops, 3)}`
  const isComplete = effectiveDrops >= needed && needed > 0
  const completeClass = isComplete ? 'desk-page__paper--complete' : ''
  const autoClass = isAutoReveal ? 'desk-page__paper--auto' : ''

  // Drop zone content
  let dropContent: string
  if (isAutoReveal && !isLastPage) {
    dropContent = '<button class="desk-page__next" id="page-next">Verder →</button>'
  } else if (isAutoReveal && isLastPage) {
    dropContent = ''
  } else if (effectiveDrops >= needed) {
    dropContent = '<div class="desk-page__drop-done">✓ Pagina compleet</div><button class="desk-page__next" id="page-next">Volgende fase →</button>'
  } else {
    dropContent = `<div class="desk-page__drop-hint">↓ Sleep bewijsstukken hierheen · ${drops}/${needed}</div>`
  }

  // Added label
  const addedLabel = isAutoReveal
    ? (isLastPage ? 'Dossier afgerond' : 'Lees en ga verder')
    : (effectiveDrops >= needed ? 'Toegevoegd aan het dossier' : 'Bouw deze pagina op')

  return `
    <div class="desk-page" id="desk-page">
      ${ch.question ? `<div class="desk-page__question">${ch.question}</div>` : ''}
      <div class="desk-page__added">${addedLabel}</div>
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
        <div class="desk-page__drop" id="page-drop">
          ${dropContent}
        </div>
      </div>
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
    ${dossierOpen ? (pageMinimized ? `
    <div class="desk-folder" id="desk-folder">
      <div class="desk-folder__front">
        <div class="desk-folder__stamp">HEALTH CARE 2030</div>
        <div class="desk-folder__title">AE × Vanbreda</div>
        <div class="desk-folder__sub">Status: in reconstructie</div>
        <div class="desk-folder__label">VERTROUWELIJK</div>
      </div>
      <div class="desk-folder__hint">Klik om te openen</div>
    </div>
    ` : renderPageHTML(currentChapter)) : `
    <div class="desk-folder" id="desk-folder">
      <div class="desk-folder__front">
        <div class="desk-folder__stamp">HEALTH CARE 2030</div>
        <div class="desk-folder__title">AE × Vanbreda</div>
        <div class="desk-folder__sub">Status: in reconstructie</div>
        <div class="desk-folder__label">VERTROUWELIJK</div>
      </div>
      <div class="desk-folder__hint">Klik om het dossier te openen</div>
    </div>
    `}
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
    const center = document.getElementById('desk-center')
    if (center) {
      center.innerHTML = `
        <div class="desk-folder" id="desk-folder">
          <div class="desk-folder__front">
            <div class="desk-folder__stamp">HEALTH CARE 2030</div>
            <div class="desk-folder__title">AE × Vanbreda</div>
            <div class="desk-folder__sub">Status: in reconstructie</div>
            <div class="desk-folder__label">VERTROUWELIJK</div>
          </div>
          <div class="desk-folder__hint">Klik om te openen</div>
        </div>`
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
        dropZone.innerHTML = '<div class="desk-page__drop-done">✓ Pagina compleet</div><button class="desk-page__next" id="page-next">Volgende fase →</button>'
        paper.classList.add('desk-page__paper--complete')
        document.getElementById('page-next')?.addEventListener('click', () => switchChapter(currentChapter + 1))
      } else {
        dropZone.innerHTML = `<div class="desk-page__drop-hint">↓ Sleep bewijsstukken hierheen · ${newDrops}/${needed}</div>`
      }
    }
  })

  // Next button (if page already complete on load)
  document.getElementById('page-next')?.addEventListener('click', () => switchChapter(currentChapter + 1))
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
    }, 300)
  }

  // Update nav dots
  document.querySelectorAll('.chapter-nav__dot').forEach((dot, i) => {
    dot.classList.toggle('chapter-nav__dot--active', i === n)
  })

  // Fade assets in/out
  document.querySelectorAll('[data-chapters]').forEach(el => {
    const chs = (el.getAttribute('data-chapters') || '').split(',').map(Number)
    const htmlEl = el as HTMLElement
    if (chs.includes(n)) {
      htmlEl.style.opacity = '1'
      htmlEl.style.pointerEvents = 'auto'
    } else {
      htmlEl.style.opacity = '0'
      htmlEl.style.pointerEvents = 'none'
    }
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
