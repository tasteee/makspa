declare module 'lucide-svelte' {
	import { SvelteComponentTyped } from 'svelte';

	export class Icon extends SvelteComponentTyped<{
		size?: number | string;
		strokeWidth?: number | string;
		color?: string;
	}> {}

	// Export all icons as Svelte components
	export class AlertCircle extends Icon {}
	export class ArrowLeft extends Icon {}
	export class ArrowRight extends Icon {}
	// Add any other icons you're using...
}
