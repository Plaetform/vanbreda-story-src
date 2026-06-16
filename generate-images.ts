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
    prompt: `Scan of a handwritten personal letter on light cream stationery, white background. The letter is written in neat but personal Dutch handwriting with a blue pen. At the top: "Lyon, 15 juni 2030". The text reads: "Lieve Vanbreda, Ik schrijf dit vanuit het ziekenhuis in Lyon. Ik werd onverwacht opgenomen tijdens een zakenreis. Ik ben bang en ver van huis. Dit is wat ik nodig heb: Ik wil mijn verhaal maar één keer hoeven vertellen. Ik wil weten waar ik aan toe ben. Ik wil niet zelf hoeven coördineren. Ik wil duidelijkheid, ook als het complex is. Zorg alsjeblieft goed voor mij. Sophie De Winter". The letter is signed with a natural signature. The stationery has a subtle watermark. Clean scan, white background, no desk. Emotional, personal, authentic feel.`,
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
    prompt: `Clean scan of a printed persona card (A5 landscape) on a plain white background. The card shows "SOPHIE DE WINTER" in bold sans-serif type at the top. Below are structured fields: Leeftijd: 41, Woonplaats: Brasschaat, Beroep: Marketing Director, Werkgever: Pharma International, Taal: Nederlands / Frans, Voorkeurskanaal: App + telefoon, Verwachtingen: "Eén contactpunt, geen herhaling", Zorgen: "Privacy, snelheid, duidelijkheid". Orange accent color (#FF4B28) for headers and section dividers. A small silhouette avatar placeholder in top-right. Clean modern card design with rounded corners. Flat scan, no shadows, white background.`,
  },
  {
    name: "img-zakenreis",
    prompt: `Top-down flat lay photograph on a light grey surface showing items suggesting a business trip: a congress badge lanyard reading "PHARMA SUMMIT LYON 2030 — Sophie De Winter, Pharma International", a hotel key card from "Grand Hôtel Lyon", a boarding pass stub "BRU → LYS", and a small notebook. The items are casually arranged. Everything looks normal and routine. Warm natural lighting, photorealistic, editorial lifestyle feel. Shot from directly above on a clean light surface.`,
  },
  {
    name: "img-klantvragen",
    prompt: `Scan of a small yellow notepad page on a white background. Handwritten in blue pen are worried customer questions in Dutch: "Ben ik verzekerd in het buitenland?", "Wie moet ik bellen?", "Welke documenten heeft Vanbreda nodig?", "Moet ik zelf voorschieten?", "Kan mijn werkgever mijn medische gegevens zien?". The handwriting is slightly unsteady, suggesting stress. A few words are underlined. The notepad has a slight tear at the top. Clean white background, flat scan style.`,
  },
  // ─── NEW: Pagina 2 assets ───
  {
    name: "img-voice-ai-stats",
    prompt: `Clean scan of a printed mini-dashboard card (A5) on a white background. Title: "VOICE AI — PRODUCTIERESULTATEN" in clean sans-serif type. Shows key metrics in large bold numbers with orange (#FF4B28) accent: "~80%" labeled "Calls via Voice AI", "95%" labeled "Routeringsnauwkeurigheid". Below: small bar charts showing monthly trend. Labels: "Meertalig", "Intentherkenning actief", "Contextverrijking operationeel". A small green trend arrow. Modern data-viz card design. Flat scan, white background, no desk.`,
  },
  {
    name: "img-claims-stp",
    prompt: `Clean scan of a printed results card (A5) on a white background. Title: "CLAIMS — STP PERFORMANCE" in bold sans-serif. Large orange (#FF4B28) number "55%" dominates the card, labeled "Volumegewogen STP". Below: "±200.000 claims/maand", "Digitale intake actief", "OCR-capability". A small donut chart shows the STP vs manual ratio. Professional dashboard aesthetic. Flat scan, white background, no desk.`,
  },
  {
    name: "img-b2b-stp",
    prompt: `Clean scan of a printed results card (A5) on a white background. Title: "B2B/B2I — AANSLUITINGEN" in bold sans-serif. Large orange (#FF4B28) number "~87%" labeled "STP Aansluitingen". Below: "Digitale interfaces", "Partnerprocessen", "Beheermutaties". A horizontal bar chart shows partner categories. Clean modern data card design. Flat scan, white background, no desk.`,
  },
  {
    name: "img-intent-classifier",
    prompt: `Clean scan of a printed screenshot mockup on a white background. The screenshot shows an intent classification UI. At top: incoming message "Ik bel over mijn ziekenhuisopname in Lyon — Sophie De Winter". Below: detected intent "Claimstatus opvragen" with 94% confidence badge. Suggested routing: "Claims team → Dossier HC-2030-004781". Context block showing: "Polis: VB-HC-89247, Werkgever: Pharma International, Status: In behandeling". Orange (#FF4B28) accents. A handwritten annotation "Dit werkt al!" in margin. Flat scan, white background.`,
  },
  {
    name: "img-rpa-schets",
    prompt: `Scan of a hand-drawn technical sketch on graph paper, white background. The sketch shows a simple integration flow: "Voice AI → Classifier → RPA → Kernapplicatie" with boxes connected by arrows. Side annotations in blue pen: "Losse capabilities", "Niet end-to-end verbonden". Red question marks between arrows indicating gaps. A mechanical pencil line style. The sketch looks like it was drawn during a whiteboard session. Flat scan on white background.`,
  },
  // ─── NEW: Pagina 3 assets ───
  {
    name: "img-papieren-dossier",
    prompt: `Top-down photograph of a messy stack of paper documents on a light grey surface. The stack includes printouts, a fax with "DE WINTER, S." visible, handwritten notes, forms with stamps, and yellow sticky notes reading "Nog checken" and "Welk systeem?". Papers slightly overlapping at angles. One visible form shows "Polisnr: VB-HC-89247". This represents fragmented information — the physical manifestation of data silos. A coffee cup stain on one page. Photorealistic, slightly chaotic documentary feel. Shot from directly above.`,
  },
  {
    name: "img-observatie-notitie",
    prompt: `Scan of a small white index card on a white background. Handwritten observation in Dutch with a blue pen: "Automatisch verwerkt betekent niet automatisch zonder handwerk." Below in smaller writing: "Grootste vertraging: uitzonderingen + overdrachten". A small red exclamation mark drawn in the corner. Simple, sharp, insightful. Clean scan, white background.`,
  },
  // ─── NEW: Pagina 4 assets ───
  {
    name: "img-beslisregel",
    prompt: `Clean scan of a printed decision rule card (A5) on a white background. Title: "BESLISREGEL #47 — Buitenlandse spoedopname" in monospace type. Below is a structured decision tree: "Patiënt: Sophie De Winter (VB-HC-89247). Medisch noodzakelijk? ✓ → Polis actief? ✓ → Automatisch voorstel tot dekking". Exception rule in orange (#FF4B28) box: "Onvoldoende patiëntmatch → Menselijke validatie vereist". Green for auto-approve, orange for escalation. Handwritten note: "Toegepast op HC-2030-004781". Flat scan, white background.`,
  },
  {
    name: "img-audit-trail",
    prompt: `Clean scan of a printed audit log on a white background. Header: "AUDIT TRAIL — Dossier HC-2030-004781 — Sophie De Winter". Vertical timeline: "09:14 Document ontvangen (AI)", "09:15 Data geëxtraheerd — OCR (AI)", "09:16 Bron gecontroleerd — polis VB-HC-89247 (AI)", "09:17 Regel #47 toegepast (AI)", "09:22 Uitzondering → Thomas V. beoordeelt (Mens)", "09:45 Besluit gecommuniceerd aan Sophie (AI+Mens)". Each entry has timestamp, actor tag, and action. Green checkmarks. Clean bureaucratic design. Flat scan, white background.`,
  },
  // ─── NEW: Pagina 5 assets ───
  {
    name: "img-rolkaart-exception",
    prompt: `Clean scan of a professional role card (A5) on a white background. Title: "ROLKAART — Exception Specialist" in bold sans-serif with orange (#FF4B28) accent line at top. Responsibilities listed: "• Beoordeelt complexe uitzonderingen", "• Valideert bij onzekerheid (confidence < 85%)", "• Legt beslissingen uit aan klant", "• Voedt feedback terug naar AI-modellen", "• Escaleert bij gevoelige context". A silhouette person icon in corner. Example: "Thomas V. — Team Claims, Vanbreda". Modern HR card design. Flat scan, white background.`,
  },
  {
    name: "img-rolkaart-steward",
    prompt: `Clean scan of a professional role card (A5) on a white background. Title: "ROLKAART — Data & Model Steward" in bold sans-serif with orange (#FF4B28) accent line. Responsibilities: "• Bewaakt datakwaliteit en volledigheid", "• Monitort modelprestaties en drift", "• Analyseert correcties door exception specialists", "• Beheert wijzigingen in beslisregels", "• Rapporteert aan process owner". A data/chart icon in corner. Modern HR card design. Flat scan, white background.`,
  },
  {
    name: "img-leiderschap-memo",
    prompt: `Scan of a short internal memo on premium cream stationery, white background. Handwritten in confident, clean script: "Technologie verandert het werk. Eigenaarschap, verantwoordelijkheid en kwaliteit blijven menselijk belegd." Signed with initials and date "juni 2030". The paper has subtle texture. A small "VERTROUWELIJK" watermark. Clean scan, white background, no desk.`,
  },
  // ─── NEW: Pagina 6 assets ───
  {
    name: "img-cross-pillar",
    prompt: `Scan of a hand-drawn sketch on white paper. The sketch shows one case (labeled "HC-2030-004781 — Sophie") flowing across three horizontal swim lanes labeled "Claims", "Communicatie", "B2B/B2I" with arrows crossing between them. Key handoff points marked with orange (#FF4B28) circles. Annotations: "Eén case, drie pijlers", "Hier moet orkestratie werken". Clean but hand-drawn, blue pen with orange marker highlights. Flat scan, white background.`,
  },
  {
    name: "img-case-timeline",
    prompt: `Clean scan of a printed vertical timeline card (A5) on a white background. Title: "CASE TIMELINE — HC-2030-004781 — Sophie De Winter". Timeline: "09:14 Document binnen — ziekenhuisfactuur Lyon", "09:15 Identiteit bevestigd — Sophie De Winter, VB-HC-89247", "09:16 Polis gekoppeld — Pharma International", "09:22 Uitzondering herkend — buitenlandse code", "09:25 Expert toegewezen — Thomas V.", "09:48 Klant geïnformeerd — pushbericht", "10:15 Betaling voorbereid". Colored dots: green=AI, orange=hybrid, red=human. Clean design, orange accent. Flat scan, white background.`,
  },
  {
    name: "img-orchestratie",
    prompt: `Scan of a technical sketch on graph paper, white background. Center: rounded rectangle labeled "Case Coordinator / Orkestratie". Connected by lines to: "Kernsystemen", "AI Capabilities", "Medewerkers", "Partners", "Klantkanalen". Orange highlight for central node. Blue pen, engineering-style drawing. Annotation: "Verbindt alles rondom Sophie's case". Clean scan, white background.`,
  },
  {
    name: "img-feedbackloop",
    prompt: `Scan of a simple circular diagram on white paper, white background. The loop: "Uitkomst → Correctie → Analyse → Regel/model verbeteren → Opnieuw meten" returning to "Uitkomst". Orange (#FF4B28) arrows connect steps. Title: "FEEDBACKLOOP — Continue verbetering". Clean, hand-drawn but neat. Annotation: "Elke correctie maakt het systeem beter". Flat scan, white background.`,
  },
  // ─── NEW: Pagina 7 assets ───
  {
    name: "img-ziekenhuis-factuur",
    prompt: `Clean scan of a hospital invoice on a white background. Header: "HÔPITAL ÉDOUARD HERRIOT — LYON — FACTURE". Patient: "Nom: DE WINTER, Sophie", "Date de naissance: 12-03-1989", "Date d'admission: 15-06-2030". Itemized costs in euros: Consultation €185, Imagerie (radiologie) €420, Séjour (3 nuits) €2.340, Bloc opératoire €1.562,50, Pharmacie €340. Total: €4.847,50. Official hospital invoice design with French headers. A small handwritten annotation in blue pen: "Vertaling nodig". Flat scan, white background, no desk.`,
  },
  {
    name: "img-ontslagverslag",
    prompt: `Clean scan of a French hospital discharge summary on a white background. Header: "COMPTE RENDU DE SORTIE — Hôpital Édouard Herriot, Lyon". Patient: "Mme DE WINTER, Sophie, née le 12-03-1989". Key passages highlighted in yellow: "Diagnostic: appendicite aiguë", "Intervention: appendicectomie laparoscopique", "Date de sortie: 18-06-2030", "Suivi: contrôle à J+10". A clipped Dutch translation note: "Diagnose: appendicitis acuut, Operatie: laparoscopisch, Ontslag: 3 dagen na opname". Official medical document. Flat scan, white background.`,
  },
  {
    name: "img-telefoon-transcript",
    prompt: `Clean scan of a printed phone call transcript on a white background. Header: "TRANSCRIPT — Inkomend gesprek 14:23 — 16-06-2030". The transcript shows: "Sophie De Winter: Ik bel over mijn ziekenhuisopname in Lyon...", "Voice AI: Ik zie uw dossier HC-2030-004781. Een moment alstublieft.", "→ Intent herkend: Claimstatus (94%)", "→ Polis VB-HC-89247 actief", "→ Overdracht naar Thomas V. (Claims specialist)". Color-coded: AI actions in teal, human speech in black. Clean monospace typography. Flat scan, white background.`,
  },
  {
    name: "img-duplicaat-alert",
    prompt: `Clean scan of a system alert card on a white background. Orange/red warning header: "⚠ DUPLICAATWAARSCHUWING — Dossier HC-2030-004781". Body: "Patiënt: Sophie De Winter. Mogelijk dubbele ziekenhuisfactuur — 99,3% overeenkomst. Factuur 1: Hôpital Herriot €4.847,50 (15-06-2030). Factuur 2: Hôpital Herriot €4.847,50 (15-06-2030). ACTIE VEREIST — Handmatige verificatie door Thomas V." Orange (#FF4B28) accent colors. System-generated urgent design. Flat scan, white background.`,
  },
  {
    name: "img-klantbericht",
    prompt: `Clean mockup of a smartphone notification on a white background. The notification is from "Vanbreda Health Care" with a small orange logo. Message: "Beste Sophie, uw dossier HC-2030-004781 is grotendeels beoordeeld. Voor één aanvullende factuur voeren we nog een controle uit. U hoeft voorlopig niets te doen. Zodra alles is afgerond, informeren wij u." Below: status bar "3 van 4 facturen verwerkt ●●●○". Clean modern notification design with orange (#FF4B28) accent. White background, flat mockup style.`,
  },
  {
    name: "img-betalingsoverzicht",
    prompt: `Clean scan of a printed payment summary on a white background. Title: "BETALINGSOVERZICHT — HC-2030-004781 — Sophie De Winter". Table: "Spoedopname Lyon — Goedgekeurd: €3.215,00 ✓ (groen)", "Comfortkost — Afgewezen (niet gedekt): €340,00 ✗ (rood)", "Radiologie — Gereserveerd (patiëntmatch vereist): €1.292,50 ⏳ (oranje)", "Dubbele factuur — Betaling voorkomen: €4.847,50 🛡 (blauw)". Netto uitbetaling: €3.215,00. A green "VERWERKT" stamp. Clean financial document. Flat scan, white background.`,
  },
  // ─── NEW: Pagina 8 assets ───
  {
    name: "img-droom-uitvoering",
    prompt: `Clean scan of an elegant card on a white background. The card reads: "VAN DROOM NAAR UITVOERING" in bold sans-serif type. Below: "De architectuur, roadmap, businesscase en aanpak staan in onze formele RFI-beantwoording. Dit dossier toont wat Sophie ervaart. Het voorstel beschrijft hoe we dat realiseren." An arrow icon points right. Orange (#FF4B28) accent colors. Premium paper feel. Flat scan, white background.`,
  },
  {
    name: "img-ae-vanbreda-card",
    prompt: `Create a premium collaboration card on a clean white background. Use the provided logo (this is the AE logo) in the bottom-left of the card. Add "Vanbreda" text next to it in matching dark navy typography. At the top: "AE × Vanbreda" in elegant bold serif typography. Below in handwritten-style italic text: "Samen ontwerpen, bewijzen, leren en opschalen." A thin orange (#FF4B28) accent line separates the title from the tagline. Premium cream-colored thick paper texture with subtle rounded corners. Clean, minimal, partnership-focused design. Flat scan on white background.`,
    inputImages: ["public/ae-logo.png"],
  },
  // ─── Pagina 8: Sophie lifestyle photos (consistent character) ───
  {
    name: "img-sophie-business",
    prompt: `Same woman as in the reference photo. Professional photograph of this European woman in her early 40s with light brown shoulder-length hair, standing in a modern office. She wears a smart casual blazer over a navy blouse, smiling confidently. Glass walls, green plants, natural light. She is presenting to colleagues in a meeting room. Corporate lifestyle photography, warm natural tones, shallow depth of field. She looks healthy, energetic, successful.`,
    inputImages: ["public/img-sophie-family.png"],
  },
  {
    name: "img-sophie-travel",
    prompt: `Same woman as in the reference photo. Candid travel photograph of this European woman in her early 40s with light brown shoulder-length hair, walking through an airport terminal with a carry-on suitcase. She wears casual chic travel clothes and is checking her phone with a relaxed smile. Morning light through large terminal windows. She looks confident and happy, a frequent traveler. Editorial travel photography, warm tones.`,
    inputImages: ["public/img-sophie-family.png"],
  },
  {
    name: "img-sophie-cafe",
    prompt: `Same woman as in the reference photo. Warm photograph of this European woman in her early 40s with light brown shoulder-length hair, sitting at a sunny terrace café with a coffee and a book. She's looking up from the book, smiling at someone approaching. Autumn light, European city setting, trees with golden leaves. She looks relaxed, healthy, content. Lifestyle photography, warm golden tones, natural bokeh.`,
    inputImages: ["public/img-sophie-family.png"],
  },
  {
    name: "img-sophie-garden",
    prompt: `Same woman as in the reference photo. Gentle photograph of this European woman in her early 40s with light brown shoulder-length hair, in a garden with her children. She's kneeling beside a small vegetable patch, laughing with a child holding a tomato. Soft afternoon light, lush green garden in a Belgian suburb. She looks healthy, grounded, present. Natural family photography, warm tones, authentic moment.`,
    inputImages: ["public/img-sophie-family.png"],
  },
  // ─── Scene Backgrounds (16:9, clean dark atmospheric) ───
  {
    name: "bg-signaleren",
    prompt: `Create a wide 16:9 dark atmospheric background image (1920x1080). Clean dark surface with deep navy-teal gradient. Subtle blurred city lights (Lyon at night) visible in the far background, very out of focus. No text, no logos, no people. Premium, minimal, moody. Dark enough to overlay white text and UI elements on top.`,
  },
  {
    name: "bg-begrijpen",
    prompt: `Create a wide 16:9 dark atmospheric background image (1920x1080). Clean dark navy-black surface with very subtle teal-colored geometric network lines suggesting AI and data processing. Abstract, minimal. No text, no logos, no people. Premium dark UI background suitable for overlaying white interface elements.`,
  },
  {
    name: "bg-begeleiden",
    prompt: `Create a wide 16:9 dark atmospheric background image (1920x1080). Clean dark surface with a very subtle warm glow in the center suggesting hospital corridor lighting — abstract, not a literal photograph. Deep navy base with subtle warm amber accent. No text, no logos, no people. Premium, warm, caring.`,
  },
  {
    name: "bg-verbinden",
    prompt: `Create a wide 16:9 dark atmospheric background image (1920x1080). Clean dark surface with a subtle golden sunrise gradient on the right side, suggesting morning and hope. Deep navy base fading to warm amber at one edge. No text, no logos, no people. Premium, hopeful, human connection.`,
  },
  {
    name: "bg-beslissen",
    prompt: `Create a wide 16:9 dark atmospheric background image (1920x1080). Clean dark surface with subtle teal geometric lines suggesting organization and structure — like a faint grid or dashboard wireframe in the background. Deep navy base. No text, no logos, no people. Premium, organized, clear.`,
  },
  {
    name: "bg-ondersteunen",
    prompt: `Create a wide 16:9 dark atmospheric background image (1920x1080). Clean dark surface with a subtle warm gradient suggesting travel and departure — hint of sunset orange on the horizon line. Deep navy base. No text, no logos, no people. Premium, hopeful, journey home.`,
  },
  {
    name: "bg-herstellen",
    prompt: `Create a wide 16:9 dark atmospheric background image (1920x1080). Clean dark surface with subtle warm light spots suggesting a cozy home — abstract, not a literal photograph. Deep navy base with gentle warm amber glow spots. No text, no logos, no people. Premium, warm, homecoming, safe.`,
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
