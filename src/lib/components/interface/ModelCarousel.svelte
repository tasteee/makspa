<script lang="ts">
	import { ArrowLeft, ArrowRight } from 'lucide-svelte'
	import Icon from '@iconify/svelte'
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
</script>

<div class="ModelCarousel bg-surface-1 carousel carousel-center space-x-4 rounded-box">
	{#each galleryItems as galleryItem}
		<div class="ModelItem carousel-item">
			<div class="ModelUnderlay" style="background-image: url({galleryItem.src})"></div>
			<div class="IconsOverlay">
				<div class="IconWrapper">
					<Icon icon="pixelarticons:heart" class="sheIcon md" />
				</div>
				<div class="IconWrapper">
					<Icon icon="pixelarticons:plus" class="sheIcon md" />
				</div>
			</div>
		</div>
	{/each}
</div>

<style scoped>
	.ModelCarousel {
		height: 106px;
		background: var(--base2);
	}

	.ModelItem {
		width: 100px;
		height: 100px;
		margin-top: 5px;
	}

	.ModelUnderlay {
		opacity: 1;
		transition: all 0.25s ease-in-out;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		width: 100px;
		height: 100px;
		min-width: 100px;
	}

	.ModelItem:hover .ModelUnderlay {
		opacity: 0.5;
	}

	.ModelCarousel .ModelItem .IconsOverlay {
		opacity: 0;
		position: relative;
		left: -84px;
		top: 8px;
		gap: 6px;
		transition: all 0.25s ease-in-out;
		display: flex;
		flex-direction: column;
	}

	.ModelCarousel .ModelItem:hover .IconsOverlay {
		opacity: 1;
	}

	.ModelCarousel .ModelItem .IconsOverlay .IconWrapper {
		color: var(--ui-border) !important;
		opacity: 0.75;
	}

	.ModelCarousel .ModelItem .IconsOverlay .IconWrapper:hover {
		background: rgba(0, 0, 0, 0.75);
		outline: 1px solid var(--orange);
		color: var(--white) !important;
		transform: scale(1.25);
		opacity: 1;

		& svg {
			filter: drop-shadow(0 0 10px var(--white));
		}
	}

	/* .ModelCarousel .ModelItem .IconsOverlay .IconWrapper {
		color: var(--ui-border) !important;
	} */

	.ModelCarousel .ModelItem .IconsOverlay .IconWrapper {
		border-radius: 5px;
		width: 64px;
		height: 36px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ModelCarousel .ModelItem .IconsOverlay .IconWrapper:first-of-type {
		/* padding-top: 6px; */
	}

	.ModelCarousel .ModelItem .IconsOverlay .IconWrapper:last-of-type {
		/* padding-bottom: 6px; */
	}

	.IconsOverlay {
	}
</style>
