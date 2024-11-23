// For dark colors returns white, for light colors returns black.
export function getContrastingTextColor(hex: string): string {
	const isHexColor = hex.startsWith('#')
	if (!isHexColor) return 'black'
	const r = parseInt(hex.slice(1, 3), 16)
	const g = parseInt(hex.slice(3, 5), 16)
	const b = parseInt(hex.slice(5, 7), 16)
	const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255
	return brightness > 0.5 ? 'black' : 'white'
}
