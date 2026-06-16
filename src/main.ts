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

// ─── Chapters (7 bewijsstukken) ───
const chapters = [
  {
    id: 'belofte',
    title: 'De belofte',
    question: 'Welke ervaring willen we voor Sophie mogelijk maken?',
    quote: 'We begonnen niet met technologie, maar met een belofte: dat Sophie nooit haar verhaal twee keer hoeft te vertellen.',
  },
  {
    id: 'werkelijkheid',
    title: 'De werkelijkheid',
    question: 'Waar ontstaan vandaag frictie, uitzonderingen en verborgen werk?',
    quote: 'Voordat we konden automatiseren, moesten we begrijpen waar het werk werkelijk zat.',
  },
  {
    id: 'bewijs',
    title: 'Het eerste bewijs',
    question: 'Welke concrete verbetering kunnen we snel aantoonbaar maken?',
    quote: 'Niet alles hoeft af te zijn om waarde te leveren. We begonnen met één use-case en bewezen dat het werkt.',
  },
  {
    id: 'fundament',
    title: 'Het fundament',
    question: 'Wat moet betrouwbaar en herbruikbaar worden?',
    quote: 'Fundamenten worden gericht versterkt rondom use-cases die direct waarde leveren.',
  },
  {
    id: 'organisatie',
    title: 'Mens & AI',
    question: 'Hoe veranderen rollen, verantwoordelijkheid en samenwerking?',
    quote: 'De moeilijkste verandering was niet dat AI meer ging doen. Het was dat mensen anders moesten leren kijken.',
  },
  {
    id: 'schaal',
    title: 'Schaal',
    question: 'Hoe worden succesvolle onderdelen één bestuurbare operatie?',
    quote: 'Niet de happy flow bewees dat het werkte, maar de manier waarop het systeem omging met twijfel.',
  },
  {
    id: 'sophie',
    title: 'Sophie',
    question: 'Hebben alle eerdere keuzes samen geleid tot de ervaring die we haar beloofden?',
    quote: 'Alles wat is ontworpen, getest en veranderd, komt nu samen in één kwetsbaar moment.',
  },
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
  // Ch0: Belofte
  { id: 'napkin', label: 'De Napkin', sublabel: 'De eerste versie van de customer journey — geschetst op een servet.',
    image: '/img-napkin.png', top: '16%', left: '20%', rotation: 5, width: '11vw', style: 'sketch', chapters: [0] },
  { id: 'hand-sketch', label: 'Eerste Schets', sublabel: 'De allereerste schets van het proces — op een kladblok.',
    image: '/img-hand-sketch.png', top: '50%', left: '8%', rotation: -3, width: '11vw', style: 'sketch', chapters: [0] },

  // Ch1: Werkelijkheid
  { id: 'bierviltje', label: 'Het Bierviltje', sublabel: 'Na het eerste gesprek schreven we het kernidee op een bierviltje.',
    image: '/img-bierviltje.png', top: '8%', left: '6%', rotation: -5, width: '12vw', style: 'sketch', chapters: [1] },
  { id: 'pizza', label: 'Pizza & Pixels', sublabel: '14 juni · ±23:47 — de avond dat het idee vorm kreeg.',
    image: '/img-pizza-bw.png', top: '60%', left: '75%', rotation: 4, width: '12vw', style: 'polaroid', chapters: [1] },
  { id: 'postit', label: 'Brainstorm', sublabel: 'Alles op post-its tegen de muur. Hier werd de scope helder.',
    image: '/img-postit-wall.png', top: '6%', left: '75%', rotation: 3, width: '12vw', style: 'photo', chapters: [1] },
  { id: 'zo-nooit-meer', label: 'Zo Nooit Meer', sublabel: 'Het moment: "dit moeten we anders doen." De trigger.',
    image: '/img-zo-nooit-meer.png', top: '50%', left: '5%', rotation: -6, width: '11vw', style: 'photo', chapters: [1] },
  { id: 'servet', label: 'Het Servet', sublabel: 'Sophie\'s reis van Lyon tot terugbetaling — in één avond geschetst.',
    image: '/img-servet.png', top: '30%', left: '4%', rotation: 3, width: '12vw', style: 'sketch', chapters: [1] },

  // Ch2: Bewijs
  { id: 'whiteboard', label: 'Het Whiteboard', sublabel: 'Drie uur brainstormen, twintig post-its, één conclusie.',
    image: '/img-whiteboard.png', top: '10%', left: '10%', rotation: -4, width: '12vw', style: 'photo', chapters: [2] },
  { id: 'sketch', label: 'Prototype', sublabel: 'De eerste werkende schets — nog ruw, maar het bewees het idee.',
    image: '/img-sketch.png', top: '55%', left: '75%', rotation: 5, width: '11vw', style: 'sketch', chapters: [2] },

  // Ch3: Fundament
  { id: 'architecture', label: 'Systeemontwerp', sublabel: 'De architectuur — hoe data, AI en mens samenwerken.',
    image: '/img-architecture.png', top: '10%', left: '78%', rotation: -4, width: '12vw', style: 'document', chapters: [3] },
  { id: 'blueprint', label: 'De Blauwdruk', sublabel: 'De architectuur die alles verbindt — getekend op een regenachtige donderdag.',
    image: '/img-blueprint-flow.png', top: '12%', left: '10%', rotation: -6, width: '11vw', style: 'document', chapters: [3] },

  // Ch4: Mens & AI
  { id: 'polaroid-wb', label: 'Eerste Sessie', sublabel: 'De sessie waar AE en Vanbreda elkaars taal leerden.',
    image: '/img-polaroid.png', top: '8%', left: '8%', rotation: 3, width: '12vw', style: 'polaroid', chapters: [4] },
  { id: 'koffie', label: 'Doorgewerkte Nacht', sublabel: 'De nacht dat we doorwerkten — koffieringen als bewijs.',
    image: '/img-koffie.png', top: '55%', left: '6%', rotation: -2, width: '11vw', style: 'photo', chapters: [4] },

  // Ch5: Schaal
  { id: 'annotations', label: 'Feedback', sublabel: 'Handgeschreven opmerkingen — "dit moet beter, dit kan slimmer."',
    image: '/img-annotations.png', top: '10%', left: '76%', rotation: 6, width: '11vw', style: 'document', chapters: [5] },
  { id: 'kassabon', label: 'De Cijfers', sublabel: 'Control Room metrics — doorlooptijd: 2 uur. Eerste review OK.',
    image: '/img-sticky.png', top: '55%', left: '80%', rotation: -3, width: '10vw', style: 'note', chapters: [5] },

  // Ch6: Sophie
  { id: 'sophie', label: 'Sophie De Winter', sublabel: '41 · Brasschaat — voor haar bouwen we dit.',
    image: '/img-cover-sophie.png', top: '60%', left: '55%', rotation: -2, width: '12vw', style: 'polaroid', chapters: [6] },
]

