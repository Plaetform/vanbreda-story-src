/**
 * Biometric Clearance Scanner
 * ──────────────────────────────
 * A theatrical "future readiness" scan that uses the webcam to detect the
 * viewer's face and environment before granting access to Sophie's dossier.
 *
 * Uses:
 *  - COCO-SSD for object detection (bounding boxes)
 *  - MediaPipe FaceLandmarker for face mesh + blendshapes
 *
 * The sequence:
 *  1. Camera activates → grayscale + scanlines
 *  2. "INITIALISEREN..." while models load
 *  3. Face detected → brackets lock on
 *  4. Scan line sweeps face
 *  5. HUD text sequence: SCANNING → TEMPORAL COMPATIBILITY → FUTURE READINESS
 *  6. Objects detected get listed
 *  7. Verdict: CLEARANCE GRANTED ✓
 *  8. Dissolve → callback fires
 */

import * as tf from '@tensorflow/tfjs'
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'

// ── Types ──
interface SmoothedBox {
  x: number
  y: number
  width: number
  height: number
  class: string
  score: number
  opacity: number
}

interface ScanPhase {
  label: string
  duration: number
  status?: string
}

// ── State ──
let videoEl: HTMLVideoElement | null = null
let canvasEl: HTMLCanvasElement | null = null
let overlayEl: HTMLDivElement | null = null
let stream: MediaStream | null = null
let cocoModel: cocoSsd.ObjectDetection | null = null
let faceLandmarker: FaceLandmarker | null = null
let animFrameId: number | null = null
let smoothedBoxes = new Map<string, SmoothedBox>()
let phaseIndex = 0
let phaseStartTime = 0
let scanStartTime = 0
let faceDetectedTime = 0
let faceWasDetected = false
let onCompleteCallback: (() => void) | null = null
let isRunning = false

// ── Scan Phases (timed sequence after face is detected) ──
const phases: ScanPhase[] = [
  { label: 'SUBJECT GEDETECTEERD', duration: 1500, status: 'BIOMETRIC LOCK' },
  { label: 'SCANNING...', duration: 2000, status: 'FACE MESH ANALYSE' },
  { label: 'TEMPORELE COMPATIBILITEIT: CONTROLEREN...', duration: 1800, status: 'QUANTUM VERIFY' },
  { label: 'TOEKOMSTBEREIDHEID: ANALYSEREN...', duration: 2000, status: 'READINESS INDEX' },
  { label: 'OMGEVING EVALUEREN...', duration: 1500, status: 'ENVIRONMENT SCAN' },
  { label: 'CLEARANCE VERLEEND', duration: 2500, status: 'ACCESS GRANTED ✓' },
]

// ── HTML Structure ──
function createOverlayHTML(): string {
  return `
<div class="bioscan" id="bioscan">
  <video class="bioscan__video" id="bioscan-video" autoplay playsinline muted></video>
  <canvas class="bioscan__canvas" id="bioscan-canvas"></canvas>
  
  <!-- Vignette + Scanlines -->
  <div class="bioscan__vignette"></div>
  <div class="bioscan__scanlines"></div>
  
  <!-- Decorative HUD circles -->
  <div class="bioscan__hud-circles">
    <div class="bioscan__circle bioscan__circle--outer"></div>
    <div class="bioscan__circle bioscan__circle--inner"></div>
    <div class="bioscan__crosshair-h"></div>
    <div class="bioscan__crosshair-v"></div>
  </div>
  
  <!-- Top-left status block -->
  <div class="bioscan__status-block" id="bioscan-status">
    <div class="bioscan__status-label">SYSTEEM STATUS</div>
    <div class="bioscan__status-value" id="bioscan-status-value">INITIALISEREN...</div>
    <div class="bioscan__status-sub" id="bioscan-status-sub">Modellen laden</div>
  </div>
  
  <!-- Top-right classification -->
  <div class="bioscan__classification" id="bioscan-classification">
    <div class="bioscan__classification-label">VERTROUWELIJK DOSSIER</div>
    <div class="bioscan__classification-value">AFKOMSTIG UIT 2030</div>
  </div>
  
  <!-- Center scan phase text -->
  <div class="bioscan__phase-text" id="bioscan-phase"></div>
  
  <!-- Bottom center: detected objects -->
  <div class="bioscan__objects" id="bioscan-objects"></div>
  
  <!-- Readiness meter -->
  <div class="bioscan__meter" id="bioscan-meter">
    <div class="bioscan__meter-label">TOEKOMSTBEREIDHEID</div>
    <div class="bioscan__meter-track">
      <div class="bioscan__meter-fill" id="bioscan-meter-fill"></div>
    </div>
    <div class="bioscan__meter-value" id="bioscan-meter-value">0%</div>
  </div>
  
  <!-- Final verdict overlay -->
  <div class="bioscan__verdict" id="bioscan-verdict">
    <div class="bioscan__verdict-icon">✓</div>
    <div class="bioscan__verdict-title">CLEARANCE VERLEEND</div>
    <div class="bioscan__verdict-sub">Sophie wacht op je.</div>
  </div>

  <!-- Skip button (same style as video cutscene skip) -->
  <button class="cutscene-skip-btn" id="bioscan-skip-btn">Sla over ➔</button>
</div>`
}

