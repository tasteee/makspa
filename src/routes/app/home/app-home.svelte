<!-- /app/home: Dashboard | View spaces. -->
<!-- loadSpaces. render spaces cards. -->
<script lang="ts">
	import './app-home.css'
	import api from '~/database/api'
	import { onMount } from 'svelte'
	import SheFlex from '~/components/she/SheFlex.svelte'
	import mainStore from '~/stores/main-store.svelte'

	let spaces = $state([])

	onMount(() => {
		api.getSpacesByArtistId(mainStore.artist.id).then((result) => {
			const [error, spaceList] = result
			if (error) throw error
			if (!error) spaces = spaceList
		})
	})
</script>

{#snippet SpaceCard(space)}
	{@const thumbnail = api.getFileUrl(space, space.thumbnail)}
	{@const style = `--thumbnail: url(${thumbnail})`}
	<SheFlex class="SpaceCard" gap="24px" isColumn {style}>
		<!-- <div class="SpaceCardBackground" style={style}></div> -->
		<div class="SpaceCardTitle">
			<a href={`/app/space/${space.id}`}>
				<h3>{space.name}</h3>
			</a>
		</div>
		<div class="SpaceCardAbout">
			<p>{space.about}</p>
		</div>
	</SheFlex>
{/snippet}

<SheFlex class="AppHome" isColumn>
	<SheFlex class="AppHomeHeader">
		<h1>Spaces</h1>
	</SheFlex>
	<SheFlex class="SpacesList">
		{#each spaces as space}
			{@render SpaceCard(space)}
		{/each}
	</SheFlex>
</SheFlex>
