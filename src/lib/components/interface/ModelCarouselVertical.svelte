<script lang="ts">
	import SheButton from './SheButton.svelte'
	import store from '../../stores/store.svelte'

	const galleryItems = store.models.map((model) => {
		return {
			alt: model.name,
			src: model.thumbnail,
			uid: model.uid,
			addItem: () => {
				store.addItemToSpace(model)
			}
		}
	})

	const getImageUrl = (src: string) => {
		return src
		// return '/thumbnails/grass-block-f922aee0-7194-4e90-aa50-24040b1d5943.png'
	}
</script>

<div class="ModelCarousel bg-surface-1 carousel carousel-vertical rounded-box">
	<div class="carouselBox">
		{#each galleryItems as galleryItem}
			<div class="ModelItem">
				<div class="ModelUnderlay" style="background-image: url({getImageUrl(galleryItem.src)})"></div>
				<div class="IconsOverlay">
					<SheButton kind="dark" size="large" class="ActionButton" iconLibrary="pixelarticons" icon="heart" />
					<SheButton
						kind="dark"
						size="large"
						class="ActionButton"
						iconLibrary="pixelarticons"
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
