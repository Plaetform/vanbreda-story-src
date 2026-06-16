import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("❌ Zet GEMINI_API_KEY als environment variable of in .env");
  console.error("   export GEMINI_API_KEY='jouw-key-hier'");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const OUTPUT_DIR = path.resolve("public");

interface ImageJob {
  name: string;
  prompt: string;
  inputImages?: string[];
}

const jobs: ImageJob[] = [
  // ─── Ch0: De Belofte ───
  {
    name: "img-droomkaart",
    prompt: `Top-down photograph of a beautiful A4 document lying on a dark walnut wooden desk. The document is titled "DROOMKAART 2030" in elegant serif typography at the top. Below is a hand-drawn customer journey map showing Sophie's ideal experience: circles connected by arrows, with handwritten Dutch annotations in blue pen. Small colored sticky dots (green, orange) mark key moments. The paper is slightly cream-colored with a subtle grid pattern. A fine-tip pen and a cup of espresso are partially visible at the edges. The style mixes professional print design with authentic workshop artifacts. Warm desk lamp lighting, photorealistic, editorial quality. Shot from directly above.`,
  },
  {
    name: "img-klantbelofte",
    prompt: `Top-down photograph of an elegant cream-colored A5 card lying on a dark wooden desk surface. The card has "KLANTBELOFTE" printed in gold foil serif lettering at the top. Below are 5 numbered principles in clean Dutch text, each with a small teal diamond bullet point. The card has a thin gold border and a faint watermark of a shield logo. A vintage brass paperweight sits on one corner. The paper has a luxurious heavy cotton texture. Warm side lighting from the left. Photorealistic, high-end editorial style. Shot from directly above.`,
  },
  // ─── Ch1: De Werkelijkheid ───
  {
    name: "img-value-leakage",
    prompt: `Top-down photograph of a large printed process diagram (A3 size) lying on a dark wooden desk. The diagram shows a "VALUE LEAKAGE MAP" of an insurance claims process. Red circles and crosses mark friction points. Green arrows show ideal flow, red dashed arrows show delays and handoffs. Handwritten Dutch annotations in red and blue marker in the margins: "4 dagen wachttijd", "handmatig", "geen koppeling", "wie beslist?". Several small yellow post-it notes stuck on top with extra comments. The paper is slightly crumpled from being handled in workshops. A red marker and blue pen lie beside it. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-interview-notes",
    prompt: `Top-down photograph of a leather-bound notebook lying open on a dark wooden desk. The left page has the heading "INTERVIEW — Medewerker Claims" written in neat handwriting. Below are interview notes in Dutch with bullet points, underlined key phrases, and margin annotations with exclamation marks. The right page has a simple hand-drawn diagram of a process flow with boxes and arrows. A nice pen rests in the spine. The notebook looks well-used with slightly worn edges. Warm desk lamp lighting, photorealistic, intimate documentary feel. Shot from directly above.`,
  },
  // ─── Ch2: Het Eerste Bewijs ───
  {
    name: "img-experimentkaart",
    prompt: `Top-down photograph of a structured A4 document on a dark wooden desk. The document is titled "EXPERIMENT #1" in bold monospace type. It's divided into clear sections: "HYPOTHESE", "USE-CASE", "RESULTAAT", "VOLGENDE STAP" — each with handwritten Dutch text filled in with blue pen. Green checkmarks next to completed items. A red "BEWEZEN" stamp in the bottom right corner. The document has a clean, scientific feel but with human touches — handwritten notes, a coffee ring stain in one corner. A small graph is sketched in the results section showing improvement. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-klantfeedback",
    prompt: `Top-down photograph of a printed feedback card on a dark wooden desk. The card is titled "KLANTFEEDBACK — Pilot" in sans-serif type. Below are 3 quoted responses from customers in Dutch, each in a different handwriting style, with satisfaction scores (8.2, 9.1, 7.8) circled in green. Small star ratings are drawn next to each quote. The card has a professional but personal feel — printed template with handwritten responses. A paperclip attaches a small note saying "Sophie's profiel past hier". Warm lighting, photorealistic. Shot from directly above.`,
  },
  // ─── Ch3: Het Fundament ───
  {
    name: "img-golden-record",
    prompt: `Top-down photograph of a technical architecture diagram printed on white A3 paper, lying on a dark wooden desk. The diagram shows a "GOLDEN RECORD" data model at the center — a golden hexagon labeled "Sophie De Winter" with data fields radiating outward: Polis, Claims, Contacthistorie, Partners, Documenten. Each connected by clean lines to source systems drawn as grey rectangles. Dutch labels throughout. The design is clean and technical but with hand-drawn red annotations: "SINGLE SOURCE OF TRUTH" circled, arrows added in marker. A ruler and mechanical pencil lie beside it. Cool-warm mixed lighting, photorealistic, technical document feel. Shot from directly above.`,
  },
  // ─── Ch4: Mens & AI ───
  {
    name: "img-memo-medewerker",
    prompt: `Top-down photograph of a handwritten memo on lined A4 paper, lying on a dark wooden desk. The memo is written in Dutch in neat but personal handwriting with a blue ballpoint pen. The heading reads "Notitie — Thomas V." followed by a personal note expressing concern about changing roles: worries about AI replacing judgment, questions about responsibility, but also cautious optimism about spending more time on complex cases. Some words are underlined for emphasis. A few lines are crossed out and rewritten. The paper has a slight fold mark as if it was in a pocket. A coffee mug casts a shadow at the edge. Warm intimate lighting, photorealistic, deeply personal feel. Shot from directly above.`,
  },
  {
    name: "img-trainingskaart",
    prompt: `Top-down photograph of a laminated training card (A5 size) lying on a dark wooden desk. The card is titled "BESLISKAART — Wanneer grijp ik in?" in bold sans-serif type. Below is a simple decision tree flowchart with yes/no branches, showing when a human should override AI decisions. Green boxes for "AI beslist", orange for "Menselijke review", red for "Escalatie". Dutch labels at each decision point. The card is laminated with rounded corners and has a small badge/logo in the corner. It looks like something that would hang at a workstation. Clean professional design, warm lighting, photorealistic. Shot from directly above.`,
  },
  // ─── Ch5: Schaal ───
  {
    name: "img-control-room",
    prompt: `Top-down photograph of a printed dashboard screenshot lying on a dark wooden desk. The printout shows a "CONTROL ROOM" operations dashboard with real-time metrics: claims processed today (847), STP rate (82%), average handling time (1h 42m), open exceptions (23), human overrides (7). Gauges, bar charts, and a small map of Belgium with regional activity dots. The printout has handwritten notes in the margins: "target gehaald!", "hier nog aandacht" with arrows. A highlighter pen and paperclip beside it. Professional data visualization style with teal and navy color scheme. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-incident-report",
    prompt: `Top-down photograph of an official-looking incident report form on a dark wooden desk. The form is titled "INCIDENT RAPPORT — IR-2029-0047" in monospace type. Sections include: Datum, Ernst, Beschrijving, Oorzaak, Correctie, Preventie. Each section is filled in with typed Dutch text describing a case where the AI incorrectly classified a claim. A red "OPGELOST" stamp is visible. The form has a severity indicator showing "MEDIUM" in orange. Paper-clipped to it is a small sticky note reading "Heeft geleid tot rule update #218". Clean bureaucratic design but with human touches. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-go-nogo",
    prompt: `Top-down photograph of a formal A4 decision document on a dark wooden desk. The document is titled "GO / NO-GO BESLUIT" in large bold type with a date "2029-Q3". Below is a checklist of criteria with green checkmarks and one orange "VOORWAARDELIJK" mark. Categories include: Technisch, Operationeel, Juridisch, Change, Business Case. At the bottom, a signature line with an actual signature in black ink, and a large green "GO" stamp. The document has a professional, corporate feel with a subtle watermark. Clean lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-routekaart",
    prompt: `Top-down photograph of an A4 roadmap document on a dark wooden desk. The document is titled "ROUTEKAART" in elegant serif type. It shows a winding path with 9 numbered milestone circles connected by a dotted line, each milestone having a small icon and Dutch label. Some milestones have small red "GEREED" stamps. The path goes from "Start" at top-left to "Autonomie" at bottom-right. The document has a cream background with teal accent colors. Small handwritten margin notes. Professional but human, warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-fundamenten",
    prompt: `Top-down photograph of an A5 checklist card on a dark wooden desk. The card is titled "FUNDAMENTEN — Prerequisites" in clean sans-serif type. Below is a structured checklist of 6 foundational requirements, each with a checkbox. Four are checked in green ink, two are circled in orange with "IN PROGRESS" written beside them. Dutch labels: "Master data", "Identiteit", "Integratie", "Security", "Beslisregels", "Audit trail". The card has a small green checkmark logo in the corner. Clean professional design with handwritten progress marks. Warm lighting, photorealistic. Shot from directly above.`,
  },
  // ─── Ch6: Sophie / Het moment van de waarheid ───
  {
    name: "img-faxbericht",
    prompt: `Top-down photograph of a fax transmission printout on a dark wooden desk. The fax header reads "VANBREDA HEALTH CARE — AI BESLISSINGSRAPPORT" with a timestamp and fax number. The body contains a structured decision report: "Patiënt: Sophie De Winter", "Claim: HC-2030-004781", with sections for AI-analyse, confidence score (87%), and a red flagged section "ESCALATIE VEREIST — Menselijke review". A handwritten note in red pen says "Thomas → review voor 15:00". The fax paper has the typical thermal paper appearance with slightly curled edges. Warm desk lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-claimbrief",
    prompt: `Top-down photograph of a formal business letter on premium cream stationery lying on a dark wooden desk. The letterhead shows a Vanbreda-style health insurance logo. Addressed to "Mevr. Sophie De Winter, Brasschaat". The letter text in Dutch confirms claim approval with one exception noted. A green "GOEDGEKEURD" stamp is visible. The bottom has a signature in blue ink and a date stamp. A paperclip holds a small yellow sticky note reading "Uitzondering: zie bijlage". The letter feels official but personal. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-interne-nota",
    prompt: `Top-down photograph of an internal memo document on a dark wooden desk. The document is titled "INTERNE NOTA — OPEN VRAGEN" in clean monospace type. Below is a list of 5 strategic questions in Dutch, each with bullet points for context. Some items have handwritten annotations in the margins: checkmarks, question marks, and short Dutch comments like "bespreken met team" and "prioriteit". The document has a confidential watermark and a "DRAFT" stamp in grey. A red pen and reading glasses are partially visible at the edge. Professional but working-document feel. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-indexkaart",
    prompt: `Top-down photograph of a manila index card (A5 size) lying on a dark wooden desk. The card is a structured case file card with printed fields filled in by hand: "Naam: De Winter, Sophie", "Geboortedatum: 12-03-1989", "Polisnr: VB-HC-89247", "Casus: Spoedopname Lyon", "Status: In behandeling". The card has a small passport-style photo clipped to the top-right corner. Colored tabs on the right edge indicate category. Some fields have been updated with a different colored pen. The card has a slightly worn, handled feel. Warm lighting, photorealistic. Shot from directly above.`,
  },
  // ─── NEW: Pagina 1 assets ───
  {
    name: "img-sophie-persona",
    prompt: `Top-down photograph of a printed persona card (A5 landscape) on a dark wooden desk. The card shows "SOPHIE DE WINTER" in bold sans-serif type at the top, with a small circular placeholder silhouette photo. Below are fields: Leeftijd: 41, Beroep: Marketing Director, Taal: Nederlands/Frans, Voorkeurskanaal: App + telefoon, Werkgever: Pharma International, Verwachtingen: "Eén contactpunt", Zorgen: "Privacygevoelig". Orange accent color (#FF4B28) for headers. Clean modern design with rounded corners. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-zakenreis",
    prompt: `Top-down photograph on a dark wooden desk showing items suggesting a business trip: an open laptop, a congress badge lanyard with "PHARMA SUMMIT LYON 2030", a hotel key card, a boarding pass stub, and a small travel toiletry bag. The items are casually arranged as if just set down. Everything looks normal and routine — contrasting with the unexpected hospitalization to come. Warm natural lighting, photorealistic, editorial lifestyle feel. Shot from directly above.`,
  },
  {
    name: "img-klantvragen",
    prompt: `Top-down photograph of a small yellow notepad page on a dark wooden desk. Handwritten in blue pen are worried customer questions in Dutch: "Ben ik verzekerd?", "Wie moet ik bellen?", "Welke documenten zijn nodig?", "Moet ik zelf betalen?", "Kan mijn werkgever mijn medische gegevens zien?". The handwriting is slightly shaky, suggesting stress. A few words are underlined. The notepad has a slight tear at the top where it was ripped from the pad. Warm intimate lighting, photorealistic. Shot from directly above.`,
  },
  // ─── NEW: Pagina 2 assets ───
  {
    name: "img-voice-ai-stats",
    prompt: `Top-down photograph of a printed mini-dashboard card (A5) on a dark wooden desk. Title: "VOICE AI — PRODUCTIERESULTATEN" in clean sans-serif type. Shows key metrics in large bold numbers with orange (#FF4B28) accent: "~80% calls via Voice AI", "95% routeringsnauwkeurigheid". Below are small bar charts showing monthly improvement. Labels in Dutch: "Meertalig", "Intentherkenning actief". A small trend arrow pointing up in green. The card has a modern data-viz design feel. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-claims-stp",
    prompt: `Top-down photograph of a printed results card (A5) on a dark wooden desk. Title: "CLAIMS — STP PERFORMANCE" in bold sans-serif. Large orange (#FF4B28) number "55%" dominates the card, labeled "Volumegewogen STP". Below: "±200.000 claims/maand", "Digitale intake actief", "OCR-capability". A small donut chart shows the STP ratio. The card has a professional dashboard aesthetic with clean typography. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-b2b-stp",
    prompt: `Top-down photograph of a printed results card (A5) on a dark wooden desk. Title: "B2B/B2I — AANSLUITINGEN" in bold sans-serif. Large orange (#FF4B28) number "~87%" labeled "STP Aansluitingen". Below: "Digitale interfaces", "Partnerprocessen", "Beheermutaties". A small horizontal bar chart shows partner categories. Clean modern data card design. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-intent-classifier",
    prompt: `Top-down photograph of a printed screenshot mockup on a dark wooden desk. The screenshot shows an intent classification UI: an incoming customer message in Dutch at the top, below it a detected intent label ("Claimstatus opvragen" with 94% confidence), suggested routing ("Claims team — Sophie De Winter"), and a context enrichment block showing polis and claim data. The design uses orange (#FF4B28) accents and clean sans-serif type. A handwritten annotation "Dit werkt al!" in the margin. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-rpa-schets",
    prompt: `Top-down photograph of a hand-drawn technical sketch on graph paper lying on a dark wooden desk. The sketch shows a simple integration flow: "Voice AI → Classifier → RPA → Kernapplicatie" with boxes connected by arrows. Side annotations in blue pen: "Losse capabilities", "Niet end-to-end verbonden". Some red question marks between the arrows. A mechanical pencil and eraser nearby. The sketch looks like it was drawn during a whiteboard session. Warm lighting, photorealistic. Shot from directly above.`,
  },
  // ─── NEW: Pagina 3 assets ───
  {
    name: "img-papieren-dossier",
    prompt: `Top-down photograph of a messy stack of paper documents on a dark wooden desk. The stack includes printouts, faxes, handwritten notes, forms with stamps, and a few yellow sticky notes. Some papers are slightly overlapping and at angles. This represents fragmented information across systems — the physical manifestation of data silos. A coffee cup stain is visible on one page. Warm lighting, photorealistic, slightly chaotic documentary feel. Shot from directly above.`,
  },
  {
    name: "img-observatie-notitie",
    prompt: `Top-down photograph of a small index card on a dark wooden desk. The card has a handwritten observation in Dutch with a blue pen: "Automatisch verwerkt betekent niet automatisch zonder handwerk." Below in smaller writing: "Grootste vertraging: uitzonderingen + overdrachten". The card has a small red exclamation mark drawn in the corner. Simple, sharp, insightful. Warm lighting, photorealistic. Shot from directly above.`,
  },
  // ─── NEW: Pagina 4 assets ───
  {
    name: "img-beslisregel",
    prompt: `Top-down photograph of a printed decision rule card (A5) on a dark wooden desk. Title: "BESLISREGEL — Buitenlandse spoedopname" in monospace type. Below is a decision tree: "Medisch noodzakelijk? ✓ → Polis actief? ✓ → Automatisch voorstel tot dekking". Exception rule in orange box: "Onvoldoende patiëntmatch → Menselijke validatie vereist". The card uses green for auto-approve paths and orange for escalation. Clean technical design with handwritten note "Voorbeeld regel #47". Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-audit-trail",
    prompt: `Top-down photograph of a printed audit log on a dark wooden desk. The log shows a vertical timeline of a case: "09:14 Document ontvangen", "09:15 Data geëxtraheerd (AI)", "09:16 Bron gecontroleerd", "09:17 Regel #47 toegepast", "09:22 Uitzondering → Mens beoordeeld", "09:45 Besluit gecommuniceerd". Each entry has a timestamp, actor (AI/Mens), and action. A small "AUDIT TRAIL" header in monospace. Green checkmarks next to completed steps. The design is clean and bureaucratic. Warm lighting, photorealistic. Shot from directly above.`,
  },
  // ─── NEW: Pagina 5 assets ───
  {
    name: "img-rolkaart-exception",
    prompt: `Top-down photograph of a professional role card (A5) on a dark wooden desk. Title: "ROLKAART — Exception Specialist" in bold sans-serif with orange (#FF4B28) accent line. Below are responsibilities in Dutch: "Beoordeelt complexe uitzonderingen", "Valideert onzekerheid", "Legt beslissingen uit aan klant", "Voedt feedback terug naar AI-modellen". A small person icon silhouette in the corner. The card has a modern HR/talent design feel with clean sections. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-rolkaart-steward",
    prompt: `Top-down photograph of a professional role card (A5) on a dark wooden desk. Title: "ROLKAART — Data & Model Steward" in bold sans-serif with orange (#FF4B28) accent line. Below are responsibilities: "Bewaakt datakwaliteit", "Monitort modelprestaties", "Analyseert correcties", "Beheert wijzigingen in beslisregels". A small data/chart icon in the corner. Modern HR card design. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-leiderschap-memo",
    prompt: `Top-down photograph of a short internal leadership memo on premium paper on a dark wooden desk. The memo has a subtle company watermark. Handwritten in confident, clean script: "Technologie verandert het werk. Eigenaarschap, verantwoordelijkheid en kwaliteit blijven menselijk belegd." Signed with initials and a date. The paper is slightly textured, high quality. A fountain pen rests beside it. Warm lighting, photorealistic, authoritative feel. Shot from directly above.`,
  },
  // ─── NEW: Pagina 6 assets ───
  {
    name: "img-cross-pillar",
    prompt: `Top-down photograph of a hand-drawn sketch on white paper on a dark wooden desk. The sketch shows a case flowing across three swim lanes labeled "Claims", "Communicatie", "B2B/B2I" with arrows crossing between them. Key handoff points are marked with orange (#FF4B28) circles. Annotations in Dutch: "Eén case, drie pijlers", "Hier moet orkestratie werken". The sketch is clean but hand-drawn, showing it was created during a design session. Blue pen with orange marker highlights. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-case-timeline",
    prompt: `Top-down photograph of a printed vertical timeline card (A5) on a dark wooden desk. Title: "CASE TIMELINE — HC-2030-004781". The timeline shows: "09:14 Document binnen", "09:15 Identiteit bevestigd", "09:16 Polis gekoppeld", "09:22 Uitzondering herkend", "09:25 Expert toegewezen", "09:48 Klant geïnformeerd", "10:15 Betaling voorbereid". Each step has a colored dot (green=AI, orange=hybrid, red=human). Clean professional design with orange accent. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-orchestratie",
    prompt: `Top-down photograph of a technical sketch on graph paper on a dark wooden desk. In the center is a rounded rectangle labeled "Case Coordinator / Orkestratie". Connected to it by lines are: "Kernsystemen", "AI Capabilities", "Medewerkers", "Partners", "Klantkanalen". The sketch shows how orchestration connects everything. Blue pen with some orange highlights for the central node. Clean engineering-style drawing. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-feedbackloop",
    prompt: `Top-down photograph of a simple circular diagram drawn on white paper on a dark wooden desk. The diagram shows: "Uitkomst → Correctie → Analyse → Regel/Model verbeteren → Opnieuw meten → Uitkomst" in a continuous loop. Orange (#FF4B28) arrows connect the steps. Title: "FEEDBACKLOOP — Continue verbetering". Clean, hand-drawn but neat style. A pen rests nearby. Warm lighting, photorealistic. Shot from directly above.`,
  },
  // ─── NEW: Pagina 7 assets ───
  {
    name: "img-ziekenhuis-factuur",
    prompt: `Top-down photograph of a hospital invoice/bill on a dark wooden desk. The invoice is from "HÔPITAL ÉDOUARD HERRIOT — LYON" with French headers. Shows patient "DE WINTER, Sophie", date of admission, itemized costs in euros (consultation, imagerie, séjour, bloc opératoire). A total of €4,847.50 at the bottom. Some handwritten annotations in blue pen translating key terms to Dutch. A paperclip and small yellow sticky note. The document looks official and slightly intimidating. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-ontslagverslag",
    prompt: `Top-down photograph of a French hospital discharge summary on a dark wooden desk. The document header reads "COMPTE RENDU DE SORTIE" with the hospital logo. The text is in French medical terminology. Key passages are highlighted in yellow: diagnosis, procedure performed, discharge date, follow-up care. A small handwritten Dutch translation note is clipped to the side: "Diagnose: appendicitis acuut, Operatie: laparoscopisch, Ontslag: 3 dagen". The document has an official medical feel. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-telefoon-transcript",
    prompt: `Top-down photograph of a printed phone call transcript on a dark wooden desk. Title: "TRANSCRIPT — Inkomend gesprek 14:23". The transcript shows a conversation between Sophie and the system: "Sophie: Ik bel over mijn ziekenhuisopname...", "Voice AI: Ik zie uw dossier. Een moment.", "→ Intent: Claimstatus", "→ Dossier: HC-2030-004781 geopend", "→ Overdracht naar Thomas V. (Claims specialist)". Color-coded: AI actions in teal, human in black. Clean monospace typography. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-duplicaat-alert",
    prompt: `Top-down photograph of a small alert card on a dark wooden desk. The card has a red/orange warning header: "⚠ DUPLICAATWAARSCHUWING" in bold sans-serif. Below: "Mogelijk dubbele ziekenhuisfactuur — 99,3% overeenkomst". Two document references side by side with matching amounts highlighted. A red "ACTIE VEREIST" label at the bottom. The card has a system-generated feel with clean, urgent design. Orange (#FF4B28) accent colors. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-klantbericht",
    prompt: `Top-down photograph of a smartphone screen mockup lying on a dark wooden desk. The screen shows a push notification / message from "Vanbreda Health Care": "Uw dossier is grotendeels beoordeeld. Voor één aanvullende factuur voeren we nog een controle uit. U hoeft voorlopig niets te doen." Below is a small status indicator showing "3 van 4 facturen verwerkt". The notification design is clean, modern, with orange (#FF4B28) accent. The phone is partially visible, showing it's a real device. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-betalingsoverzicht",
    prompt: `Top-down photograph of a printed payment summary card on a dark wooden desk. Title: "BETALINGSOVERZICHT — HC-2030-004781" in clean sans-serif. Shows a table: "Goedgekeurd: €3,215.00 ✓", "Afgewezen (comfortkost): €340.00 ✗", "Gereserveerd: €1,292.50 ⏳", "Dubbele betaling voorkomen: €4,847.50 🛡". Total at bottom. Green, red, orange, and blue color coding. A green "VERWERKT" stamp. Clean financial document design. Warm lighting, photorealistic. Shot from directly above.`,
  },
  // ─── NEW: Pagina 8 assets ───
  {
    name: "img-droom-uitvoering",
    prompt: `Top-down photograph of an elegant card on a dark wooden desk. The card reads: "VAN DROOM NAAR UITVOERING" in bold sans-serif type. Below in smaller text: "De architectuur, roadmap, businesscase en aanpak staan in onze formele RFI-beantwoording." An arrow icon points right. The card has orange (#FF4B28) accent colors and a clean, forward-looking design. Premium paper texture. Warm lighting, photorealistic. Shot from directly above.`,
  },
  {
    name: "img-ae-vanbreda-card",
    prompt: `Top-down photograph of a premium collaboration card on a dark wooden desk. The card shows "AE × Vanbreda" in elegant typography with both company logos subtly incorporated. Below in handwritten-style text: "Samen ontwerpen, bewijzen, leren en opschalen." The card has a warm, partnership feel — not corporate advertising but a genuine commitment. Orange (#FF4B28) and navy blue (#1A3D8F) accent colors. Premium thick paper with subtle texture. Warm lighting, photorealistic. Shot from directly above.`,
  },
];


async function generateImage(job: ImageJob) {
  console.log(`🎨 Generating: ${job.name}...`);

  const contents: any[] = [];

  if (job.inputImages) {
    for (const imgPath of job.inputImages) {
      if (fs.existsSync(imgPath)) {
        const imageData = fs.readFileSync(imgPath);
        const base64 = imageData.toString("base64");
        const mimeType = imgPath.endsWith(".png") ? "image/png" : imgPath.endsWith(".svg") ? "image/png" : "image/jpeg";
        contents.push({
          inlineData: { mimeType, data: base64 },
        });
        console.log(`   📎 Input image: ${imgPath}`);
      }
    }
  }

  contents.push({ text: job.prompt });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-image",
      contents: [{ role: "user", parts: contents }],
      config: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const ext = part.inlineData.mimeType?.includes("png") ? "png" : "png";
          const outPath = path.join(OUTPUT_DIR, `${job.name}.${ext}`);
          const buffer = Buffer.from(part.inlineData.data!, "base64");
          fs.writeFileSync(outPath, buffer);
          console.log(`   ✅ Saved: ${outPath} (${(buffer.length / 1024).toFixed(0)} KB)`);
          return outPath;
        }
      }
    }
    console.log(`   ⚠️ No image in response`);
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.text) console.log(`   💬 ${part.text.slice(0, 200)}`);
      }
    }
  } catch (err: any) {
    console.error(`   ❌ Error: ${err.message}`);
  }
}

async function main() {
  console.log("🖼️  Dossier 2030 — Cover Image Generator");
  console.log("==========================================\n");

  for (const job of jobs) {
    const outPath = path.join("public", `${job.name}.png`);
    if (fs.existsSync(outPath)) {
      console.log(`⏭️  Skipping ${job.name} — already exists`);
      continue;
    }
    await generateImage(job);
    console.log();
  }

  console.log("✅ Done! Check public/ for the generated images.");
}

main();
