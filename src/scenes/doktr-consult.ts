// Scene: Doktr Consult — Links: wat de assistent doet. Rechts: videoconsult met huisdokter.
import type { SceneModule } from './types'

export const doktrConsult: SceneModule = {
  render() {
    return `
      <div class="scene-card scene-card--split">
        <div class="scene-info">
          <span class="scene-badge">Keten: Signaleren → Begrijpen</span>
          <h2>Ondertussen werkt haar assistent door</h2>
          <div class="scene-accent-bar"></div>
          <p style="margin-bottom: 16px;">Terwijl Sophie met de huisdokter spreekt, komt op de achtergrond een hele keten op gang.</p>

          <div class="under-the-hood" style="margin-top: 0;">
            <div class="uth-header">Agent-communicatie (MCP/A2A)</div>
            <ul class="uth-logs" id="doktr-mcp-logs">
              <li class="pending">Koppelingen worden gelegd...</li>
            </ul>
          </div>

          <div style="margin-top: 16px; display: none;" id="doktr-next-container">
            <button class="scene-btn scene-btn--primary" id="btn-to-doktr-next" style="font-size: 16px; padding: 16px 32px; background: linear-gradient(135deg, #ff8c00, #ff4b28); box-shadow: 0 4px 20px rgba(255,75,40,0.35); width: 100%; justify-content: center;">🚑 Ga naar het ziekenhuis →</button>
          </div>
        </div>
        <div class="scene-display">
          <div class="doktr-video-panel" id="doktr-video-panel">
            <div class="doktr-header">
              <div class="doktr-status" id="doktr-status">
                <span class="doktr-pulse"></span>
                <span>LIVE VIDEOCONSULT</span>
              </div>
              <div class="doktr-doctor">
                <div class="doktr-doctor-avatar">👨‍⚕️</div>
                <div>
                  <div class="doktr-doctor-name">Dr. Van den Berg</div>
                  <div class="doktr-doctor-role">Huisdokter · via Doktr</div>
                </div>
              </div>
            </div>
            <div class="doktr-video-area">
              <video id="doktr-video-el" playsinline style="width:100%; height:100%; object-fit:cover; display:none;"></video>
              <div class="doktr-video-placeholder" id="doktr-video-placeholder">
                <div class="doktr-video-icon">📹</div>
                <div class="doktr-video-label">Verbinding wordt gemaakt...</div>
              </div>
            </div>
          </div>
        </div>
      </div>`
  },

  bind(navigateForward, activeTimers) {
    const logs = document.getElementById('doktr-mcp-logs')
    const nextContainer = document.getElementById('doktr-next-container')
    const statusEl = document.getElementById('doktr-status')
    const videoEl = document.getElementById('doktr-video-el') as HTMLVideoElement | null
    const placeholderEl = document.getElementById('doktr-video-placeholder')

    // ── Start video IMMEDIATELY when scene loads ──
    // The voiceover will play AFTER the video ends.
    let videoLoaded = false

    const loadAndPlayVideo = () => {
      if (videoLoaded || !videoEl) return
      videoLoaded = true

      videoEl.src = '/video/video-dokter.mov'
      videoEl.load()
      videoEl.addEventListener('canplay', () => {
        videoEl.style.display = 'block'
        if (placeholderEl) placeholderEl.style.display = 'none'
        videoEl.play().catch(() => {})
      }, { once: true })
      videoEl.addEventListener('error', () => {
        // No video available — show fallback message
        if (placeholderEl) {
          placeholderEl.innerHTML = `
            <div class="doktr-video-icon">👨‍⚕️</div>
            <div class="doktr-video-label">Videoconsult in voorbereiding</div>`
        }
      }, { once: true })

      // When the video ends → trigger the voiceover
      videoEl.addEventListener('ended', () => {
        if (statusEl) {
          statusEl.innerHTML = '<span>CONSULT BEËINDIGD</span>'
          statusEl.style.color = '#bbb'
        }
        // Dispatch event so main.ts knows to play the VO now
        document.dispatchEvent(new Event('doktr-video-ended'))
        // Show next button after a short delay (VO will play in parallel)
        setTimeout(() => {
          if (nextContainer) nextContainer.style.display = 'block'
        }, 3000)
      }, { once: true })
    }

    // Start video right away
    loadAndPlayVideo()

    // ── MCP logs (appear during voiceover, before video starts) ──
    const mcpItems = [
      { text: '✓ Identiteit geverifieerd (Golden Record via itsme)', delay: 2000 },
      { text: '✓ Polis gevalideerd (Assulink+)', delay: 4000 },
      { text: '✓ CM: EZVK-coördinatie opgestart', delay: 6000 },
      { text: '⚠ Gegevens alleen verwerkt met toestemming van Sophie', delay: 7500 },
      { text: '✓ Assulink+: aanvullende dekking bevestigd', delay: 9000 },
      { text: '✓ Via Mutas: dossier gedeeld met Hôpital Saint-Claire', delay: 11000 },
    ]

    if (logs) {
      logs.innerHTML = ''
      mcpItems.forEach((item) => {
        activeTimers.push(setTimeout(() => {
          const li = document.createElement('li')
          li.textContent = item.text
          logs.appendChild(li)
        }, item.delay))
      })
    }

    // ── After video ends OR if no video: show ambulance + button after delay ──
    // (The video 'ended' event handles this if video exists.
    //  This is a fallback for no-video scenario.)
    activeTimers.push(setTimeout(() => {
      if (!videoEl || videoEl.style.display === 'none') {
        // No video loaded — show referral + button after a delay
        if (logs) {
          const li = document.createElement('li')
          li.textContent = '✓ Doktr: doorverwijzing + bevindingen gedeeld'
          li.style.fontWeight = '700'
          logs.appendChild(li)
        }
        setTimeout(() => {
          if (logs) {
            const li = document.createElement('li')
            li.textContent = '✓ Ambulance onderweg — 3 minuten'
            li.style.fontWeight = '700'
            logs.appendChild(li)
          }
          if (statusEl) {
            statusEl.innerHTML = '<span>CONSULT BEËINDIGD</span>'
            statusEl.style.color = '#bbb'
          }
          if (nextContainer) nextContainer.style.display = 'block'
        }, 2000)
      }
    }, 20000))

    document.getElementById('btn-to-doktr-next')?.addEventListener('click', () => {
      navigateForward()
    })
  },

  cleanup() {
    const videoEl = document.getElementById('doktr-video-el') as HTMLVideoElement | null
    if (videoEl) {
      videoEl.pause()
      videoEl.src = ''
    }
  }
}
