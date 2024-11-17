<script lang="ts">
	import SheDivider from './SheDivider.svelte'
	import SheIcon from './SheIcon.svelte'
	import SheButton from './SheButton.svelte'
	import classcat from 'classcat'

	type PropsT = {
		class?: string
		label: string
		children: any
		isOpen?: boolean
		onClick?: () => void
		noPadding?: boolean
		row?: boolean
	}

	let props: PropsT = $props()
	let isOpen = $state(true)
	let toggleOpen = () => (isOpen = !isOpen)
	let dirClass = $derived(props.row ? 'row' : 'column')
	let classes = $derived(classcat([props.class, isOpen ? 'opened' : 'closed']))

	let onClick = () => {
		isOpen = !isOpen
		props.onClick?.()
	}
</script>

<div class="ShePanelSection {classes}">
	<SheDivider {isOpen} label={props.label} {onClick} />
	<div class="contentBox {dirClass} gap2">
		{@render props.children()}
	</div>
</div>

<style lang="postcss">
	:global {
		.toggleIcon {
			margin-top: 2px;
			cursor: pointer;
		}

		.ShePanelSection {
			display: flex;
			flex-direction: column;
			padding: 0px 16px;
			height: auto;
			margin-bottom: 16px;
			gap: var(--gap);
		}

		.ShePanelSection.closed {
			height: 32px;
			overflow: hidden;
			margin-bottom: 8px;
		}

		.ShePanelSection .contentBox {
			flex-direction: column;
			gap: 8px;

			&.row {
				flex-direction: row;
			}
		}
	}
</style>
