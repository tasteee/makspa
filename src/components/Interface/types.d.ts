import type { SVGAttributes, SvelteHTMLElements } from 'svelte/elements';

export type AttributesT = SVGAttributes<SVGSVGElement>;
export type IconNodeT = [elementName: keyof SvelteHTMLElements, attrs: AttributesT][];

export interface IconProps extends AttributesT {
	name?: string;
	color?: string;
	size?: number | string;
	strokeWidth?: number | string;
	absoluteStrokeWidth?: boolean;
	class?: string;
	iconNode?: IconNodeT;
}

export type IconEvents = {
	[evt: string]: CustomEvent<any>;
};
