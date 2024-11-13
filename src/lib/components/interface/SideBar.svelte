<script lang="ts">
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte'
	import { Drawer, Button, CloseButton, Label, Input, Textarea } from 'flowbite-svelte'
	import { sineIn } from 'svelte/easing'
	import PanelSection from './PanelSection.svelte'
	import SpacePanel from './SpacePanel.svelte'

	import {
		UserSolid,
		LifeSaverSolid,
		HomeSolid,
		HeartSolid,
		BuildingSolid,
		UserCircleSolid,
		CogSolid
	} from 'flowbite-svelte-icons'

	const panelParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	}

	let activePanel = $state('')
	let isHomePanelOpen = $derived(activePanel === 'home')
	let isSpacePanelOpen = $derived(activePanel === 'space')
	let isVisitorsPanelOpen = $derived(activePanel === 'visitors')
	let isShopPanelOpen = $derived(activePanel === 'shop')
	let isHelpPanelOpen = $derived(activePanel === 'help')
	let isSettingsPanelOpen = $derived(activePanel === 'settings')
	let isAccountPanelOpen = $derived(activePanel === 'account')

	const closePanel = () => {
		// console.log('closing panel')
		activePanel = ''
	}

	const setActivePanel = (panel: string) => () => {
		if (activePanel === panel) return closePanel()
		// console.log('setting active panel', panel)
		activePanel = panel
	}
</script>

{#snippet menuItem(label, Icon)}
	<SidebarItem class="SideBarItem" onclick={setActivePanel(label)}>
		<svelte:fragment slot="icon">
			<Icon size={48} />
		</svelte:fragment>
	</SidebarItem>
{/snippet}

<Drawer
	class="SideBarPanel"
	activateClickOutside={false}
	backdrop={false}
	transitionType="fly"
	transitionParams={panelParams}
	hidden={!isHomePanelOpen}
>
	<div class="InnerPanelContainer">
		<h5 id="drawer-label" class="PanelTitle">
			<HomeSolid class="me-2.5 h-5 w-5" />Home
		</h5>
		<CloseButton on:click={() => (activePanel = '')} class="CloseButton" />
	</div>
	<PanelSection />
	<PanelSection />
</Drawer>

<Drawer
	class="SideBarPanel"
	activateClickOutside={false}
	backdrop={false}
	transitionType="fly"
	transitionParams={panelParams}
	hidden={!isSpacePanelOpen}
>
	<SpacePanel />
</Drawer>

<Sidebar class="SideBar">
	<SidebarWrapper class="SideBarWrapper">
		<SidebarGroup>
			{@render menuItem('home', HomeSolid)}
			{@render menuItem('space', LifeSaverSolid)}
			{@render menuItem('visitors', UserSolid)}
			{@render menuItem('shop', BuildingSolid)}
		</SidebarGroup>
		<SidebarGroup border>
			{@render menuItem('help', LifeSaverSolid)}
			{@render menuItem('settings', CogSolid)}
			{@render menuItem('account', UserCircleSolid)}
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>

<style>
	:global(.SideBar) {
		outline: 2px solid var(--black);
		border-radius: 4px;
		position: absolute;
		left: 24px;
		top: 24px;
		height: calc(100vh - 256px);
		width: 64px;
		z-index: 105;
	}

	:global(.SideBarWrapper) {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	:global(.SideBarItem) {
	}

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

	:global(.SideBarPanel) {
		height: calc(100vh - 256px);
		margin-left: 100px;
		margin-top: 24px;
		outline: 2px solid var(--black);
		border-radius: 4px;
	}

	:global(.PanelTextBlock) {
		margin-bottom: 12px;
	}
</style>
