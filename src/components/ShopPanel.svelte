<script lang="ts">
	import ShePanel from '~/components/she/ShePanel.svelte'
	import SheButton from '~/components/she/SheButton.svelte'
	import SheIcon from '~/components/she/SheIcon.svelte'
	import SheInput from '~/components/she/SheInput.svelte'
	import SheIconButton from '~/components/she/SheIconButton.svelte'
	import ModelCarouselVertical from './ModelSearchResults.svelte'
	import shop from '~/stores/shop.store.svelte'
	import stores from '~/stores'

	let isOpen = $derived(stores.menuBar.activePanel === 'shop')
	let hasSearched = $state(false)

	const submitSearch = () => {
		shop.searchModels()
		hasSearched = true
	}
</script>

{#snippet headerAccessory()}
	<div class="ShopPanelHeaderAccessory">
		<SheInput id="search" label="Search" value={stores.shop.query} onChange={stores.shop.setQuery} />
		<SheIconButton kind="light" onClick={submitSearch} library="pixelarticons" icon="search" />
	</div>
{/snippet}

<ShePanel class="ShopPanel" side="left" title="Shop" width="260px" {isOpen} {headerAccessory}>
	{#if isOpen}
		{#if shop.isLoading}
			<div class="NonResultWrapper">
				<SheIcon library="pixelarticons" icon="loader" size="large" color="var(--gray0)" />
			</div>
		{:else}
			{#if !hasSearched}
				<div class="NonResultWrapper">
					<h1 style="color: var(--gray25)">Search for models.</h1>
				</div>
			{/if}

			{#if hasSearched && stores.shop.results.length > 0}
				<div class="CarouselWrapper">
					<ModelCarouselVertical />
				</div>
			{/if}

			{#if hasSearched && stores.shop.results.length === 0}
				<div class="NonResultWrapper">
					<h1>Fuck.</h1>
					<h3>No results found.</h3>
				</div>
			{/if}
		{/if}
	{/if}
</ShePanel>

<style>
	:global {
		.NonResultWrapper {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 24px;
			text-align: center;
		}

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