const deskDocAssets: DeskDocAsset[] = [
  // Ch1: Werkelijkheid
  { id: 'doc-indexkaart', label: 'Indexkaart', sublabel: 'De casus op één fiche — wie, wat, waar, en waarom.',
    icon: '📋', top: '75%', left: '8%', rotation: -3, width: '7vw', docStyle: 'card', render: asset01, chapters: [1] },

  // Ch2: Bewijs
  { id: 'doc-pizzabon', label: 'Pizzabon', sublabel: '14 juni · 23:47 — de bon van de avond dat alles begon.',
    icon: '🍕', top: '75%', left: '78%', rotation: 7, width: '5vw', docStyle: 'receipt', render: asset10, chapters: [2] },

  // Ch3: Fundament
  { id: 'doc-routekaart', label: 'Routekaart', sublabel: '9 stappen — met stempels voor autonomie.',
    icon: '🗺️', top: '50%', left: '8%', rotation: 3, width: '7vw', docStyle: 'document', render: asset06, chapters: [3] },
  { id: 'doc-fundamenten', label: 'Fundamenten', sublabel: 'Wat moest hiervoor waar zijn?',
    icon: '✅', top: '75%', left: '78%', rotation: 4, width: '7vw', docStyle: 'card', render: asset08, chapters: [3] },

  // Ch4: Mens & AI
  { id: 'doc-postit', label: 'Post-its', sublabel: 'Radiologiefactuur: patiënt-ID ontbreekt. Handmatig nakijken.',
    icon: '📝', top: '75%', left: '45%', rotation: -3, width: '6.5vw', docStyle: 'postit', render: asset04, chapters: [4] },

  // Ch5: Schaal
  { id: 'doc-kassabon', label: 'Kassabon', sublabel: 'Control Room — het hele verhaal op één bonnetje.',
    icon: '🧾', top: '75%', left: '8%', rotation: -6, width: '5vw', docStyle: 'receipt', render: asset07, chapters: [5] },
  { id: 'doc-factuur', label: 'AI Factuur', sublabel: 'Eén dossier, €0,86 aan AI-kosten.',
    icon: '💶', top: '50%', left: '5%', rotation: -5, width: '7vw', docStyle: 'document', render: asset11, chapters: [5] },

  // Ch6: Sophie
  { id: 'doc-faxbericht', label: 'Faxbericht', sublabel: 'AI-beslissing & escalatie — menselijke review vereist.',
    icon: '📠', top: '10%', left: '78%', rotation: -4, width: '7vw', docStyle: 'document', render: asset02, chapters: [6] },
  { id: 'doc-claimbrief', label: 'Claimbrief', sublabel: 'Aan Sophie — goedgekeurd, met één uitzondering.',
    icon: '✉️', top: '25%', left: '80%', rotation: 4, width: '7vw', docStyle: 'letter', render: asset03, chapters: [6] },
  { id: 'doc-nota', label: 'Interne Nota', sublabel: 'Open vragen — wat we samen moeten begrijpen.',
    icon: '📄', top: '75%', left: '10%', rotation: 5, width: '7vw', docStyle: 'document', render: asset09, chapters: [6] },
]

