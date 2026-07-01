import { dossier as d } from '../data/dossier'
import { handwrite, hw } from '../utils/handwriting'

// ─── Asset 01: Indexkaart — De casus ───
export function asset01(): string {
  return `
<div class="asset-page">
  <div class="asset-page__label no-print">Asset 01 · Indexkaart — De casus · print op A4</div>
  <div style="position:relative;width:162mm;height:104mm;background:#f3ead0;border:1px solid #d8c79c;box-shadow:0 8px 26px rgba(0,0,0,.35);transform:rotate(-1deg);overflow:hidden;font-family:var(--font-mono);">
    <div style="position:absolute;inset:0;background-image:repeating-linear-gradient(180deg,transparent 0 7.9mm,#bcd0d6 7.9mm 8mm);opacity:.5;"></div>
    <div style="position:absolute;top:0;left:0;right:0;height:18mm;border-bottom:1.5px solid #c2473a;"></div>
    <div style="position:absolute;top:0;right:14mm;background:var(--c-navy);color:#fff;font-size:9px;letter-spacing:.12em;padding:2.5mm 5mm 2mm;border-radius:0 0 2px 2px;">CLAIMS</div>
    <div style="position:relative;padding:5mm 8mm;height:100%;">
      <div>
        <div style="font-size:14px;font-weight:700;color:var(--c-navy);letter-spacing:.02em;">DOSSIER&nbsp;${d.displayNr}</div>
        <div style="font-size:9px;color:#8a7a4e;letter-spacing:.14em;margin-top:.8mm;">FICHE · DE CASUS</div>
      </div>
      <div style="margin-top:6mm;font-size:11px;color:#3a3320;line-height:8mm;max-width:120mm;">${d.verzekerde.roepnaam} wordt onverwacht opgenomen in Lyon. Na ontslag uploadt ze haar documenten en vraagt wat wordt terugbetaald.</div>
      <div style="position:absolute;left:8mm;right:8mm;bottom:9mm;display:grid;grid-template-columns:1fr 1fr;column-gap:12mm;row-gap:1.5mm;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px dotted #c2b58c;padding-bottom:1.5mm;font-size:9.5px;white-space:nowrap;"><span style="color:#8a7a4e;letter-spacing:.06em;">KANAAL</span><span>Mobiele app</span></div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px dotted #c2b58c;padding-bottom:1.5mm;font-size:9.5px;white-space:nowrap;"><span style="color:#8a7a4e;letter-spacing:.06em;">POLIS</span><span>${d.verzekerde.polisnummer}</span></div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px dotted #c2b58c;padding-bottom:1.5mm;font-size:9.5px;white-space:nowrap;"><span style="color:#8a7a4e;letter-spacing:.06em;">WERKGEVER</span><span>${d.werkgever.naam}</span></div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px dotted #c2b58c;padding-bottom:1.5mm;font-size:9.5px;white-space:nowrap;"><span style="color:#8a7a4e;letter-spacing:.06em;">ZORGVERLENER</span><span>${d.medisch.ziekenhuis}</span></div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px dotted #c2b58c;padding-bottom:1.5mm;font-size:9.5px;white-space:nowrap;"><span style="color:#8a7a4e;letter-spacing:.06em;">CLAIMTYPE</span><span>Hospitalisatie + nazorg</span></div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px dotted #c2b58c;padding-bottom:1.5mm;font-size:9.5px;white-space:nowrap;"><span style="color:#8a7a4e;letter-spacing:.06em;">UITZONDERING</span><span>Buitenlandse spoed</span></div>
      </div>
    </div>
  </div>
</div>`
}

