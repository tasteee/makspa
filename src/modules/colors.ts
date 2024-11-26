import { colord, extend } from 'colord'
import lchPlugin from 'colord/plugins/lch'
import mixPlugin from 'colord/plugins/mix'

extend([lchPlugin, mixPlugin])

export { colord }

export function getContrastingTextColor(hex: string): string {
	return colord(hex).isDark() ? 'white' : 'black'
}
