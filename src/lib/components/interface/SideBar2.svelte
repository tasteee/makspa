<script lang="ts">
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte'
	import SideBarPanels from '../interface/SideBarPanels.svelte'
	import store from '../../stores/store.svelte'
	import { UserSolid, LifeSaverSolid, HomeSolid, BuildingSolid, UserCircleSolid, CogSolid } from 'flowbite-svelte-icons'

	const activatePanel = (panel: string) => () => store.setActivePanel(panel)
</script>

{#snippet menuItem(label, Icon)}
	<SidebarItem class="SideBarItem" onclick={activatePanel(label)}>
		<svelte:fragment slot="icon">
			<Icon size={48} />
		</svelte:fragment>
	</SidebarItem>
{/snippet}

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

<SideBarPanels />

<style>
	:global(.SideBar) {
		outline: 2px solid var(--black);
		border-radius: 4px;
		position: absolute;
		left: 24px;
		top: 96px;
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
</style>