// ─── Asset 02: Faxbericht — AI-beslissing & escalatie ───
export function asset02(): string {
  return `
<div class="asset-page">
  <div class="asset-page__label no-print">Asset 02 · Faxbericht — AI-beslissing &amp; escalatie · print op A4</div>
  <div style="position:relative;width:190mm;min-height:255mm;background:#f4f3ee;box-shadow:0 10px 30px rgba(0,0,0,.4);transform:rotate(.4deg);overflow:hidden;color:#262626;font-family:var(--font-mono);">
    <div style="position:absolute;inset:0;background-image:repeating-linear-gradient(0deg,rgba(0,0,0,.035) 0 1px,transparent 1px 3px);pointer-events:none;z-index:3;"></div>
    <div style="position:absolute;top:0;left:0;bottom:0;width:8mm;background:repeating-linear-gradient(0deg,#111 0 4mm,#f4f3ee 4mm 8mm);opacity:.12;"></div>
    <div style="font-family:var(--font-fax);font-size:15px;letter-spacing:.04em;color:#3a3a3a;border-bottom:1px solid #9a9a92;padding:3mm 10mm;display:flex;justify-content:space-between;">
      <span>2030-04-21 09:41 &nbsp;FR: VANBREDA HEALTH CARE &nbsp;TO: CLAIMS-NL</span><span>P.01/01</span>
    </div>
    <div style="padding:9mm 14mm 14mm;">
      <div style="text-align:center;border:2px solid #262626;padding:4mm;margin-bottom:9mm;">
        <div style="font-family:var(--font-fax);font-size:34px;line-height:1;letter-spacing:.06em;">— FAXBERICHT —</div>
        <div style="font-size:11px;letter-spacing:.18em;margin-top:2mm;color:#444;">VANBREDA HEALTH CARE · INTERNE TRANSMISSIE</div>
      </div>
      <div style="display:grid;grid-template-columns:auto 1fr auto 1fr;gap:2mm 4mm;font-size:13px;border-bottom:1px dashed #8a8a82;padding-bottom:5mm;margin-bottom:6mm;">
        <span style="color:#777;">AAN:</span><span>Claimsbehandelaar ${d.notitie.auteur}</span><span style="color:#777;">DATUM:</span><span>${d.aiDecision.datum}</span>
        <span style="color:#777;">VAN:</span><span>AI Claims-engine</span><span style="color:#777;">DOSSIER:</span><span style="font-weight:700;">${d.displayNr}</span>
        <span style="color:#777;">BETREFT:</span><span style="grid-column:span 3;">Beslisrecord ${d.aiDecision.id} – voorstel met escalatie</span>
      </div>
      <div style="font-size:14px;font-weight:700;letter-spacing:.04em;">▸ VOORGESTELDE BESLISSING</div>
      <div style="font-size:13.5px;line-height:1.55;margin:2mm 0 6mm;">Claim grotendeels goedkeuren. Comfortkost afwijzen. Radiologiefactuur reserveren. EEN onderdeel wordt voorgelegd voor menselijke review.</div>
      <div style="font-size:14px;font-weight:700;letter-spacing:.04em;">▸ ZEKERHEID</div>
      <div style="font-size:13px;line-height:1.7;margin:2mm 0 6mm;">
        Documentextractie ......... HOOG&nbsp;&nbsp;[##########------]<br>
        Dekkingsinterpretatie ..... MIDDEL [######----------]
      </div>
      <div style="font-size:14px;font-weight:700;letter-spacing:.04em;">▸ GEBRUIKTE BRONNEN</div>
      <div style="font-size:13px;line-height:1.7;margin:2mm 0 6mm;">
        - polisversie ${d.verzekeraar.groepspolis}&nbsp;&nbsp;- claimdocument&nbsp;&nbsp;- eerdere correspondentie<br>
        - providergegevens ${d.medisch.ziekenhuis}&nbsp;&nbsp;- beslisregels
      </div>
      <div style="border:1.5px solid #262626;padding:4mm 5mm;margin-top:2mm;">
        <div style="font-size:14px;font-weight:700;letter-spacing:.04em;">▸ REDEN VAN ESCALATIE</div>
        <div style="font-size:13.5px;line-height:1.55;margin-top:2mm;">Afwijkende combinatie van behandeling en waarborg. Franse procedurecode niet gemapt. Patiëntidentificatie radiologiefactuur onvoldoende. Ligt buiten de autonome marge. MENSELIJKE BEOORDELING VEREIST.</div>
      </div>
      <div style="position:absolute;bottom:18mm;right:16mm;transform:rotate(-9deg);border:2.5px solid #2c6f7d;color:#2c6f7d;border-radius:2px;padding:2.5mm 5mm;font-size:11px;letter-spacing:.12em;opacity:.7;mix-blend-mode:multiply;text-align:center;">ONTVANGEN<br><span>${d.aiDecision.datum}</span></div>
    </div>
    <div style="font-family:var(--font-fax);font-size:14px;color:#3a3a3a;border-top:1px solid #9a9a92;padding:2.5mm 10mm;letter-spacing:.04em;">**** VANBREDA HC FAX 2030 **** EINDE TRANSMISSIE ****</div>
  </div>
</div>`
}

// ─── Asset 03: Claimbrief — Aan de verzekerde ───
export function asset03(): string {
  return `
<div class="asset-page">
  <div class="asset-page__label no-print">Asset 03 · Claimbrief — aan de verzekerde · print op A4</div>
  <div style="position:relative;width:190mm;min-height:255mm;background:#fffdf8;box-shadow:0 10px 30px rgba(0,0,0,.32);transform:rotate(-.3deg);padding:20mm 22mm;font-family:var(--font-body);color:#23211c;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid var(--c-teal);padding-bottom:6mm;">
      <img src="/vanbreda-logo.svg" alt="Vanbreda" style="width:42mm;height:auto;">
      <div style="text-align:right;font-size:9.5px;color:#8a8576;line-height:1.6;letter-spacing:.02em;">VANBREDA HEALTH CARE<br>Plantin en Moretuslei 297<br>2140 Antwerpen<br>vanbreda.be · health care</div>
    </div>
    <div style="display:flex;justify-content:space-between;margin-top:11mm;font-size:12.5px;line-height:1.6;">
      <div style="color:#3a372e;">${d.verzekerde.naam}<br>${d.verzekerde.adres}<br>${d.verzekerde.postcode} ${d.verzekerde.woonplaats}</div>
      <div style="text-align:right;color:#8a8576;">Antwerpen,<br>${d.aiDecision.datum}</div>
    </div>
    <div style="margin-top:10mm;font-size:13px;"><b>Betreft:</b> terugbetaling hospitalisatie – dossier <b style="font-family:var(--font-mono);color:var(--c-navy);">${d.nr}</b></div>
    <div style="margin-top:8mm;font-size:13.5px;line-height:1.65;color:#23211c;">
      <p style="margin:0 0 4.5mm;">Beste ${d.verzekerde.roepnaam},</p>
      <p style="margin:0 0 4.5mm;">We hebben je dossier ontvangen en grotendeels kunnen beoordelen. Je hoefde niets opnieuw te bezorgen. We hadden alles wat we nodig hadden.</p>
      <p style="margin:0 0 4.5mm;"><b>Wat we nu al goedkeuren:</b> de kosten van je spoedopname, operatie, medicatie en nazorgconsult, in totaal ${d.financieel.voorlopigVergoedbaar} (na aftrek eigen risico van ${d.financieel.eigenRisico}).</p>
      <p style="margin:0 0 4.5mm;">Eén onderdeel kijken we nog persoonlijk na. Dat gaat over de radiologiefactuur van ${d.financieel.radiologie}. De identificatiekoppeling op dat document is onvolledig. Een collega beoordeelt dit en laat je weten wat de uitkomst is.</p>
      <p style="margin:0 0 4.5mm;">De premium maaltijddienst (${d.financieel.premiumMaaltijd}) valt helaas niet onder je hospitalisatiedekking.</p>
      <p style="margin:0 0 4.5mm;">Je hoort hierover vóór ${d.laatsteUpdate.split(',')[0]} van ons. Heb je vragen? Je kunt altijd reageren in de Vanbreda-app of bellen.</p>
      <p style="margin:0 0 2mm;">Met vriendelijke groet,</p>
    </div>
    <div style="margin-top:3mm;">
      <div style="font-size:30px;color:var(--c-navy);line-height:1;">${hw(d.communicatie.afzender.naam, 'signature')}</div>
      <div style="font-size:12px;color:#6b6655;margin-top:1mm;">${d.communicatie.afzender.functie} · ${d.communicatie.afzender.organisatie}</div>
    </div>
    <div style="position:absolute;left:22mm;right:22mm;bottom:14mm;border-top:1px solid #e6dcc4;padding-top:3mm;font-size:9px;color:#a59f8c;letter-spacing:.04em;display:flex;justify-content:space-between;">
      <span>Vanbreda Health Care · dossier 2030</span><span>dossier ${d.displayNr}</span>
    </div>
  </div>
</div>`
}

