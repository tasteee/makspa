import u from '~/modules/utilities'
import audioStore from './audio-store.svelte'

const ARROW_KEYS = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright']
const MODIFIER_KEYS = ['shift', 'control', 'alt']
const DIGIT_KEYS = ['digit1', 'digit2', 'digit3', 'digit4', 'digit5', 'digit6', 'digit7', 'digit8', 'digit9', 'digit0']
const WASD_KEYS = ['w', 'a', 's', 'd']
const ROTATOR_KEYS = ['q', 'e']

class InputStore {
	mouseX = null
	mouseY = null
	hasMouseClicked = $state(false)
	isActive = $state(false)
	pressedKeys = $state([])
	isCapsLocked = $state(false)
	isMouseDown = $state(false)
	isPressedW = $derived.by(() => this.pressedKeys.includes('w'))
	isPressedS = $derived.by(() => this.pressedKeys.includes('s'))
	isPressedA = $derived.by(() => this.pressedKeys.includes('a'))
	isPressedD = $derived.by(() => this.pressedKeys.includes('d'))
	isPressedQ = $derived.by(() => this.pressedKeys.includes('q'))
	isPressedE = $derived.by(() => this.pressedKeys.includes('e'))
	isPressedSpace = $derived.by(() => this.pressedKeys.includes('space'))
	isPressedShift = $derived.by(() => this.pressedKeys.includes('shift'))
	isPressedControl = $derived.by(() => this.pressedKeys.includes('control'))
	isPressedAlt = $derived.by(() => this.pressedKeys.includes('alt'))
	isPressedCapsLock = $derived.by(() => this.pressedKeys.includes('capslock'))
	isPressedDelete = $derived.by(() => this.pressedKeys.includes('delete'))
	isPressedEscape = $derived.by(() => this.pressedKeys.includes('escape'))
	isPressedArrowUp = $derived.by(() => this.pressedKeys.includes('arrowup'))
	isPressedArrowDown = $derived.by(() => this.pressedKeys.includes('arrowdown'))
	isPressedArrowLeft = $derived.by(() => this.pressedKeys.includes('arrowleft'))
	isPressedArrowRight = $derived.by(() => this.pressedKeys.includes('arrowright'))
	isPressedDigit1 = $derived.by(() => this.pressedKeys.includes('1'))
	isPressedDigit2 = $derived.by(() => this.pressedKeys.includes('2'))
	isPressedDigit3 = $derived.by(() => this.pressedKeys.includes('3'))
	isPressedDigit4 = $derived.by(() => this.pressedKeys.includes('4'))
	isPressedDigit5 = $derived.by(() => this.pressedKeys.includes('5'))
	isPressedDigit6 = $derived.by(() => this.pressedKeys.includes('6'))
	isPressedDigit7 = $derived.by(() => this.pressedKeys.includes('7'))
	isPressedDigit8 = $derived.by(() => this.pressedKeys.includes('8'))
	isPressedDigit9 = $derived.by(() => this.pressedKeys.includes('9'))
	isPressedDigit0 = $derived.by(() => this.pressedKeys.includes('0'))
	isPressedF1 = $derived.by(() => this.pressedKeys.includes('f1'))
	isPressedF2 = $derived.by(() => this.pressedKeys.includes('f2'))
	isPressedF3 = $derived.by(() => this.pressedKeys.includes('f3'))
	isPressedF4 = $derived.by(() => this.pressedKeys.includes('f4'))
	isPressedF5 = $derived.by(() => this.pressedKeys.includes('f5'))
	isPressedF6 = $derived.by(() => this.pressedKeys.includes('f6'))
	isPressedF7 = $derived.by(() => this.pressedKeys.includes('f7'))
	isPressedF8 = $derived.by(() => this.pressedKeys.includes('f8'))
	isPressedF9 = $derived.by(() => this.pressedKeys.includes('f9'))
	isPressedF10 = $derived.by(() => this.pressedKeys.includes('f10'))
	isPressedF11 = $derived.by(() => this.pressedKeys.includes('f11'))
	isPressedF12 = $derived.by(() => this.pressedKeys.includes('f12'))
	isBacktickPressed = $derived.by(() => this.pressedKeys.includes('`'))
	isBackspacePressed = $derived.by(() => this.pressedKeys.includes('backspace'))
	isArrowPressed = $derived.by(() => u.array.includesSome(this.pressedKeys, ARROW_KEYS))
	isModifierPressed = $derived.by(() => u.array.includesSome(this.pressedKeys, MODIFIER_KEYS))
	isDigitPressed = $derived.by(() => u.array.includesSome(this.pressedKeys, DIGIT_KEYS))
	isWASDPressed = $derived.by(() => u.array.includesSome(this.pressedKeys, WASD_KEYS))
	isRotatorPressed = $derived.by(() => u.array.includesSome(this.pressedKeys, ROTATOR_KEYS))

	handleKey = (isPressing: boolean) => (event: KeyboardEvent) => {
		if (event.repeat) return
		const key = u.event.getKey(event)
		const isAlreadyPressed = this.pressedKeys.includes(key)
		this.isCapsLocked = event.getModifierState('CapsLock')
		if (isPressing && isAlreadyPressed) return
		if (isPressing && !isAlreadyPressed) this.pressedKeys = [...this.pressedKeys, key]
		if (!isPressing && isAlreadyPressed) this.pressedKeys = u.array.without(this.pressedKeys, key)
	}

	handleKeyDown = this.handleKey(true)
	handleKeyUp = this.handleKey(false)
	recentMouseHistoryY: number[] = []

	handleMouseMove = (event: MouseEvent) => {
		this.mouseX = event.clientX
		this.mouseY = event.clientY
		this.recentMouseHistoryY = [...this.recentMouseHistoryY, event.clientY].slice(-15)
	}

	determineMouseDirectionY = (): 'up' | 'down' | 'neutral' => {
		if (this.recentMouseHistoryY.length < 2) return 'neutral'

		let upCount = 0
		let downCount = 0

		for (let i = 1; i < this.recentMouseHistoryY.length; i++) {
			const currentY = this.recentMouseHistoryY[i]
			const previousY = this.recentMouseHistoryY[i - 1]

			if (currentY < previousY) {
				upCount++
			} else if (currentY > previousY) {
				downCount++
			}
		}

		if (upCount > downCount) {
			return 'up'
		} else if (downCount > upCount) {
			return 'down'
		} else {
			return 'neutral'
		}
	}

	handleMouseDown = () => {
		this.isMouseDown = true
	}

	handleMouseUp = () => {
		this.isMouseDown = false
	}

	handleFirstClick = () => {
		document.removeEventListener('click', this.handleFirstClick)
		this.hasMouseClicked = true
		console.log('handleFirstClic\n\n')
	}

	start = () => {
		document.addEventListener('keydown', this.handleKeyDown)
		document.addEventListener('keyup', this.handleKeyUp)
		document.addEventListener('mousemove', this.handleMouseMove)
		document.addEventListener('click', this.handleFirstClick)
		document.addEventListener('mousedown', this.handleMouseDown)
		document.addEventListener('mouseup', this.handleMouseUp)
		this.isActive = true
	}

	stop = () => {
		document.removeEventListener('keydown', this.handleKeyDown)
		document.removeEventListener('keyup', this.handleKeyUp)
		document.removeEventListener('mousemove', this.handleMouseMove)
		this.isActive = false
	}
}

const inputStore = new InputStore()
globalThis.inputStore = inputStore
export default inputStore

globalThis.getCurrentPressedKeys = () => $state.snapshot(inputStore.pressedKeys)
