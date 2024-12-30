export const withMinMax = (min, max, value) => {
	if (value < min) {
		return min
	}

	if (value > max) {
		return max
	}

	return value
}

export const clampNumber = ({ min, max, value }) => {
	return Math.max(min, Math.min(max, value))
}
