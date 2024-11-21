class KeyboardStore {
	isPressedW = $state(false)
	isPressedS = $state(false)
	isPressedA = $state(false)
	isPressedD = $state(false)
	isPressedQ = $state(false)
	isPressedE = $state(false)
	isPressedSpace = $state(false)
	isPressedShift = $state(false)
	isPressedControl = $state(false)
	isPressedAlt = $state(false)

	getKey = (event: KeyboardEvent) => {
		const key = event.key.toLowerCase()
		return key === ' ' ? 'space' : key
	}

	handleKey = (isPressed: boolean) => (event: KeyboardEvent) => {
		if (event.repeat) return
		const key = this.getKey(event)
		console.log('handleKey', isPressed, key)
		const isW = key === 'w'
		const isS = key === 's'
		const isA = key === 'a'
		const isD = key === 'd'
		const isQ = key === 'q'
		const isE = key === 'e'
		const isSpace = key === ' '
		const isControl = key === 'control' || event.ctrlKey
		const isAlt = key === 'alt' || event.altKey
		const isShift = key === 'shift' || event.shiftKey
		if (isW) this.isPressedW = isPressed
		if (isS) this.isPressedS = isPressed
		if (isA) this.isPressedA = isPressed
		if (isD) this.isPressedD = isPressed
		if (isQ) this.isPressedQ = isPressed
		if (isE) this.isPressedE = isPressed
		if (isSpace) this.isPressedSpace = isPressed
		if (isShift) this.isPressedShift = isPressed
		if (isControl) this.isPressedControl = isPressed
		if (isAlt) this.isPressedAlt = isPressed
	}

	handleKeyDown = this.handleKey(true)
	handleKeyUp = this.handleKey(false)

	start = () => {
		window.addEventListener('keydown', this.handleKeyDown)
		window.addEventListener('keyup', this.handleKeyUp)
	}

	stop = () => {
		window.removeEventListener('keydown', this.handleKeyDown)
		window.removeEventListener('keyup', this.handleKeyUp)
	}
}

const keyboardStore = new KeyboardStore()
globalThis.keyboardStore = keyboardStore
export default keyboardStore