// ── Public API ──
export async function startBiometricScan(onComplete: () => void, onCameraActive?: () => void): Promise<void> {
  onCompleteCallback = onComplete
  isRunning = true
  faceWasDetected = false
  phaseIndex = -1
  smoothedBoxes.clear()

  // Inject overlay HTML
  const container = document.createElement('div')
  container.innerHTML = createOverlayHTML()
  overlayEl = container.firstElementChild as HTMLDivElement
  document.body.appendChild(overlayEl)

  // Force reflow then fade in
  requestAnimationFrame(() => {
    overlayEl?.classList.add('bioscan--visible')
  })

  // Wire up skip button
  document.getElementById('bioscan-skip-btn')?.addEventListener('click', () => {
    cleanup()
    onCompleteCallback?.()
  })

  videoEl = document.getElementById('bioscan-video') as HTMLVideoElement
  canvasEl = document.getElementById('bioscan-canvas') as HTMLCanvasElement

  // Start camera
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' }
    })
    if (videoEl) {
      videoEl.srcObject = stream
      await videoEl.play()
    }
    // Camera is live and the viewer now sees themselves — cue the opening narration
    onCameraActive?.()
  } catch (err) {
    console.error('Camera access denied:', err)
    // Skip scan if no camera
    cleanup()
    onComplete()
    return
  }

  updateStatus('MODELLEN LADEN...', 'TensorFlow + MediaPipe')

  // Load models in parallel
  try {
    await tf.ready()
    const [coco, vision] = await Promise.all([
      cocoSsd.load(),
      FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
      )
    ])
    cocoModel = coco

    faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
      },
      outputFaceBlendshapes: true,
      runningMode: 'VIDEO',
      numFaces: 1,
    })

    updateStatus('CAMERA ACTIEF', 'Wachten op subject...')
    scanStartTime = performance.now()

    // Start detection loop
    detectLoop()
  } catch (err) {
    console.error('Model loading failed:', err)
    cleanup()
    onComplete()
  }
}

export function cancelBiometricScan(): void {
  cleanup()
}

