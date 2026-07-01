// Scene 4: Beslissen — Sophie's assistent geeft regie (Volgende stappen)
import type { SceneModule } from './types'

export const beslissen: SceneModule = {
  render() {
    return `
      <div class="scene-card scene-card--split">
        <div class="scene-info">
          <span class="scene-badge">Keten: Beslissen</span>
          <h2>Sophie krijgt regie</h2>
          <p>Sophie's assistent brengt alles samen in een helder overzicht. De assistent kent haar voorkeuren, haar gezinssituatie en stelt proactief acties voor — maar Sophie behoudt altijd de controle.</p>
          <blockquote class="scene-quote" style="font-family: var(--font-serif); font-style: italic; margin-top: 15px; border-left: 2px solid #ff8c00; padding-left: 15px; font-size: 13px;">
            "Sophie hoeft nooit zelf uit te zoeken wat de volgende stap is."
          </blockquote>
        </div>
        <div class="scene-display">
          <div class="phone-frame">
            <div class="phone-header">
              <span class="phone-time">11:30</span>
              <span class="phone-signals">📶🔋</span>
            </div>
            <div class="phone-title">Uw Volgende Stappen</div>
            <div class="phone-scroll">
              <div class="steps-list">
                <div class="step-item step-item--done">
                  <div class="step-checkbox">✓</div>
                  <div class="step-content">
                    <h4>Medische operatie</h4>
                    <p>Goedgekeurd en gedekt via Vanbreda.</p>
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
                    <p>Zal ik vluchtopties opvragen?</p>
                    <div class="step-actions" id="scene-5-actions">
                      <button class="step-btn" id="btn-prep-flights" style="padding: 5px 10px; font-size: 10px;">Ja, zoek opties</button>
                    </div>
                  </div>
                </div>
                <div class="step-item step-item--action" id="step-jan-item">
                  <div class="step-checkbox">?</div>
                  <div class="step-content">
                    <h4>Jan verwittigen</h4>
                    <p>Zal ik Jan een update sturen over uw toestand en verwachte terugkeer?</p>
                    <div class="step-actions" id="scene-5-jan-actions">
                      <button class="step-btn" id="btn-notify-jan" style="padding: 5px 10px; font-size: 10px;">Ja, verwittig Jan</button>
                    </div>
                  </div>
                </div>
                <div class="step-item">
                  <div class="step-checkbox">○</div>
                  <div class="step-content">
                    <h4>Arbeidsongeschiktheidsattest</h4>
                    <p>Automatisch verstuurd naar uw werkgever. Neutraal, zonder medische details.</p>
                    <span style="font-size:10px; color:#4caf50; font-weight:600;">✓ Verstuurd naar HR</span>
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
    void activeTimers
    const btnPrep = document.getElementById('btn-prep-flights')
    const actionItem = document.getElementById('step-flights-item')
    const btnJan = document.getElementById('btn-notify-jan')
    const janItem = document.getElementById('step-jan-item')
    const nextContainer = document.getElementById('scene-5-next-container')

    let flightsDone = false
    let janDone = false

    // Auto-scroll the phone container to show all items including the attest at the bottom
    const scrollContainer = document.querySelector('.phone-scroll') as HTMLElement | null
    const scrollToBottom = () => {
      if (scrollContainer) {
        setTimeout(() => {
          scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' })
        }, 300)
      }
    }

    // On load: slowly scroll down to reveal all items, then back up
    if (scrollContainer) {
      activeTimers.push(setTimeout(() => {
        const totalHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight
        if (totalHeight > 0) {
          // Scroll down slowly
          scrollContainer.scrollTo({ top: totalHeight, behavior: 'smooth' })
          // After reaching the bottom, scroll back up
          activeTimers.push(setTimeout(() => {
            scrollContainer.scrollTo({ top: 0, behavior: 'smooth' })
          }, 2500))
        }
      }, 1500))
    }

    const checkShowNext = () => {
      if (flightsDone && janDone && nextContainer) {
        nextContainer.style.display = 'block'
        scrollToBottom()
      }
    }

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
      flightsDone = true
      scrollToBottom()
      checkShowNext()
    })

    btnJan?.addEventListener('click', () => {
      if (btnJan) {
        btnJan.textContent = 'Jan verwittigd ✓'
        btnJan.style.background = '#2ecc71'
        btnJan.setAttribute('disabled', 'true')
      }
      if (janItem) {
        janItem.classList.remove('step-item--action')
        janItem.classList.add('step-item--done')
        const box = janItem.querySelector('.step-checkbox')
        if (box) box.textContent = '✓'
      }
      janDone = true
      scrollToBottom()
      checkShowNext()
    })

    document.getElementById('btn-to-scene-5')?.addEventListener('click', () => {
      navigateForward()
    })
  }
}