// ─── State ───
let dossierOpen = false
let currentPage = 0
let currentChapter = 0
let zoomedAsset: string | null = null
let audioPlaying = false
let audioEl: HTMLAudioElement | null = null

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
    <button class="splash__btn" id="splash-btn">Maak kennis met Sophie →</button>
  </div>
</div>

<div class="chapter-overlay" id="chapter-overlay">
  <div class="chapter-overlay__question">${ch.question}</div>
  <div class="chapter-overlay__quote">${ch.quote}</div>
</div>

<div class="desk" id="desk">
  <div class="desk__bg"></div>
  <div class="desk__vignette"></div>
  ${assets}
  ${docItems}
  <div class="desk-peek desk-peek--1" style="top:42%;left:47%;transform:rotate(-12deg);"></div>
  <div class="desk-peek desk-peek--2" style="top:44%;left:54%;transform:rotate(8deg);"></div>
  <div class="desk-peek desk-peek--3" style="top:58%;left:46%;transform:rotate(14deg);"></div>
  <div class="desk-folder ${dossierOpen ? 'desk-folder--hidden' : ''}" id="desk-folder">
    <div class="desk-folder__front">
      <div class="desk-folder__stamp">2030</div>
      <div class="desk-folder__title">DOSSIER<br>2030</div>
      <div class="desk-folder__sub">TERUGGESTUURD NAAR 2026</div>
      <div class="desk-folder__label">VERTROUWELIJK</div>
    </div>
    <div class="desk-folder__hint">Klik om te openen</div>
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

  // Letter continue → close letter, open dossier
  document.getElementById('letter-continue')?.addEventListener('click', () => {
    closeLetter()
    setTimeout(() => {
      dossierOpen = true
      currentPage = 0
      updateViewer()
      document.getElementById('viewer')?.classList.add('viewer--open')
      document.getElementById('desk-folder')?.classList.add('desk-folder--hidden')
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

  // Open dossier
  document.getElementById('desk-folder')?.addEventListener('click', () => {
    dossierOpen = true
    currentPage = 0
    updateViewer()
    document.getElementById('viewer')?.classList.add('viewer--open')
    document.getElementById('desk-folder')?.classList.add('desk-folder--hidden')
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

// ─── Chapter Switching ───
function switchChapter(n: number) {
  if (n < 0 || n >= chapters.length) return
  
  // Intercept: show celebration before Sophie
  if (n === 6 && currentChapter !== 6) {
    showCelebration()
    return
  }
  
  currentChapter = n

  // Update question/quote overlay
  const ch = chapters[n]
  const overlay = document.getElementById('chapter-overlay')
  if (overlay) {
    overlay.classList.add('chapter-overlay--transition')
    setTimeout(() => {
      const q = overlay.querySelector('.chapter-overlay__question')
      const qu = overlay.querySelector('.chapter-overlay__quote')
      if (q) q.textContent = ch.question
      if (qu) qu.textContent = ch.quote
      overlay.classList.remove('chapter-overlay--transition')
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
  switchChapter(6)
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
