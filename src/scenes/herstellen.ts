// Scene 6: Herstellen — De onzichtbare keten van zorg (Reveal + AE branding)
import type { SceneModule } from './types'

export const herstellen: SceneModule = {
  render() {
    return `
      <div class="scene-card scene-card--reveal">
        <div class="scene-header">
          <span class="scene-badge">Keten: Herstellen</span>
          <h2>De onzichtbare keten van zorg</h2>
        </div>
        
        <div class="chain-reveal-container" id="chain-reveal-container" style="display:flex;">
          <div class="chain-links-horizontal">
            <div class="chain-link-item"><span>Signaleren</span></div>
            <div class="chain-arrow">→</div>
            <div class="chain-link-item"><span>Begrijpen</span></div>
            <div class="chain-arrow">→</div>
            <div class="chain-link-item"><span>Begeleiden</span></div>
            <div class="chain-arrow">→</div>
            <div class="chain-link-item"><span>Verbinden</span></div>
            <div class="chain-arrow">→</div>
            <div class="chain-link-item"><span>Beslissen</span></div>
            <div class="chain-arrow">→</div>
            <div class="chain-link-item"><span>Ondersteunen</span></div>
            <div class="chain-arrow">→</div>
            <div class="chain-link-item"><span>Herstellen</span></div>
          </div>
          
          <div class="dream-grid">
            <div class="dream-col">
              <h3>Zichtbaar voor Sophie</h3>
              <ul>
                <li>Directe hulp op een kritiek moment</li>
                <li>Een Vlaamse huisdokter via Doktr — vanuit Frankrijk</li>
                <li>Eén assistent die alles orkestreert</li>
                <li>Communicatie in haar eigen taal</li>
                <li>Duidelijke keuzes en behoud van regie</li>
                <li>Menselijke aandacht wanneer nodig (Thomas belt)</li>
                <li>Jan verwittigd, vlucht geregeld, attest verstuurd</li>
              </ul>
            </div>
            <div class="dream-col">
              <h3>Achter de schermen (80% Autonomie)</h3>
              <ul>
                <li>Identiteit via itsme, polis via Assulink+</li>
                <li>Doktr-consult met doorverwijzing naar ziekenhuis</li>
                <li>CM (mutualiteit) → EZVK-coördinatie → aanvullende dekking</li>
                <li>Internationale coördinatie via Mutas</li>
                <li>Consent-driven gegevensdeling op elk moment</li>
                <li>STP-verwerking met menselijke escalatie bij uitzonderingen</li>
                <li>Arbeidsongeschiktheidsattest automatisch naar werkgever</li>
              </ul>
            </div>
          </div>
          
          <div class="dream-summary">
            <strong>Technologie die ge niet hoeft te zien. Steun die ge altijd voelt.</strong><br>
            In 2030 maakt het kanaal niet uit. Wat telt, is dat Vanbreda er is wanneer het erop aankomt — over grenzen heen.
          </div>
          
          <div class="final-ctas">
            <a class="scene-btn scene-btn--primary" href="/infographic-storyline.html" target="_blank" style="text-decoration:none; text-align:center; display:block;">
              📄 Bekijk de samenvatting
            </a>
            <button class="scene-btn" id="btn-close-experience">
              Sluit de experience
            </button>
          </div>
        </div>
      </div>`
  },

  bind(navigateForward, activeTimers, extra?: { openViewer?: () => void, resetToSplash?: () => void }) {
    void navigateForward
    void activeTimers

    document.getElementById('btn-close-experience')?.addEventListener('click', () => {
      extra?.resetToSplash?.()
    })
  }
}
