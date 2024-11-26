<script lang="ts">
	import { Drawer } from 'flowbite-svelte'
	import { sineInOut } from 'svelte/easing'
	import store from '../../../stores/store.svelte'
	import ModelCarouselVertical from '../ModelCarouselVertical.svelte'

	let isOpen = $derived.by(() => store.checkIsPanelOpen('shop'))

	const panelParams = {
		x: -320,
		duration: 300,
		easing: sineInOut
	}
</script>

<Drawer
	id="ShopPanelVertical"
	class="ShopPanelVertical"
	activateClickOutside={false}
	backdrop={false}
	transitionType="fly"
	transitionParams={panelParams}
	hidden={!isOpen}
>
	<div class="SearchWrapper">
		<label class="ShopSearch SheInput mixer input input-bordered flex items-center gap-2">
			Shop
			<input
				type="text"
				maxlength="32"
				minlength="3"
				placeholder="Search Items"
				spellcheck="false"
				class="input input-bordered w-full max-w-xs"
			/>
		</label>
	</div>
	<div class="CarouselWrapper">
		<ModelCarouselVertical />
	</div>
</Drawer>

<style>
	:global(.ShopPanelVertical) {
		display: flex;
		flex-direction: column;
		width: 300px;
		height: calc(100vh - 200px);
		position: absolute;
		left: 24px;
		top: 76px;
		border-radius: 6px;
		gap: 12px;
		padding: 0px;
		z-index: 50;
		/* padding: 0px 8px !important; */
	}

	:global(.CarouselWrapper) {
		height: 100%;
	}

	:global(.SearchWrapper) {
		/* position: absolute; */
		/* top: 12px; */
		/* left: 50%; */
		/* transform: translateX(-50%); */
		z-index: 10;
	}

	:global(.ShopSearch) {
		background-color: var(--surface-0);
		border-radius: 8px;
		padding: 4px 8px 4px 16px;
	}

	:global(.ShopPanelLeft) {
		height: 104px;
		margin-top: 4px;
	}
</style>
