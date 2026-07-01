import { dossier as d } from '../data/dossier'

export function renderCasus(): string {
  return `
<div class="sheet sheet--paper" style="padding:24mm 24mm 20mm;">
  <div class="sheet__texture--lines" style="position:absolute;inset:0;pointer-events:none;"></div>
  <div class="binder-clip binder-clip--small"></div>

  <div class="page-tab" style="background:var(--c-navy);">CLAIMS</div>

  <div style="position:relative;z-index:3;">
    <div class="page-header">
      <span>Dossier 2030 · Vanbreda Health Care</span><span>Bewijsstuk 01</span>
    </div>

    <div class="doc-title">
      <div class="doc-title__number">DOCUMENT 01</div>
      <h1 class="doc-title__heading">De casus</h1>
      <div class="doc-title__sub">Het verhaal begint bij een mens, niet bij technologie.</div>
    </div>

    <div class="info-card info-card--navy">
      <div class="info-card__label">DE AANLEIDING</div>
      <p class="info-card__text">${d.verzekerde.roepnaam} wordt tijdens een zakelijke reis in Lyon onverwacht opgenomen na ernstige buikpijn. Na onderzoek blijkt sprake van acute galblaasontsteking. Er volgt een spoedoperatie. Na ontslag uploadt ze haar documenten via de mobiele app en neemt ze contact op met Vanbreda. Ze wil weten wat er wordt terugbetaald.</p>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 12mm;margin-top:9mm;">
      <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:.12em;color:var(--c-gold);grid-column:1 / -1;margin-bottom:1mm;">DOSSIERGEGEVENS</div>
      <div class="data-row"><span class="data-row__key">Kanaal</span><span class="data-row__value">Mobiele app</span></div>
      <div class="data-row"><span class="data-row__key">Polis</span><span class="data-row__value">${d.verzekerde.polisnummer}</span></div>
      <div class="data-row"><span class="data-row__key">Werkgever</span><span class="data-row__value">${d.werkgever.naam}</span></div>
      <div class="data-row"><span class="data-row__key">Zorgverlener</span><span class="data-row__value">${d.medisch.ziekenhuis}</span></div>
      <div class="data-row"><span class="data-row__key">Claimtype</span><span class="data-row__value">Hospitalisatie + ambulante nazorg</span></div>
      <div class="data-row"><span class="data-row__key">Uitzondering</span><span class="data-row__value">Buitenlandse spoed + dubbele factuur</span></div>
    </div>

    <div style="position:relative;margin-top:14mm;background:#fbf6ea;border:1px solid var(--c-border);padding:6mm 7mm;max-width:130mm;">
      <p style="font-family:var(--font-serif);font-size:14px;line-height:1.5;color:#4a4536;">Eén gebeurtenis loopt door Claims, Communicatie én B2B/B2I. Dit dossier volgt die ene gebeurtenis, stap voor stap, van intake tot terugbetaling.</p>
      <div style="position:absolute;right:6mm;bottom:-9mm;" class="hw-accent" style="font-size:24px;color:var(--c-copper);transform:rotate(-5deg);">Lyon → Antwerpen ↗</div>
    </div>
  </div>

  <div class="page-footer">
    <span>VANBREDA · HEALTH CARE</span><span>VERTROUWELIJK · TERUGGESTUURD UIT 2030</span><span>DOSSIER ${d.displayNr} · 03/10</span>
  </div>
</div>`
}