// ─── Asset 04: Post-it — Aantekening medewerker ───
export function asset04(): string {
  const note1 = handwrite('Radiologiefactuur: patiënt-ID ontbreekt. Franse code niet gemapt op BE-polis. Handmatig nakijken — rest is akkoord.', 'postit', 1)
  const note2 = handwrite('Dubbele factuur geblokkeerd → €8.740,60 bespaard. Check.', 'postit', 2)

  return `
<div class="asset-page">
  <div class="asset-page__label no-print">Asset 04 · Post-it — aantekening medewerker · print op A4</div>
  <div style="display:flex;gap:16mm;align-items:flex-start;">
    <div style="position:relative;width:104mm;height:104mm;background:#fbe96a;background-image:linear-gradient(160deg,#fdf08a,#f7e055);box-shadow:0 12px 26px rgba(0,0,0,.3);transform:rotate(-2.5deg);padding:11mm 10mm;color:#3a3414;">
      <div style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:46mm;height:9mm;background:rgba(255,255,255,.35);"></div>
      <div style="font-size:22px;line-height:1.28;">${note1}</div>
      <div style="position:absolute;bottom:8mm;right:11mm;font-size:23px;color:#8a6a1e;">${hw('— P.V.A.', 'signature')}</div>
    </div>
    <div style="position:relative;width:78mm;height:78mm;background:#bfe3ec;background-image:linear-gradient(160deg,#d0ecf3,#aed8e3);box-shadow:0 10px 22px rgba(0,0,0,.28);transform:rotate(3deg);padding:9mm 9mm;color:#1d4350;margin-top:14mm;">
      <div style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:36mm;height:8mm;background:rgba(255,255,255,.35);"></div>
      <div style="font-size:23px;line-height:1.25;">${note2}</div>
    </div>
  </div>
</div>`
}

// ─── Asset 05: Briefkaart — Voor- en achterzijde ───
export function asset05(): string {
  return `
<div class="asset-page">
  <div class="asset-page__label no-print">Asset 05 · Briefkaart — voor- en achterzijde · print op A4</div>
  <!-- voorzijde -->
  <div style="position:relative;width:148mm;height:105mm;background:var(--c-navy);box-shadow:0 10px 28px rgba(0,0,0,.4);transform:rotate(-1deg);overflow:hidden;color:#fff;">
    <div style="position:absolute;inset:0;background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.04) 0 2px,transparent 2px 6px);"></div>
    <div style="position:absolute;inset:6mm;border:1px solid rgba(255,255,255,.3);"></div>
    <div style="position:relative;padding:13mm 14mm;height:100%;display:flex;flex-direction:column;justify-content:space-between;">
      <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:.22em;color:#9db4e6;">VERTROUWELIJK</div>
      <div><div style="font-size:46px;font-weight:800;letter-spacing:-.02em;line-height:.95;">DOSSIER<br>2030</div><div style="width:34mm;height:2.5px;background:var(--c-teal);margin-top:4mm;"></div></div>
      <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;color:#cdd9f0;">TE OPENEN VÓÓR 2030</div>
    </div>
  </div>
  <!-- achterzijde -->
  <div style="position:relative;width:148mm;height:105mm;background:#f3ead0;box-shadow:0 10px 28px rgba(0,0,0,.32);transform:rotate(.8deg);overflow:hidden;font-family:var(--font-mono);color:#3a3320;">
    <div style="position:absolute;top:11mm;bottom:11mm;left:50%;width:1px;background:#cdbf99;"></div>
    <div style="position:absolute;left:0;top:0;width:50%;height:100%;padding:11mm 11mm;">
      <div style="font-family:var(--font-serif);font-size:13px;line-height:1.5;color:#33302a;">Eén dag uit 2030: één gebeurtenis loopt vloeiend door Claims, Communicatie en B2B/B2I, als mens, data en AI als één geheel samenwerken.</div>
      <div style="position:absolute;bottom:11mm;left:11mm;font-size:22px;color:var(--c-navy);">${hw('— AE, voor Vanbreda', 'signature')}</div>
    </div>
    <div style="position:absolute;right:0;top:0;width:50%;height:100%;padding:9mm 11mm;">
      <div style="position:absolute;top:9mm;right:11mm;width:24mm;height:28mm;border:1.5px dashed #b9a877;display:flex;align-items:center;justify-content:center;text-align:center;font-size:8px;letter-spacing:.1em;color:#b9a877;line-height:1.4;">POST-<br>ZEGEL</div>
      <div style="position:absolute;top:13mm;right:38mm;width:22mm;height:22mm;border:2px solid #c2473a;border-radius:50%;color:#c2473a;display:flex;align-items:center;justify-content:center;text-align:center;font-size:8px;letter-spacing:.06em;transform:rotate(-12deg);opacity:.7;mix-blend-mode:multiply;line-height:1.2;">2030<br>VANBREDA<br>HC</div>
      <div style="position:absolute;bottom:18mm;left:11mm;right:11mm;">
        <div style="border-bottom:1px solid #cdbf99;height:8mm;"></div>
        <div style="border-bottom:1px solid #cdbf99;height:8mm;"></div>
        <div style="border-bottom:1px solid #cdbf99;height:8mm;"></div>
      </div>
      <div style="position:absolute;bottom:9mm;left:11mm;font-size:8px;letter-spacing:.1em;color:#a89868;">RFI-EVALUATIECOMMISSIE</div>
    </div>
  </div>
</div>`
}

