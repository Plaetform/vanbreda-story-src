// Scene 1: Begrijpen — Systeemacties achter de schermen
import type { SceneModule } from './types'

export const begrijpen: SceneModule = {
  render() {
    return `
      <div class="scene-card scene-card--split">
        <div class="scene-info">
          <span class="scene-badge">Keten: Begrijpen</span>
          <h2>Identiteit &amp; Polis Check</h2>
          <p>Op basis van het chatgesprek start de onzichtbare keten. Onze AI verifieert haar polis via het Golden Record en deelt direct een beveiligd spoeddossier met het dichtstbijzijnde ziekenhuis.</p>
          <div class="under-the-hood" style="margin-top: 20px;">
            <div class="uth-header">Systeemacties (Autonome Keten)</div>
            <ul class="uth-logs" id="scene-2-logs">
              <li class="pending">Systeemverificaties laden...</li>
            </ul>
          </div>
          <div style="margin-top: 25px; display: none;" id="scene-2-next-action-container">
            <button class="scene-btn scene-btn--primary" id="btn-to-scene-2" style="font-size: 16px; padding: 16px 32px; background: linear-gradient(135deg, #2c8c99, #1e6e7a); box-shadow: 0 4px 20px rgba(44,140,153,0.4); width: 100%;">🚑 Ga naar het ziekenhuis →</button>
          </div>
        </div>
        <div class="scene-display">
          <div class="iphone iphone--small" style="opacity: 0.9;">
            <div class="iphone__screen">
              <div class="iphone__notch"></div>
              <div class="iphone__status-bar">
                <span class="iphone__status-time">20:14</span>
                <span class="iphone__status-icons">● ●</span>
              </div>
              <div class="iphone__app-header">Vanbreda Care</div>
              <div class="iphone__chat" id="scene-2-chat-history">
                <!-- Chat history rendered instantly -->
              </div>
            </div>
          </div>
        </div>
      </div>`
  },

  bind(navigateForward, activeTimers) {
    const logs = document.getElementById('scene-2-logs')
    const chatHistory = document.getElementById('scene-2-chat-history')
    const nextContainer = document.getElementById('scene-2-next-action-container')

    // Instantly render completed chat history in the small phone
    if (chatHistory) {
      const messages = [
        { text: "Help. Ik ben in Lyon voor mijn werk en ik heb heel veel buikpijn.", isUser: true },
        { text: "Dat klinkt ernstig, Sophie. Ik help je direct.", isUser: false },
        { text: "Ja, maar de pijn wordt erger.", isUser: true },
        { text: "Ik heb je aangemeld bij Hôpital Saint-Claire. De ambulance is onderweg.", isUser: false }
      ]
      chatHistory.innerHTML = messages.map(m =>
        `<div class="phone-bubble phone-bubble--${m.isUser ? 'user' : 'assistant'}">${m.text}</div>`
      ).join('')
    }

    // Animate system logs
    if (logs) {
      logs.innerHTML = ''
      const uthItems = [
        "✓ Identiteit geverifieerd via Golden Record",
        "✓ Polisdekking gecontroleerd (Hospitalisatie Premium)",
        "✓ Spoeddekking Frankrijk actief",
        "✓ Dossier geopend (ID: HC-2030-00471)",
        "✓ Context gedeeld met Hôpital Saint-Claire"
      ]
      uthItems.forEach((text, i) => {
        activeTimers.push(setTimeout(() => {
          const li = document.createElement('li')
          li.textContent = text
          logs.appendChild(li)
        }, i * 400))
      })
    }

    // Show next button after logs animate
    activeTimers.push(setTimeout(() => {
      if (nextContainer) nextContainer.style.display = 'block'
    }, 2500))

    document.getElementById('btn-to-scene-2')?.addEventListener('click', () => {
      navigateForward()
    })
  }
}
