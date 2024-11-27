<script lang="ts">
	import SheIconButton from '~/components/she/SheIconButton.svelte'
	import models from '~/database/data/models.json'
	import stores from '~/stores'
	import audioStore from '~/stores/audio-store.svelte'
	import mainStore from '~/stores/main-store.svelte'

	const galleryItems = models.map((model) => {
		return {
			id: model.id,
			alt: model.name,
			src: '/thumbnails/' + model.thumbnail,

			heartItem: () => {
				audioStore.playClip('itemFavorite')
			},

			addItem: () => {
				mainStore.addItemFromModel(model)
			}
		}
	})
</script>

<div class="ModelCarousel">
	<div class="carouselBox">
		{#each galleryItems as galleryItem}
			<div class="ModelItem">
				<div class="ModelUnderlay" style="background-image: url('{galleryItem.src}')"></div>
				<div class="IconsOverlay">
					<SheIconButton
						kind="dark"
						size="large"
						class="ActionButton"
						library="pixelarticons"
						icon="heart"
						onClick={galleryItem.heartItem}
					/>
					<SheIconButton
						kind="dark"
						size="large"
						class="ActionButton"
						library="pixelarticons"
						icon="plus"
						onClick={galleryItem.addItem}
					/>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	:global {
		.ModelCarousel {
			width: 100%;
			height: 100%;
			overflow-y: auto;
			background: var(--base2);
			padding: 10px;
		}

		.ModelCarousel .carouselBox {
			/* grid grid-cols-2 gap-2 */
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 12px;
		}

		.ModelItem {
			width: 100%;
			position: relative;
			overflow: visible;
		}

		.ModelUnderlay {
			padding-bottom: 100%;
			opacity: 1;
			transition: all 0.25s ease-in-out;
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			width: 100%;
			height: 100%;
		}

		.ModelItem:hover .ModelUnderlay {
			opacity: 0.5;
		}

		.IconsOverlay {
			opacity: 0;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			transition: all 0.25s ease-in-out;
			display: flex;
			flex-direction: column;
			gap: 6px;
		}

		.ModelItem:hover .IconsOverlay {
			opacity: 1;
		}
	}
</style>