// ─── Asset 06: Routekaart met stempels ───
export function asset06(): string {
  const steps = [
    { nr: '01', naam: 'Document-intake', stempel: 'AUTONOOM', color: '#2f7d4f', rot: '-4deg' },
    { nr: '02', naam: 'Herkenning', stempel: '+ CONTROLE', color: '#9a6a1e', rot: '3deg' },
    { nr: '03', naam: 'Context', stempel: 'AUTONOOM', color: '#2f7d4f', rot: '-2deg' },
    { nr: '04', naam: 'Dekking', stempel: 'DEELS', color: '#9a6a1e', rot: '2deg' },
    { nr: '05', naam: 'Beslissing', stempel: 'VOORSTEL', color: '#9a6a1e', rot: '-3deg' },
    { nr: '06', naam: 'Uitzondering', stempel: 'MENS VEREIST', color: '#a8442f', rot: '4deg' },
    { nr: '07', naam: 'Communicatie', stempel: '+ CONTROLE', color: '#9a6a1e', rot: '-2deg' },
    { nr: '08', naam: 'Betaling', stempel: 'AUTONOOM', color: '#2f7d4f', rot: '3deg' },
    { nr: '09', naam: 'Feedback', stempel: 'AUTONOOM', color: '#2f7d4f', rot: '-3deg' },
  ]

  const rows = steps.map(s => `
    <div style="display:grid;grid-template-columns:auto 1fr auto auto;align-items:center;border-bottom:1px dashed #d3c49b;padding:4mm 0;">
      <span style="font-weight:700;color:var(--c-navy);">${s.nr}</span>
      <span style="padding-left:5mm;font-family:var(--font-body);font-size:13px;color:#2d2a20;">${s.naam}</span>
      <span style="width:34mm;display:flex;justify-content:center;"><span style="border:2px solid ${s.color};color:${s.color};font-size:10px;letter-spacing:.08em;padding:1.5mm 3mm;border-radius:2px;transform:rotate(${s.rot});opacity:.8;">${s.stempel}</span></span>
      <span style="width:26mm;border-bottom:1px solid #b9a877;height:5mm;margin-bottom:-2mm;"></span>
    </div>`).join('')

  return `
<div class="asset-page">
  <div class="asset-page__label no-print">Asset 06 · Routekaart met stempels — de keten · print op A4</div>
  <div style="position:relative;width:190mm;min-height:255mm;background:#f3ead0;border:1px solid #d8c79c;box-shadow:0 10px 30px rgba(0,0,0,.34);transform:rotate(.3deg);padding:16mm 16mm;font-family:var(--font-mono);color:#3a3320;overflow:hidden;">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid var(--c-navy);padding-bottom:4mm;">
      <div><div style="font-size:10px;letter-spacing:.18em;color:#8a7a4e;">VANBREDA HEALTH CARE</div><div style="font-size:20px;font-weight:700;color:var(--c-navy);letter-spacing:.01em;margin-top:1.5mm;white-space:nowrap;">ROUTEKAART · DE KETEN</div></div>
      <div style="text-align:right;font-size:11px;color:#6b5f3c;">DOSSIER<br><b style="color:var(--c-navy);font-size:14px;">${d.displayNr}</b></div>
    </div>
    <div style="display:grid;grid-template-columns:auto 1fr auto auto;gap:0;font-size:8.5px;letter-spacing:.1em;color:#8a7a4e;border-bottom:1px solid #cdbf99;padding:3mm 0;margin-top:2mm;"><span>#</span><span style="padding-left:5mm;">STAP</span><span style="width:34mm;text-align:center;">STEMPEL</span><span style="width:26mm;text-align:center;">PARAAF</span></div>
    <div style="display:flex;flex-direction:column;">${rows}</div>
    <div style="margin-top:8mm;font-size:10px;color:#8a7a4e;letter-spacing:.04em;">Volg de gebeurtenis langs elke stap. Stempel = mate van autonomie · paraaf = menselijk eigenaarschap.</div>
  </div>
</div>`
}

