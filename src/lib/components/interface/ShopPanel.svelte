<script lang="ts">
	import store from '../../stores/store.svelte'
	import ShePanel from './ShePanel.svelte'
	import SheButton from './SheButton.svelte'
	import stores from '../../stores'
	import SheInput from './SheInput.svelte'
	import SheIconButton from './SheIconButton.svelte'
	import { onMount } from 'svelte'
	import ModelCarouselVertical from './ModelCarouselVertical.svelte'

	let shouldShowCarousel = $state(false)
	let isOpen = $derived(stores.main.activeMainBarPanel === 'shop')
	let search = $state('')

	let updateSearch = (value: string) => {
		search = value
	}

	onMount(() => {
		setTimeout(() => {
			shouldShowCarousel = true
		}, 99)
	})
</script>

{#snippet headerAccessory()}
	<div class="ShopPanelHeaderAccessory">
		<SheInput label="" value={search} onChange={updateSearch} />
		<SheIconButton kind="light" onClick={() => {}} library="pixelarticons" icon="search" />
	</div>
{/snippet}

<ShePanel class="ShopPanel" side="left" title="Shop" {isOpen} {headerAccessory}>
	<div class="CarouselWrapper">
		{#if shouldShowCarousel}
			<ModelCarouselVertical />
		{/if}
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