// ── Detection Loop ──
function detectLoop() {
  if (!isRunning || !videoEl || !canvasEl || !cocoModel) return

  const video = videoEl
  const canvas = canvasEl
  const ctx = canvas.getContext('2d')

  if (video.readyState >= 2 && ctx) {
    if (canvas.width !== video.videoWidth) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // ── Object Detection ──
    cocoModel.detect(video).then(predictions => {
      if (!isRunning) return

      const detectedClasses = new Set<string>()
      const newSmoothedBoxes = new Map<string, SmoothedBox>()
      const unassigned = [...predictions]

      smoothedBoxes.forEach((box, id) => {
        let closestIdx = -1
        let minDist = Infinity
        unassigned.forEach((pred, idx) => {
          if (pred.class === box.class) {
            const [px, py, pw, ph] = pred.bbox
            const dist = Math.hypot(
              px + pw / 2 - (box.x + box.width / 2),
              py + ph / 2 - (box.y + box.height / 2)
            )
            if (dist < 150 && dist < minDist) {
              minDist = dist
              closestIdx = idx
            }
          }
        })

        if (closestIdx !== -1) {
          const pred = unassigned[closestIdx]
          const [px, py, pw, ph] = pred.bbox
          const lerp = 0.15
          box.x += (px - box.x) * lerp
          box.y += (py - box.y) * lerp
          box.width += (pw - box.width) * lerp
          box.height += (ph - box.height) * lerp
          box.opacity = Math.min(1, box.opacity + 0.1)
          box.score = pred.score
          newSmoothedBoxes.set(id, box)
          unassigned.splice(closestIdx, 1)
          detectedClasses.add(box.class)
        } else {
          box.opacity -= 0.05
          if (box.opacity > 0) {
            newSmoothedBoxes.set(id, box)
            detectedClasses.add(box.class)
          }
        }
      })

      unassigned.forEach(pred => {
        const id = Math.random().toString(36).substring(7)
        const [x, y, width, height] = pred.bbox
        newSmoothedBoxes.set(id, {
          x, y, width, height,
          class: pred.class, score: pred.score, opacity: 0,
        })
        detectedClasses.add(pred.class)
      })

      smoothedBoxes = newSmoothedBoxes

      // Draw bounding boxes with corner brackets
      drawBoundingBoxes(ctx)

      // Update objects list in HUD
      updateObjectsList(Array.from(detectedClasses))
    }).catch(() => {})

    // ── Face Detection ──
    if (faceLandmarker) {
      try {
        const faceResult = faceLandmarker.detectForVideo(video, performance.now())

        if (faceResult.faceLandmarks && faceResult.faceLandmarks.length > 0) {
          if (!faceWasDetected) {
            faceWasDetected = true
            faceDetectedTime = performance.now()
            phaseIndex = 0
            phaseStartTime = performance.now()
          }

          drawFaceMesh(ctx, faceResult.faceLandmarks[0], canvas.width, canvas.height)
        }
      } catch (e) {
        // Ignore detection errors
      }
    }

    // ── Phase Progression ──
    updatePhase()
  }

  animFrameId = requestAnimationFrame(detectLoop)
}