// ─── Asset 07: Kassabon — Control-room ───
export function asset07(): string {
  return `
<div class="asset-page">
  <div class="asset-page__label no-print">Asset 07 · Kassabon — control-room metrics · print op A4</div>
  <div style="position:relative;width:92mm;background:#fcfbf6;box-shadow:0 10px 26px rgba(0,0,0,.3);transform:rotate(-1.2deg);padding:9mm 9mm 7mm;font-family:var(--font-mono);color:#2a2a26;font-size:10px;line-height:1.9;">
    <div style="border-bottom:1px dashed #b9b3a2;text-align:center;font-size:8px;color:#9a9588;letter-spacing:.1em;padding-bottom:3mm;margin-bottom:3mm;">✂ - - - - - - - - - - - - - - - -</div>
    <div style="text-align:center;font-weight:700;font-size:13px;letter-spacing:.06em;">VANBREDA HEALTH CARE</div>
    <div style="text-align:center;font-size:10px;letter-spacing:.18em;color:#6b675c;margin-bottom:4mm;">CONTROL ROOM</div>
    <div style="border-top:1px dashed #b9b3a2;border-bottom:1px dashed #b9b3a2;padding:2mm 0;display:flex;justify-content:space-between;white-space:nowrap;"><span>DOSSIER</span><span>${d.displayNr}</span></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>DATUM</span><span>${d.aiDecision.datum}</span></div>
    <div style="border-top:1px dashed #b9b3a2;margin:3mm 0;"></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>AUTONOOM</span><b>6 / 9</b></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>MENS. INTERV.</span><b>${d.metrics.menselijkeInterventies}</b></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>DOORLOOP</span><span>${d.metrics.doorlooptijd}</span></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>KLANT</span><span>1 upload</span></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>&nbsp;</span><span>${d.metrics.klantHerhaalvragen} herhaalvr.</span></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>EXCEPTION</span><span>Dekking</span></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>VOORKOMEN DUBBEL</span><span>${d.financieel.voorkomDubbel}</span></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>KWALITEIT</span><span>Eerste review OK</span></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>AUDIT TRAIL</span><b style="color:var(--c-green);">VOLLEDIG</b></div>
    <div style="border-top:1px dashed #b9b3a2;margin:3mm 0;"></div>
    <div style="display:flex;justify-content:space-between;font-weight:700;white-space:nowrap;"><span>STATUS</span><span style="color:var(--c-navy);">BESTUURBAAR ✓</span></div>
    <div style="text-align:center;font-size:8px;color:#9a9588;letter-spacing:.06em;margin-top:3mm;">============================</div>
    <div style="height:11mm;margin:3mm 0 2mm;background:repeating-linear-gradient(90deg,#2a2a26 0 1.4px,transparent 1.4px 2.8px,#2a2a26 2.8px 5px,transparent 5px 6px,#2a2a26 6px 6.8px,transparent 6.8px 9px);"></div>
    <div style="text-align:center;font-size:10px;letter-spacing:.14em;">${d.displayNr}</div>
    <div style="text-align:center;font-size:9px;color:#6b675c;margin-top:2mm;">AUTONOMIE = BESTUURBAARHEID</div>
  </div>
</div>`
}

// ─── Asset 08: Ruitjespapier — Fundamenten ───
export function asset08(): string {
  const checks = d.fundamenten.map((f, i) => {
    const rotations = [-6, 4, -3, 5, -4, 3, -5, 2, -2]
    return `<div style="display:flex;align-items:flex-start;gap:4mm;${i === d.fundamenten.length - 1 ? 'grid-column:1 / -1;' : ''}"><span style="width:6mm;height:6mm;border:1.5px solid #1d3a6e;display:flex;align-items:center;justify-content:center;color:#c2473a;font-size:18px;transform:rotate(${rotations[i]}deg);">✓</span>${hw(f.titel, 'annotation')}</div>`
  }).join('\n')

  return `
<div class="asset-page">
  <div class="asset-page__label no-print">Asset 08 · Ruitjespapier checklist — fundamenten · print op A4</div>
  <div style="position:relative;width:180mm;min-height:150mm;background:#fbfdfb;background-image:repeating-linear-gradient(0deg,#d2e3e8 0 1px,transparent 1px 5mm),repeating-linear-gradient(90deg,#d2e3e8 0 1px,transparent 1px 5mm);box-shadow:0 10px 28px rgba(0,0,0,.3);transform:rotate(-.6deg);padding:14mm 16mm;color:#1d3a6e;overflow:hidden;">
    <div style="position:absolute;left:24mm;top:0;bottom:0;width:1px;background:#e0a0a0;"></div>
    <div style="font-size:34px;color:var(--c-navy);line-height:1;">${hw('Wat moest hiervoor waar zijn?', 'accent')}</div>
    <div style="font-size:21px;color:#4a6aa0;margin:1mm 0 7mm;">${hw('— de fundamenten onder één dag uit 2030', 'annotation')}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4mm 14mm;font-size:24px;color:#22407a;">
      ${checks}
    </div>
    <div style="font-size:22px;color:#4a6aa0;margin-top:8mm;">${handwrite('Alles hangt samen — begin bij de data-laag ↗', 'accent', 42)}</div>
  </div>
</div>`
}

// ─── Asset 09: Interne nota — Open vragen ───
export function asset09(): string {
  const vragen = d.openVragen.map((v, i) => {
    const nr = String(i + 1).padStart(2, '0')
    return `<div style="display:flex;gap:5mm;align-items:baseline;"><span style="font-family:var(--font-mono);font-size:16px;font-weight:700;color:var(--c-copper);">${nr}</span><span style="font-size:14px;color:#2d2a22;">${v}</span></div>`
  }).join('\n')

  return `
<div class="asset-page">
  <div class="asset-page__label no-print">Asset 09 · Interne nota — open vragen · print op A4</div>
  <div style="position:relative;width:190mm;min-height:255mm;background:#fbf8f0;box-shadow:0 10px 30px rgba(0,0,0,.32);transform:rotate(.25deg);padding:18mm 18mm;font-family:var(--font-mono);color:#2d2a22;">
    <div style="text-align:center;border-bottom:3px double var(--c-navy);padding-bottom:4mm;"><div style="font-size:26px;font-weight:700;letter-spacing:.14em;color:var(--c-navy);">INTERNE NOTA</div><div style="font-size:9.5px;letter-spacing:.2em;color:#8a7a4e;margin-top:1mm;">VANBREDA HEALTH CARE · VERTROUWELIJK</div></div>
    <div style="display:grid;grid-template-columns:auto 1fr;gap:2mm 5mm;font-size:12px;margin:7mm 0;border-bottom:1px dashed #cdbf99;padding-bottom:6mm;">
      <span style="color:#8a7a4e;">AAN:</span><span>RFI-evaluatiecommissie</span>
      <span style="color:#8a7a4e;">VAN:</span><span>AE, voor Vanbreda</span>
      <span style="color:#8a7a4e;">DOSSIER:</span><span style="font-weight:700;color:var(--c-navy);">${d.displayNr}</span>
      <span style="color:#8a7a4e;">BETREFT:</span><span>Wat we samen moeten begrijpen om dit toekomstbeeld uitvoerbaar te maken</span>
    </div>
    <div style="display:flex;flex-direction:column;gap:5mm;font-family:var(--font-body);">
      ${vragen}
    </div>
    <div style="margin-top:8mm;border-top:1px dashed #cdbf99;padding-top:4mm;font-size:11px;color:#8a7a4e;">↳ Volledige vragenlijst (16 vragen): zie bijgevoegd Excel-bestand.</div>
    <div style="margin-top:9mm;font-family:var(--font-body);font-size:15px;line-height:1.5;color:#2d2a22;">Dit dossier roept de vraag op. <b style="color:var(--c-navy);">Het formele voorstel geeft het antwoord.</b></div>
    <div class="stamp" style="position:absolute;bottom:22mm;right:20mm;transform:rotate(-7deg);">
      <div class="stamp__year">2030</div>
      <div class="stamp__text">TER VALIDATIE</div>
    </div>
  </div>
</div>`
}

