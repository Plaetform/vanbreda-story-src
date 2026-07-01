import { dossier as d } from '../data/dossier'

export function renderDecisionRecord(): string {
  const ai = d.aiDecision
  const confBars = [
    { ...ai.confidence.documentextractie, color: 'var(--c-green)' },
    { ...ai.confidence.polisdekking, color: 'var(--c-green)' },
    { ...ai.confidence.medischeNoodzaak, color: 'var(--c-green)' },
    { ...ai.confidence.radiologieMatch, color: '#d7972b', niveau: 'Middelmatig' },
  ]

  return `
<div class="sheet sheet--paper" style="padding:24mm 24mm 20mm;">
  <div class="page-tab" style="background:var(--c-navy);">CLAIMS</div>

  <div style="position:relative;z-index:3;">
    <div class="page-header">
      <span>Dossier 2030 · Vanbreda Health Care</span><span>Bewijsstuk 03</span>
    </div>

    <div class="doc-title">
      <div class="doc-title__number">DOCUMENT 03</div>
      <h1 class="doc-title__heading">AI Decision Record</h1>
      <div class="doc-title__sub">Wat de AI voorstelde, waarom, en waar de grens lag.</div>
    </div>

    <!-- Record ID -->
    <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:10.5px;color:#8a8069;letter-spacing:.06em;border:1px dashed var(--c-border-dashed);padding:3mm 5mm;margin-bottom:6mm;">
      <span>BESLISRECORD-ID&nbsp;&nbsp;<b style="color:var(--c-navy);">${ai.id}</b></span>
      <span>TIJDSTIP&nbsp;&nbsp;<span>${ai.datum}</span></span>
    </div>

    <!-- Proposed decision -->
    <div class="info-card info-card--copper" style="margin-bottom:6mm;">
      <div class="info-card__label">VOORGESTELDE BESLISSING</div>
      <p style="font-family:var(--font-serif);font-size:18px;line-height:1.45;color:#2d2a22;font-weight:500;">Claim grotendeels goedkeuren. Comfortkost (€${d.financieel.premiumMaaltijd.replace('€','')}) afwijzen. Radiologiefactuur reserveren tot patiëntmatch. Dubbele factuur blokkeren.</p>
    </div>

    <!-- Confidence + Sources grid -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6mm;margin-bottom:6mm;">
      <div style="background:var(--c-card);border:1px solid var(--c-border);padding:5mm 6mm;">
        <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:.12em;color:var(--c-gold-light);margin-bottom:3.5mm;">ZEKERHEID</div>
        ${confBars.map(b => `
        <div class="conf-bar">
          <div class="conf-bar__header"><span>${b.label}</span><b style="color:${b.color};">${b.niveau}</b></div>
          <div class="conf-bar__track"><div class="conf-bar__fill" style="width:${b.waarde}%;background:${b.color};"></div></div>
        </div>`).join('')}
      </div>
      <div style="background:var(--c-card);border:1px solid var(--c-border);padding:5mm 6mm;">
        <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:.12em;color:var(--c-gold-light);margin-bottom:3.5mm;">GEBRUIKTE BRONNEN</div>
        <ul style="margin:0;padding:0;list-style:none;font-size:12.5px;color:#2d2a22;line-height:1.9;">
          ${ai.bronnen.slice(0, 5).map(b => `<li style="border-bottom:1px dotted #d8cdb2;padding-bottom:.5mm;">· ${b}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Escalation reason -->
    <div class="info-card info-card--red">
      <div class="info-card__label info-card__label--red">REDEN VAN ESCALATIE</div>
      <p style="font-family:var(--font-serif);font-size:16px;line-height:1.45;color:#5a2c20;">Afwijkende combinatie van buitenlandse behandeling en waarborg. De Franse procedurecode sluit niet rechtstreeks aan op de Belgische polisconfiguratie. Patiëntidentificatie op de radiologiefactuur is onvoldoende. Beide onderdelen liggen buiten de marge waarbinnen autonoom mag worden beslist. Daarom: menselijke beoordeling vereist.</p>
    </div>
  </div>

  <div class="page-footer">
    <span>VANBREDA · HEALTH CARE</span><span>VERTROUWELIJK · TERUGGESTUURD UIT 2030</span><span>DOSSIER ${d.displayNr} · 05/10</span>
  </div>
</div>`
}
