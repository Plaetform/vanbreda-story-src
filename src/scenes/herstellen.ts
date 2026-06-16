// Scene 6: Herstellen — De onzichtbare keten van zorg (Reveal)
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
                <li>Duidelijke keuzes en behoud van regie</li>
                <li>Communicatie in haar eigen taal</li>
                <li>Actuele status overal inzichtelijk</li>
                <li>Menselijke aandacht wanneer nodig</li>
              </ul>
            </div>
            <div class="dream-col">
              <h3>Achter de schermen (80% Autonomie)</h3>
              <ul>
                <li>Autonome agents die context uitwisselen</li>
                <li>Directe polis- en dekkingscontrole</li>
                <li>Zorgverlener- en partnerintegratie</li>
                <li>Slimme claimorkestratie</li>
                <li>Menselijke uitzonderingafhandeling</li>
              </ul>
            </div>
          </div>
          
          <div class="dream-summary">
            <strong>Technologie die je niet hoeft te zien. Steun die je altijd voelt.</strong><br>
            Bij Vanbreda sta je nooit alleen.
          </div>
          
          <div class="final-ctas">
            <a class="scene-btn scene-btn--primary" href="/vanbreda-healthcaroperatie.pdf" download id="btn-download-rfi">
              Open onze RFI-beantwoording
            </a>
            <button class="scene-btn scene-btn--secondary" id="btn-view-dossier-details">
              Bekijk de droom in één overzicht
            </button>
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

    document.getElementById('btn-view-dossier-details')?.addEventListener('click', () => {
      extra?.openViewer?.()
    })

    document.getElementById('btn-close-experience')?.addEventListener('click', () => {
      extra?.resetToSplash?.()
    })
  }
}
