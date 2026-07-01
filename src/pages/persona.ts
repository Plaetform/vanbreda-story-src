import { dossier as d } from '../data/dossier'

export function renderPersona(): string {
  return `
<div class="sheet sheet--paper" style="padding:24mm 24mm 20mm;">
  <div class="sheet__texture--lines" style="position:absolute;inset:0;pointer-events:none;"></div>
  <div class="binder-clip binder-clip--small"></div>

  <div class="page-tab" style="background:var(--c-teal);">PERSONA</div>

  <div style="position:relative;z-index:3;">
    <div class="page-header">
      <span>Dossier 2030 · Vanbreda Health Care</span><span>Profiel</span>
    </div>

    <div class="doc-title">
      <div class="doc-title__number">DOCUMENT 00</div>
      <h1 class="doc-title__heading">Sophie</h1>
      <div class="doc-title__sub">Voor wie bouwen we dit? Voor haar.</div>
    </div>

    <!-- Character sheet image -->
    <div style="margin-bottom:7mm;border-radius:3px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.14);">
      <img src="/img-sophie-character.png" alt="Sophie De Winter" style="width:100%;height:auto;display:block;">
    </div>

    <!-- Intro quote -->
    <div class="info-card info-card--navy" style="margin-bottom:7mm;">
      <div class="info-card__label">WAAROM SOPHIE</div>
      <p class="info-card__text">Eén verzekerde. Eén hospitalisatie in het buitenland. Negen processtappen, acht documenten, zes kanalen, zeven afdelingen. Als het voor Sophie naadloos werkt, werkt het voor iedereen.</p>
    </div>

    <!-- Two-column details -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:7mm;">

      <!-- Left column: persoonlijk -->
      <div>
        <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:.12em;color:var(--c-gold);margin-bottom:3mm;">PERSOONLIJK</div>
        <div class="data-row"><span class="data-row__key">Naam</span><span class="data-row__value">${d.verzekerde.naam}</span></div>
        <div class="data-row"><span class="data-row__key">Leeftijd</span><span class="data-row__value">${d.verzekerde.leeftijd} jaar</span></div>
        <div class="data-row"><span class="data-row__key">Woonplaats</span><span class="data-row__value">${d.verzekerde.woonplaats}</span></div>
        <div class="data-row"><span class="data-row__key">Adres</span><span class="data-row__value">${d.verzekerde.adres}</span></div>
        <div class="data-row"><span class="data-row__key">Partner</span><span class="data-row__value">${d.verzekerde.partner}</span></div>
        <div class="data-row"><span class="data-row__key">Kinderen</span><span class="data-row__value">${d.verzekerde.kinderen.length}</span></div>
        <div class="data-row"><span class="data-row__key">Beroep</span><span class="data-row__value">${d.verzekerde.beroep}</span></div>
      </div>

      <!-- Right column: verzekering & werkgever -->
      <div>
        <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:.12em;color:var(--c-gold);margin-bottom:3mm;">VERZEKERING</div>
        <div class="data-row"><span class="data-row__key">Werkgever</span><span class="data-row__value">${d.werkgever.naam}</span></div>
        <div class="data-row"><span class="data-row__key">Medewerkers</span><span class="data-row__value">${d.werkgever.aantalMedewerkers}</span></div>
        <div class="data-row"><span class="data-row__key">Verzekeraar</span><span class="data-row__value">${d.verzekeraar.naam}</span></div>
        <div class="data-row"><span class="data-row__key">Product</span><span class="data-row__value" style="font-size:12px;">${d.verzekeraar.product}</span></div>
        <div class="data-row"><span class="data-row__key">Dekking</span><span class="data-row__value">${d.verzekeraar.dekkingsgebied}</span></div>
        <div class="data-row"><span class="data-row__key">Eigen risico</span><span class="data-row__value">${d.verzekeraar.eigenRisico}</span></div>
        <div class="data-row"><span class="data-row__key">TPA</span><span class="data-row__value" style="color:var(--c-navy);font-weight:700;">${d.tpa.naam}</span></div>
      </div>
    </div>

    <!-- Medische context -->
    <div style="margin-top:7mm;background:var(--c-card);border:1px solid var(--c-border);padding:5mm 6mm;">
      <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:.12em;color:var(--c-gold);margin-bottom:3mm;">WAT HAAR OVERKWAM</div>
      <p style="font-family:var(--font-serif);font-size:14px;line-height:1.55;color:#2d2a22;margin:0;">
        Sophie wordt tijdens een zakenreis in Lyon onverwacht opgenomen met <b>${d.medisch.hoofdreden}</b>. 
        Er volgt een spoedoperatie (<i>${d.medisch.behandeling}</i>) in ${d.medisch.ziekenhuis}. 
        Na ontslag uploadt ze haar documenten via de app en neemt contact op met Vanbreda. 
        ze wil weten wat er vergoed wordt. Totale kosten: <b>${d.financieel.totaalKosten}</b>.
      </p>
    </div>

    <!-- Bottom framing note -->
    <div style="margin-top:7mm;background:#fbf6ea;border:1px solid var(--c-border);padding:5mm 6mm;">
      <p style="font-family:var(--font-serif);font-size:13.5px;line-height:1.5;color:#4a4536;margin:0;">
        <b>Sophie is geen edge case.</b> Ze is een standaardverzekerde met een iets complexere claim: buitenlandse hospitalisatie, meerdere facturen, 
        een nabeschouwing in België. Precies het soort dossier dat vandaag door te veel handen gaat. 
        In 2030 werkt het anders. Dit dossier laat zien hoe.
      </p>
    </div>
  </div>

  <div class="page-footer">
    <span>VANBREDA · HEALTH CARE</span><span>VERTROUWELIJK · TERUGGESTUURD UIT 2030</span><span>DOSSIER ${d.displayNr} · 02/10</span>
  </div>
</div>`
}
