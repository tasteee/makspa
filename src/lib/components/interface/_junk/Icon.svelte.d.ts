import { SvelteComponentTyped } from 'svelte'
import type { IconNodeT } from '../types'

export type IconPropsT = {
	name?: string | undefined
	color?: string
	size?: number | string
	strokeWidth?: number | string
	absoluteStrokeWidth?: boolean
	iconNode?: IconNodeT
	[key: string]: any
}

export type IconEventsT = {
	[evt: string]: CustomEvent<any>
}

declare const __propDef: {
	props: IconPropsT
	events: IconEventsT
	slots: {
		default: {}
	}
}

export type IconProps = typeof __propDef.props
export type IconEvents = typeof __propDef.events
export type IconSlots = typeof __propDef.slots
export default class Icon extends SvelteComponentTyped<IconProps, IconEvents, IconSlots> {}
export {}