// ── Drawing: Bounding Boxes ──
function drawBoundingBoxes(ctx: CanvasRenderingContext2D) {
  smoothedBoxes.forEach(box => {
    const { x, y, width, height, opacity } = box
    const text = `${box.class.toUpperCase()} ${Math.round(box.score * 100)}%`

    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.7})`
    ctx.lineWidth = 1.5

    // Corner brackets
    const cl = Math.min(18, width / 4, height / 4)
    ctx.beginPath()
    ctx.moveTo(x, y + cl); ctx.lineTo(x, y); ctx.lineTo(x + cl, y)
    ctx.moveTo(x + width - cl, y); ctx.lineTo(x + width, y); ctx.lineTo(x + width, y + cl)
    ctx.moveTo(x + width, y + height - cl); ctx.lineTo(x + width, y + height); ctx.lineTo(x + width - cl, y + height)
    ctx.moveTo(x + cl, y + height); ctx.lineTo(x, y + height); ctx.lineTo(x, y + height - cl)
    ctx.stroke()

    // Crosshair center
    ctx.beginPath()
    ctx.moveTo(x + width / 2 - 5, y + height / 2)
    ctx.lineTo(x + width / 2 + 5, y + height / 2)
    ctx.moveTo(x + width / 2, y + height / 2 - 5)
    ctx.lineTo(x + width / 2, y + height / 2 + 5)
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`
    ctx.stroke()

    // Label
    ctx.font = '500 11px monospace'
    const tw = ctx.measureText(text).width
    ctx.fillStyle = `rgba(0, 0, 0, ${opacity * 0.5})`
    ctx.fillRect(x, y - 18, tw + 10, 16)
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`
    ctx.fillText(text, x + 5, y - 6)
  })
}

// ── Drawing: Face Mesh + Scan Line ──
function drawFaceMesh(
  ctx: CanvasRenderingContext2D,
  landmarks: { x: number; y: number; z: number }[],
  cw: number,
  ch: number
) {
  // Calculate scan line position
  const elapsed = (performance.now() - faceDetectedTime) / 1000
  const scanCycle = 3 // seconds per full sweep
  const scanProgress = (Math.sin((elapsed / scanCycle) * Math.PI * 2) + 1) / 2

  // Find face bounds
  let minX = 1, maxX = 0, minY = 1, maxY = 0
  for (const pt of landmarks) {
    if (pt.x < minX) minX = pt.x
    if (pt.x > maxX) maxX = pt.x
    if (pt.y < minY) minY = pt.y
    if (pt.y > maxY) maxY = pt.y
  }

  const scanY = minY + scanProgress * (maxY - minY)
  const faceHeight = maxY - minY

  // Clip to face oval
  const faceOvalIndices = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109]

  ctx.save()
  ctx.beginPath()
  for (let i = 0; i < faceOvalIndices.length; i++) {
    const pt = landmarks[faceOvalIndices[i]]
    if (i === 0) ctx.moveTo(pt.x * cw, pt.y * ch)
    else ctx.lineTo(pt.x * cw, pt.y * ch)
  }
  ctx.closePath()
  ctx.clip()

  // Draw illuminated points near scan line
  ctx.fillStyle = '#ffffff'
  ctx.shadowColor = '#ffffff'
  ctx.shadowBlur = 8

  for (const pt of landmarks) {
    const dist = Math.abs(pt.y - scanY)
    const threshold = 0.05

    if (dist < threshold) {
      const ptOpacity = (1 - dist / threshold) * 0.6
      ctx.globalAlpha = Math.min(ptOpacity, 1)
      ctx.beginPath()
      ctx.arc(pt.x * cw, pt.y * ch, 1.5, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  ctx.globalAlpha = 1.0
  ctx.restore()

  // Draw face bracket (outer rectangle around face)
  const padding = 0.03
  const fx = (minX - padding) * cw
  const fy = (minY - padding) * ch
  const fw = (maxX - minX + padding * 2) * cw
  const fh = (maxY - minY + padding * 2) * ch

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.lineWidth = 1.5
  const fcl = 25

  ctx.beginPath()
  ctx.moveTo(fx, fy + fcl); ctx.lineTo(fx, fy); ctx.lineTo(fx + fcl, fy)
  ctx.moveTo(fx + fw - fcl, fy); ctx.lineTo(fx + fw, fy); ctx.lineTo(fx + fw, fy + fcl)
  ctx.moveTo(fx + fw, fy + fh - fcl); ctx.lineTo(fx + fw, fy + fh); ctx.lineTo(fx + fw - fcl, fy + fh)
  ctx.moveTo(fx + fcl, fy + fh); ctx.lineTo(fx, fy + fh); ctx.lineTo(fx, fy + fh - fcl)
  ctx.stroke()

  // Scan line across face
  ctx.beginPath()
  ctx.moveTo(fx, scanY * ch)
  ctx.lineTo(fx + fw, scanY * ch)
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 + Math.sin(scanProgress * Math.PI) * 0.2})`
  ctx.lineWidth = 1
  ctx.stroke()
}

// ── Phase Logic ──
function updatePhase() {
  if (phaseIndex < 0 || phaseIndex >= phases.length) return

  const now = performance.now()
  const phase = phases[phaseIndex]
  const elapsed = now - phaseStartTime

  // Update HUD text
  const phaseEl = document.getElementById('bioscan-phase')
  const statusValueEl = document.getElementById('bioscan-status-value')
  const statusSubEl = document.getElementById('bioscan-status-sub')

  if (phaseEl) {
    phaseEl.textContent = phase.label
    phaseEl.classList.add('bioscan__phase-text--visible')
  }
  if (statusValueEl) statusValueEl.textContent = phase.status || ''
  if (statusSubEl) statusSubEl.textContent = `Fase ${phaseIndex + 1}/${phases.length}`

  // Update readiness meter
  const totalPhases = phases.length - 1 // Last phase is the verdict
  const progress = Math.min(1, phaseIndex / totalPhases)
  const meterFill = document.getElementById('bioscan-meter-fill')
  const meterValue = document.getElementById('bioscan-meter-value')
  const meterEl = document.getElementById('bioscan-meter')

  if (phaseIndex >= 1) {
    meterEl?.classList.add('bioscan__meter--visible')
  }

  if (meterFill) meterFill.style.width = `${Math.round(progress * 100)}%`
  if (meterValue) meterValue.textContent = `${Math.round(progress * 100)}%`

  // Advance to next phase
  if (elapsed >= phase.duration) {
    phaseIndex++
    phaseStartTime = now

    if (phaseIndex >= phases.length) {
      // Show verdict
      showVerdict()
    }
  }
}

