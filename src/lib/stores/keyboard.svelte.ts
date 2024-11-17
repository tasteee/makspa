const keyboardStore = $state({
	isCapsLocked: false,
	isArrowPressed: false,
	isModifierPressed: false,
	isDigitPressed: false,
	isWASDPressed: false,
	isRotatorPressed: false,
	arrowdown: false,
	arrowup: false,
	arrowleft: false,
	arrowright: false,
	shift: false,
	control: false,
	alt: false,
	digit1: false,
	digit2: false,
	digit3: false,
	digit4: false,
	digit5: false,
	digit6: false,
	digit7: false,
	digit8: false,
	digit9: false,
	digit0: false,
	w: false,
	a: false,
	s: false,
	d: false,
	q: false,
	e: false,
	space: false,
	enter: false,
	delete: false,
	tab: false,
	esc: false,
	f1: false,
	f2: false,
	f3: false,
	f4: false,
	f5: false,
	f6: false
})

function registerListeners() {
	window.addEventListener('keydown', (event) => {
		const isModKey = isModifierKey(event)
		const isInput = event.target.tagName === 'INPUT'
		if (isModKey) event.preventDefault()
		if (!isModKey && isInput) return
		if (event.repeat) return
		handleKey(event, true)
	})

	window.addEventListener('keyup', (event) => {
		const isModKey = isModifierKey(event)
		const isInput = event.target.tagName === 'INPUT'
		if (isModKey) event.preventDefault()
		if (!isModKey && isInput) return
		if (event.repeat) return
		handleKey(event, false)
	})
}

const store = {
	get state() {
		return keyboardStore
	},

	registerListeners
}

export default store

const handleKey = (event: KeyboardEvent, value: boolean) => {
	const key = event.key.toLowerCase() as any

	keyboardStore[key] = value
	keyboardStore.isCapsLocked = event.getModifierState('CapsLock')
	keyboardStore.isWASDPressed = keyboardStore.w || keyboardStore.a || keyboardStore.s || keyboardStore.d
	keyboardStore.isModifierPressed = keyboardStore.shift || keyboardStore.control || keyboardStore.alt
	keyboardStore.isRotatorPressed = keyboardStore.q || keyboardStore.e

	keyboardStore.isArrowPressed =
		keyboardStore.arrowdown || keyboardStore.arrowup || keyboardStore.arrowleft || keyboardStore.arrowright

	keyboardStore.isDigitPressed =
		keyboardStore.digit1 ||
		keyboardStore.digit2 ||
		keyboardStore.digit3 ||
		keyboardStore.digit4 ||
		keyboardStore.digit5 ||
		keyboardStore.digit6 ||
		keyboardStore.digit7 ||
		keyboardStore.digit8 ||
		keyboardStore.digit9 ||
		keyboardStore.digit0
}

const isModifierKey = (event: KeyboardEvent) => {
	const isAlt = event.key === 'Alt'
	const isControl = event.key === 'Control'
	const isShift = event.key === 'Shift'
	return isAlt || isControl || isShift
}
