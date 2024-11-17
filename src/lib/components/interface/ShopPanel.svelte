<script lang="ts">
	import store from '../../stores/store.svelte'
	import ShePanel from './ShePanel.svelte'
	import SheIcon from './SheIcon.svelte'
	import SheDivider from './SheDivider.svelte'
	import SheButton from './SheButton.svelte'
	import SheSwitch from './SheSwitch.svelte'
	import SheInput from './SheInput.svelte'
	import ShePanelSection from './ShePanelSection.svelte'
	import ShePanelInnerSection from './ShePanelInnerSection.svelte'
	import SheSpacer from './SheSpacer.svelte'
	import SheColorInput from './SheColorInput.svelte'
	import ModelCarouselVertical from './ModelCarouselVertical.svelte'

	let isOpen = $derived.by(() => store.checkIsPanelOpen('shop'))
	let search = $state('')

	let updateSearch = (value: string) => {
		search = value
	}
</script>

{#snippet headerAccessory()}
	<div class="ShopPanelHeaderAccessory">
		<SheInput label="" value={search} onChange={updateSearch} />
		<SheButton kind="light" onClick={() => {}} iconLibrary="pixelarticons" icon="search" />
	</div>
{/snippet}

<ShePanel
	class="ShopPanel"
	side="left"
	title="Shop"
	onCloseClick={() => store.setActivePanel('shop')}
	{isOpen}
	{headerAccessory}
>
	<div class="CarouselWrapper">
		<ModelCarouselVertical />
	</div>
</ShePanel>

<style>
	:global {
		.ShopPanelHeaderAccessory {
			display: flex;
			justify-content: space-between;
			width: 100%;
			align-items: center;
			gap: 8px;
		}

		.ShopPanel {
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 100vw;
			height: 124px;
			margin: 0;
			position: absolute;
			border-radius: 12px;
			/* padding: 0px 8px !important; */
		}

		.CarouselWrapper {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.SearchWrapper {
			position: absolute;
			top: 12px;
			left: 50%;
			transform: translateX(-50%);
			z-index: 10;
		}

		.ShopSearch {
			background-color: var(--surface-0);
			border-radius: 8px;
			padding: 4px 8px 4px 16px;
		}

		.ShopPanelLeft {
			height: 104px;
			margin-top: 4px;
		}
	}
</style>