// ─── Asset 10: Pizzabon — Late-avond flow-sessie ───
export function asset10(): string {
  const hwNote = handwrite('De avond dat alles begon.', 'postit', 303)

  return `
<div class="asset-page">
  <div class="asset-page__label no-print">Asset 10 · Pizzabon — late-avond flow-sessie · print op A4</div>
  <div style="position:relative;width:90mm;background:#fcfbf6;box-shadow:0 10px 26px rgba(0,0,0,.3);transform:rotate(1.4deg);padding:9mm 9mm 7mm;font-family:var(--font-mono);color:#2a2a26;font-size:10px;line-height:1.9;">
    <div style="position:absolute;top:34mm;right:9mm;width:30mm;height:30mm;border-radius:50%;background:radial-gradient(circle,rgba(150,90,30,.13),rgba(150,90,30,.05) 60%,transparent 70%);pointer-events:none;"></div>
    <div style="text-align:center;font-size:8px;color:#9a9588;letter-spacing:.05em;border-bottom:1px dashed #b9b3a2;padding-bottom:3mm;margin-bottom:3mm;">✂ — — — — — — — — — — —</div>
    <div style="text-align:center;font-weight:700;font-size:14px;letter-spacing:.04em;">PIZZA &amp; PIXELS</div>
    <div style="text-align:center;font-size:9px;letter-spacing:.16em;color:#6b675c;margin-bottom:3mm;">ANTWERPEN · TOT LAAT OPEN</div>
    <div style="border-top:1px dashed #b9b3a2;border-bottom:1px dashed #b9b3a2;padding:2mm 0;display:flex;justify-content:space-between;white-space:nowrap;"><span>TAFEL</span><span>flow-sessie</span></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>DATUM</span><span>14 juni · 23:47</span></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>BON</span><span>#${d.displayNr}</span></div>
    <div style="border-top:1px dashed #b9b3a2;margin:2.5mm 0;"></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>4x Margherita</span><span>48,00</span></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>1x Quattro Stagioni</span><span>15,50</span></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>1x Veggie "de droom"</span><span>14,00</span></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>1x Ananas (controvers.)</span><span>0,00</span></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>6x Cola Zero</span><span>18,00</span></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>2x Espresso doppio</span><span>7,00</span></div>
    <div style="border-top:1px dashed #b9b3a2;margin:2.5mm 0;"></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>SUBTOTAAL</span><span>102,50</span></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>FOOI (verdiend)</span><span>12,50</span></div>
    <div style="display:flex;justify-content:space-between;font-weight:700;white-space:nowrap;"><span>TOTAAL</span><span style="color:var(--c-navy);">EUR 115,00</span></div>
    <div style="display:flex;justify-content:space-between;white-space:nowrap;"><span>BETAALD DOOR</span><span>AE</span></div>
    <div style="text-align:center;font-size:8px;color:#9a9588;letter-spacing:.06em;margin-top:3mm;">============================</div>
    <div style="height:11mm;margin:3mm 0 2mm;background:repeating-linear-gradient(90deg,#2a2a26 0 1.4px,transparent 1.4px 2.8px,#2a2a26 2.8px 5px,transparent 5px 6px,#2a2a26 6px 6.8px,transparent 6.8px 9px);"></div>
    <div style="text-align:center;font-size:10px;letter-spacing:.14em;">${d.displayNr}</div>
    <div style="font-size:26px;color:#3a3414;transform:rotate(-3deg);margin-top:5mm;padding:3mm 0;">${hwNote}</div>
    <div style="font-size:18px;color:#6b5a33;transform:rotate(-2deg);text-align:right;margin-top:1mm;">${hw('— G.', 'signature')}</div>
  </div>
</div>`
}

