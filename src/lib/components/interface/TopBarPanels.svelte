<script lang="ts">
	import SpacePanel from './SpacePanel.svelte'
	import ShopPanel from './ShopPanel.svelte'
	import store from '../../stores/store.svelte'
	import HomePanel from './HomePanel.svelte'
	// import ShopPanel from './ShopPanel.svelte'
	// import VisitorsPanel from './VisitorsPanel.svelte'
	// import ShopPanel from './ShopPanel.svelte'
	// import SettingsPanel from './SettingsPanel.svelte'
	// import AccountPanel from './AccountPanel.svelte'
	// import SupportPanel from './SupportPanel.svelte'
	// import HelpPanel from './HelpPanel.svelte'

	let isHomePanelOpen = $derived.by(() => store.checkIsPanelOpen('home'))
	let isSpacePanelOpen = $derived.by(() => store.checkIsPanelOpen('space'))
	let isVisitorsPanelOpen = $derived.by(() => store.checkIsPanelOpen('visitors'))
	let isShopPanelOpen = $derived.by(() => store.checkIsPanelOpen('shop'))
	let isSettingsPanelOpen = $derived.by(() => store.checkIsPanelOpen('settings'))
	let isAccountPanelOpen = $derived.by(() => store.checkIsPanelOpen('account'))
	let isSupportPanelOpen = $derived.by(() => store.checkIsPanelOpen('support'))
</script>

{#if isShopPanelOpen}
	<ShopPanel />
{/if}

{#if isHomePanelOpen}
	<HomePanel />
{/if}

{#if isSpacePanelOpen}
	<SpacePanel />
{/if}

<style>
	:global(.InnerPanelContainer) {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	:global(.PanelTitle) {
		display: flex;
		align-items: center;
	}

	:global(.CloseButton) {
		margin-bottom: 16px;
	}

	:global(.PanelSection) {
		padding: 12px;
	}

	:global(.PanelSpacerVertical) {
		height: 12px;
		width: 100%;
	}

	:global(.PanelSpacerHorizontal) {
		width: 12px;
		height: 100%;
	}

	:global(.PanelTextBlock) {
		margin-bottom: 12px;
	}
</style>
