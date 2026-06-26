// Scene 1: Begrijpen — Wat er achter de schermen gebeurt (MCP/A2A)
import type { SceneModule } from './types'

export const begrijpen: SceneModule = {
  render() {
    return `
      <div class="scene-card scene-card--split">
        <div class="scene-info">
          <span class="scene-badge">Keten: Begrijpen</span>
          <h2>Wat er achter de schermen gebeurt</h2>
          <p>Op basis van het gesprek start de onzichtbare keten. Sophie's assistent verifieert haar dekking via Vanbreda's MCP-koppeling. Via Vanbreda's internationale partnernetwerk wordt een beveiligd spoeddossier gedeeld met het Franse ziekenhuis.</p>
          <div class="under-the-hood" style="margin-top: 20px;">
            <div class="uth-header">Agent-communicatie (MCP/A2A)</div>
            <ul class="uth-logs" id="scene-2-logs">
              <li class="pending">Koppelingen worden gelegd...</li>
            </ul>
          </div>
          <div style="margin-top: 25px; display: none;" id="scene-2-next-action-container">
            <button class="scene-btn scene-btn--primary" id="btn-to-scene-2" style="font-size: 16px; padding: 16px 32px; background: linear-gradient(135deg, #ff8c00, #ff4b28); box-shadow: 0 4px 20px rgba(255,75,40,0.35); width: 100%;">🚑 Ga naar het ziekenhuis →</button>
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
              <div class="iphone__app-header">AI Assistent</div>
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
        { text: "Help. Ik ben in Lyon en ik heb ongelooflijk veel buikpijn.", isUser: true, time: "20:14" },
        { text: "Ik zie dat ge in Lyon zijt. Hôpital Saint-Claire is 12 minuten van u.", isUser: false, time: "20:15" },
        { text: "Ja, regel dat", isUser: true, time: "20:16" },
        { text: "✓ Vanbreda bevestigt dekking. Ambulance onderweg.", isUser: false, time: "20:16" }
      ]
      chatHistory.innerHTML = messages.map(m => {
        const sender = m.isUser ? 'Sophie' : 'AI Assistent'
        return `<div class="phone-bubble phone-bubble--${m.isUser ? 'user' : 'assistant'}"><div class="phone-bubble__sender">${sender}</div>${m.text}<span class="phone-bubble__time">${m.time}</span></div>`
      }).join('')
    }

    // Animate MCP system logs
    if (logs) {
      logs.innerHTML = ''
      const uthItems = [
        "✓ Identiteit geverifieerd (Golden Record via itsme)",
        "✓ Polis gevalideerd (Assulink+)",
        "✓ CM: EZVK-coördinatie opgestart → Assulink+ aanvullende dekking bevestigd",
        "⚠ Gegevens alleen verwerkt met toestemming van Sophie",
        "✓ Dossier HC-2030-00471 aangemaakt",
        "✓ Via Mutas: context gedeeld met Hôpital Saint-Claire",
        "✓ Jan verwittigd via berichtendienst"
      ]
      uthItems.forEach((text, i) => {
        activeTimers.push(setTimeout(() => {
          const li = document.createElement('li')
          li.textContent = text
          logs.appendChild(li)
        }, i * 500))
      })
    }

    // Show next button after logs animate
    activeTimers.push(setTimeout(() => {
      if (nextContainer) nextContainer.style.display = 'block'
    }, 3500))

    document.getElementById('btn-to-scene-2')?.addEventListener('click', () => {
      navigateForward()
    })
  }
}
