<script lang="ts">
	import SheIcon from './SheIcon.svelte'
	import SheSpacer from './SheSpacer.svelte'
	import SheButton from './SheButton.svelte'

	type PropsT = {
		class?: string
		title: string
		onCloseClick: () => void
		isOpen: boolean
		children: () => any
		side?: 'left' | 'right'
		headerAccessory?: () => any
	}

	let props: PropsT = $props()
</script>

{#if props.isOpen}
	<div class="ShePanel {props.class}" data-side={props.side}>
		<div class="ShePanelHeader">
			<div class="ShePanelHeaderTopRow">
				<h1 class="ShePanelTitle">{props.title}</h1>
				<SheButton kind="dark" onClick={props.onCloseClick} iconLibrary="pixelarticons" icon="close" />
			</div>
			{#if props.headerAccessory}
				<div class="ShePanelHeaderAccessory">{@render props.headerAccessory()}</div>
			{/if}
		</div>
		<div class="ShePanelContent">
			{@render props.children()}
			<SheSpacer />
		</div>
	</div>
{/if}

<style>
	.ShePanelHeaderTopRow {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.ShePanelHeaderAccessory {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.ShePanel {
		--background: var(--gray40);
	}

	.ShePanel {
		padding: 1px;
		background: var(--gray40);
		color: var(--gray0);
		box-shadow:
			-2px 2px 24px 4px rgb(0 0 0 / 85%),
			inset 0px 0px 0px 1px var(--gray20);
		border-radius: 5px;
		position: absolute;
		width: 320px;
		height: calc(100vh - 192px);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		z-index: 100;
		top: 76px;
	}

	.ShePanel[data-side='left'] {
		left: 12px;
	}

	.ShePanel[data-side='right'] {
		right: 12px;
	}

	.ShePanelHeader {
		border-radius: 5px 5px 0 0;
		border-bottom: 1px solid var(--gray35);
		background-color: var(--gray40);
		padding: 12px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.ShePanelTitle {
		margin: 0;
		font-weight: bold;
	}

	.ShePanelCloseButton {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: var(--brandColorA0);
		transition: color 0.3s ease;
	}

	.ShePanelCloseButton:hover {
		color: var(--brandColorA20);
	}

	.ShePanelContent {
		flex-grow: 1;
		overflow-y: auto;
		padding: 0px;
		/* padding-bottom: 24px; */
	}

	.ShePanelContent::-webkit-scrollbar {
		width: 8px;
		position: absolute;
		right: 0;
		background: transparent;
	}

	.ShePanelContent::-webkit-scrollbar-thumb {
		background: var(--gray32);
		border-radius: 8px;
	}
</style>
