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
