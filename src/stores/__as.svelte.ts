import _debounce from 'just-debounce'
const debounce = (delay: number) => _debounce((fn: () => void) => fn(), delay)

const createSoundtrackVisualizer = (options) => {
	let visualizerBars = $state(range(24))
	let analyzer = $state(null)
	let frequencyData = $state(new Uint8Array(1024))

	const analyze = () => {
		if (!analyzer) return
		const isConnected = options.audioRef.gain.connected
		const shouldConnect = options.audioRef && !isConnected
		if (shouldConnect) options.audioRef.gain.connect(analyzer)
		analyzer.getByteFrequencyData(frequencyData)
		const nyquist = options.context.sampleRate / 2
		const startFreq = Math.max(0, Math.min(options.lowFrequency, nyquist))
		const endFreq = Math.max(0, Math.min(options.highFrequency, nyquist))
		const startIndex = Math.floor((startFreq / nyquist) * frequencyData.length)
		const endIndex = Math.floor((endFreq / nyquist) * frequencyData.length)
		const totalBars = visualizerBars.length
		const step = Math.floor((endIndex - startIndex) / totalBars)

		visualizerBars = visualizerBars.map((_, index) => {
			const barStartIndex = startIndex + index * step
			const barEndIndex = Math.min(barStartIndex + step, endIndex)
			const slice = frequencyData.slice(barStartIndex, barEndIndex)
			const sum = slice.reduce((acc, val) => acc + val, 0)
			const avg = slice.length ? sum / slice.length : 0
			const normalizedHeight = Math.min(100, (avg / 255) * 100)

			return {
				background: `hsla(0, 0%, 0%, ${normalizedHeight / 100})`,
				height: `${normalizedHeight}%`
			}
		})
	}

	return {
		analyzer,
		frequencyData,
		visualizerBars,
		analyze
	}
}

const createSoundtrackStore = () => {
	let ref = $state(null)
	let context = $state(null)

	let tracks = $state([])
	let activeTrack = $state(null)

	const playNext = () => {
		activeTrack.stop()
		let currentTrackIndex = tracks.indexOf(activeTrack)
		let nextTrackIndex = currentTrackIndex + 1
		if (nextTrackIndex >= tracks.length) nextTrackIndex = 0
		const nextTrack = tracks[nextTrackIndex]
		activeTrack = nextTrack
		nextTrack.play()
	}

	const playPrevious = () => {
		activeTrack.stop()
		let currentTrackIndex = tracks.indexOf(activeTrack)
		let previousTrackIndex = currentTrackIndex - 1
		if (previousTrackIndex < 0) previousTrackIndex = tracks.length - 1
		const previousTrack = tracks[previousTrackIndex]
		activeTrack = previousTrack
		previousTrack.play()
	}

	const pause = () => {
		activeTrack.pause()
	}

	const stop = () => {
		activeTrack.stop()
	}

	const play = () => {
		activeTrack.play()
	}

	return {
		ref,
		context,
		tracks,
		activeTrack,
		playNext,
		playPrevious,
		pause,
		stop,
		play,

		visualizerBars: createSoundtrackVisualizer({
			context,
			lowFrequency: 100,
			highFrequency: 2500,
			audioRef: ref
		})
	}
}

const createSoundtrackSound = (config) => {
	let ref = $state(null)
	let isPlaying = $state(false)
	let isPaused = $state(false)
	let isStopped = $derived(!isPlaying && !isPaused)

	const play = () => {
		if (isPlaying) return
		isPlaying = true
		ref.play()
	}

	const pause = () => {
		if (isPaused) return
		isPaused = true
		ref.pause()
	}

	const stop = () => {
		if (isStopped) return
		isPlaying = false
		ref.stop()
	}

	return {
		ref,
		isPlaying,
		isPaused,
		play,
		pause,
		stop,

		volume: config.volume,
		playbackRate: config.playbackRate
	}
}

const createInterfaceSound = (config) => {
	let isPlaying = $state(false)
	let ref = $state(null)
	let playbackDebouncer = debounce(config.debounceDelay)

	let play = playbackDebouncer(() => {
		if (isPlaying) ref.stop()
		isPlaying = true
		ref.play()
	})

	let stop = () => {
		if (!ref.isPlaying) return
		isPlaying = false
		ref.stop()
	}

	return {
		ref,
		isPlaying,
		play,
		stop,

		volume: config.volume,
		playbackRate: config.playbackRate
	}
}

const interfaceSoundsConfig = {
	itemMove: {
		ref: $state(null),
		path: '/audio/clips/Bamboo_Hit_1.wav',
		volume: 0.5,
		playbackRate: 1,
		debounceRate: 50
	},
	itemRotate: {
		ref: $state(null),
		path: '/audio/clips/Puzzle_Game_Organic_Wood_Block_Tone_Tap_4_App_Click.wav',
		volume: 0.5,
		playbackRate: 1,
		debounceRate: 50
	},
	itemDelete: {
		ref: $state(null),
		path: '/audio/clips/Builder_Game_UI_Bass_Tap_Button.wav',
		volume: 0.5,
		playbackRate: 1,
		debounceRate: 50
	},
	itemDeselect: {
		ref: $state(null),
		path: '/audio/clips/Builder_Game_UI_Bass_Tap_Button.wav',
		volume: 0.5,
		playbackRate: 1,
		debounceRate: 50
	},
	itemSelect: {
		ref: $state(null),
		path: '/audio/clips/Builder_Game_UI_Bass_Tap_Button.wav',
		volume: 0.5,
		playbackRate: 1,
		debounceRate: 50
	},
	itemHover: {
		ref: $state(null),
		path: '/audio/clips/Builder_Game_Switch_Tiny_10.wav',
		volume: 0.5,
		playbackRate: 1,
		debounceRate: 50
	},
	buttonHover: {
		ref: $state(null),
		path: '/audio/clips/Builder_Game_Switch_Tiny_10.wav',
		volume: 0.5,
		playbackRate: 1,
		debounceRate: 50
	},
	buttonClick: {
		ref: $state(null),
		path: '/audio/clips/Domestic_Light_Switch.wav',
		volume: 0.5,
		playbackRate: 1,
		debounceRate: 50
	},
	itemAdd: {
		ref: $state(null),
		path: '/audio/clips/Puzzle_Game_UI_Pop_Tiny_03.wav',
		volume: 0.5,
		playbackRate: 1,
		debounceRate: 50
	},
	itemScale: {
		ref: $state(null),
		path: '/audio/clips/Puzzle_Game_Organic_Wood_Block_Tone_Tap_4_App_Click.wav',
		volume: 0.5,
		playbackRate: 1,
		debounceRate: 50
	},
	unavailable: {
		ref: $state(null),
		path: '/audio/clips/OS_OTK_Foley Guitar Strike 4.wav',
		volume: 0.5,
		playbackRate: 1,
		debounceRate: 50
	},
	itemFavorite: {
		ref: $state(null),
		path: '/audio/clips/Positive_Crossbred_Achievment_2.wav',
		volume: 0.5,
		playbackRate: 1,
		debounceRate: 50
	}
}
