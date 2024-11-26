import * as color from 'pex-color'
import range from 'array-range'
import { colord } from '~/modules/colors'

const createColorsRange = (startColor, endColor, count) => {
	const start = colord(startColor)
	const end = colord(endColor)
	const bars = new Array(count)

	bars[0] = colord(startColor).toLch()

	for (let i = 1; i < count - 1; i++) {
		const t = i / (count - 1)
		const oklch = colord(start).mix(colord(end), t).toLch()
		bars[i] = oklch
	}

	bars[count - 1] = colord(endColor).toLch()
	console.log({ barColors: bars })
	return bars
}

const vizBars = range(24)

class AudioStore {
	context = $state(null)
	analyser = $state(null)
	backgroundAudio = $state(null)

	volume = $state(20)
	isSoundtrackMuted = $state(false)

	frequencyData = $state(new Uint8Array(1024))
	lowFrequency = 100
	highFrequency = 2500
	vizBars = $state(null)
	vizBarColors = []

	interfaceHoverSound0 = $state(null)
	itemPlaceSound0 = $state(null)
	itemDeleteSound0 = $state(null)
	itemMoveSound0 = $state(null)
	itemRotateSound0 = $state(null)

	accentA05 = $state(null)
	affirmationDryMetalUIButton1 = $state(null)
	button02 = $state(null)
	button04 = $state(null)
	mergeEcho03 = $state(null)
	organicHollowItemOrTilePlace1 = $state(null)
	organicMetallicButton1 = $state(null)
	organicPinBallLoad1 = $state(null)
	organicUnlock2 = $state(null)
	organicWoodBlockToneTap4AppClick = $state(null)
	slideVibrate03 = $state(null)
	uiPop03 = $state(null)
	uiPopTiny03 = $state(null)
	foleyGuitarStrike4 = $state(null)
	foleyPipeHits4 = $state(null)
	foleyPipeHits7 = $state(null)
	builderGameMetalTabClick2Soft = $state(null)
	builderGameMetalUIButtonClick2 = $state(null)
	builderGameSwitchTiny10 = $state(null)
	builderGameUITapButton = $state(null)
	builderGameWeaponArrowImpact3Miss = $state(null)
	builderGameWeaponArrowImpact4Hit = $state(null)
	builderGameWoodUISwitchClick = $state(null)

	setVolume = (volume: number) => {
		this.volume = volume
	}

	toggleMute = () => {
		this.isSoundtrackMuted = !this.isSoundtrackMuted
	}

	playTrack = () => {
		this.backgroundAudio.play()
	}

	pauseTrack = () => {
		this.backgroundAudio.pause()
	}

	stopTrack = () => {
		this.backgroundAudio.stop()
	}

	playClip(clipId: string) {
		if (!this[clipId]) return
		this[clipId].play()
	}

	stopClip(clipId: string) {
		if (!this[clipId]) return
		this[clipId].stop()
	}

	playPrevious = () => {
		this.stopTrack()
		this.playTrack()
	}

	playClipHandler(clipId: string) {
		return () => this.playClip(clipId)
	}

	stopClipHandler(clipId: string) {
		return () => this.stopClip(clipId)
	}

	updateVizBarColors(startColor, endColor) {
		// this.vizBarColors = createColorsRange(startColor, endColor, 24)
	}

	// updateFrequencyData() {
	// 	if (!this.analyser) return

	// 	if (this.backgroundAudio && !this.backgroundAudio.gain.connected) {
	// 		this.backgroundAudio.gain.connect(this.analyser)
	// 	}

	// 	this.analyser.getByteFrequencyData(this.frequencyData)
	// 	const step = Math.floor(this.frequencyData.length / vizBars.length)

	// 	this.vizBars = vizBars.map((bar, index) => {
	// 		const start = index * step
	// 		const end = start + step
	// 		const slice = this.frequencyData.slice(start, end)
	// 		const sum = slice.reduce((acc, val) => acc + val, 0)
	// 		const avg = sum / slice.length
	// 		const normalizedHeight = Math.min(100, (avg / 255) * 100)

	// 		return {
	// 			background: `hsla(0, 0%, 100%, ${normalizedHeight / 100})`,
	// 			height: normalizedHeight + '%'
	// 		}
	// 	})
	// }

	updateFrequencyData = () => {
		if (!this.analyser) return

		// Connect the background audio gain node to the analyser if not already connected
		if (this.backgroundAudio && !this.backgroundAudio.gain.connected) {
			this.backgroundAudio.gain.connect(this.analyser)
		}

		// Populate the frequency data
		this.analyser.getByteFrequencyData(this.frequencyData)

		// Define the Nyquist frequency (half the sample rate)
		const nyquist = this.context.sampleRate / 2

		// Ensure startFreq and endFreq are within valid bounds
		const startFreq = Math.max(0, Math.min(this.lowFrequency, nyquist))
		const endFreq = Math.max(0, Math.min(this.highFrequency, nyquist))

		// Convert frequency range to array indices
		const startIdx = Math.floor((startFreq / nyquist) * this.frequencyData.length)
		const endIdx = Math.floor((endFreq / nyquist) * this.frequencyData.length)

		// Define the frequency range for each bar
		const totalBars = vizBars.length
		const step = Math.floor((endIdx - startIdx) / totalBars)

		// Map each bar to its corresponding frequency range
		this.vizBars = vizBars.map((_, index) => {
			const barStartIdx = startIdx + index * step
			const barEndIdx = Math.min(barStartIdx + step, endIdx)
			const slice = this.frequencyData.slice(barStartIdx, barEndIdx)
			const sum = slice.reduce((acc, val) => acc + val, 0)
			const avg = slice.length ? sum / slice.length : 0 // Avoid division by zero
			const normalizedHeight = Math.min(100, (avg / 255) * 100)
			// const lch = { ...this.vizBarColors[index], a: normalizedHeight }

			return {
				// background: colord(lch).toHex(),
				background: `hsla(0, 0%, 0%, ${normalizedHeight / 100})`,
				height: `${normalizedHeight}%`
			}
		})
	}
}

const audioStore = new AudioStore()
globalThis.audioStore = audioStore
export default audioStore
