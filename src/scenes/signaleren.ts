// Scene 0: Signaleren — Sophie vraagt om hulp via de Vanbreda Care app
import type { SceneModule } from './types'

export const signaleren: SceneModule = {
  render() {
    return `
      <div class="scene-phone-centered">
        <div class="iphone iphone--large">
          <div class="iphone__screen">
            <div class="iphone__notch"></div>
            <div class="iphone__reflection"></div>
            <div class="iphone__status-bar">
              <span class="iphone__status-time">20:14</span>
              <span class="iphone__status-icons">● ● ●●</span>
            </div>
            <div class="iphone__app-header">Vanbreda Care</div>
            <div class="iphone__chat" id="scene-2-chat">
              <!-- Chat bubbles will animate here -->
            </div>
            <div class="iphone__input" id="scene-2-input" style="display:none;">
              <div id="scene-2-choices">
                <!-- Choices buttons -->
              </div>
            </div>
          </div>
        </div>
        <div class="scene-phone-next" id="scene-2-next-container" style="display: none;">
          <button class="scene-btn scene-btn--primary" id="btn-to-scene-1">Bekijk wat er achter de schermen gebeurt →</button>
        </div>
      </div>`
  },

  bind(navigateForward, activeTimers) {
    const chat = document.getElementById('scene-2-chat')
    const input = document.getElementById('scene-2-input')
    const choices = document.getElementById('scene-2-choices')
    const nextContainer = document.getElementById('scene-2-next-container')

    const addBubble = (text: string, isUser = false) => {
      if (!chat) return
      const bubble = document.createElement('div')
      bubble.className = `phone-bubble phone-bubble--${isUser ? 'user' : 'assistant'}`
      bubble.textContent = text
      chat.appendChild(bubble)
      chat.scrollTop = chat.scrollHeight
    }

    const addTyping = () => {
      if (!chat) return
      const typing = document.createElement('div')
      typing.className = 'phone-typing'
      typing.id = 'chat-typing'
      typing.textContent = 'Aan het typen...'
      chat.appendChild(typing)
      chat.scrollTop = chat.scrollHeight
    }

    const removeTyping = () => {
      document.getElementById('chat-typing')?.remove()
    }

    // Start chat flow
    activeTimers.push(setTimeout(() => {
      addBubble("Help. Ik ben in Lyon voor mijn werk en ik heb heel veel buikpijn. Ik denk dat ik naar een ziekenhuis moet.", true)
    }, 1000))

    activeTimers.push(setTimeout(() => {
      addTyping()
    }, 2500))

    activeTimers.push(setTimeout(() => {
      removeTyping()
      addBubble("Dat klinkt ernstig, Sophie. Ik help je direct.")
      addBubble("Kun je nog zelfstandig lopen en adem je normaal?")
    }, 4000))

    activeTimers.push(setTimeout(() => {
      addBubble("Ja, maar de pijn wordt erger.", true)
    }, 5500))

    activeTimers.push(setTimeout(() => {
      addTyping()
    }, 6500))

    activeTimers.push(setTimeout(() => {
      removeTyping()
      addBubble("Ik adviseer je om nu medische hulp te zoeken.")
      addBubble("Hôpital Saint-Claire heeft een spoedafdeling en is 12 minuten van je verwijderd. Ze kunnen je in het Engels ontvangen.")

      // Inject map
      const mapDiv = document.createElement('div')
      mapDiv.innerHTML = `
        <div class="svg-map-container">
          <svg viewBox="0 0 200 120" width="100%" height="100%">
            <path d="M 10 10 L 190 10 M 10 50 L 190 50 M 10 90 L 190 90 M 30 10 L 30 110 M 90 10 L 90 110 M 160 10 L 160 110" stroke="#cbd5e1" stroke-width="1" fill="none" />
            <circle cx="30" cy="90" r="3" fill="#ff6b35" />
            <circle cx="30" cy="90" r="8" fill="none" stroke="#ff6b35" stroke-width="0.8" opacity="0.6">
              <animate attributeName="r" values="3;9;3" dur="2s" repeatCount="indefinite"/>
            </circle>
            <text x="36" y="93" font-size="5" font-family="sans-serif" font-weight="bold" fill="#334155">Sophie</text>
            <g>
              <circle cx="90" cy="50" r="4" fill="#2c8c99" />
              <text x="96" y="53" font-size="5" font-family="sans-serif" font-weight="bold" fill="#2c8c99">St-Claire (12m)</text>
            </g>
            <g opacity="0.4">
              <circle cx="160" cy="20" r="3" fill="#64748b" />
              <text x="120" y="23" font-size="4" font-family="sans-serif" fill="#64748b">Clinique du Parc (18m)</text>
            </g>
            <path d="M 30 90 L 30 50 L 90 50" stroke="#2c8c99" stroke-width="1.5" stroke-dasharray="2 2" fill="none" />
          </svg>
        </div>`
      chat?.appendChild(mapDiv)
      chat!.scrollTop = chat!.scrollHeight
    }, 8000))

    activeTimers.push(setTimeout(() => {
      addBubble("Wil je dat ik een ambulance stuur en het ziekenhuis alvast laat weten dat je onderweg bent?")
      if (input && choices) {
        input.style.display = 'block'
        choices.innerHTML = `
          <button class="step-btn" id="btn-choice-yes">Ja, regel dit</button>
          <button class="step-btn" style="background:#555;" id="btn-choice-no">Ik regel het zelf</button>`

        document.getElementById('btn-choice-yes')?.addEventListener('click', () => {
          input.style.display = 'none'
          addBubble("Ja, regel dit", true)
          addTyping()

          setTimeout(() => {
            removeTyping()
            addBubble("Ik heb je aangemeld bij Hôpital Saint-Claire. Je dossier (ID: HC-2030-00471) staat voor ze klaar. De ambulance is onderweg en is er over 3 minuten.")
            if (nextContainer) nextContainer.style.display = 'block'
          }, 1200)
        })

        document.getElementById('btn-choice-no')?.addEventListener('click', () => {
          input.style.display = 'none'
          addBubble("Ik regel het zelf", true)
          if (nextContainer) nextContainer.style.display = 'block'
        })
      }
    }, 9800))

    document.getElementById('btn-to-scene-1')?.addEventListener('click', () => {
      navigateForward()
    })
  }
}
