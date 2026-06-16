// Scene 2: Begeleiden — Aankomst & Vertaling bij het ziekenhuis
import type { SceneModule } from './types'

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
          <div class="translation-widget" style="width: 100%; height: 260px;">
            <div class="tw-header">Real-time Vertaling (NL ↔ FR)</div>
            <div class="tw-chat" id="scene-3-tw-chat">
              <!-- Dialogue lines will animate -->
            </div>
            <div class="tw-status" id="scene-3-tw-status" style="display:none;">🎙️ Actieve realtime vertaalverbinding</div>
          </div>
          <div style="margin-top: 12px; text-align: right; width: 100%; display: none;" id="scene-3-next-container">
            <button class="scene-btn scene-btn--primary" id="btn-to-scene-3" style="width: 100%; justify-content: center;">Volgende ochtend →</button>
          </div>
        </div>
      </div>`
  },

  bind(navigateForward, activeTimers) {
    const twChat = document.getElementById('scene-3-tw-chat')
    const twStatus = document.getElementById('scene-3-tw-status')
    const nextContainer = document.getElementById('scene-3-next-container')

    const addTranslateBubble = (speaker: string, text: string, isFr = false) => {
      if (!twChat) return
      const bubble = document.createElement('div')
      bubble.className = `tw-bubble tw-bubble--${isFr ? 'fr' : 'nl'}`
      bubble.innerHTML = `<div class="tw-lang">${speaker}</div><div class="tw-text">${text}</div>`
      twChat.appendChild(bubble)
      twChat.scrollTop = twChat.scrollHeight
    }

    if (twStatus) twStatus.style.display = 'block'

    activeTimers.push(setTimeout(() => {
      addTranslateBubble("FR 🇫🇷 Medewerker", "Nous allons vous examiner. Vos coordonnées d'assurance ont été reçues. Vous n'avez rien à avancer.", true)
    }, 1000))

    activeTimers.push(setTimeout(() => {
      addTranslateBubble("NL 🇳🇱 (App Vertaling)", "We gaan u nu onderzoeken. Uw verzekeringsgegevens zijn ontvangen. U hoeft op dit moment niets voor te schieten.")
    }, 3000))

    activeTimers.push(setTimeout(() => {
      addTranslateBubble("NL 🇳🇱 Sophie", "Dank u. Kunt u ook aangeven wat er nu gaat gebeuren?")
    }, 5000))

    activeTimers.push(setTimeout(() => {
      addTranslateBubble("FR 🇫🇷 (App Vertaling)", "Merci. Pouvez-vous également indiquer ce qui va se passer maintenant ?", true)
    }, 7000))

    activeTimers.push(setTimeout(() => {
      if (twChat) {
        const banner = document.createElement('div')
        banner.style.cssText = 'background: rgba(44,140,153,0.1); padding: 8px; border-radius: 6px; font-size: 9px; text-align: center; color: var(--c-navy);'
        banner.textContent = 'Keten-update: Dossier gekoppeld. Behandeling gestart.'
        twChat.appendChild(banner)
        twChat.scrollTop = twChat.scrollHeight
      }
      if (nextContainer) nextContainer.style.display = 'block'
    }, 8500))

    document.getElementById('btn-to-scene-3')?.addEventListener('click', () => {
      navigateForward()
    })
  }
}