// ─── Asset 11: Factuur — AI-tokens / verwerking ───
export function asset11(): string {
  const lines = [
    { omschrijving: 'Documentextractie & classificatie', tokens: '~12.400', bedrag: '€ 0,19' },
    { omschrijving: 'Contextkoppeling (polis · CRM · historiek)', tokens: '~8.200', bedrag: '€ 0,13' },
    { omschrijving: 'Dekkingsanalyse & beslisvoorstel', tokens: '~15.600', bedrag: '€ 0,24' },
    { omschrijving: 'Communicatie-generatie (begrijpelijke uitleg)', tokens: '~6.800', bedrag: '€ 0,10' },
    { omschrijving: 'Audit logging & feedbackloop', tokens: '~3.400', bedrag: '€ 0,05' },
  ]

  const rows = lines.map((l, i) => `
    <div style="display:grid;grid-template-columns:1fr 32mm 30mm;border-bottom:1px solid #ece3cd;${i % 2 ? 'background:#fcf9f1;' : ''}">
      <div style="padding:3.5mm 4mm;">${l.omschrijving}</div>
      <div style="padding:3.5mm 4mm;text-align:right;">${l.tokens}</div>
      <div style="padding:3.5mm 4mm;text-align:right;">${l.bedrag}</div>
    </div>`).join('')

  return `
<div class="asset-page">
  <div class="asset-page__label no-print">Asset 11 · Factuur — AI-tokens &amp; verwerking · print op A4</div>
  <div style="position:relative;width:190mm;min-height:255mm;background:#fbf8f0;box-shadow:0 10px 30px rgba(0,0,0,.32);transform:rotate(-.3deg);padding:18mm 18mm;font-family:var(--font-body);color:#2d2a22;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid var(--c-navy);padding-bottom:5mm;">
      <div><div style="font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;color:#8a7a4e;white-space:nowrap;">MODEL OPERATIONS · HC 2030</div><div style="font-size:30px;font-weight:800;color:var(--c-navy);letter-spacing:-.01em;margin-top:1mm;">Factuur</div></div>
      <div style="text-align:right;font-family:var(--font-mono);font-size:11px;color:#6b5f3c;line-height:1.8;white-space:nowrap;">FACTUURNR.&nbsp;&nbsp;<b style="color:var(--c-navy);">${d.displayNr}-AI</b><br>DATUM&nbsp;&nbsp;${d.aiDecision.datum}</div>
    </div>
    <div style="display:flex;justify-content:space-between;margin-top:8mm;font-size:12.5px;line-height:1.6;">
      <div><div style="font-family:var(--font-mono);font-size:9px;letter-spacing:.12em;color:#8a7a4e;">VAN</div>Model Operations<br><span style="color:#6b6655;">verwerking & orkestratie</span></div>
      <div style="text-align:right;"><div style="font-family:var(--font-mono);font-size:9px;letter-spacing:.12em;color:#8a7a4e;">AAN</div>Vanbreda Health Care<br><span style="color:#6b6655;">t.a.v. Control Room · dossier ${d.displayNr}</span></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 32mm 30mm;margin-top:9mm;font-family:var(--font-mono);font-size:9px;letter-spacing:.08em;color:#fff;background:var(--c-navy);"><div style="padding:3mm 4mm;">OMSCHRIJVING</div><div style="padding:3mm 4mm;text-align:right;">TOKENS</div><div style="padding:3mm 4mm;text-align:right;">BEDRAG</div></div>
    <div style="border:1px solid #e0d6bd;border-top:none;font-size:13px;color:#2d2a22;">
      ${rows}
    </div>
    <div style="display:flex;justify-content:flex-end;margin-top:6mm;">
      <div style="width:84mm;font-size:13px;">
        <div style="display:flex;justify-content:space-between;padding:2mm 0;border-bottom:1px dotted #cdbf99;"><span style="color:#6b6655;">Subtotaal</span><span>€ 0,71</span></div>
        <div style="display:flex;justify-content:space-between;padding:2mm 0;border-bottom:1px dotted #cdbf99;"><span style="color:#6b6655;">BTW 21%</span><span>€ 0,15</span></div>
        <div style="display:flex;justify-content:space-between;padding:3mm 0;font-weight:700;"><span>TOTAAL</span><span style="color:var(--c-navy);font-size:16px;">€ 0,86</span></div>
      </div>
    </div>
    <div style="margin-top:8mm;border:1.5px dashed var(--c-copper);padding:5mm 6mm;font-family:var(--font-serif);font-size:14px;line-height:1.5;color:#4a3a1e;">
      <b>Ter illustratie:</b> de AI-verwerkingskosten voor één volledig dossier liggen in de orde van minder dan één euro. De waarde zit niet in de kostenbesparing per transactie — maar in de kwaliteit, snelheid en consistentie van het geheel.
    </div>
    <div style="position:absolute;left:18mm;right:18mm;bottom:14mm;border-top:1px solid #e6dcc4;padding-top:3mm;font-family:var(--font-mono);font-size:9px;color:#a59f8c;letter-spacing:.04em;display:flex;justify-content:space-between;">
      <span>Model Operations · dossier 2030</span><span>factuurnr. ${d.displayNr}-AI</span>
    </div>
  </div>
</div>`
}

// ─── Asset 12: Bijlage — Bierviltje met schets ───
function asset12(): string {
  return `
<div class="asset-page">
  <div class="asset-page__label no-print">Asset 12 · Bijlage — bierviltje · print op A4</div>
  <div style="position:relative;width:186mm;background:#f5efe2;box-shadow:0 10px 30px rgba(0,0,0,.32);transform:rotate(-.4deg);padding:12mm;overflow:hidden;">
    <div style="position:absolute;top:8mm;right:10mm;font-family:var(--font-mono);font-size:9px;letter-spacing:.12em;color:#8a7a4e;">BIJLAGE · GEVONDEN OBJECT 01</div>
    <img src="/img-bierviltje.png" alt="Bierviltje met schets" style="width:100%;height:auto;border-radius:2px;box-shadow:0 2px 8px rgba(0,0,0,.12);">
    <div style="margin-top:4mm;font-family:var(--font-mono);font-size:10px;color:#6b5f3c;letter-spacing:.04em;">Bierviltje — het kernidee: dossier 2030 teruggestuurd naar 2026. Claims, Communicatie en B2B als één geheel.</div>
  </div>
</div>`
}

