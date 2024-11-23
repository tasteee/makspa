<script>
	import store from '../../../stores/store.svelte'
	import Icon from '@iconify/svelte'
	import TopBarPanels from '../TopBarPanels.svelte'

	let isHomePanelOpen = $derived.by(() => store.checkIsPanelOpen('home'))
	let isSpacePanelOpen = $derived.by(() => store.checkIsPanelOpen('space'))
	let isVisitorsPanelOpen = $derived.by(() => store.checkIsPanelOpen('visitors'))
	let isShopPanelOpen = $derived.by(() => store.checkIsPanelOpen('shop'))
	let isSettingsPanelOpen = $derived.by(() => store.checkIsPanelOpen('settings'))
	let isAccountPanelOpen = $derived.by(() => store.checkIsPanelOpen('account'))

	let baseButtonClass = 'btn btn-ghost btn-rounded'
	let activeBaseButtonClass = baseButtonClass + ' isActive'
	let homeButtonClass = $derived.by(() => (isHomePanelOpen ? activeBaseButtonClass : baseButtonClass))
	let spaceButtonClass = $derived.by(() => (isSpacePanelOpen ? activeBaseButtonClass : baseButtonClass))
	let visitorsButtonClass = $derived.by(() => (isVisitorsPanelOpen ? activeBaseButtonClass : baseButtonClass))
	let shopButtonClass = $derived.by(() => (isShopPanelOpen ? activeBaseButtonClass : baseButtonClass))
	let accountButtonClass = $derived.by(() => (isAccountPanelOpen ? activeBaseButtonClass : baseButtonClass))
	let settingsButtonClass = $derived.by(() => (isSettingsPanelOpen ? activeBaseButtonClass : baseButtonClass))

	const activatePanel = (panel) => () => {
		const isActive = store.checkIsPanelOpen(panel)
		const final = isActive ? '' : panel
		store.setActivePanel(final)
	}
</script>

<div class="TopBar navbar bg-base-100">
	<div class="navbar-start">
		<a class="btn btn-ghost text-xl">makespace</a>
	</div>
	<div class="TopBarIconGroup navbar-center flex">
		<button class={spaceButtonClass} onclick={activatePanel('space')}>
			<Icon icon="pixelarticons:edit" class="sheIcon md" />
		</button>
		<button class={visitorsButtonClass} onclick={activatePanel('visitors')}>
			<Icon icon="pixelarticons:users" class="sheIcon md dumbIcon" />
		</button>
		<button class={shopButtonClass} onclick={activatePanel('shop')}>
			<Icon icon="pixelarticons:coin" class="sheIcon md" />
		</button>
	</div>
	<div class="TopBarIconGroup navbar-end">
		<button class={settingsButtonClass} onclick={activatePanel('settings')}>
			<Icon icon="pixelarticons:sliders" class="sheIcon md" />
		</button>
		<button class={accountButtonClass} onclick={activatePanel('account')}>
			<Icon icon="pixelarticons:human-handsdown" class="sheIcon md" />
		</button>
	</div>
</div>

<TopBarPanels />

<style scoped>
	.TopBar {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100vw;
		z-index: 25;
		margin-right: 24px;
		outline: 2px solid var(--surface-0);
	}

	button.isActive {
		background: var(--chess);
	}

	.TopBarIconGroup {
		gap: 24px;
	}
</style>
