export function percentageToDegrees(percentage: number): number {
	percentage = percentage % 360
	if (percentage < 0) percentage += 360
	return (percentage * Math.PI) / 180
}

// 1 unit in the 3D space is 3 feet.
// sizeToScale(80) // would be 80% of 1 unit.
// 100% of 1 unit is 1 unit, which is 3 feet.
// 80% of 1 unit is 0.8 units, which is 2.4 feet.
// 42% of 1 unit is 0.42 units, which is 1.26 feet.
export function sizeToScale(value: number): number {
	return value / 100
}

// unitToFeet(2.4) // would be 2.4 units, which is 7.2 feet.
// unitToFeet(0.42) // would be 0.42 units, which is 1.26 feet.
// unitToFeet(82) // would be 82 units, which is 246 feet.
export function unitToFeet(units: number): number {
	return units * 3
}
