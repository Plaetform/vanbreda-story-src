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
                <li>Eén gesprek met haar eigen assistent</li>
                <li>Communicatie in haar eigen taal</li>
                <li>Duidelijke keuzes en behoud van regie</li>
                <li>Menselijke aandacht wanneer nodig</li>
                <li>Jan verwittigd, vlucht geregeld, huisdokter geïnformeerd</li>
              </ul>
            </div>
            <div class="dream-col">
              <h3>Achter de schermen (80% Autonomie)</h3>
              <ul>
                <li>Sophie's assistent als orkestrator van haar ecosysteem</li>
                <li>Vanbreda als betrouwbare schakel via MCP/A2A</li>
                <li>Autonome agents die context uitwisselen</li>
                <li>Directe polis- en dekkingscontrole via gestandaardiseerde koppelingen</li>
                <li>Zorgverlener- en partnerintegratie</li>
                <li>Internationaal partnernetwerk voor grensoverschrijdende zorg</li>
                <li>Menselijke escalatie wanneer oordeel of empathie vereist is</li>
              </ul>
            </div>
          </div>
          
          <div class="dream-summary">
            <strong>Technologie die ge niet hoeft te zien. Steun die ge altijd voelt.</strong><br>
            In 2030 maakt het kanaal niet uit. Wat telt, is dat Vanbreda er is wanneer het erop aankomt — over grenzen heen.
          </div>
          
          <div class="final-ctas">
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
