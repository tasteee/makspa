<script lang="ts">
	import SpacePanel from './SpacePanel.svelte'
	import ShopPanel from './ShopPanel.svelte'
	import stores from '~/stores'
	import HomePanel from './HomePanel.svelte'
	// import ShopPanel from './ShopPanel.svelte'
	// import VisitorsPanel from './VisitorsPanel.svelte'
	// import ShopPanel from './ShopPanel.svelte'
	// import SettingsPanel from './SettingsPanel.svelte'
	// import AccountPanel from './AccountPanel.svelte'
	// import SupportPanel from './SupportPanel.svelte'
	// import HelpPanel from './HelpPanel.svelte'

	let isHomePanelOpen = $derived(stores.menuBar.activePanel === 'home')
	let isSpacePanelOpen = $derived(stores.menuBar.activePanel === 'space')
	let isVisitorsPanelOpen = $derived(stores.menuBar.activePanel === 'visitors')
	let isShopPanelOpen = $derived(stores.menuBar.activePanel === 'shop')
	let isSettingsPanelOpen = $derived(stores.menuBar.activePanel === 'settings')
	let isAccountPanelOpen = $derived(stores.menuBar.activePanel === 'account')
	let isSupportPanelOpen = $derived(stores.menuBar.activePanel === 'support')
</script>

<ShopPanel />
<HomePanel />
<SpacePanel />

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
