<script lang="ts">
	import { ArrowLeft, ArrowRight, CirclePlus, Heart } from 'lucide-svelte'
	import store from '../../stores/store.svelte'

	const galleryItems = store.state.models.map((model) => {
		return {
			alt: model.name,
			src: model.thumbnail,
			uid: model.uid,
			addItem: () => {
				console.log('adding item based on model uid:', model.uid)
				store.addItemToSpace(model.uid)
			}
		}
	})
</script>

<div class="ModelGallery">
	<ArrowLeft size={40} strokeWidth={3} />

	{#each galleryItems as galleryItem}
		<div class="galleryItem">
			<img class="thumbnail" src={galleryItem.src} alt={galleryItem.alt} />
			<span class="addButton">
				<span class="innerAddButton">
					<CirclePlus size={32} color="var(--white)" onclick={galleryItem.addItem} />
					<!-- TODO: Add heart button. -->
					<!-- <Heart size={32} color="var(--dark-grey)" /> -->
				</span>
			</span>
		</div>
	{/each}

	<ArrowRight size={40} strokeWidth={3} />
</div>

<style>
	.addButton {
		position: absolute;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.innerAddButton {
		display: flex;
		flex-direction: column;
		gap: 8px;
		transition: all 0.33s ease-in-out;
		box-shadow: 1px 2px 33px var(--black);
		border-radius: 50%;
		background: var(--black);
		opacity: 0;
	}

	.ModelGallery {
		margin: 0 auto;
		display: flex;
		gap: 12px;
		position: absolute;
		bottom: 73px;
		left: 0px;
		width: 100vw;
		height: 80px;
		overflow-x: scroll;
		overflow-y: hidden;
	}

	.ModelGallery::-webkit-scrollbar {
		display: none;
	}

	.galleryItem {
		min-width: 80px;
		max-width: 80px;
		min-height: 80px;
		max-height: 80px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.galleryItem:hover .innerAddButton {
		opacity: 1;
	}

	.galleryItem:hover .thumbnail {
		opacity: 0.5;
	}

	.thumbnail {
		transition: all 0.23s ease-in-out;
	}
</style>
