<script lang="ts">
	import TiHome from 'svelte-icons/ti/TiHome.svelte'
	import TiMap from 'svelte-icons/ti/TiMap.svelte'
	import TiBook from 'svelte-icons/ti/TiBook.svelte'
	import Icon from '@iconify/svelte'
	import store from '../../stores/store.svelte'

	let isHomePanelOpen = $derived.by(() => store.checkIsPanelOpen('home'))
	let isSpacePanelOpen = $derived.by(() => store.checkIsPanelOpen('space'))
	let isVisitorsPanelOpen = $derived.by(() => store.checkIsPanelOpen('visitors'))
	let isShopPanelOpen = $derived.by(() => store.checkIsPanelOpen('shop'))
	let isSettingsPanelOpen = $derived.by(() => store.checkIsPanelOpen('settings'))
	let isAccountPanelOpen = $derived.by(() => store.checkIsPanelOpen('account'))

	let homeButtonClass = $derived.by(() => (isHomePanelOpen ? 'isActive' : ''))
	let spaceButtonClass = $derived.by(() => (isSpacePanelOpen ? 'isActive' : ''))
	let visitorsButtonClass = $derived.by(() => (isVisitorsPanelOpen ? 'isActive' : ''))
	let shopButtonClass = $derived.by(() => (isShopPanelOpen ? 'isActive' : ''))
	let accountButtonClass = $derived.by(() => (isAccountPanelOpen ? 'isActive' : ''))
	let settingsButtonClass = $derived.by(() => (isSettingsPanelOpen ? 'isActive' : ''))

	const activatePanel = (panel: string) => () => {
		store.setActivePanel(panel)
	}

	$effect(() => {
		console.log({ homeButtonClass, spaceButtonClass, visitorsButtonClass })
	})
</script>

<div id="SideBar">
	<ul id="TopSideBar" class="SideBar menu rounded-box bg-base-200">
		<li>
			<button class={spaceButtonClass} onclick={activatePanel('space')}>
				<Icon icon="pixelarticons:edit" class="sheIcon md" />
			</button>
		</li>
	</ul>

	<ul class="SideBar menu rounded-box bg-base-200">
		<li>
			<button class={visitorsButtonClass} onclick={activatePanel('visitors')}>
				<Icon icon="pixelarticons:users" class="sheIcon md dumbIcon" />
			</button>
		</li>
	</ul>

	<ul class="SideBar menu rounded-box bg-base-200">
		<li>
			<button class={shopButtonClass} onclick={activatePanel('shop')}>
				<Icon icon="pixelarticons:coin" class="sheIcon md" />
			</button>
		</li>
	</ul>

	<ul class="SideBar menu rounded-box bg-base-200">
		<li>
			<button class={settingsButtonClass} onclick={activatePanel('settings')}>
				<Icon icon="pixelarticons:sliders" class="sheIcon md" />
			</button>
		</li>
	</ul>

	<ul id="BottomSideBar" class="SideBar menu rounded-box bg-base-200">
		<li>
			<button class={accountButtonClass} onclick={activatePanel('account')}>
				<Icon icon="pixelarticons:human-handsdown" class="sheIcon md" />
			</button>
		</li>
	</ul>
</div>

<style scoped>
	.SideBar.menu button:focus {
		background: var(--chess) !important;
	}

	button.isActive {
		background: var(--chess);
		color: var(--white);
		filter: drop-shadow(0px 1px 29px rgba(255, 255, 255, 0.1));
	}

	:global(button.isActive .sheIcon) {
		filter: drop-shadow(0px 2px 12px var(--white));
	}

	#SideBar {
		display: flex;
		flex-direction: column;
		gap: 16px;
		position: absolute;
		top: 96px;
		left: 24px;
		z-index: 20;
	}

	#TopSideBar {
	}

	.SideBar {
		background: var(--surface-1);
		gap: 12px;
		outline: 2px solid var(--surface-0);
		border-radius: 8px;
		padding: 0px;
	}

	#BottomSideBar {
	}

	.menu > li *:active {
		background: var(--chess);
	}

	.menu > li *:focus {
		background: var(--purple);
	}
</style>
