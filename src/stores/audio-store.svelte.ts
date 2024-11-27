import * as color from 'pex-color'
import range from 'array-range'
import { colord } from '~/modules/colors'
import debounce from 'just-debounce'

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
	// console.log({ barColors: bars })
	return bars
}

const vizBars = range(24)

class AudioStore {
	context = $state(null)
	analyser = $state(null)
	backgroundAudio = $state(null)
	playingClips = new Set()

	volume = $state(20)
	isSoundtrackMuted = $state(false)

	frequencyData = $state(new Uint8Array(1024))
	lowFrequency = 100
	highFrequency = 2500
	vizBars = $state(null)
	vizBarColors = []

	interfaceSoundsConfig = interfaceSoundsConfig

	interfaceSounds = $state({
		buttonHover: null,
		buttonClick: null,
		itemAdd: null,
		itemDelete: null,
		itemRotate: null,
		itemMove: null,
		itemScale: null,
		unavailable: null,
		itemFavorite: null
	})

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

	playClip = (clipId: string) => {
		const config = this.interfaceSoundsConfig[clipId]
		if (!this.interfaceSounds[clipId]) return
		const isInPlayingList = this.playingClips.has(clipId)
		const audio = this.interfaceSounds[clipId]
		// console.log(clipId, isInPlayingList, audio)
		if (isInPlayingList) audio.stop()
		if (!isInPlayingList) this.playingClips.add(clipId)
		audio.play()
	}

	stopClip = (clipId: string) => {
		if (!this.interfaceSounds[clipId]) return
		this.interfaceSounds[clipId].stop()
		this.playingClips.delete(clipId)
	}

	playPrevious = () => {
		this.stopTrack()
		this.playTrack()
	}

	playClipHandler = (clipId: string) => {
		return () => this.playClip(clipId)
	}

	stopClipHandler = (clipId: string) => {
		return () => this.stopClip(clipId)
	}

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
			const avg = slice.length ? sum / slice.length : 0
			const normalizedHeight = Math.min(100, (avg / 255) * 100)

			return {
				background: `hsla(0, 0%, 0%, ${normalizedHeight / 100})`,
				height: `${normalizedHeight}%`
			}
		})
	}
}

const interfaceSoundsConfig = {
	itemDuplicate: {
		path: '/audio/clips/Bamboo_Hit_1.wav',
		// Builder_Game_Weapon_Light_Swing_1.wav
		volume: 0.1,
		playbackRate: 0.6,
		debounceRate: 50
	},
	itemFocus: {
		path: '/audio/clips/OS_OTK_Sweep 10.wav',
		// Builder_Game_Weapon_Light_Swing_1.wav
		volume: 0.1,
		playbackRate: 0.6,
		debounceRate: 50
	},
	itemMove: {
		path: '/audio/clips/Bamboo_Hit_1.wav',
		volume: 0.1,
		playbackRate: 0.6,
		debounceRate: 50
	},
	itemRotate: {
		path: '/audio/clips/Puzzle_Game_Organic_Wood_Block_Tone_Tap_4_App_Click.wav',
		volume: 0.1,
		playbackRate: 0.6,
		debounceRate: 50
	},
	itemDelete: {
		path: '/audio/clips/Builder_Game_UI_Bass_Tap_Button.wav',
		volume: 0.1,
		playbackRate: 0.6,
		debounceRate: 50
	},
	itemDeselect: {
		path: '/audio/clips/Builder_Game_UI_Bass_Tap_Button.wav',
		volume: 0.1,
		playbackRate: 0.6,
		debounceRate: 50
	},
	itemSelect: {
		path: '/audio/clips/Basement_Light_Switch.wav',
		// Bluezone_BC0241_interface_beep_006.wav
		volume: 0.1,
		playbackRate: 0.6,
		debounceRate: 50
	},
	itemHover: {
		path: '/audio/clips/Builder_Game_Switch_Tiny_10.wav',
		volume: 0.1,
		playbackRate: 0.6,
		debounceRate: 50
	},
	buttonHover: {
		path: '/audio/clips/Builder_Game_Switch_Tiny_10.wav',
		volume: 0.1,
		playbackRate: 0.6,
		debounceRate: 50
	},
	buttonClick: {
		path: '/audio/clips/Domestic_Light_Switch.wav',
		volume: 0.1,
		playbackRate: 0.6,
		debounceRate: 50
	},
	itemAdd: {
		path: '/audio/clips/Puzzle_Game_UI_Pop_Tiny_03.wav',
		volume: 0.1,
		playbackRate: 0.6,
		debounceRate: 50
	},
	itemScale: {
		path: '/audio/clips/Puzzle_Game_Organic_Wood_Block_Tone_Tap_4_App_Click.wav',
		volume: 0.1,
		playbackRate: 0.6,
		debounceRate: 50
	},
	unavailable: {
		path: '/audio/clips/OS_OTK_Foley Guitar Strike 4.wav',
		volume: 0.1,
		playbackRate: 0.6,
		debounceRate: 50
	},
	itemFavorite: {
		path: '/audio/clips/Positive_Crossbred_Achievment_2.wav',
		volume: 0.1,
		playbackRate: 0.6,
		debounceRate: 50
	}
}

const audioStore = new AudioStore()
globalThis.audioStore = audioStore
export default audioStore
