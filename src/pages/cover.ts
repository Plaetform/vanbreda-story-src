import { dossier as d } from '../data/dossier'

export function renderCover(): string {
  return `
<div class="sheet sheet--karton" style="font-family:Arial,Helvetica,sans-serif;">
  <div class="sheet__texture"></div>
  <div class="sheet__border-outer"></div>
  <div class="sheet__border-inner"></div>

  <!-- Binder clip -->
  <div class="binder-clip">
    <div class="binder-clip__ring binder-clip__ring--left"></div>
    <div class="binder-clip__ring binder-clip__ring--right"></div>
    <div class="binder-clip__body"></div>
  </div>

  <!-- Tab index -->
  <div class="tab-index">
    <div class="tab-index__tab tab-index__tab--claims">CLAIMS</div>
    <div class="tab-index__tab tab-index__tab--comm">COMMUNICATIE</div>
    <div class="tab-index__tab tab-index__tab--b2b">B2B&nbsp;·&nbsp;B2I</div>
    <div class="tab-index__tab tab-index__tab--gov">GOVERNANCE</div>
  </div>

  <div style="position:relative;padding:24mm 26mm 18mm;min-height:297mm;display:flex;flex-direction:column;z-index:3;">
    <!-- Header row -->
    <div style="display:flex;justify-content:space-between;align-items:flex-start;">
      <img src="/vanbreda-logo.svg" alt="Vanbreda" style="width:46mm;height:auto;">
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:2.5mm;">
        <div style="font-family:var(--font-mono);font-size:9.5px;letter-spacing:.16em;color:#6b5a33;">OPGESTELD DOOR</div>
        <div style="background:#fffdf6;border:1px solid #e6dcc4;box-shadow:0 3px 10px rgba(0,0,0,.16);padding:4mm 6mm;transform:rotate(.6deg);">
          <img src="/ae-logo.png" alt="AE" style="width:24mm;height:auto;display:block;">
        </div>
        <div style="font-family:var(--font-mono);font-size:9.5px;letter-spacing:.16em;color:#6b5a33;">voor&nbsp;VANBREDA</div>
      </div>
    </div>

    <!-- Central stamp — TERUGGESTUURD — the hero element -->
    <div style="margin-top:16mm;display:flex;align-items:center;gap:9mm;">
      <div style="border:3.5px solid #c2473a;color:#c2473a;border-radius:3px;padding:5mm 8mm;font-family:var(--font-mono);text-align:center;transform:rotate(-3deg);mix-blend-mode:multiply;">
        <div style="font-size:13px;letter-spacing:.25em;border-bottom:2px solid #c2473a;padding-bottom:2mm;margin-bottom:2mm;">TERUGGESTUURD</div>
        <div style="font-size:28px;font-weight:900;letter-spacing:.02em;line-height:1;">NAAR 2026</div>
        <div style="font-size:12px;letter-spacing:.16em;margin-top:1.5mm;">VOOR REALISATIE</div>
      </div>
      <div style="flex:1;">
        <div style="display:inline-block;font-family:var(--font-mono);font-size:10px;letter-spacing:.2em;color:var(--c-red-light);border:1px solid #b07a3e;border-radius:2px;padding:2mm 4mm;background:rgba(255,250,238,.45);">VERTROUWELIJK · TERUGGESTUURD UIT 2030</div>
      </div>
    </div>

    <!-- Title -->
    <div style="margin-top:10mm;">
      <h1 style="font-weight:900;color:var(--c-navy);font-size:96px;line-height:.92;letter-spacing:-.025em;">DOSSIER<br>2030</h1>
      <div style="font-family:var(--font-serif);font-size:21px;color:#3a2f15;margin-top:6mm;max-width:140mm;line-height:1.35;">Blauwdrukken, ideeën en schetsen voor de Health&nbsp;Care-operatie van morgen, vanuit één klantdossier uitgetekend.</div>
    </div>

    <!-- Meta sticker -->
    <div style="margin-top:auto;display:flex;gap:9mm;align-items:flex-end;">
      <div class="sticker" style="transform:rotate(-.5deg);width:112mm;">
        <div class="sticker__label">DOSSIERFICHE</div>
        <div class="dossier-grid">
          <div class="dossier-grid__key">OPDRACHT</div>
          <div>Hoe ziet Health Care eruit als alles samenwerkt?</div>
          <div class="dossier-grid__key">DOSSIERNR.</div>
          <div class="dossier-grid__value--mono">${d.displayNr}</div>
          <div class="dossier-grid__key">BEVAT</div>
          <div>Blauwdrukken · schetsen · ideeën · bewijsstukken</div>
          <div class="dossier-grid__key">HERKOMST</div>
          <div style="color:var(--c-red);font-weight:700;">2030 → teruggestuurd naar 2026</div>
          <div class="dossier-grid__key">STATUS</div>
          <div>Ter bespreking en realisatie</div>
        </div>
      </div>
    </div>

    <!-- Opening note -->
    <div style="margin-top:8mm;background:#fcf8ee;box-shadow:0 4px 14px rgba(0,0,0,.22);transform:rotate(.35deg);padding:7mm 9mm;border:1px solid var(--c-border);max-width:158mm;">
      <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:.14em;color:var(--c-gold);margin-bottom:3mm;">OPENINGSNOTITIE</div>
      <p style="font-family:var(--font-serif);font-size:14.5px;line-height:1.5;color:#33302a;">Dit dossier komt uit 2030. Het bevat geen oplossing die al vaststaat, maar de blauwdruk van wat mogelijk is. Eén klantdossier, uitgetekend van begin tot eind: hoe Claims, Communicatie en B2B/B2I als één geheel kunnen werken. Met schetsen, ideeën en concrete bewijsstukken. De vraag is niet óf het technologisch kan. De vraag is wat er nodig is om het te bouwen.</p>
    </div>
  </div>

  <!-- Subtle year stamp bottom-right -->
  <div class="stamp" style="position:absolute;bottom:30mm;right:30mm;transform:rotate(-8deg);z-index:5;">
    <div class="stamp__year">2030</div>
    <div class="stamp__text">TERUGGESTUURD<br>NAAR 2026</div>
  </div>
</div>`
}
