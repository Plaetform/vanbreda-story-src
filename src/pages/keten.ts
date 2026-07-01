import { dossier as d } from '../data/dossier'

const pilaarColor: Record<string, string> = {
  claims: 'var(--c-navy)',
  b2b: 'var(--c-copper)',
  comm: 'var(--c-teal)',
}

const badgeMap: Record<string, { label: string; cls: string }> = {
  auto: { label: 'AUTONOOM', cls: 'badge--auto' },
  control: { label: '+ CONTROLE', cls: 'badge--control' },
  deels: { label: 'DEELS', cls: 'badge--control' },
  voorstel: { label: 'VOORSTEL', cls: 'badge--control' },
  human: { label: 'MENS', cls: 'badge--human' },
}

export function renderKeten(): string {
  const steps = d.keten.map(s => {
    const badge = badgeMap[s.autonomie]
    return `
    <div class="step-row">
      <div class="step-row__number" style="background:${pilaarColor[s.pilaar]}">${s.nr}</div>
      <div class="step-row__content">
        <div class="step-row__title">${s.naam}</div>
        <div class="step-row__grid">
          <div><span class="step-row__label">AI&nbsp;&nbsp;</span>${s.ai}</div>
          <div><span class="step-row__label">MENS&nbsp;&nbsp;</span>${s.mens}</div>
          <div><span class="step-row__label">BRON&nbsp;&nbsp;</span>${s.bron}</div>
          <div class="badge ${badge.cls}">${badge.label}</div>
        </div>
      </div>
    </div>`
  }).join('\n')

  return `
<div class="sheet sheet--paper" style="padding:24mm 22mm 20mm;">
  <div class="page-tab" style="background:var(--c-teal);">DE KETEN</div>

  <div style="position:relative;z-index:3;">
    <div class="page-header">
      <span>Dossier 2030 · Vanbreda Health Care</span><span>Bewijsstuk 02</span>
    </div>

    <div class="doc-title">
      <div class="doc-title__number">DOCUMENT 02</div>
      <h1 class="doc-title__heading">De keten van 2030</h1>
      <div class="doc-title__sub">Eén gebeurtenis, negen stappen – met bij elke stap: wat doet AI, wat doet de mens, welke bron, en hoeveel autonomie.</div>
    </div>

    <!-- Legend -->
    <div style="display:flex;gap:7mm;margin-bottom:5mm;font-family:var(--font-mono);font-size:10px;color:#6b6452;">
      <span style="display:flex;align-items:center;gap:2mm;"><span style="width:3.5mm;height:3.5mm;background:var(--c-navy);border-radius:1px;"></span>CLAIMS</span>
      <span style="display:flex;align-items:center;gap:2mm;"><span style="width:3.5mm;height:3.5mm;background:var(--c-teal);border-radius:1px;"></span>COMMUNICATIE</span>
      <span style="display:flex;align-items:center;gap:2mm;"><span style="width:3.5mm;height:3.5mm;background:var(--c-copper);border-radius:1px;"></span>B2B · B2I</span>
    </div>

    <div style="display:flex;flex-direction:column;gap:2.5mm;">
      ${steps}
    </div>
    <!-- Sketch reference -->
    <div style="margin-top:6mm;display:flex;align-items:center;gap:5mm;background:var(--c-card);border:1px solid var(--c-border);padding:3mm 4mm;">
      <img src="/img-blueprint-flow.png" alt="schets" style="width:28mm;height:auto;opacity:.7;border-radius:1px;">
      <div style="font-family:var(--font-mono);font-size:9.5px;color:#8a8069;">↳ werkschets ketenflow – zie bijlage schets 01</div>
    </div>
  </div>

  <div class="page-footer">
    <span>VANBREDA · HEALTH CARE</span><span>VERTROUWELIJK · TERUGGESTUURD UIT 2030</span><span>DOSSIER ${d.displayNr} · 04/10</span>
  </div>
</div>`
}
