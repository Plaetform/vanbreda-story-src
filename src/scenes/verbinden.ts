// Scene 3: Verbinden — Thomas belt Sophie (menselijke regie via MCP-escalatie)
import type { SceneModule } from './types'

let callAudio: HTMLAudioElement | null = null

export const verbinden: SceneModule = {
  cleanup() {
    if (callAudio) {
      callAudio.pause()
      callAudio.currentTime = 0
      callAudio = null
    }
  },
  render() {
    return `
      <div class="scene-card scene-card--split">
        <div class="scene-info">
          <span class="scene-badge">Keten: Verbinden</span>
          <h2>Wat gebeurt er nu?</h2>
          <p>Vanbreda's systeem verwerkt de buitenlandse ziekenhuisfacturen autonoom via hun partnernetwerk. Bij de radiologiefactuur treedt een uitzondering op — een afwijkend Frans tariefcode. Het systeem escaleert naar Thomas (Care Specialist) die Sophie persoonlijk belt.</p>
          <div class="under-the-hood">
            <div class="uth-header">Orkestratie &amp; Escalatie (MCP)</div>
            <ul class="uth-logs">
              <li>✓ Vanbreda MCP: spoedoperatie via internationaal partnernetwerk verwerkt (STP)</li>
              <li>⚠ Vanbreda MCP: Frans radiologietarief afwijkend — escalatie vereist</li>
              <li>▸ Vanbreda escaleert naar menselijke specialist</li>
              <li id="uth-call-log" class="pending">Wacht op specialist...</li>
            </ul>
          </div>
          <div style="margin-top: 25px; display: none;" id="scene-4-next-container">
            <button class="scene-btn scene-btn--primary" id="btn-to-scene-4" style="width: 100%;">Bekijk de volgende stappen →</button>
          </div>
        </div>
        <div class="scene-display">
          <div class="iphone" id="phone-call-container">
            <div class="iphone__screen">
              <div class="iphone__notch"></div>
              <div class="iphone__reflection"></div>
              <div class="iphone__status-bar">
                <span class="iphone__status-time">08:42</span>
                <span class="iphone__status-icons">● ● ●●</span>
              </div>
              <!-- Call Screen -->
              <div class="phone-call-screen" id="phone-call-screen">
                <div class="phone-caller-avatar">T</div>
                <div class="phone-caller-name">Thomas Verhoeven</div>
                <div class="phone-caller-sub">Vanbreda Care Specialist</div>
                <div class="phone-call-actions">
                  <button class="phone-call-btn phone-call-btn--decline" id="btn-decline-call">🔇</button>
                  <button class="phone-call-btn phone-call-btn--accept" id="btn-accept-call">📞</button>
                </div>
              </div>
              <!-- Active Call -->
              <div class="phone-call-active" id="phone-call-active" style="display: none;">
                <div class="phone-call-active-header">
                  <span>📞 Thomas Verhoeven</span>
                  <div class="call-wave">
                    <span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <button class="phone-call-hangup" id="btn-hangup-call">✕</button>
                </div>
                <div class="phone-call-dialog" id="phone-call-dialog">
                  <!-- Speech transcripts synced to audio -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
  },

  bind(navigateForward, activeTimers) {
    const callScreen = document.getElementById('phone-call-screen')
    const callActive = document.getElementById('phone-call-active')
    const dialog = document.getElementById('phone-call-dialog')
    const uthLog = document.getElementById('uth-call-log')
    const nextContainer = document.getElementById('scene-4-next-container')

    // Transcript lines synced to approximate audio timestamps (seconds)
    const transcript: { t: number, speaker: string, text: string }[] = [
      { t: 0.5, speaker: 'Thomas', text: 'Goeiemorgen Sophie, met Thomas van Vanbreda. Hoe gaat het met u na de operatie?' },
      { t: 5, speaker: 'Sophie', text: 'Beter, gelukkig. Nog wel wat moe en aangeslagen.' },
      { t: 9, speaker: 'Thomas', text: 'Begrijpelijk. De operatie is volledig gedekt. Alleen de radiologiefactuur heeft een afwijkende code, die neem ik persoonlijk over.' },
      { t: 17, speaker: 'Sophie', text: 'Moet ik daar nog iets voor doen?' },
      { t: 20, speaker: 'Thomas', text: 'Nee. Richt je op je herstel. Ik hou het dossier voor je vast en laat je weten zodra het geregeld is.' },
    ]

    const addCallBubble = (speaker: string, text: string) => {
      if (!dialog) return
      const isThomas = speaker.toLowerCase() === 'thomas'
      const bubble = document.createElement('div')
      bubble.className = `call-bubble call-bubble--${isThomas ? 'thomas' : 'sophie'}`
      bubble.innerHTML = `<span class="call-bubble__name">${speaker}</span>${text}`
      dialog.appendChild(bubble)
      dialog.scrollTop = dialog.scrollHeight
    }

    const acceptCall = () => {
      // Stop the narrator before Thomas starts speaking, so they never overlap
      document.dispatchEvent(new Event('vo-stop'))
      if (callScreen) callScreen.style.display = 'none'
      if (callActive) callActive.style.display = 'flex'
      if (uthLog) {
        uthLog.textContent = '✓ Specialist ingeschakeld: Thomas Verhoeven'
        uthLog.classList.remove('pending')
      }

      // Start audio playback
      callAudio = new Audio('/audio/thomas-belt-sophie.mp3')
      callAudio.volume = 1.0
      callAudio.play().catch(() => {
        console.warn('Audio autoplay blocked, showing transcript only')
      })

      // Sync transcript bubbles to audio timestamps
      transcript.forEach(({ t, speaker, text }) => {
        activeTimers.push(setTimeout(() => {
          addCallBubble(speaker, text)
        }, t * 1000))
      })

      // Show next button after last transcript line + buffer
      const lastTime = transcript[transcript.length - 1].t
      activeTimers.push(setTimeout(() => {
        if (nextContainer) nextContainer.style.display = 'block'
      }, (lastTime + 5) * 1000))

      // Also show next button when audio ends
      callAudio.addEventListener('ended', () => {
        if (nextContainer) nextContainer.style.display = 'block'
      })
    }

    // The incoming-call panel rings early (reinforcing the narrated "…maar naar een mens"),
    // and only auto-accepts once the voiceover has finished, so they never overlap.
    activeTimers.push(setTimeout(() => {
      const waiting = document.getElementById('phone-call-waiting')
      if (waiting) waiting.style.display = 'none'
      if (callScreen) callScreen.style.display = 'flex'
    }, 500))

    // Auto-accept the call after the voiceover (vo-09 ≈ 8.8s)
    activeTimers.push(setTimeout(() => {
      acceptCall()
    }, 9500))

    // Manual accept still works (for impatient users)
    document.getElementById('btn-accept-call')?.addEventListener('click', () => {
      acceptCall()
    })

    document.getElementById('btn-decline-call')?.addEventListener('click', () => {
      if (callScreen) callScreen.style.display = 'none'
      if (nextContainer) nextContainer.style.display = 'block'
    })

    document.getElementById('btn-hangup-call')?.addEventListener('click', () => {
      // Stop audio on hangup
      if (callAudio) {
        callAudio.pause()
        callAudio.currentTime = 0
        callAudio = null
      }
      if (callActive) {
        const div = document.createElement('div')
        div.style.cssText = 'color: #e74c3c; font-size: 9px; text-align: center; margin-top: 5px;'
        div.textContent = 'Gesprek beëindigd'
        dialog?.appendChild(div)
      }
      if (nextContainer) nextContainer.style.display = 'block'
    })

    document.getElementById('btn-to-scene-4')?.addEventListener('click', () => {
      // Stop audio when navigating away
      if (callAudio) {
        callAudio.pause()
        callAudio.currentTime = 0
        callAudio = null
      }
      navigateForward()
    })
  }
}
