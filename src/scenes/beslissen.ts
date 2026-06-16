// Scene 4: Beslissen — Sophie krijgt regie (Volgende stappen overzicht)
import type { SceneModule } from './types'

export const beslissen: SceneModule = {
  render() {
    return `
      <div class="scene-card scene-card--split">
        <div class="scene-info">
          <span class="scene-badge">Keten: Beslissen</span>
          <h2>Sophie krijgt regie</h2>
          <p>Sophie krijgt een helder, geconsolideerd overzicht van haar dossierstatus. De app stelt proactief acties voor, maar zij behoudt de controle.</p>
          <blockquote class="scene-quote" style="font-family: var(--font-serif); font-style: italic; margin-top: 15px; border-left: 2px solid var(--c-teal); padding-left: 15px; font-size: 13px;">
            "De droom is dat Sophie nooit zelf hoeft uit te zoeken wat de volgende stap is."
          </blockquote>
        </div>
        <div class="scene-display">
          <div class="phone-frame">
            <div class="phone-header">
              <span class="phone-time">11:30</span>
              <span class="phone-signals">📶🔋</span>
            </div>
            <div class="phone-title">Jouw Volgende Stappen</div>
            <div class="phone-scroll">
              <div class="steps-list">
                <div class="step-item step-item--done">
                  <div class="step-checkbox">✓</div>
                  <div class="step-content">
                    <h4>Medische operatie</h4>
                    <p>Goedgekeurd en gedekt.</p>
                  </div>
                </div>
                <div class="step-item step-item--pending">
                  <div class="step-checkbox">⚡</div>
                  <div class="step-content">
                    <h4>Radiologiefactuur</h4>
                    <p>In controle door Thomas. Geen actie nodig.</p>
                  </div>
                </div>
                <div class="step-item step-item--action" id="step-flights-item">
                  <div class="step-checkbox">?</div>
                  <div class="step-content">
                    <h4>Terugreis voorbereiden</h4>
                    <p>Wil je dat we vluchtopties voorbereiden?</p>
                    <div class="step-actions" id="scene-5-actions">
                      <button class="step-btn" id="btn-prep-flights" style="padding: 5px 10px; font-size: 10px;">Ja, bereid voor</button>
                    </div>
                  </div>
                </div>
                <div class="step-item">
                  <div class="step-checkbox">○</div>
                  <div class="step-content">
                    <h4>Afwezigheidsattest</h4>
                    <p>Neutrale afwezigheidsbevestiging.</p>
                    <button class="step-btn step-btn--small" id="btn-download-cert" style="background:#555;">Download PDF</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="margin-top: 12px; text-align: right; width: 100%; display: none;" id="scene-5-next-container">
            <button class="scene-btn scene-btn--primary" id="btn-to-scene-5" style="width: 100%; justify-content: center;">Ga naar terugreis →</button>
          </div>
        </div>
      </div>`
  },

  bind(navigateForward, activeTimers) {
    void activeTimers // not used in this scene
    const btnPrep = document.getElementById('btn-prep-flights')
    const actionItem = document.getElementById('step-flights-item')
    const nextContainer = document.getElementById('scene-5-next-container')

    btnPrep?.addEventListener('click', () => {
      if (btnPrep) {
        btnPrep.textContent = 'Opties voorbereid ✓'
        btnPrep.style.background = '#2ecc71'
        btnPrep.setAttribute('disabled', 'true')
      }
      if (actionItem) {
        actionItem.classList.remove('step-item--action')
        actionItem.classList.add('step-item--done')
        const box = actionItem.querySelector('.step-checkbox')
        if (box) box.textContent = '✓'
      }
      if (nextContainer) nextContainer.style.display = 'block'
    })

    document.getElementById('btn-to-scene-5')?.addEventListener('click', () => {
      navigateForward()
    })
  }
}
