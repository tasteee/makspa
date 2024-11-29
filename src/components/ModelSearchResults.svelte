<script lang="ts">
	import './ModelSearchResults.css'
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

<div class="ModelSearchResults">
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
