// Scene 5: Ondersteunen — Veilig naar huis & Nazorg
import type { SceneModule } from './types'

export const ondersteunen: SceneModule = {
  render() {
    return `
      <div class="scene-card scene-card--split">
        <div class="scene-info">
          <span class="scene-badge">Keten: Ondersteunen</span>
          <h2>Veilig naar huis &amp; Nazorg</h2>
          <p>Sophie is reisgeschikt verklaard. De app biedt de vluchtopties aan en coördineert de nazorg met haar huisarts in België na haar toestemming.</p>
          <blockquote class="scene-quote" style="font-family: var(--font-serif); font-style: italic; margin-top: 15px; border-left: 2px solid var(--c-teal); padding-left: 15px; font-size: 13px;">
            "De keten eindigt niet wanneer de claim is verwerkt. Zij eindigt wanneer Sophie weer verder kan."
          </blockquote>
        </div>
        <div class="scene-display">
          <div class="phone-frame">
            <div class="phone-header">
              <span class="phone-time">14:15</span>
              <span class="phone-signals">📶🔋</span>
            </div>
            <div class="phone-title">Terugreis &amp; Nazorg</div>
            <div class="phone-scroll">
              <div class="flight-section" id="flight-section">
                <h3>Vluchtopties naar Brussel</h3>
                <div class="flight-card flight-card--selected" id="flight-1">
                  <div class="flight-logo">✈️</div>
                  <div class="flight-details">
                    <strong>Brussels Airlines (10:15)</strong>
                    <span class="flight-badge">Met medische assistentie</span>
                  </div>
                </div>
                <div class="flight-card" id="flight-2">
                  <div class="flight-logo">✈️</div>
                  <div class="flight-details">
                    <strong>EasyJet (14:30)</strong>
                  </div>
                </div>
                <button class="step-btn" id="btn-book-flight" style="width:100%; margin-top:5px; font-size:10px;">Bevestig Boeking</button>
              </div>
              
              <div class="aftercare-section" style="margin-top:15px; border-top:1px solid #ddd; padding-top:10px; display:none;" id="aftercare-section">
                <h3>Nazorgkoppeling</h3>
                <p class="section-desc" style="font-size:9px; color:#666; margin-bottom:8px;">Deel ontslagverslag met huisarts:</p>
                <div class="consent-box" style="margin-bottom:8px; padding:6px; border:1px solid #ddd; border-radius:4px; background:#fff;">
                  <label class="consent-label" style="display:flex; gap:6px; font-size:9.5px; align-items:center;">
                    <input type="checkbox" id="consent-gp-check">
                    <span>Deel met dr. Martens (België)</span>
                  </label>
                </div>
                <button class="step-btn" id="btn-confirm-aftercare" style="width:100%; font-size:10px;" disabled>Bevestig &amp; Deel</button>
              </div>
            </div>
          </div>
          <div style="margin-top: 12px; text-align: right; width: 100%; display: none;" id="scene-6-next-container">
            <button class="scene-btn scene-btn--primary" id="btn-to-scene-6" style="width: 100%; justify-content: center;">Drie maanden later... →</button>
          </div>
        </div>
      </div>`
  },

  bind(navigateForward, activeTimers) {
    void activeTimers // not used in this scene
    const flight1 = document.getElementById('flight-1')
    const flight2 = document.getElementById('flight-2')
    const btnBook = document.getElementById('btn-book-flight')
    const aftercare = document.getElementById('aftercare-section')
    const gpCheck = document.getElementById('consent-gp-check') as HTMLInputElement | null
    const btnConfirm = document.getElementById('btn-confirm-aftercare')
    const nextContainer = document.getElementById('scene-6-next-container')

    flight1?.addEventListener('click', () => {
      flight1.classList.add('flight-card--selected')
      flight2?.classList.remove('flight-card--selected')
    })

    flight2?.addEventListener('click', () => {
      flight2.classList.add('flight-card--selected')
      flight1?.classList.remove('flight-card--selected')
    })

    btnBook?.addEventListener('click', () => {
      if (btnBook) {
        btnBook.textContent = 'Vlucht geboekt ✓'
        btnBook.style.background = '#2ecc71'
        btnBook.setAttribute('disabled', 'true')
      }
      if (aftercare) aftercare.style.display = 'block'
    })

    gpCheck?.addEventListener('change', () => {
      if (btnConfirm) {
        if (gpCheck.checked) {
          btnConfirm.removeAttribute('disabled')
        } else {
          btnConfirm.setAttribute('disabled', 'true')
        }
      }
    })

    btnConfirm?.addEventListener('click', () => {
      if (btnConfirm) {
        btnConfirm.textContent = 'Gedeeld & Geactiveerd ✓'
        btnConfirm.style.background = '#2ecc71'
        btnConfirm.setAttribute('disabled', 'true')
      }
      if (gpCheck) gpCheck.setAttribute('disabled', 'true')
      if (nextContainer) nextContainer.style.display = 'block'
    })

    document.getElementById('btn-to-scene-6')?.addEventListener('click', () => {
      navigateForward()
    })
  }
}
