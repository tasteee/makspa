// For dark colors, returns white, for light colors, returns black.
export function getContrastingTextColor(hex: string): string {
	const isHexColor = hex.startsWith('#')
	if (!isHexColor) return 'black'

	// Convert hex to RGB
	let r = parseInt(hex.slice(1, 3), 16)
	let g = parseInt(hex.slice(3, 5), 16)
	let b = parseInt(hex.slice(5, 7), 16)

	// Calculate brightness using the formula
	// Brightness = (0.299*R + 0.587*G + 0.114*B)
	let brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255
	return brightness > 0.5 ? 'black' : 'white' // Choose black for light colors, white for dark
}