// ── Verdict ──
function showVerdict() {
  const verdictEl = document.getElementById('bioscan-verdict')
  const meterFill = document.getElementById('bioscan-meter-fill')
  const meterValue = document.getElementById('bioscan-meter-value')

  if (meterFill) meterFill.style.width = '100%'
  if (meterValue) meterValue.textContent = '100%'

  setTimeout(() => {
    verdictEl?.classList.add('bioscan__verdict--visible')
  }, 300)

  // After showing verdict, dissolve and call back
  setTimeout(() => {
    overlayEl?.classList.add('bioscan--fading')
    setTimeout(() => {
      cleanup()
      onCompleteCallback?.()
    }, 1200)
  }, 2500)
}

// ── Object List ──
function updateObjectsList(objects: string[]) {
  const el = document.getElementById('bioscan-objects')
  if (!el || objects.length === 0) return

  // Translate common objects to Dutch + add fun "readiness" labels
  const translations: Record<string, { nl: string; check: string }> = {
    person: { nl: 'PERSOON', check: 'subject geïdentificeerd' },
    laptop: { nl: 'LAPTOP', check: 'digitale transformatie ✓' },
    'cell phone': { nl: 'TELEFOON', check: 'connectiviteit ✓' },
    cup: { nl: 'KOFFIE', check: 'brandstof voor verandering ✓' },
    bottle: { nl: 'FLES', check: 'hydratatie ✓' },
    keyboard: { nl: 'TOETSENBORD', check: 'input device ✓' },
    mouse: { nl: 'MUIS', check: 'navigatie ✓' },
    monitor: { nl: 'MONITOR', check: 'visuele output ✓' },
    tv: { nl: 'SCHERM', check: 'presentatie-modus ✓' },
    chair: { nl: 'STOEL', check: 'comfort ✓' },
    book: { nl: 'BOEK', check: 'kennis-basis ✓' },
    clock: { nl: 'KLOK', check: 'tijdsbewustzijn ✓' },
  }

  const items = objects.slice(0, 4).map(obj => {
    const t = translations[obj] || { nl: obj.toUpperCase(), check: 'gedetecteerd ✓' }
    return `<div class="bioscan__object-item">
      <span class="bioscan__object-dot"></span>
      <span class="bioscan__object-name">${t.nl}</span>
      <span class="bioscan__object-check">${t.check}</span>
    </div>`
  })

  el.innerHTML = items.join('')
  el.classList.add('bioscan__objects--visible')
}

// ── Status Update ──
function updateStatus(value: string, sub: string) {
  const statusValueEl = document.getElementById('bioscan-status-value')
  const statusSubEl = document.getElementById('bioscan-status-sub')
  if (statusValueEl) statusValueEl.textContent = value
  if (statusSubEl) statusSubEl.textContent = sub
}

// ── Cleanup ──
function cleanup() {
  isRunning = false

  if (animFrameId !== null) {
    cancelAnimationFrame(animFrameId)
    animFrameId = null
  }

  if (stream) {
    stream.getTracks().forEach(track => track.stop())
    stream = null
  }

  if (overlayEl) {
    overlayEl.remove()
    overlayEl = null
  }

  videoEl = null
  canvasEl = null
  cocoModel = null
  faceLandmarker = null
  smoothedBoxes.clear()
}