// ─── Asset 13: Bijlage — Servet met Sophie's flow ───
function asset13(): string {
  return `
<div class="asset-page">
  <div class="asset-page__label no-print">Asset 13 · Bijlage — servet Sophie's flow · print op A4</div>
  <div style="position:relative;width:186mm;background:#f5efe2;box-shadow:0 10px 30px rgba(0,0,0,.32);transform:rotate(.3deg);padding:12mm;overflow:hidden;">
    <div style="position:absolute;top:8mm;right:10mm;font-family:var(--font-mono);font-size:9px;letter-spacing:.12em;color:#8a7a4e;">BIJLAGE · GEVONDEN OBJECT 02</div>
    <img src="/img-servet.png" alt="Servet met flow" style="width:100%;height:auto;border-radius:2px;box-shadow:0 2px 8px rgba(0,0,0,.12);">
    <div style="margin-top:4mm;font-family:var(--font-mono);font-size:10px;color:#6b5f3c;letter-spacing:.04em;">Servet — Sophie's flow van Lyon tot terugbetaling. Rode cirkel bij AI-analyse: daar zit de uitzondering. Dossiernr. HC-2030-00471.</div>
  </div>
</div>`
}

// ─── Asset 14: Bijlage — Zwart-wit pizza sessie ───
function asset14(): string {
  return `
<div class="asset-page">
  <div class="asset-page__label no-print">Asset 14 · Bijlage — zwart-wit pizza sessie · print op A4</div>
  <div style="position:relative;width:186mm;background:#1a1a1a;box-shadow:0 10px 30px rgba(0,0,0,.5);transform:rotate(-.2deg);padding:5mm;overflow:hidden;">
    <img src="/img-pizza-bw.png" alt="Pizza sessie" style="width:100%;height:auto;border-radius:1px;">
    <div style="margin-top:4mm;font-family:var(--font-mono);font-size:10px;color:#9a9a9a;letter-spacing:.04em;">14 juni · Pizza & Pixels, Antwerpen · ±23:47 — de avond dat alles begon.</div>
  </div>
</div>`
}

// ─── Asset 15: Bijlage — Sticky note met bedragen ───
function asset15(): string {
  return `
<div class="asset-page">
  <div class="asset-page__label no-print">Asset 15 · Bijlage — sticky note bedragen · print op A4</div>
  <div style="position:relative;width:186mm;background:#f5efe2;box-shadow:0 10px 30px rgba(0,0,0,.32);transform:rotate(.5deg);padding:12mm;overflow:hidden;">
    <div style="position:absolute;top:8mm;right:10mm;font-family:var(--font-mono);font-size:9px;letter-spacing:.12em;color:#8a7a4e;">BIJLAGE · GEVONDEN OBJECT 03</div>
    <img src="/img-sticky.png" alt="Sticky note bedragen" style="width:100%;height:auto;border-radius:2px;box-shadow:0 2px 8px rgba(0,0,0,.12);">
    <div style="margin-top:4mm;font-family:var(--font-mono);font-size:10px;color:#6b5f3c;letter-spacing:.04em;">Post-it op factuuroverzicht — €8.740,60 dubbele factuur geblokkeerd. Radiologiefactuur nog te controleren. Sophie DW, polis 00471.</div>
  </div>
</div>`
}

// ─── Asset 16: Bijlage — Koffie op dossier ───
function asset16(): string {
  return `
<div class="asset-page">
  <div class="asset-page__label no-print">Asset 16 · Bijlage — koffie op dossier · print op A4</div>
  <div style="position:relative;width:186mm;background:#f5efe2;box-shadow:0 10px 30px rgba(0,0,0,.32);transform:rotate(-.35deg);padding:12mm;overflow:hidden;">
    <div style="position:absolute;top:8mm;right:10mm;font-family:var(--font-mono);font-size:9px;letter-spacing:.12em;color:#8a7a4e;">BIJLAGE · FOTO 01</div>
    <img src="/img-koffie.png" alt="Koffie op dossier" style="width:100%;height:auto;border-radius:2px;box-shadow:0 2px 8px rgba(0,0,0,.12);">
    <div style="margin-top:4mm;font-family:var(--font-mono);font-size:10px;color:#6b5f3c;letter-spacing:.04em;">Dossier 2030 — koffieringen, annotaties en post-its. Zo ziet een doorgewerkte nacht eruit.</div>
  </div>
</div>`
}

// ─── Asset 17: Bijlage — Polaroid whiteboard ───
function asset17(): string {
  return `
<div class="asset-page">
  <div class="asset-page__label no-print">Asset 17 · Bijlage — polaroid whiteboard · print op A4</div>
  <div style="position:relative;width:186mm;background:#f5efe2;box-shadow:0 10px 30px rgba(0,0,0,.32);transform:rotate(.4deg);padding:12mm;overflow:hidden;">
    <div style="position:absolute;top:8mm;right:10mm;font-family:var(--font-mono);font-size:9px;letter-spacing:.12em;color:#8a7a4e;">BIJLAGE · FOTO 02</div>
    <img src="/img-polaroid.png" alt="Polaroid whiteboard" style="width:100%;height:auto;border-radius:2px;box-shadow:0 2px 8px rgba(0,0,0,.12);">
    <div style="margin-top:4mm;font-family:var(--font-mono);font-size:10px;color:#6b5f3c;letter-spacing:.04em;">Polaroid — Sophie's flow op het whiteboard. "14 juni — de avond dat alles begon."</div>
  </div>
</div>`
}

// ─── Export all assets ───
export function renderAllAssets(): string {
  return [
    asset01(),
    asset02(),
    asset03(),
    asset04(),
    asset05(),
    asset06(),
    asset07(),
    asset08(),
    asset09(),
    asset10(),
    asset11(),
    asset12(),
    asset13(),
    asset14(),
    asset15(),
    asset16(),
    asset17(),
  ].join('\n')
}
