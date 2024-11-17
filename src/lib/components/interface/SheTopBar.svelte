<script lang="ts">
	import SheIcon from './SheIcon.svelte'
	import SpacePanel from './SpacePanel.svelte'
	// import VisitorsPanel from './VisitorsPanel.svelte'
	import ShopPanel from './ShopPanel.svelte'
	import SheButton from './SheButton.svelte'
	import TopBarPanels from './TopBarPanels.svelte'
	// import SettingsPanel from './SettingsPanel.svelte'
	// import AccountPanel from './AccountPanel.svelte'
	import store from '../../stores/store.svelte'

	type TopBarPropsT = {
		title?: string
		class?: string
	}

	type PanelConfig = {
		id: string
		icon: string
		panel: any // Component reference
	}

	let props: TopBarPropsT = $props()
	let activePanel = $derived.by(() => store.activeMainBarPanel)
	let togglePanel = (panel: string) => () => store.setActivePanel(panel)
</script>

<div class="SheTopBar {props.class}">
	{#if props.title}
		<div class="title">{props.title}</div>
	{/if}

	<div class="icons-container">
		<SheButton
			kind="dark"
			isActive={activePanel === 'space'}
			size="large"
			class="top-bar-icon"
			onClick={togglePanel('space')}
			iconLibrary="pixelarticons"
			icon="edit"
		/>
		<SheButton
			kind="dark"
			isActive={activePanel === 'shop'}
			size="large"
			class="top-bar-icon"
			onClick={togglePanel('shop')}
			iconLibrary="pixelarticons"
			icon="coin"
		/>
		<SheButton
			kind="dark"
			isActive={activePanel === 'home'}
			size="large"
			class="top-bar-icon"
			onClick={togglePanel('home')}
			iconLibrary="pixelarticons"
			icon="home"
		/>
	</div>
</div>

<TopBarPanels />

<style>
	.SheTopBar {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		height: 0px;
		overflow: visible;
		display: inline-flex;
	}

	.title {
		color: var(--gray0);
		font-size: 18px;
		font-weight: 500;
	}

	.icons-container {
		margin-top: 12px;
		margin-left: 12px;
		display: inline-flex;
		gap: 12px;
		align-items: center;
		height: 40px;
	}

	.top-bar-icon {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		box-shadow: inset 0 0 0 1px var(--gray32);
		border-radius: 8px;
		color: var(--gray10);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.top-bar-icon:hover {
		background-color: var(--gray36);
	}

	.top-bar-icon[data-active='true'] {
		background-color: var(--gray32);
		color: var(--gray0);
		box-shadow: inset 0 0 0 1px var(--gray0);
	}

	.ShePanelContainer {
		position: absolute;
		top: 76px; /* 64px + 12px gap */
		left: 0;
		right: 0;
		height: 128px;
		background-color: var(--gray40);
		box-shadow: inset 0 0 0 1px var(--gray32);
		padding: 16px;
		overflow: hidden;
	}
</style>
