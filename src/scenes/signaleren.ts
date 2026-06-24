// Scene 0: Signaleren — Sophie vraagt haar persoonlijke AI-assistent om hulp
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
            <div class="iphone__app-header">AI Assistent</div>
            <div class="iphone__chat" id="scene-2-chat">
              <!-- Chat bubbles and choice buttons will animate here -->
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
    const nextContainer = document.getElementById('scene-2-next-container')

    // Running clock starting at 20:14
    let minuteOffset = 0

    const getTime = (addMinutes = 0) => {
      const base = 20 * 60 + 14 + minuteOffset + addMinutes
      const h = Math.floor(base / 60)
      const m = base % 60
      return `${h}:${m.toString().padStart(2, '0')}`
    }

    const addBubble = (text: string, isUser = false) => {
      if (!chat) return
      const bubble = document.createElement('div')
      const sender = isUser ? 'Sophie' : 'AI Assistent'
      bubble.className = `phone-bubble phone-bubble--${isUser ? 'user' : 'assistant'}`
      bubble.innerHTML = `<div class="phone-bubble__sender">${sender}</div>${text}<span class="phone-bubble__time">${getTime()}</span>`
      chat.appendChild(bubble)
      chat.scrollTop = chat.scrollHeight
    }

    const addSystemBubble = (text: string) => {
      if (!chat) return
      const bubble = document.createElement('div')
      bubble.className = 'phone-bubble phone-bubble--system'
      bubble.innerHTML = text
      chat.appendChild(bubble)
      chat.scrollTop = chat.scrollHeight
    }

    const addTyping = () => {
      if (!chat) return
      const typing = document.createElement('div')
      typing.className = 'phone-typing'
      typing.id = 'chat-typing'
      typing.textContent = 'Aan het verwerken...'
      chat.appendChild(typing)
      chat.scrollTop = chat.scrollHeight
    }

    const removeTyping = () => {
      document.getElementById('chat-typing')?.remove()
    }

    // Start chat flow — Sophie praat met haar persoonlijke AI-assistent
    activeTimers.push(setTimeout(() => {
      addBubble("Help. Ik ben in Lyon voor mijn werk en ik heb ongelooflijk veel buikpijn. Ik denk dat ik naar het ziekenhuis moet.", true)
    }, 1000))

    activeTimers.push(setTimeout(() => {
      addTyping()
    }, 2500))

    activeTimers.push(setTimeout(() => {
      removeTyping()
      minuteOffset = 1
      addBubble("Ik zie dat ge in Lyon zijt. Er zijn 2 ziekenhuizen dichtbij. Hôpital Saint-Claire heeft een spoedafdeling en is 12 minuten van u verwijderd.")
    }, 4000))

    activeTimers.push(setTimeout(() => {
      // Inject map
      const mapDiv = document.createElement('div')
      mapDiv.innerHTML = `
        <div class="svg-map-container">
          <img src="/map-lyon-hospital.png" alt="Route naar Hôpital Saint-Claire" style="width:100%; border-radius:8px;" />
        </div>`
      chat?.appendChild(mapDiv)
      chat!.scrollTop = chat!.scrollHeight
    }, 5000))

    activeTimers.push(setTimeout(() => {
      addTyping()
    }, 5800))

    activeTimers.push(setTimeout(() => {
      removeTyping()
      addBubble("Zal ik uw Vanbreda-dekking checken en een ambulance laten komen?")
      if (chat) chat.scrollTop = chat.scrollHeight
      if (chat) {
        const choicesEl = document.createElement('div')
        choicesEl.className = 'phone-choices-inline'
        choicesEl.innerHTML = `
          <button class="step-btn" id="btn-choice-yes">Ja, regel dat</button>
          <button class="step-btn" style="background:#555;" id="btn-choice-no">Ik regel het zelf</button>`
        setTimeout(() => {
          chat.appendChild(choicesEl)
          chat.scrollTop = chat.scrollHeight
        }, 300)

        choicesEl.querySelector('#btn-choice-yes')?.addEventListener('click', () => {
          choicesEl.remove()
          minuteOffset = 2
          addBubble("Ja, regel dat", true)
          addTyping()

          setTimeout(() => {
            removeTyping()
            addSystemBubble("✓ <strong>Vanbreda MCP</strong>: hospitalisatieverzekering dekt spoedopnames in Frankrijk volledig.")
          }, 800)

          setTimeout(() => {
            addSystemBubble("✓ <strong>Ambulance</strong> onderweg — 3 minuten.")
          }, 1600)

          setTimeout(() => {
            addSystemBubble("✓ Dossier <strong>HC-2030-00471</strong> gedeeld met Hôpital Saint-Claire.")
          }, 2400)

          setTimeout(() => {
            minuteOffset = 3
            addBubble("Alles is geregeld. Zal ik Jan ook verwittigen?")
            if (chat) chat.scrollTop = chat.scrollHeight

            // Show next after a beat
            setTimeout(() => {
              if (nextContainer) nextContainer.style.display = 'block'
            }, 1500)
          }, 3400)
        })

        choicesEl.querySelector('#btn-choice-no')?.addEventListener('click', () => {
          choicesEl.remove()
          addBubble("Ik regel het zelf", true)
          if (nextContainer) nextContainer.style.display = 'block'
        })
      }
    }, 7500))

    document.getElementById('btn-to-scene-1')?.addEventListener('click', () => {
      navigateForward()
    })
  }
}
