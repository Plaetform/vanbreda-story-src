// Scene 2: Begeleiden — Aankomst & Vertaling bij het ziekenhuis
import type { SceneModule } from './types'

let sceneAudio: HTMLAudioElement | null = null

export const begeleiden: SceneModule = {
  render() {
    return `
      <div class="scene-card scene-card--split">
        <div class="scene-info">
          <span class="scene-badge">Keten: Begeleiden</span>
          <h2>Aankomst &amp; Vertaling</h2>
          <p>Sophie arriveert bij het ziekenhuis. Dankzij de partnerintegratie is haar administratie al gedeeld. De app fungeert als real-time tolk aan de balie.</p>
          <blockquote class="scene-quote" style="font-family: var(--font-serif); font-style: italic; margin-top: 15px; border-left: 2px solid var(--c-teal); padding-left: 15px; font-size: 13px;">
            "Sophie hoeft de verbinding niet zelf te organiseren. De keten kent haar en beweegt met haar mee."
          </blockquote>
        </div>
        <div class="scene-display">
          <div class="iphone iphone--small">
            <div class="iphone__screen">
              <div class="iphone__notch"></div>
              <div class="iphone__reflection"></div>
              <div class="iphone__status-bar">
                <span class="iphone__status-time">20:47</span>
                <span class="iphone__status-icons">● ● ●●</span>
              </div>
              <div class="iphone__app-header">Vanbreda Care — Vertaling</div>
              <div class="iphone__chat" id="scene-3-tw-chat">
                <!-- Translation bubbles will animate here -->
              </div>
              <div class="iphone__input" id="scene-3-tw-status" style="display:none;">
                <div style="text-align: center; font-size: 10px; color: var(--c-teal); padding: 4px 0;">
                  🎙️ Actieve realtime vertaalverbinding
                </div>
              </div>
            </div>
          </div>
          <div style="margin-top: 12px; text-align: center;" id="scene-3-next-container" style="display: none;">
            <button class="scene-btn scene-btn--primary" id="btn-to-scene-3">Volgende ochtend →</button>
          </div>
        </div>
      </div>`
  },

  bind(navigateForward, activeTimers) {
    const twChat = document.getElementById('scene-3-tw-chat')
    const twStatus = document.getElementById('scene-3-tw-status')
    const nextContainer = document.getElementById('scene-3-next-container')
    if (nextContainer) nextContainer.style.display = 'none'

    // Start audio
    sceneAudio = new Audio('/audio/realtime.mp3')
    sceneAudio.volume = 0.5
    sceneAudio.play().catch(() => {})

    const addTranslateBubble = (speaker: string, text: string, isFr = false) => {
      if (!twChat) return
      const bubble = document.createElement('div')
      bubble.className = `phone-bubble phone-bubble--${isFr ? 'user' : 'assistant'}`
      bubble.innerHTML = `<div style="font-size: 9px; font-weight: 700; opacity: 0.7; margin-bottom: 3px;">${speaker}</div>${text}`
      twChat.appendChild(bubble)
      twChat.scrollTop = twChat.scrollHeight
    }

    if (twStatus) {
      activeTimers.push(setTimeout(() => {
        twStatus.style.display = 'block'
      }, 500))
    }

    activeTimers.push(setTimeout(() => {
      addTranslateBubble("FR 🇫🇷 Medewerker", "Nous allons vous examiner. Vos coordonnées d'assurance ont été reçues.", true)
    }, 1000))

    activeTimers.push(setTimeout(() => {
      addTranslateBubble("NL 🇳🇱 App Vertaling", "We gaan u nu onderzoeken. Uw verzekeringsgegevens zijn ontvangen. U hoeft niets voor te schieten.")
    }, 3000))

    activeTimers.push(setTimeout(() => {
      addTranslateBubble("NL 🇳🇱 Sophie", "Dank u. Kunt u ook aangeven wat er nu gaat gebeuren?", true)
    }, 5000))

    activeTimers.push(setTimeout(() => {
      addTranslateBubble("FR 🇫🇷 App Vertaling", "Merci. Pouvez-vous indiquer ce qui va se passer maintenant ?")
    }, 7000))

    activeTimers.push(setTimeout(() => {
      if (twChat) {
        const banner = document.createElement('div')
        banner.style.cssText = 'background: rgba(44,140,153,0.1); padding: 6px; border-radius: 6px; font-size: 9px; text-align: center; color: var(--c-navy);'
        banner.textContent = '✓ Dossier gekoppeld · Behandeling gestart'
        twChat.appendChild(banner)
        twChat.scrollTop = twChat.scrollHeight
      }
      if (nextContainer) nextContainer.style.display = 'block'
    }, 8500))

    document.getElementById('btn-to-scene-3')?.addEventListener('click', () => {
      navigateForward()
    })
  },

  cleanup() {
    if (sceneAudio) {
      sceneAudio.pause()
      sceneAudio.currentTime = 0
      sceneAudio = null
    }
  }
}
